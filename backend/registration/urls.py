from django.urls import path
from . import views

app_name = 'registration'

urlpatterns = [
    path('api/events/', views.event_list, name='event-list'),
    path('api/events/<slug:slug>/', views.event_detail, name='event-detail'),
    path('api/teams/<str:code>/', views.team_detail, name='team-detail'),
    path('api/register/', views.register, name='register'),
    path('api/payment/callback/', views.payment_callback, name='payment-callback'),
]
