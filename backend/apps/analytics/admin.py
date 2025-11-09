"""
Django Admin configuration for Analytics app.
"""

from django.contrib import admin
from .models import PageView, CarView, Inquiry, Sale


@admin.register(PageView)
class PageViewAdmin(admin.ModelAdmin):
    """Admin configuration for PageView model"""
    list_display = ['page_url', 'visitor_ip', 'timestamp']
    list_filter = ['timestamp']
    search_fields = ['page_url', 'visitor_ip']
    readonly_fields = ['page_url', 'visitor_ip', 'user_agent', 'session_id', 'timestamp']
    date_hierarchy = 'timestamp'

    def has_add_permission(self, request):
        """Disable manual addition of page views"""
        return False


@admin.register(CarView)
class CarViewAdmin(admin.ModelAdmin):
    """Admin configuration for CarView model"""
    list_display = ['car', 'visitor_ip', 'timestamp']
    list_filter = ['timestamp']
    search_fields = ['car__make', 'car__model', 'visitor_ip']
    readonly_fields = ['car', 'visitor_ip', 'session_id', 'timestamp']
    date_hierarchy = 'timestamp'

    def has_add_permission(self, request):
        """Disable manual addition of car views"""
        return False


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    """Admin configuration for Inquiry model"""
    list_display = ['name', 'email', 'car', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['name', 'email', 'message', 'car__make', 'car__model']
    readonly_fields = ['created_at']
    list_editable = ['status']
    date_hierarchy = 'created_at'

    fieldsets = (
        ('Customer Information', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Inquiry Details', {
            'fields': ('car', 'message')
        }),
        ('Status', {
            'fields': ('status', 'resolved_at')
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )

    actions = ['mark_as_contacted', 'mark_as_closed']

    @admin.action(description='Mark selected inquiries as Contacted')
    def mark_as_contacted(self, request, queryset):
        updated = queryset.update(status=Inquiry.STATUS_CONTACTED)
        self.message_user(request, f'{updated} inquiries marked as Contacted.')

    @admin.action(description='Mark selected inquiries as Closed')
    def mark_as_closed(self, request, queryset):
        from django.utils import timezone
        for inquiry in queryset:
            inquiry.status = Inquiry.STATUS_CLOSED
            if not inquiry.resolved_at:
                inquiry.resolved_at = timezone.now()
            inquiry.save()
        self.message_user(request, f'{queryset.count()} inquiries marked as Closed.')


@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    """Admin configuration for Sale model"""
    list_display = ['car', 'customer_name', 'sale_price', 'sale_date', 'created_at']
    list_filter = ['sale_date', 'created_at']
    search_fields = ['car__make', 'car__model', 'customer_name', 'customer_email']
    readonly_fields = ['created_at', 'profit_margin_display']
    date_hierarchy = 'sale_date'

    fieldsets = (
        ('Sale Information', {
            'fields': ('car', 'sale_price', 'sale_date')
        }),
        ('Customer Information', {
            'fields': ('customer_name', 'customer_email', 'customer_phone')
        }),
        ('Additional Details', {
            'fields': ('notes',)
        }),
        ('Analytics', {
            'fields': ('profit_margin_display',),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )

    def profit_margin_display(self, obj):
        """Display profit margin in admin"""
        margin = obj.profit_margin
        if margin is not None:
            return f"{margin:.2f}%"
        return "N/A"
    profit_margin_display.short_description = 'Profit Margin'
