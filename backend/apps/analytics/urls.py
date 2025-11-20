"""
URL routes for the Analytics app.
"""

from django.urls import path
from . import views

urlpatterns = [
    # Public endpoints
    path('inquiries/', views.InquiryCreateView.as_view(), name='inquiry-create'),

    # Admin endpoints
    path('admin/inquiries/', views.AdminInquiryListView.as_view(), name='admin-inquiry-list'),
    path('admin/inquiries/<int:pk>/', views.AdminInquiryDetailView.as_view(), name='admin-inquiry-detail'),
    path('admin/sales/', views.AdminSaleListCreateView.as_view(), name='admin-sale-list-create'),
    path('admin/sales/<int:pk>/', views.AdminSaleDetailView.as_view(), name='admin-sale-detail'),

    # Analytics endpoints (Admin)
    path('admin/overview/', views.analytics_overview, name='analytics-overview'),
    path('admin/page-views/', views.page_views_stats, name='analytics-page-views'),
    path('admin/car-views/', views.car_views_stats, name='analytics-car-views'),
    path('admin/inquiries-stats/', views.inquiries_stats, name='analytics-inquiries-stats'),
    path('admin/sales-stats/', views.sales_stats, name='analytics-sales-stats'),
]
