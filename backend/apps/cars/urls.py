"""
URL routes for the Cars app.
"""

from django.urls import path
from . import views

urlpatterns = [
    # Public endpoints
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    path('brands/', views.BrandListView.as_view(), name='brand-list'),
    path('', views.CarListView.as_view(), name='car-list'),
    path('<uuid:pk>/', views.CarDetailView.as_view(), name='car-detail'),
    path('<uuid:pk>/view/', views.record_car_view, name='car-view'),

    # Admin endpoints
    path('admin/cars/', views.AdminCarListCreateView.as_view(), name='admin-car-list-create'),
    path('admin/cars/<uuid:pk>/', views.AdminCarDetailView.as_view(), name='admin-car-detail'),
    path('admin/cars/<uuid:car_id>/images/', views.AdminCarImageUploadView.as_view(), name='admin-car-image-upload'),
    path('admin/cars/images/<int:pk>/', views.AdminCarImageDeleteView.as_view(), name='admin-car-image-delete'),
    path('admin/categories/', views.AdminCategoryListCreateView.as_view(), name='admin-category-list-create'),
    path('admin/categories/<int:pk>/', views.AdminCategoryDetailView.as_view(), name='admin-category-detail'),
    path('admin/brands/', views.AdminBrandListCreateView.as_view(), name='admin-brand-list-create'),
    path('admin/brands/<int:pk>/', views.AdminBrandDetailView.as_view(), name='admin-brand-detail'),
]
