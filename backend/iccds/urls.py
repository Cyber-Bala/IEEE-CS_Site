from django.urls import path
from . import views

app_name = 'iccds'

urlpatterns = [
    path('api/iccds/verify-paper/', views.verify_paper_id, name='verify-paper'),
    path('api/iccds/register/', views.iccds_register, name='iccds-register'),
    path('api/iccds/payment/razorpay/verify/', views.razorpay_verify, name='razorpay-verify'),
    path('api/iccds/payment/upload-receipt/', views.upload_receipt, name='upload-receipt'),
    path('api/iccds/registration/<uuid:registration_id>/status/', views.registration_status, name='registration-status'),
    path('admin/secure-file/<str:token>/', views.secure_file_access, name='secure-admin-file'),
]
