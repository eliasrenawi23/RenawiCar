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

    # Analytics endpoints
    path('admin/analytics/overview/', views.analytics_overview, name='analytics-overview'),
    path('admin/analytics/page-views/', views.page_views_stats, name='analytics-page-views'),
    path('admin/analytics/car-views/', views.car_views_stats, name='analytics-car-views'),
    path('admin/analytics/inquiries/', views.inquiries_stats, name='analytics-inquiries'),
    path('admin/analytics/sales/', views.sales_stats, name='analytics-sales'),
]
