import uuid
import os
from django.db import models


def get_iccds_upload_path(instance, filename):
    """
    Generate an obfuscated upload path to prevent URL guessing attacks.
    Format: iccds2026/<registration_or_paper_uuid>/<random_uuid>.<ext>
    """
    ext = os.path.splitext(filename)[1].lower()
    # Use the instance's primary key if available, otherwise generate a new UUID
    folder_id = str(instance.pk) if instance.pk else str(uuid.uuid4())
    file_uuid = uuid.uuid4().hex[:16]
    return f'iccds2026/{folder_id}/{file_uuid}{ext}'


class ICCDSPaper(models.Model):
    """Represents a submitted paper with camera-ready documents and copyright proof."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    paper_id = models.CharField(
        max_length=50,
        unique=True,
        help_text="Paper Submission ID"
    )
    title = models.CharField(max_length=500, help_text="Full title of the paper")
    abstract = models.TextField(blank=True, null=True)

    # Uploaded Camera Ready Files
    crc_pdf = models.FileField(
        upload_to=get_iccds_upload_path,
        blank=True, null=True,
        help_text="Camera-Ready Copy in PDF format (optional)"
    )
    crc_docx = models.FileField(
        upload_to=get_iccds_upload_path,
        help_text="Camera-Ready Copy in DOCX format"
    )

    # Uploaded Copyright Form
    copyright_form = models.FileField(
        upload_to=get_iccds_upload_path,
        help_text="Signed IEEE Copyright Form (PDF)"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "ICCDS Paper"
        verbose_name_plural = "ICCDS Papers"
        ordering = ['-created_at']

    def __str__(self):
        return f"Paper #{self.paper_id}: {self.title[:50]}"


class ICCDSApprovedPaper(models.Model):
    """Pre-approved paper IDs that are allowed to proceed with registration."""

    paper_id = models.CharField(
        max_length=50,
        unique=True,
        help_text="Paper Submission ID (must match exactly)"
    )
    title = models.CharField(
        max_length=500,
        blank=True,
        default='',
        help_text="Paper title (for admin reference only)"
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Approved Paper"
        verbose_name_plural = "Approved Papers"
        ordering = ['paper_id']

    def __str__(self):
        return f"{self.paper_id} — {self.title[:60]}" if self.title else self.paper_id


class ICCDSRegistration(models.Model):
    """Stores registrant profile, fee assessment, and payment/receipt state."""

    TITLE_CHOICES = [
        ('Mr.', 'Mr.'),
        ('Ms.', 'Ms.'),
        ('Mrs.', 'Mrs.'),
        ('Dr.', 'Dr.'),
        ('Prof.', 'Prof.'),
    ]

    CATEGORY_CHOICES = [
        ('ieee_student', 'IEEE Member - Student'),
        ('ieee_academic', 'IEEE Member - Academic / Industry'),
        ('ieee_listener', 'IEEE Member - Listener'),
        ('non_ieee_student', 'Non-IEEE Member - Student'),
        ('non_ieee_academic', 'Non-IEEE Member - Academic / Industry'),
        ('non_ieee_listener', 'Non-IEEE Member - Listener'),
    ]

    CURRENCY_CHOICES = [
        ('INR', 'Indian Rupee (INR)'),
        ('USD', 'US Dollar (USD)'),
    ]

    STATUS_CHOICES = [
        ('pending_payment', 'Pending Payment'),
        ('pending_verification', 'Pending Admin Verification (Bank Transfer)'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    paper = models.ForeignKey(
        ICCDSPaper,
        on_delete=models.CASCADE,
        related_name='registrants',
        blank=True,
        null=True,
        help_text="Associated paper details (null for Listeners)"
    )

    # Registrant Contact Details
    honorific = models.CharField(
        max_length=10,
        choices=TITLE_CHOICES,
        default='Mr.',
        help_text="Title / Honorific (Mr., Ms., Mrs., Dr., Prof.)"
    )
    name = models.CharField(max_length=250)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    author_phone = models.CharField(
        max_length=20,
        blank=True,
        default='',
        help_text="Author contact number (if different from registrant phone)"
    )
    institution = models.CharField(max_length=300)
    country = models.CharField(max_length=100)

    # Registration & Fee Details
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES)
    fee_amount = models.DecimalField(max_digits=10, decimal_places=2)

    # Proof Uploads
    ieee_id_card = models.CharField(
        max_length=100, blank=True, null=True,
        help_text="IEEE Membership ID Number"
    )
    ieee_proof = models.FileField(
        upload_to=get_iccds_upload_path, blank=True, null=True,
        help_text="IEEE Membership proof scan"
    )
    student_proof = models.FileField(
        upload_to=get_iccds_upload_path, blank=True, null=True,
        help_text="Student ID proof scan"
    )
    primary_id_proof = models.FileField(
        upload_to=get_iccds_upload_path,
        blank=True, null=True,
        help_text="Mandatory primary verification — Student ID or Staff ID card"
    )

    # Payment Tracking
    status = models.CharField(
        max_length=30, choices=STATUS_CHOICES, default='pending_payment'
    )
    payment_method = models.CharField(
        max_length=50, blank=True, null=True,
        help_text="razorpay, stripe, paypal, bank_transfer"
    )
    payment_receipt = models.FileField(
        upload_to=get_iccds_upload_path, blank=True, null=True,
        help_text="Bank transfer receipt screenshot"
    )
    transaction_id = models.CharField(max_length=250, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "ICCDS Registration"
        verbose_name_plural = "ICCDS Registrations"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.honorific} {self.name} ({self.get_category_display()})"


class ICCDSTeamMember(models.Model):
    """Stores co-author / team member details linked to a registration."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    registration = models.ForeignKey(
        ICCDSRegistration,
        on_delete=models.CASCADE,
        related_name='team_members',
        help_text="Parent registration"
    )

    name = models.CharField(max_length=250)
    email = models.EmailField()
    institution = models.CharField(max_length=300, blank=True, default='')
    order = models.PositiveSmallIntegerField(
        default=0,
        help_text="Display order (0-indexed)"
    )

    class Meta:
        verbose_name = "Team Member"
        verbose_name_plural = "Team Members"
        ordering = ['order']

    def __str__(self):
        return f"{self.name} ({self.email})"
