import json
import os
import uuid
import hashlib
import hmac
import magic
from decimal import Decimal
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.conf import settings
from django.core.cache import cache
from django.contrib.admin.views.decorators import staff_member_required
from django.http import FileResponse, HttpResponseForbidden, HttpResponseBadRequest, Http404
from django.shortcuts import get_object_or_404
import mimetypes
from .models import ICCDSPaper, ICCDSRegistration, ICCDSTeamMember, ICCDSApprovedPaper


# ─── Secure File Access ──────────────────────────────────────────────

# Allowed models and their safe file fields
ALLOWED_MODELS = {
    'iccdsregistration': ['ieee_proof', 'student_proof', 'primary_id_proof', 'payment_receipt'],
    'iccdspaper': ['crc_pdf', 'crc_docx', 'copyright_form'],
}

# Allowed inline mime types for previews
INLINE_MIME_TYPES = {
    'image/jpeg', 'image/png', 'image/webp', 'application/pdf'
}

@staff_member_required
def secure_file_access(request, token):
    """
    Securely serves files from the storage backend using an opaque token.
    Enforces staff authentication, verifies token ownership, model-level permissions, and field allowlists.
    """
    payload = cache.get(f'secure_file_{token}')
    
    if not payload:
        return HttpResponseBadRequest("Link has expired or is invalid.")

    # Bind token strictly to the user who generated it
    token_user_id = payload.get('user_id')
    if token_user_id != request.user.id:
        return HttpResponseForbidden("This link was generated for another user session.")

    model_name = payload.get('model')
    obj_id = payload.get('id')
    field_name = payload.get('field')
    action = payload.get('action')

    if action not in ('preview', 'download'):
        return HttpResponseBadRequest("Invalid action.")

    if model_name not in ALLOWED_MODELS or field_name not in ALLOWED_MODELS[model_name]:
        return HttpResponseForbidden("Access to this field is not allowed.")

    # Check model permissions
    perm = f'iccds.view_{model_name}'
    if not request.user.has_perm(perm):
        return HttpResponseForbidden("You do not have permission to view this model.")

    # Get object
    if model_name == 'iccdsregistration':
        model_class = ICCDSRegistration
    elif model_name == 'iccdspaper':
        model_class = ICCDSPaper
    else:
        raise Http404("Model not found.")

    obj = get_object_or_404(model_class, id=obj_id)
    file_field = getattr(obj, field_name, None)

    if not file_field or not file_field.name:
        raise Http404("File not found on this object.")

    # Open file using the storage backend
    try:
        # file_field.open() calls storage._open() which returns a File object
        file_obj = file_field.open('rb')
    except Exception as e:
        import logging
        logging.error(f"Error opening secure file {file_field.name}: {e}")
        raise Http404("Could not open file.")

    # Create the response
    content_type, encoding = mimetypes.guess_type(file_field.name)
    content_type = content_type or 'application/octet-stream'

    response = FileResponse(file_obj, content_type=content_type)
    
    # Meaningful filename for download
    # e.g., ICCDSRegistration_1234_payment_receipt.jpg
    base_name = os.path.basename(file_field.name)
    friendly_name = f"{model_class.__name__}_{obj_id}_{field_name}_{base_name}"
    
    if action == 'preview' and content_type in INLINE_MIME_TYPES:
        response['Content-Disposition'] = f'inline; filename="{friendly_name}"'
    else:
        response['Content-Disposition'] = f'attachment; filename="{friendly_name}"'

    response['X-Content-Type-Options'] = 'nosniff'
    return response


# ─── Fee Schedule ────────────────────────────────────────────────────
FEE_SCHEDULE = {
    'ieee_student':       {'INR': Decimal('8500.00'),  'USD': Decimal('175.00')},
    'ieee_academic':      {'INR': Decimal('9000.00'),  'USD': Decimal('200.00')},
    'ieee_listener':      {'INR': Decimal('2000.00'),  'USD': Decimal('85.00')},
    'non_ieee_student':   {'INR': Decimal('9000.00'),  'USD': Decimal('200.00')},
    'non_ieee_academic':  {'INR': Decimal('9500.00'),  'USD': Decimal('225.00')},
    'non_ieee_listener':  {'INR': Decimal('2500.00'),  'USD': Decimal('100.00')},
}

