import json
import secrets
import threading
from django.core.cache import cache
from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html
from unfold.admin import ModelAdmin, TabularInline, StackedInline
from .models import ICCDSPaper, ICCDSRegistration, ICCDSTeamMember, ICCDSApprovedPaper

_admin_locals = threading.local()


def generate_secure_file_html(obj, model_name, field_name):
    """Helper to generate cache-backed, user-bound opaque tokens for secure previews."""
    file_field = getattr(obj, field_name, None)
    if not file_field or not file_field.name:
        return "None"

    request = getattr(_admin_locals, 'request', None)
    user_id = request.user.id if request and hasattr(request, 'user') else None

    def get_url(action):
        token = secrets.token_urlsafe(32)
        payload = {
            'model': model_name,
            'id': str(obj.id),
            'field': field_name,
            'action': action,
            'user_id': user_id,
        }
        # Store in Django cache for 2 hours (7200 seconds)
        cache.set(f'secure_file_{token}', payload, timeout=7200)
        return reverse('iccds:secure-admin-file', kwargs={'token': token})

    preview_url = get_url('preview')
    download_url = get_url('download')

    ext = str(file_field.name).lower().split('.')[-1]
    is_image = ext in ('png', 'jpg', 'jpeg', 'webp')

    if is_image:
        return format_html(
            '<div style="display:flex; flex-direction:column; gap:5px; max-width:250px;">'
            '<a href="{}" target="_blank" title="Click to view full image">'
            '<img src="{}" style="max-width:250px; max-height:200px; border:1px solid #ccc; border-radius:4px; object-fit:contain; background:#f9f9f9;" />'
            '</a>'
            '<a href="{}" style="padding:6px; background:#4f46e5; color:white; text-align:center; border-radius:4px; text-decoration:none; font-weight:bold; font-size:12px;">📥 Download Image</a>'
            '</div>',
            preview_url, preview_url, download_url
        )
    else:
        filename = str(file_field.name).split('/')[-1]
        return format_html(
            '<div style="display:flex; gap:10px; align-items:center; padding:8px; border:1px solid #ddd; border-radius:4px; background:#f9f9f9; width:fit-content;">'
            '<span style="font-family:monospace; color:#333; font-weight:600;">📄 {}</span>'
            '<div style="display:flex; gap:6px;">'
            '<a href="{}" target="_blank" style="padding:4px 8px; background:#10b981; color:white; border-radius:4px; text-decoration:none; font-size:12px; font-weight:bold;">👁️ Open</a>'
            '<a href="{}" style="padding:4px 8px; background:#4f46e5; color:white; border-radius:4px; text-decoration:none; font-size:12px; font-weight:bold;">📥 Download</a>'
            '</div></div>',
            filename, preview_url, download_url
        )



class ICCDSRegistrationInline(StackedInline):
    model = ICCDSRegistration
    extra = 0
    fields = ('name', 'email', 'category', 'currency', 'fee_amount', 'status', 'team_members_list', 'ieee_proof_preview', 'student_proof_preview', 'primary_id_proof_preview', 'payment_receipt_preview')
    readonly_fields = ('name', 'email', 'category', 'currency', 'fee_amount', 'status', 'team_members_list', 'ieee_proof_preview', 'student_proof_preview', 'primary_id_proof_preview', 'payment_receipt_preview')
    show_change_link = True
    tab = True

    def team_members_list(self, obj):
        if not obj or not obj.pk:
            return "None"
        members = obj.team_members.all().order_by('order')
        if not members:
            return "No team members."
        html = "<ul style='padding-left:20px; margin:0; line-height:1.6;'>"
        for m in members:
            html += f"<li><strong>{m.name}</strong> ({m.email}) &mdash; {m.institution}</li>"
        html += "</ul>"
        return format_html(html)
    team_members_list.short_description = "Team Members"

    def ieee_proof_preview(self, obj):
        return generate_secure_file_html(obj, 'iccdsregistration', 'ieee_proof')
    ieee_proof_preview.short_description = "IEEE Membership Proof"

    def student_proof_preview(self, obj):
        return generate_secure_file_html(obj, 'iccdsregistration', 'student_proof')
    student_proof_preview.short_description = "Student Proof"

    def primary_id_proof_preview(self, obj):
        return generate_secure_file_html(obj, 'iccdsregistration', 'primary_id_proof')
    primary_id_proof_preview.short_description = "Primary ID Proof"

    def payment_receipt_preview(self, obj):
        return generate_secure_file_html(obj, 'iccdsregistration', 'payment_receipt')
    payment_receipt_preview.short_description = "Payment Receipt"


class ICCDSTeamMemberInline(StackedInline):
    model = ICCDSTeamMember
    extra = 0
    fields = ('order', 'name', 'email', 'institution')
    tab = True


