# ICCDS-2026 Registration & Payment Gateway Implementation Plan

This document details the architecture, data models, file management, security protocols, and step-by-step transaction flow for integrating the registration portal and payment gateways into the ICCDS-2026 website.

---

## 1. Technology Stack Overview

- **Frontend**: React 19.x (JavaScript/JSX), Vite 7.x, Vanilla CSS (using Outfit/Inter fonts, styled with glassmorphism to match the existing ICCDS design), and Framer Motion for step transitions.
- **Backend**: Python 3.14.x running Django 6.0.x with a custom API endpoints structure.
- **Database**: SQLite (local development) / PostgreSQL (recommended for production deployment).
- **File Storage**: Django Local Storage (development) / AWS S3 or Google Cloud Storage (production) via `django-storages` and `boto3`.
- **Payment Gateways**: Razorpay (INR payments for Indian authors) and Stripe or PayPal (USD payments for international authors).

---

## 2. Relational Database Design (Django Models)

The backend schema is structured around two main models to separate paper metadata/files from registrant personal details.

### A. ICCDS Paper Model (`ICCDSPaper`)
Represents a submitted paper and contains camera-ready documents and signed copyright proofs.
```python
class ICCDSPaper(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    paper_id = models.CharField(
        max_length=50, 
        unique=True, 
        help_text="CMT / EasyChair Paper Submission ID"
    )
    title = models.CharField(max_length=500, help_text="Full title of the paper")
    abstract = models.TextField(blank=True, null=True)
    
    # Uploaded Camera Ready Files
    crc_pdf = models.FileField(upload_to=get_iccds_upload_path)
    crc_docx = models.FileField(upload_to=get_iccds_upload_path)
    
    # Uploaded Copyright Form
    copyright_form = models.FileField(upload_to=get_iccds_upload_path)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Paper #{self.paper_id}: {self.title[:50]}"
```

### B. ICCDS Registration Model (`ICCDSRegistration`)
Stores registrant profile details, selected category, fee assessments, and payment/receipt states.
```python
class ICCDSRegistration(models.Model):
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
    name = models.CharField(max_length=250)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    institution = models.CharField(max_length=300)
    country = models.CharField(max_length=100)
    
    # Registration & Fee Details
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES)
    fee_amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Proof Uploads
    ieee_id_card = models.CharField(max_length=100, blank=True, null=True, help_text="IEEE Membership ID Number")
    ieee_proof = models.FileField(upload_to=get_iccds_upload_path, blank=True, null=True)
    student_proof = models.FileField(upload_to=get_iccds_upload_path, blank=True, null=True)
    
    # Payment Tracking
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='pending_payment')
    payment_method = models.CharField(max_length=50, blank=True, null=True) # razorpay, stripe, paypal, bank_transfer
    payment_receipt = models.FileField(upload_to=get_iccds_upload_path, blank=True, null=True)
    transaction_id = models.CharField(max_length=250, blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"
```

---

## 3. Document Collection & Storage Policy

- **Path Obfuscation**: To protect user documents from URL guessing attacks (scraping), upload paths are obfuscated using UUIDs:
  `iccds2026/<registration_id>/<file_uuid>.<extension>`
- **Upload Constraints**:
  - File size cap: 10MB per file.
  - Allowed extensions: `.pdf` and `.docx` for camera-ready files; `.pdf`, `.png`, `.jpg`, and `.jpeg` for ID proofs/receipts.
  - Backend validation will perform MIME-type signature checks rather than relying purely on file extensions.
- **Production Storage**: Django is configured to automatically pipe media uploads to an **AWS S3** bucket (using standard `django-storages` configuration) to prevent disk space exhaustion and enable horizontal scaling.

---

## 4. Encryption & Security Standards

1. **In-Transit Encryption**: Mandatory HTTPS/TLS 1.3 across the application to prevent man-in-the-middle attacks on form submissions and uploaded documents.
2. **Access Control**: Media files will be secured so they are not publicly browseable. Django views will check admin authentication status before serving uploads.
3. **Environment Secrets**: API keys, webhook signing secrets, database credentials, and SMTP email server credentials must be stored strictly in system environment variables (or `.env` locally) and never committed to version control.

---

## 5. Step-by-Step Registration & Payment Flow

```
[Fill Registration & Upload Files] ──> [Django Server Validations]
                                                      │
      ┌───────────────── Payment Method Choice ───────┴───────────────┐
      ▼                                                               ▼
[Online Payment Portal]                                      [Manual Bank Transfer]
 - Indian Authors: Razorpay (INR)                             - Display Rajalakshmi bank credentials
 - International: Stripe/PayPal (USD)                         - Registrant uploads transfer receipt
      │                                                               │
[Verify Hook / Redirect Callback]                             [Set State: Pending Admin Review]
      │                                                               │
      └─────────────────────> [Send Email Confirmation] <─────────────┘
                                      │
                                      ▼
                            [Update Admin Panel]
```

1. **Step 1: Form Entry**
   - The user opens the ICCDS-2026 Registration page and fills in contact info, selects their category, and enters the Paper ID (unless registering as a listener).
2. **Step 2: File Uploads**
   - The user uploads Camera Ready PDF/Word files, signed Copyright PDF, and Student/IEEE ID proof scans.
3. **Step 3: Verification & Database Persistence**
   - Frontend validates fields and sizes.
   - Django backend receives the multipart form data, validates file MIME-types, and commits records with state `pending_payment`.
4. **Step 4: Payment Routing**
   - **Route A: Online Processing**
     - Indian authors trigger the Razorpay script interface.
     - Foreign authors are redirected to a Stripe/PayPal hosted checkout page.
     - Upon payment verification, gateways ping backend endpoints (via callback or webhook) to update registration status to `Completed`.
   - **Route B: Manual Bank Wire**
     - Author is shown bank account details (account name, account number, IFSC, bank).
     - Author uploads a screenshot of their transaction receipt.
     - Registration state updates to `pending_verification`.
5. **Step 5: Confirmation & Admin Dashboard**
   - System triggers an HTML email receipt to the user.
   - Administrators log into the `/admin` console (powered by `django-unfold`) to verify manual uploads and finalize registrations.