# ─── Allowed file types ─────────────────────────────────────────────
ALLOWED_DOCUMENT_MIMES = {
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'application/zip',
    'application/x-zip-compressed',
    'application/octet-stream',
}
ALLOWED_PROOF_MIMES = {
    'application/pdf',
    'image/png',
    'image/jpeg',
    'application/octet-stream',
}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


def validate_file(file_obj, allowed_mimes, field_name):
    """Validate file size and MIME type / extension."""
    if file_obj.size > MAX_FILE_SIZE:
        return f'{field_name} exceeds 10MB size limit.'

    ext = os.path.splitext(file_obj.name)[1].lower()

    # Read first 2048 bytes for MIME detection
    header = file_obj.read(2048)
    file_obj.seek(0)

    try:
        mime = magic.from_buffer(header, mime=True)
    except Exception:
        mime = getattr(file_obj, 'content_type', '')

    # DOCX files are XML ZIP containers. If magic identifies zip/octet-stream, check extension
    if mime in ('application/zip', 'application/x-zip-compressed', 'application/octet-stream'):
        if ext in ('.docx', '.doc', '.pdf', '.png', '.jpg', '.jpeg'):
            return None

    if mime not in allowed_mimes:
        valid_exts = ('.pdf', '.docx', '.doc', '.png', '.jpg', '.jpeg')
        if ext in valid_exts:
            return None
        return f'{field_name} has invalid file type. Allowed formats: PDF, DOCX, DOC'

    return None


def is_listener_category(category):
    return category in ('ieee_listener', 'non_ieee_listener')


@csrf_exempt
@require_http_methods(["POST"])
def verify_paper_id(request):
    """
    Verify whether a paper ID exists in the approved papers list.
    Expects JSON body with: { "paper_id": "..." }
    Returns success if the paper ID is found and active.
    """
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    paper_id = data.get('paper_id', '').strip()
    if not paper_id:
        return JsonResponse({'error': 'Paper ID is required.'}, status=400)

    exists = ICCDSApprovedPaper.objects.filter(
        paper_id__iexact=paper_id,
        is_active=True
    ).exists()

    if exists:
        return JsonResponse({
            'success': True,
            'message': 'Paper ID verified successfully.',
            'paper_id': paper_id,
        })
    else:
        return JsonResponse({
            'success': False,
            'error': (
                'Paper ID not found. Please contact the organiser committee at '
                'iccds2026@rajalakshmi.edu.in or call '
                'Dr. N. Duraimurugan \u2014 9944915267 / '
                'Dr. K. Ananthajothi \u2014 9994075769'
            ),
        }, status=404)


