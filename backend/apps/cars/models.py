"""
Car models for the dealership application.

This file defines the database structure for:
- Categories (SUV, Sedan, etc.)
- Brands (Toyota, BMW, etc.)
- Cars (main inventory)
- Car Images (multiple photos per car)
"""

from django.db import models
from django.utils.text import slugify
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid


class Category(models.Model):
    """
    Car categories like SUV, Sedan, Truck, etc.
    """
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Brand(models.Model):
    """
    Car brands like Toyota, BMW, Mercedes, etc.
    """
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    logo_url = models.URLField(blank=True, help_text='URL to brand logo image')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Brand'
        verbose_name_plural = 'Brands'
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Car(models.Model):
    """
    Main car model containing all vehicle information.
    """
    # Status choices
    STATUS_AVAILABLE = 'available'
    STATUS_SOLD = 'sold'
    STATUS_RESERVED = 'reserved'

    STATUS_CHOICES = [
        (STATUS_AVAILABLE, 'Available'),
        (STATUS_SOLD, 'Sold'),
        (STATUS_RESERVED, 'Reserved'),
    ]

    # Transmission choices
    TRANSMISSION_AUTOMATIC = 'automatic'
    TRANSMISSION_MANUAL = 'manual'

    TRANSMISSION_CHOICES = [
        (TRANSMISSION_AUTOMATIC, 'Automatic'),
        (TRANSMISSION_MANUAL, 'Manual'),
    ]

    # Fuel type choices
    FUEL_PETROL = 'petrol'
    FUEL_DIESEL = 'diesel'
    FUEL_ELECTRIC = 'electric'
    FUEL_HYBRID = 'hybrid'

    FUEL_CHOICES = [
        (FUEL_PETROL, 'Petrol'),
        (FUEL_DIESEL, 'Diesel'),
        (FUEL_ELECTRIC, 'Electric'),
        (FUEL_HYBRID, 'Hybrid'),
    ]

    # Primary Key (UUID for better security)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # Basic Information
    make = models.CharField(max_length=100, help_text='Car manufacturer (e.g., Toyota)')
    model = models.CharField(max_length=100, help_text='Car model (e.g., Camry)')
    year = models.IntegerField(
        validators=[MinValueValidator(1900), MaxValueValidator(2100)],
        help_text='Manufacturing year'
    )

    # Pricing & Mileage
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        help_text='Price in your currency'
    )
    mileage = models.IntegerField(
        validators=[MinValueValidator(0)],
        help_text='Mileage in kilometers'
    )

    # Vehicle Identification
    vin = models.CharField(
        max_length=17,
        unique=True,
        help_text='Vehicle Identification Number (17 characters)'
    )

    # Specifications
    color = models.CharField(max_length=50)
    transmission = models.CharField(
        max_length=20,
        choices=TRANSMISSION_CHOICES,
        default=TRANSMISSION_AUTOMATIC
    )
    fuel_type = models.CharField(
        max_length=20,
        choices=FUEL_CHOICES,
        default=FUEL_PETROL
    )

    # Description & Features
    description = models.TextField(
        help_text='Detailed description of the car',
        blank=True
    )
    features = models.JSONField(
        default=list,
        blank=True,
        help_text='List of features (e.g., ["GPS", "Leather Seats", "Sunroof"])'
    )

    # Relationships
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='cars'
    )
    brand = models.ForeignKey(
        Brand,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='cars'
    )

    # Status
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=STATUS_AVAILABLE
    )
    is_featured = models.BooleanField(
        default=False,
        help_text='Display this car on homepage?'
    )

    # Analytics
    views_count = models.IntegerField(
        default=0,
        help_text='Number of times this car was viewed'
    )

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Car'
        verbose_name_plural = 'Cars'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['make', 'model']),
            models.Index(fields=['year']),
            models.Index(fields=['price']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f"{self.year} {self.make} {self.model}"

    def increment_views(self):
        """Increment the view count for this car"""
        self.views_count += 1
        self.save(update_fields=['views_count'])

    @property
    def primary_image(self):
        """Get the primary image for this car"""
        return self.images.filter(is_primary=True).first()

    @property
    def all_images(self):
        """Get all images ordered by order field"""
        return self.images.all().order_by('order')


class CarImage(models.Model):
    """
    Images for cars. Each car can have multiple images.
    """
    car = models.ForeignKey(
        Car,
        on_delete=models.CASCADE,
        related_name='images'
    )
    image_url = models.URLField(
        help_text='Cloudinary URL of the image'
    )
    cloudinary_public_id = models.CharField(
        max_length=255,
        help_text='Cloudinary public ID for deletion'
    )
    is_primary = models.BooleanField(
        default=False,
        help_text='Is this the main display image?'
    )
    order = models.IntegerField(
        default=0,
        help_text='Display order (lower numbers first)'
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Car Image'
        verbose_name_plural = 'Car Images'
        ordering = ['order', 'uploaded_at']
        indexes = [
            models.Index(fields=['car', 'is_primary']),
        ]

    def __str__(self):
        return f"Image for {self.car} - {'Primary' if self.is_primary else 'Secondary'}"

    def save(self, *args, **kwargs):
        # If this image is set as primary, unset other primary images for this car
        if self.is_primary:
            CarImage.objects.filter(car=self.car, is_primary=True).update(is_primary=False)
        super().save(*args, **kwargs)