@admin.register(ICCDSPaper)
class ICCDSPaperAdmin(ModelAdmin):
    list_display = ('paper_id', 'title', 'created_at')
    search_fields = ('paper_id', 'title')
    readonly_fields = ('id', 'created_at', 'crc_pdf_preview', 'crc_docx_preview', 'copyright_form_preview')
    inlines = [ICCDSRegistrationInline]

    def change_view(self, request, object_id, form_url='', extra_context=None):
        _admin_locals.request = request
        try:
            return super().change_view(request, object_id, form_url, extra_context)
        finally:
            if hasattr(_admin_locals, 'request'):
                del _admin_locals.request

    def changelist_view(self, request, extra_context=None):
        _admin_locals.request = request
        try:
            return super().changelist_view(request, extra_context)
        finally:
            if hasattr(_admin_locals, 'request'):
                del _admin_locals.request

    def crc_pdf_preview(self, obj):
        return generate_secure_file_html(obj, 'iccdspaper', 'crc_pdf')
    crc_pdf_preview.short_description = "CRC PDF"

    def crc_docx_preview(self, obj):
        return generate_secure_file_html(obj, 'iccdspaper', 'crc_docx')
    crc_docx_preview.short_description = "CRC DOCX"

    def copyright_form_preview(self, obj):
        return generate_secure_file_html(obj, 'iccdspaper', 'copyright_form')
    copyright_form_preview.short_description = "Copyright Form"

    fieldsets = (
        ('Paper Info', {
            'fields': ('id', 'paper_id', 'title', 'abstract')
        }),
        ('Secure Files', {
            'fields': ('crc_pdf_preview', 'crc_docx_preview', 'copyright_form_preview')
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )


@admin.register(ICCDSApprovedPaper)
class ICCDSApprovedPaperAdmin(ModelAdmin):
    list_display = ('paper_id', 'title', 'is_active', 'created_at')
    list_filter = ('is_active',)
    search_fields = ('paper_id', 'title')
    list_editable = ('is_active',)
    readonly_fields = ('created_at',)

    fieldsets = (
        (None, {
            'fields': ('paper_id', 'title', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )


@admin.register(ICCDSRegistration)
class ICCDSRegistrationAdmin(ModelAdmin):
    list_display = ('honorific', 'name', 'email', 'category', 'currency', 'fee_amount', 'status', 'team_members_count', 'created_at')
    list_filter = ('status', 'category', 'currency', 'payment_method')
    search_fields = ('name', 'email', 'phone', 'author_phone', 'institution', 'ieee_id_card', 'transaction_id')
    readonly_fields = ('id', 'created_at', 'updated_at', 'ieee_proof_preview', 'student_proof_preview', 'primary_id_proof_preview', 'payment_receipt_preview')
    list_editable = ('status',)
    date_hierarchy = 'created_at'
    inlines = [ICCDSTeamMemberInline]

    def team_members_count(self, obj):
        return obj.team_members.count()
    team_members_count.short_description = 'Team Size'

    def change_view(self, request, object_id, form_url='', extra_context=None):
        _admin_locals.request = request
        try:
            return super().change_view(request, object_id, form_url, extra_context)
        finally:
            if hasattr(_admin_locals, 'request'):
                del _admin_locals.request

    def changelist_view(self, request, extra_context=None):
        _admin_locals.request = request
        try:
            return super().changelist_view(request, extra_context)
        finally:
            if hasattr(_admin_locals, 'request'):
                del _admin_locals.request

    def ieee_proof_preview(self, obj):
        return generate_secure_file_html(obj, 'iccdsregistration', 'ieee_proof')
    ieee_proof_preview.short_description = "IEEE Membership Proof"

    def student_proof_preview(self, obj):
        return generate_secure_file_html(obj, 'iccdsregistration', 'student_proof')
    student_proof_preview.short_description = "Student Proof"

    def primary_id_proof_preview(self, obj):
        return generate_secure_file_html(obj, 'iccdsregistration', 'primary_id_proof')
    primary_id_proof_preview.short_description = "Primary ID Proof"

    def payment_receipt_preview(self, obj):
        return generate_secure_file_html(obj, 'iccdsregistration', 'payment_receipt')
    payment_receipt_preview.short_description = "Payment Receipt"

    fieldsets = (
        ('Team Leader (Main Registrant)', {
            'fields': ('id', 'honorific', 'name', 'email', 'phone', 'author_phone', 'institution', 'country')
        }),
        ('Registration & Paper Details', {
            'fields': ('paper', 'category', 'currency', 'fee_amount')
        }),
        ('Uploaded Documents', {
            'fields': ('ieee_id_card', 'ieee_proof_preview', 'student_proof_preview', 'primary_id_proof_preview')
        }),
        ('Payment & Financials', {
            'fields': ('status', 'payment_method', 'transaction_id', 'payment_receipt_preview')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    actions = ['export_as_csv']

    @admin.action(description="Export selected registrations as CSV")
    def export_as_csv(self, request, queryset):
        import csv
        from django.http import HttpResponse

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="iccds_registrations.csv"'

        writer = csv.writer(response)
        writer.writerow([
            'ID', 'Honorific', 'Name', 'Email', 'Phone', 'Author Phone',
            'Institution', 'Country',
            'Category', 'Currency', 'Fee', 'IEEE ID',
            'Status', 'Payment Method', 'Transaction ID', 'Created At'
        ])

        for reg in queryset:
            writer.writerow([
                str(reg.id), reg.honorific, reg.name, reg.email, reg.phone,
                reg.author_phone or '',
                reg.institution, reg.country,
                reg.get_category_display(), reg.currency, str(reg.fee_amount),
                reg.ieee_id_card or '',
                reg.get_status_display(), reg.payment_method or '',
                reg.transaction_id or '', reg.created_at.isoformat()
            ])

        return response
