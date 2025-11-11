"""
Serializers for the Analytics app.
"""

from rest_framework import serializers
from .models import PageView, CarView, Inquiry, Sale


class PageViewSerializer(serializers.ModelSerializer):
    """Serializer for PageView model"""

    class Meta:
        model = PageView
        fields = ['id', 'page_url', 'visitor_ip', 'user_agent', 'session_id', 'timestamp']
        read_only_fields = ['id', 'timestamp']


class CarViewSerializer(serializers.ModelSerializer):
    """Serializer for CarView model"""

    class Meta:
        model = CarView
        fields = ['id', 'car', 'visitor_ip', 'session_id', 'timestamp']
        read_only_fields = ['id', 'timestamp']


class InquirySerializer(serializers.ModelSerializer):
    """Serializer for Inquiry model"""
    car_details = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Inquiry
        fields = [
            'id', 'car', 'car_details', 'name', 'email', 'phone',
            'message', 'status', 'created_at', 'resolved_at'
        ]
        read_only_fields = ['id', 'created_at', 'car_details']

    def get_car_details(self, obj):
        """Get basic car info for the inquiry"""
        if obj.car:
            return {
                'id': str(obj.car.id),
                'make': obj.car.make,
                'model': obj.car.model,
                'year': obj.car.year
            }
        return None


class InquiryCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating inquiries (public endpoint)"""

    class Meta:
        model = Inquiry
        fields = ['car', 'name', 'email', 'phone', 'message']

    def validate_email(self, value):
        """Basic email validation"""
        if '@' not in value:
            raise serializers.ValidationError("Enter a valid email address.")
        return value


class SaleSerializer(serializers.ModelSerializer):
    """Serializer for Sale model"""
    car_details = serializers.SerializerMethodField(read_only=True)
    profit_margin = serializers.DecimalField(
        max_digits=5,
        decimal_places=2,
        read_only=True
    )

    class Meta:
        model = Sale
        fields = [
            'id', 'car', 'car_details', 'sale_price', 'sale_date',
            'customer_name', 'customer_email', 'customer_phone',
            'notes', 'profit_margin', 'created_at'
        ]
        read_only_fields = ['id', 'profit_margin', 'created_at']

    def get_car_details(self, obj):
        """Get basic car info for the sale"""
        if obj.car:
            return {
                'id': str(obj.car.id),
                'make': obj.car.make,
                'model': obj.car.model,
                'year': obj.car.year,
                'list_price': str(obj.car.price)
            }
        return None
