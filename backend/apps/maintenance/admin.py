"""
Django Admin configuration for Maintenance app.
"""

from django.contrib import admin
from .models import MaintenanceRecord, MaintenancePart


class MaintenancePartInline(admin.TabularInline):
    """
    Inline admin for maintenance parts.
    This allows managing parts directly from the maintenance record edit page.
    """
    model = MaintenancePart
    extra = 1
    fields = ['part_name', 'part_cost', 'quantity', 'notes']


@admin.register(MaintenanceRecord)
class MaintenanceRecordAdmin(admin.ModelAdmin):
    """Admin configuration for MaintenanceRecord model"""
    list_display = ['car', 'repair_date', 'total_cost', 'created_at']
    list_filter = ['repair_date', 'created_at']
    search_fields = ['car__make', 'car__model', 'car__vin', 'description']
    readonly_fields = ['created_at', 'updated_at']
    date_hierarchy = 'repair_date'

    fieldsets = (
        ('Car Information', {
            'fields': ('car',)
        }),
        ('Maintenance Details', {
            'fields': ('repair_date', 'total_cost', 'description')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    inlines = [MaintenancePartInline]


@admin.register(MaintenancePart)
class MaintenancePartAdmin(admin.ModelAdmin):
    """Admin configuration for MaintenancePart model"""
    list_display = ['part_name', 'maintenance_record', 'part_cost', 'quantity', 'total_cost']
    list_filter = ['part_name']
    search_fields = ['part_name', 'maintenance_record__car__make', 'maintenance_record__car__model']

    def total_cost(self, obj):
        """Display total cost in admin list"""
        return f"${obj.total_cost:.2f}"
    total_cost.short_description = 'Total Cost'
