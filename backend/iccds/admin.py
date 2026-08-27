from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline
from .models import ICCDSPaper, ICCDSRegistration, ICCDSTeamMember, ICCDSApprovedPaper


class ICCDSRegistrationInline(TabularInline):
    model = ICCDSRegistration
    extra = 0
    fields = ('name', 'email', 'category', 'currency', 'fee_amount', 'status')
    readonly_fields = ('name', 'email', 'category', 'currency', 'fee_amount', 'status')
    show_change_link = True
    tab = True


class ICCDSTeamMemberInline(TabularInline):
    model = ICCDSTeamMember
    extra = 0
    fields = ('order', 'name', 'email', 'institution')
    tab = True


@admin.register(ICCDSPaper)
class ICCDSPaperAdmin(ModelAdmin):
    list_display = ('paper_id', 'title', 'created_at')
    search_fields = ('paper_id', 'title')
    readonly_fields = ('id', 'created_at')
    inlines = [ICCDSRegistrationInline]

    fieldsets = (
        ('Paper Info', {
            'fields': ('id', 'paper_id', 'title', 'abstract')
        }),
        ('Uploaded Files', {
            'fields': ('crc_pdf', 'crc_docx', 'copyright_form')
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
    list_display = ('honorific', 'name', 'email', 'category', 'currency', 'fee_amount', 'status', 'payment_method', 'created_at')
    list_filter = ('status', 'category', 'currency', 'payment_method')
    search_fields = ('name', 'email', 'phone', 'author_phone', 'institution', 'ieee_id_card', 'transaction_id')
    readonly_fields = ('id', 'created_at', 'updated_at')
    list_editable = ('status',)
    date_hierarchy = 'created_at'
    inlines = [ICCDSTeamMemberInline]

    fieldsets = (
        ('Registrant', {
            'fields': ('id', 'honorific', 'name', 'email', 'phone', 'author_phone', 'institution', 'country')
        }),
        ('Registration Details', {
            'fields': ('paper', 'category', 'currency', 'fee_amount')
        }),
        ('IEEE / Student Proof', {
            'fields': ('ieee_id_card', 'ieee_proof', 'student_proof', 'primary_id_proof')
        }),
        ('Payment', {
            'fields': ('status', 'payment_method', 'transaction_id', 'payment_receipt')
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
