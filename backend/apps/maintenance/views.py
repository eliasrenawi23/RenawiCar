"""
API Views for the Maintenance app.
"""

from rest_framework import generics, permissions
from .models import MaintenanceRecord, MaintenancePart
from .serializers import MaintenanceRecordSerializer, MaintenanceRecordCreateSerializer


class MaintenanceRecordListView(generics.ListAPIView):
    """
    Admin endpoint to list maintenance records for a specific car.
    GET /api/maintenance/car/{car_id}/
    """
    serializer_class = MaintenanceRecordSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        car_id = self.kwargs.get('car_id')
        return MaintenanceRecord.objects.filter(car__id=car_id).prefetch_related('parts')


class MaintenanceRecordCreateView(generics.CreateAPIView):
    """
    Admin endpoint to create a maintenance record.
    POST /api/maintenance/
    """
    serializer_class = MaintenanceRecordCreateSerializer
    permission_classes = [permissions.IsAdminUser]


class MaintenanceRecordDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Admin endpoint to get, update, or delete a maintenance record.
    GET /api/maintenance/{id}/
    PUT /api/maintenance/{id}/
    DELETE /api/maintenance/{id}/
    """
    queryset = MaintenanceRecord.objects.all().prefetch_related('parts')
    permission_classes = [permissions.IsAdminUser]

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return MaintenanceRecordCreateSerializer
        return MaintenanceRecordSerializer
