import json
from decimal import Decimal
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils.crypto import get_random_string
from .models import Event, Registration, Team


@csrf_exempt
@require_http_methods(["GET"])
def event_list(request):
    """Return list of all active events with pricing info."""
    events = Event.objects.filter(is_active=True).values(
        'id', 'name', 'slug', 'description', 'event_type', 'day',
        'duration_hours', 'team_size_min', 'team_size_max',
        'fee_ieee_member', 'fee_non_ieee', 'is_per_team',
        'prize_pool', 'expected_teams'
    )
    return JsonResponse({'events': list(events)}, safe=False)


@csrf_exempt
@require_http_methods(["GET"])
def event_detail(request, slug):
    """Return details for a single event by slug."""
    try:
        event = Event.objects.get(slug=slug, is_active=True)
        data = {
            'id': event.id,
            'name': event.name,
            'slug': event.slug,
            'description': event.description,
            'event_type': event.event_type,
            'day': event.day,
            'duration_hours': event.duration_hours,
            'team_size_min': event.team_size_min,
            'team_size_max': event.team_size_max,
            'fee_ieee_member': str(event.fee_ieee_member),
            'fee_non_ieee': str(event.fee_non_ieee),
            'is_per_team': event.is_per_team,
            'prize_pool': str(event.prize_pool),
            'expected_teams': event.expected_teams,
        }
        return JsonResponse({'event': data})
    except Event.DoesNotExist:
        return JsonResponse({'error': 'Event not found'}, status=404)


@csrf_exempt
@require_http_methods(["GET"])
def team_detail(request, code):
    """Return details about a specific team using its invite code."""
    try:
        team = Team.objects.get(code=code.upper())
        members = team.members.all()
        data = {
            'name': team.name,
            'code': team.code,
            'event_name': team.event.name,
            'team_size_max': team.event.team_size_max,
            'member_count': members.count(),
            'members': [m.name for m in members]
        }
        return JsonResponse({'team': data})
    except Team.DoesNotExist:
        return JsonResponse({'error': 'Invalid team code. Team not found.'}, status=404)


def generate_team_code():
    """Generates a unique 6-character team code."""
    while True:
        code = get_random_string(6, allowed_chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
        if not Team.objects.filter(code=code).exists():
            return code


@csrf_exempt
@require_http_methods(["POST"])
def register(request):
    """
    Handle registration form submission.
    Expects JSON body with:
      - name, email, college_name, department, year
      - is_ieee_member (bool), ieee_id (string, required if is_ieee_member)
      - event_id (int)
      - registration_type: 'individual', 'create_team', or 'join_team'
      - team_name (if create_team)
      - team_code (if join_team)
    """
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    # Validate required fields
    required_fields = ['name', 'email', 'college_name', 'department', 'year', 'event_id']
    missing = [f for f in required_fields if not data.get(f)]
    if missing:
        return JsonResponse({'error': f'Missing required fields: {", ".join(missing)}'}, status=400)

    # Validate IEEE ID if member
    is_ieee_member = data.get('is_ieee_member', False)
    if is_ieee_member and not data.get('ieee_id'):
        return JsonResponse({'error': 'IEEE ID is required for IEEE members'}, status=400)

    # Validate year
    if data['year'] not in ['1', '2', '3', '4']:
        return JsonResponse({'error': 'Year must be 1, 2, 3, or 4'}, status=400)

    # Get event
    try:
        event = Event.objects.get(id=data['event_id'], is_active=True)
    except Event.DoesNotExist:
        return JsonResponse({'error': 'Event not found or not active'}, status=404)

    registration_type = data.get('registration_type', 'individual')
    team = None
    is_team_leader = False

    # Team logic
    if event.team_size_max > 1:
        if registration_type == 'create_team':
            team_name = data.get('team_name')
            if not team_name:
                return JsonResponse({'error': 'team_name is required when creating a team'}, status=400)
            
            # Create the team
            team_code = generate_team_code()
            team = Team.objects.create(
                name=team_name,
                code=team_code,
                event=event
            )
            is_team_leader = True

        elif registration_type == 'join_team':
            team_code = data.get('team_code')
            if not team_code:
                return JsonResponse({'error': 'team_code is required when joining a team'}, status=400)
            
            try:
                team = Team.objects.get(code=team_code.upper(), event=event)
            except Team.DoesNotExist:
                return JsonResponse({'error': 'Invalid team code for this event'}, status=404)
            
            # Check team size
            if team.members.count() >= event.team_size_max:
                return JsonResponse({'error': 'This team is already full!'}, status=400)

    # Calculate amount based on team rules and IEEE membership
    if registration_type == 'join_team' and event.is_per_team:
        # Joiners don't pay anything if the fee is per-team (creator pays it all)
        amount = Decimal('0.00')
    else:
        # Creators, individuals, or participants in per-head events pay their own fee
        amount = event.fee_ieee_member if is_ieee_member else event.fee_non_ieee

    # Create the registration
    registration = Registration.objects.create(
        name=data['name'],
        email=data['email'],
        college_name=data['college_name'],
        department=data['department'],
        year=data['year'],
        is_ieee_member=is_ieee_member,
        ieee_id=data.get('ieee_id', ''),
        event=event,
        team=team,
        is_team_leader=is_team_leader,
        amount=amount,
        payment_status='pending',
        payment_method='paypal',  # Default to paypal for future integration
    )

    response_data = {
        'id': registration.id,
        'name': registration.name,
        'email': registration.email,
        'event': event.name,
        'amount': str(registration.amount),
        'payment_status': registration.payment_status,
        'created_at': registration.created_at.isoformat(),
        'registration_type': registration_type,
    }

    if team:
        response_data['team_name'] = team.name
        response_data['team_code'] = team.code
        # Return list of team member names and roles
        members = team.members.all().order_by('-is_team_leader', 'created_at')
        response_data['team_members'] = [
            {'name': m.name, 'role': 'Leader' if m.is_team_leader else 'Member'} 
            for m in members
        ]

    return JsonResponse({
        'success': True,
        'registration': response_data
    }, status=201)


@csrf_exempt
@require_http_methods(["POST"])
def payment_callback(request):
    """
    Placeholder for PayPal payment callback / capture.
    When PayPal is integrated, this endpoint will:
    1. Receive the PayPal order ID and payer ID
    2. Verify the payment with PayPal API
    3. Update the registration payment_status to 'completed'
    """
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    registration_id = data.get('registration_id')
    payment_id = data.get('payment_id')  # PayPal order ID
    payer_id = data.get('payer_id')  # PayPal payer ID

    if not registration_id or not payment_id:
        return JsonResponse({'error': 'registration_id and payment_id are required'}, status=400)

    try:
        registration = Registration.objects.get(id=registration_id)
    except Registration.DoesNotExist:
        return JsonResponse({'error': 'Registration not found'}, status=404)

    # TODO: Verify payment with PayPal API
    # For now, just store the payment details
    registration.payment_id = payment_id
    registration.payment_payer_id = payer_id or ''
    # registration.payment_status = 'completed'  # Uncomment after PayPal verification
    registration.save()

    return JsonResponse({
        'success': True,
        'message': 'Payment details recorded. Awaiting PayPal verification.',
        'registration_id': registration.id,
        'payment_status': registration.payment_status,
    })
