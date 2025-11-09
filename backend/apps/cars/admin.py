"""
Django Admin configuration for Cars app.

This configures the Django admin interface for managing:
- Categories
- Brands
- Cars
- Car Images
"""

from django.contrib import admin
from .models import Category, Brand, Car, CarImage


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Admin configuration for Category model"""
    list_display = ['name', 'slug', 'created_at']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ['created_at']


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    """Admin configuration for Brand model"""
    list_display = ['name', 'slug', 'created_at']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ['created_at']


class CarImageInline(admin.TabularInline):
    """
    Inline admin for car images.
    This allows managing images directly from the car edit page.
    """
    model = CarImage
    extra = 1  # Number of empty forms to display
    fields = ['image_url', 'cloudinary_public_id', 'is_primary', 'order']
    readonly_fields = []


@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    """Admin configuration for Car model"""
    list_display = [
        'make',
        'model',
        'year',
        'price',
        'mileage',
        'status',
        'is_featured',
        'views_count',
        'created_at'
    ]
    list_filter = [
        'status',
        'is_featured',
        'transmission',
        'fuel_type',
        'category',
        'brand',
        'year'
    ]
    search_fields = ['make', 'model', 'vin', 'description']
    readonly_fields = ['id', 'views_count', 'created_at', 'updated_at']

    fieldsets = (
        ('Basic Information', {
            'fields': ('make', 'model', 'year', 'vin')
        }),
        ('Pricing & Mileage', {
            'fields': ('price', 'mileage')
        }),
        ('Specifications', {
            'fields': ('color', 'transmission', 'fuel_type')
        }),
        ('Classification', {
            'fields': ('category', 'brand')
        }),
        ('Description', {
            'fields': ('description', 'features')
        }),
        ('Status', {
            'fields': ('status', 'is_featured')
        }),
        ('Analytics', {
            'fields': ('views_count',),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('id', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    inlines = [CarImageInline]

    # Enable bulk actions
    actions = ['mark_as_available', 'mark_as_sold', 'mark_as_featured']

    @admin.action(description='Mark selected cars as Available')
    def mark_as_available(self, request, queryset):
        updated = queryset.update(status=Car.STATUS_AVAILABLE)
        self.message_user(request, f'{updated} cars marked as Available.')

    @admin.action(description='Mark selected cars as Sold')
    def mark_as_sold(self, request, queryset):
        updated = queryset.update(status=Car.STATUS_SOLD)
        self.message_user(request, f'{updated} cars marked as Sold.')

    @admin.action(description='Mark selected cars as Featured')
    def mark_as_featured(self, request, queryset):
        updated = queryset.update(is_featured=True)
        self.message_user(request, f'{updated} cars marked as Featured.')


@admin.register(CarImage)
class CarImageAdmin(admin.ModelAdmin):
    """Admin configuration for CarImage model"""
    list_display = ['car', 'is_primary', 'order', 'uploaded_at']
    list_filter = ['is_primary', 'uploaded_at']
    search_fields = ['car__make', 'car__model']
    readonly_fields = ['uploaded_at']
    list_editable = ['is_primary', 'order']
