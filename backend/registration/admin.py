from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Event, Registration, Team


@admin.register(Event)
class EventAdmin(ModelAdmin):
    list_display = ('name', 'event_type', 'day', 'fee_ieee_member', 'fee_non_ieee', 'is_active')
    list_filter = ('event_type', 'day', 'is_active')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name', 'slug')


@admin.register(Team)
class TeamAdmin(ModelAdmin):
    list_display = ('name', 'code', 'event', 'created_at')
    list_filter = ('event',)
    search_fields = ('name', 'code')
    readonly_fields = ('created_at',)


@admin.register(Registration)
class RegistrationAdmin(ModelAdmin):
    list_display = ('name', 'email', 'event', 'team', 'college_name', 'is_ieee_member', 'amount', 'payment_status', 'created_at')
    list_filter = ('event', 'payment_status', 'is_ieee_member', 'year', 'is_team_leader')
    search_fields = ('name', 'email', 'college_name', 'ieee_id', 'team__name', 'team__code')
    readonly_fields = ('created_at', 'updated_at')
