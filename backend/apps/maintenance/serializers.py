"""
Serializers for the Maintenance app.
"""

from rest_framework import serializers
from .models import MaintenanceRecord, MaintenancePart


class MaintenancePartSerializer(serializers.ModelSerializer):
    """Serializer for MaintenancePart model"""
    total_cost = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = MaintenancePart
        fields = ['id', 'part_name', 'part_cost', 'quantity', 'notes', 'total_cost']
        read_only_fields = ['id', 'total_cost']


class MaintenanceRecordSerializer(serializers.ModelSerializer):
    """Serializer for MaintenanceRecord model"""
    parts = MaintenancePartSerializer(many=True, read_only=True)

    class Meta:
        model = MaintenanceRecord
        fields = ['id', 'car', 'repair_date', 'total_cost', 'description', 'parts', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class MaintenanceRecordCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating maintenance records with nested parts.
    Allows creating parts inline when creating a maintenance record.
    """
    parts = MaintenancePartSerializer(many=True, required=False)

    class Meta:
        model = MaintenanceRecord
        fields = ['id', 'car', 'repair_date', 'total_cost', 'description', 'parts']
        read_only_fields = ['id']

    def create(self, validated_data):
        """Create maintenance record with nested parts"""
        parts_data = validated_data.pop('parts', [])
        maintenance_record = MaintenanceRecord.objects.create(**validated_data)

        # Create parts
        for part_data in parts_data:
            MaintenancePart.objects.create(
                maintenance_record=maintenance_record,
                **part_data
            )

        return maintenance_record

    def update(self, instance, validated_data):
        """Update maintenance record and nested parts"""
        parts_data = validated_data.pop('parts', None)

        # Update maintenance record fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update parts if provided
        if parts_data is not None:
            # Delete existing parts
            instance.parts.all().delete()
            # Create new parts
            for part_data in parts_data:
                MaintenancePart.objects.create(
                    maintenance_record=instance,
                    **part_data
                )

        return instance
