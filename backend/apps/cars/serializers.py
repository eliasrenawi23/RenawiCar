"""
Serializers for the Cars app.
Serializers convert Django models to/from JSON for the REST API.
"""

from rest_framework import serializers
from .models import Category, Brand, Car, CarImage


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for Category model"""

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'created_at']
        read_only_fields = ['id', 'slug', 'created_at']


class BrandSerializer(serializers.ModelSerializer):
    """Serializer for Brand model"""

    class Meta:
        model = Brand
        fields = ['id', 'name', 'slug', 'logo_url', 'created_at']
        read_only_fields = ['id', 'slug', 'created_at']


class CarImageSerializer(serializers.ModelSerializer):
    """Serializer for CarImage model"""

    class Meta:
        model = CarImage
        fields = ['id', 'car', 'image_url', 'cloudinary_public_id', 'is_primary', 'order', 'uploaded_at']
        read_only_fields = ['id', 'uploaded_at']


class CarListSerializer(serializers.ModelSerializer):
    """
    Serializer for Car model in list views (less detail).
    Shows basic info + primary image only.
    """
    category = CategorySerializer(read_only=True)
    brand = BrandSerializer(read_only=True)
    primary_image = serializers.SerializerMethodField()

    class Meta:
        model = Car
        fields = [
            'id', 'make', 'model', 'year', 'price', 'mileage',
            'color', 'transmission', 'fuel_type', 'status',
            'category', 'brand', 'is_featured', 'views_count',
            'primary_image', 'created_at'
        ]
        read_only_fields = ['id', 'views_count', 'created_at']

    def get_primary_image(self, obj):
        """Get the primary image URL"""
        primary = obj.images.filter(is_primary=True).first()
        if primary:
            return {
                'id': primary.id,
                'image_url': primary.image_url,
                'is_primary': True
            }
        # If no primary, get first image
        first_image = obj.images.first()
        if first_image:
            return {
                'id': first_image.id,
                'image_url': first_image.image_url,
                'is_primary': False
            }
        return None


class CarDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for Car model in detail views (full info).
    Includes all images, maintenance records, etc.
    """
    category = CategorySerializer(read_only=True)
    brand = BrandSerializer(read_only=True)
    images = CarImageSerializer(many=True, read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True,
        required=False
    )
    brand_id = serializers.PrimaryKeyRelatedField(
        queryset=Brand.objects.all(),
        source='brand',
        write_only=True,
        required=False
    )

    class Meta:
        model = Car
        fields = [
            'id', 'make', 'model', 'year', 'price', 'mileage', 'vin',
            'color', 'transmission', 'fuel_type', 'description', 'features',
            'category', 'category_id', 'brand', 'brand_id', 'status',
            'is_featured', 'views_count', 'images', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'views_count', 'created_at', 'updated_at']


class CarCreateUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating/updating cars (admin only).
    Allows writing category_id and brand_id.
    """

    class Meta:
        model = Car
        fields = [
            'id', 'make', 'model', 'year', 'price', 'mileage', 'vin',
            'color', 'transmission', 'fuel_type', 'description', 'features',
            'category', 'brand', 'status', 'is_featured'
        ]
        read_only_fields = ['id']

    def validate_vin(self, value):
        """Ensure VIN is unique"""
        instance = self.instance
        if instance and instance.vin == value:
            return value
        if Car.objects.filter(vin=value).exists():
            raise serializers.ValidationError("A car with this VIN already exists.")
        return value

    def validate_year(self, value):
        """Ensure year is reasonable"""
        if value < 1900 or value > 2100:
            raise serializers.ValidationError("Year must be between 1900 and 2100.")
        return value

    def validate_price(self, value):
        """Ensure price is positive"""
        if value < 0:
            raise serializers.ValidationError("Price must be positive.")
        return value
