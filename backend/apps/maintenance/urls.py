"""
URL routes for the Maintenance app.
"""

from django.urls import path
from . import views

urlpatterns = [
    # Admin endpoints
    path('admin/all/', views.AdminMaintenanceListView.as_view(), name='admin-maintenance-list-all'),
    path('admin/car/<uuid:car_id>/', views.MaintenanceRecordListView.as_view(), name='admin-maintenance-list-car'),
    path('admin/', views.MaintenanceRecordCreateView.as_view(), name='admin-maintenance-create'),
    path('admin/<int:pk>/', views.MaintenanceRecordDetailView.as_view(), name='admin-maintenance-detail'),
]