@csrf_exempt
@require_http_methods(["POST"])
def iccds_register(request):
    """
    Handle ICCDS registration form submission (multipart/form-data).

    Expected fields:
      - name, email, phone, institution, country, category, currency
      - ieee_id_card (optional, required for IEEE categories)
      - team_members (JSON string, optional)
      - paper_id, paper_title, paper_abstract (required unless listener)
      - Files: crc_pdf, crc_docx, copyright_form (required unless listener)
      - Files: ieee_proof, student_proof (optional)
    """
    # ── Parse form data ──
    data = request.POST
    files = request.FILES

    # ── Validate required contact fields ──
    required = ['name', 'email', 'phone', 'institution', 'country', 'category', 'currency', 'honorific']
    missing = [f for f in required if not data.get(f)]
    if missing:
        return JsonResponse(
            {'error': f'Missing required fields: {", ".join(missing)}'},
            status=400
        )

    category = data['category']
    
    # Auto-derive currency server-side to prevent tampering
    country = data.get('country', '').strip()
    currency = 'INR' if country.lower() == 'india' else 'USD'

    # Validate category & currency
    valid_categories = [c[0] for c in ICCDSRegistration.CATEGORY_CHOICES]
    if category not in valid_categories:
        return JsonResponse({'error': f'Invalid category: {category}'}, status=400)

    if currency not in ('INR', 'USD'):
        return JsonResponse({'error': f'Invalid currency: {currency}'}, status=400)

    # ── IEEE validation ──
    if category.startswith('ieee_') and not data.get('ieee_id_card'):
        return JsonResponse(
            {'error': 'IEEE Membership ID is required for IEEE member categories.'},
            status=400
        )

    # ── Paper & file handling (skip for listeners) ──
    paper = None
    if not is_listener_category(category):
        # Paper fields required
        paper_required = ['paper_id', 'paper_title']
        paper_missing = [f for f in paper_required if not data.get(f, '').strip()]
        if paper_missing:
            return JsonResponse(
                {'error': f'Missing or blank paper fields: {", ".join(paper_missing)}'},
                status=400
            )

        # Paper files required
        for file_field in ['crc_docx', 'copyright_form']:
            if file_field not in files:
                return JsonResponse(
                    {'error': f'Missing required file: {file_field}'},
                    status=400
                )

        # Validate primary_id_proof is present (mandatory for all non-listeners)
        if 'primary_id_proof' not in files:
            return JsonResponse(
                {'error': 'Primary ID Verification (Student ID / Staff ID) is required.'},
                status=400
            )

        # Validate document files
        for file_field in ['crc_docx', 'copyright_form']:
            err = validate_file(files[file_field], ALLOWED_DOCUMENT_MIMES, file_field)
            if err:
                return JsonResponse({'error': err}, status=400)

        # Check if paper_id already exists
        if ICCDSPaper.objects.filter(paper_id=data['paper_id']).exists():
            return JsonResponse(
                {'error': f'Paper ID {data["paper_id"]} has already been registered.'},
                status=400
            )

        # Create paper record
        paper = ICCDSPaper.objects.create(
            paper_id=data['paper_id'].strip(),
            title=data['paper_title'].strip(),
            abstract=data.get('paper_abstract', '').strip(),
            crc_pdf=files.get('crc_pdf'),
            crc_docx=files['crc_docx'],
            copyright_form=files['copyright_form'],
        )

    # ── Validate optional proof files ──
    for proof_field in ['ieee_proof', 'student_proof', 'primary_id_proof']:
        if proof_field in files:
            err = validate_file(files[proof_field], ALLOWED_PROOF_MIMES, proof_field)
            if err:
                return JsonResponse({'error': err}, status=400)

    # ── Calculate fee ──
    fee_amount = FEE_SCHEDULE.get(category, {}).get(currency, Decimal('0.00'))

    # ── Create registration ──
    registration = ICCDSRegistration.objects.create(
        paper=paper,
        honorific=data.get('honorific', 'Mr.').strip(),
        name=data['name'].strip(),
        email=data['email'].strip(),
        phone=data['phone'].strip(),
        author_phone=data.get('author_phone', '').strip(),
        institution=data['institution'].strip(),
        country=country,
        category=category,
        currency=currency,
        fee_amount=fee_amount,
        ieee_id_card=data.get('ieee_id_card', ''),
        ieee_proof=files.get('ieee_proof'),
        student_proof=files.get('student_proof'),
        primary_id_proof=files.get('primary_id_proof'),
        status='pending_payment',
        payment_receipt=files.get('payment_screenshot'),
        payment_method='bank_transfer' if files.get('payment_screenshot') else None,
    )

    # ── Save team members ──
    team_members_json = data.get('team_members', '')
    if team_members_json:
        try:
            members = json.loads(team_members_json)
            for i, member in enumerate(members):
                if member.get('name', '').strip() and member.get('email', '').strip():
                    ICCDSTeamMember.objects.create(
                        registration=registration,
                        name=member['name'].strip(),
                        email=member['email'].strip(),
                        institution=member.get('institution', '').strip(),
                        order=i,
                    )
        except (json.JSONDecodeError, TypeError):
            pass  # Silently skip if team_members isn't valid JSON

    team_count = registration.team_members.count()

    return JsonResponse({
        'success': True,
        'registration': {
            'id': str(registration.id),
            'name': registration.name,
            'email': registration.email,
            'category': registration.get_category_display(),
            'currency': registration.currency,
            'fee_amount': str(registration.fee_amount),
            'status': registration.get_status_display(),
            'team_members_count': team_count,
            'created_at': registration.created_at.isoformat(),
        }
    }, status=201)


