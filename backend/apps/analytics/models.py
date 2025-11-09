"""
Analytics models for tracking website usage and customer interactions.

This file defines:
- PageView: Track all page visits
- CarView: Track individual car detail page views
- Inquiry: Customer inquiries about cars
- Sale: Record of sold cars
"""

from django.db import models
from django.core.validators import MinValueValidator
from apps.cars.models import Car


class PageView(models.Model):
    """
    Track page views for analytics.
    """
    page_url = models.CharField(
        max_length=500,
        help_text='URL of the page visited'
    )
    visitor_ip = models.GenericIPAddressField(
        help_text='IP address of the visitor'
    )
    user_agent = models.CharField(
        max_length=500,
        blank=True,
        help_text='Browser user agent string'
    )
    session_id = models.CharField(
        max_length=100,
        help_text='Session ID for tracking unique visitors',
        blank=True
    )
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Page View'
        verbose_name_plural = 'Page Views'
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['-timestamp']),
            models.Index(fields=['page_url']),
        ]

    def __str__(self):
        return f"{self.page_url} at {self.timestamp}"


class CarView(models.Model):
    """
    Track individual car detail page views.
    This helps identify most popular cars.
    """
    car = models.ForeignKey(
        Car,
        on_delete=models.CASCADE,
        related_name='view_records'
    )
    visitor_ip = models.GenericIPAddressField(
        help_text='IP address of the visitor'
    )
    session_id = models.CharField(
        max_length=100,
        help_text='Session ID for tracking unique visitors',
        blank=True
    )
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Car View'
        verbose_name_plural = 'Car Views'
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['car', '-timestamp']),
        ]

    def __str__(self):
        return f"View of {self.car} at {self.timestamp}"


class Inquiry(models.Model):
    """
    Customer inquiries about cars or general questions.
    """
    STATUS_NEW = 'new'
    STATUS_CONTACTED = 'contacted'
    STATUS_CLOSED = 'closed'

    STATUS_CHOICES = [
        (STATUS_NEW, 'New'),
        (STATUS_CONTACTED, 'Contacted'),
        (STATUS_CLOSED, 'Closed'),
    ]

    car = models.ForeignKey(
        Car,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='inquiries',
        help_text='Car this inquiry is about (optional for general inquiries)'
    )
    name = models.CharField(
        max_length=200,
        help_text='Customer name'
    )
    email = models.EmailField(
        help_text='Customer email'
    )
    phone = models.CharField(
        max_length=20,
        blank=True,
        help_text='Customer phone number'
    )
    message = models.TextField(
        help_text='Customer message/inquiry'
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=STATUS_NEW
    )

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    resolved_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text='When was this inquiry resolved?'
    )

    class Meta:
        verbose_name = 'Inquiry'
        verbose_name_plural = 'Inquiries'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status', '-created_at']),
        ]

    def __str__(self):
        car_info = f" about {self.car}" if self.car else ""
        return f"Inquiry from {self.name}{car_info}"


class Sale(models.Model):
    """
    Record of car sales for tracking and analytics.
    """
    car = models.ForeignKey(
        Car,
        on_delete=models.PROTECT,  # Protect sales records even if car is deleted
        related_name='sales'
    )
    sale_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        help_text='Actual sale price (may differ from listed price)'
    )
    sale_date = models.DateField(
        help_text='Date when the car was sold'
    )
    customer_name = models.CharField(
        max_length=200,
        help_text='Name of the customer who bought the car'
    )
    customer_email = models.EmailField(
        blank=True,
        help_text='Customer email address'
    )
    customer_phone = models.CharField(
        max_length=20,
        blank=True,
        help_text='Customer phone number'
    )
    notes = models.TextField(
        blank=True,
        help_text='Additional notes about the sale'
    )

    # Timestamp
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Sale'
        verbose_name_plural = 'Sales'
        ordering = ['-sale_date']
        indexes = [
            models.Index(fields=['-sale_date']),
        ]

    def __str__(self):
        return f"Sale of {self.car} on {self.sale_date}"

    @property
    def profit_margin(self):
        """
        Calculate profit margin if car's original price is available.
        Returns percentage difference between sale price and list price.
        """
        if self.car and self.car.price:
            return ((self.sale_price - self.car.price) / self.car.price) * 100
        return None
