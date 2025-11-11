"""
URL routes for the Maintenance app.
"""

from django.urls import path
from . import views

urlpatterns = [
    # Admin endpoints
    path('car/<uuid:car_id>/', views.MaintenanceRecordListView.as_view(), name='maintenance-list'),
    path('', views.MaintenanceRecordCreateView.as_view(), name='maintenance-create'),
    path('<int:pk>/', views.MaintenanceRecordDetailView.as_view(), name='maintenance-detail'),
]