@csrf_exempt
@require_http_methods(["POST"])
def razorpay_verify(request):
    """
    Verify Razorpay payment signature.
    Expected JSON: { registration_id, razorpay_order_id, razorpay_payment_id, razorpay_signature }
    """
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    registration_id = data.get('registration_id')
    order_id = data.get('razorpay_order_id')
    payment_id = data.get('razorpay_payment_id')
    signature = data.get('razorpay_signature')

    if not all([registration_id, order_id, payment_id, signature]):
        return JsonResponse(
            {'error': 'Missing required payment verification fields.'},
            status=400
        )

    try:
        registration = ICCDSRegistration.objects.get(id=registration_id)
    except ICCDSRegistration.DoesNotExist:
        return JsonResponse({'error': 'Registration not found.'}, status=404)

    # Verify Razorpay signature
    razorpay_secret = os.environ.get('RAZORPAY_KEY_SECRET', '')
    if razorpay_secret:
        msg = f'{order_id}|{payment_id}'
        expected_sig = hmac.new(
            razorpay_secret.encode('utf-8'),
            msg.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()

        if not hmac.compare_digest(expected_sig, signature):
            registration.status = 'failed'
            registration.save()
            return JsonResponse({'error': 'Payment signature verification failed.'}, status=400)

    # Mark as completed
    registration.status = 'completed'
    registration.payment_method = 'razorpay'
    registration.transaction_id = payment_id
    registration.save()

    return JsonResponse({
        'success': True,
        'message': 'Payment verified successfully.',
        'registration_id': str(registration.id),
        'status': registration.get_status_display(),
    })


@csrf_exempt
@require_http_methods(["POST"])
def upload_receipt(request):
    """
    Upload bank transfer receipt for manual payment.
    Expects multipart: registration_id (form field) + receipt (file).
    """
    registration_id = request.POST.get('registration_id')
    receipt_file = request.FILES.get('receipt')

    if not registration_id or not receipt_file:
        return JsonResponse(
            {'error': 'registration_id and receipt file are required.'},
            status=400
        )

    # Validate receipt file
    err = validate_file(receipt_file, ALLOWED_PROOF_MIMES, 'receipt')
    if err:
        return JsonResponse({'error': err}, status=400)

    try:
        registration = ICCDSRegistration.objects.get(id=registration_id)
    except ICCDSRegistration.DoesNotExist:
        return JsonResponse({'error': 'Registration not found.'}, status=404)

    registration.payment_receipt = receipt_file
    registration.payment_method = 'bank_transfer'
    registration.status = 'pending_verification'
    registration.save()

    return JsonResponse({
        'success': True,
        'message': 'Receipt uploaded. Awaiting admin verification.',
        'registration_id': str(registration.id),
        'status': registration.get_status_display(),
    })


@csrf_exempt
@require_http_methods(["GET"])
def registration_status(request, registration_id):
    """Check the current status of a registration."""
    try:
        registration = ICCDSRegistration.objects.get(id=registration_id)
    except ICCDSRegistration.DoesNotExist:
        return JsonResponse({'error': 'Registration not found.'}, status=404)

    return JsonResponse({
        'registration': {
            'id': str(registration.id),
            'name': registration.name,
            'category': registration.get_category_display(),
            'fee_amount': str(registration.fee_amount),
            'currency': registration.currency,
            'status': registration.status,
            'status_display': registration.get_status_display(),
            'payment_method': registration.payment_method or '',
            'transaction_id': registration.transaction_id or '',
            'created_at': registration.created_at.isoformat(),
        }
    })
