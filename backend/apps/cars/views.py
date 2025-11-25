"""
API Views for the Cars app.
"""

from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Category, Brand, Car, CarImage
from .serializers import (
    CategorySerializer,
    BrandSerializer,
    CarListSerializer,
    CarDetailSerializer,
    CarCreateUpdateSerializer,
    CarImageSerializer
)
from .filters import CarFilter
import cloudinary.uploader


# ============= PUBLIC VIEWS =============

class CategoryListView(generics.ListAPIView):
    """
    Public endpoint to list all categories.
    GET /api/cars/categories/
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


class BrandListView(generics.ListAPIView):
    """
    Public endpoint to list all brands.
    GET /api/cars/brands/
    """
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [permissions.AllowAny]


class CarListView(generics.ListAPIView):
    """
    Public endpoint to list all available cars with filtering.
    GET /api/cars/

    Query parameters:
    - search: Search in make, model, VIN, description
    - make: Filter by make
    - year_min, year_max: Filter by year range
    - price_min, price_max: Filter by price range
    - mileage_max: Filter by maximum mileage
    - transmission: Filter by transmission type
    - fuel_type: Filter by fuel type
    - category: Filter by category ID
    - brand: Filter by brand ID
    - status: Filter by status
    - ordering: Order by field (e.g., 'price', '-year')
    """
    queryset = Car.objects.filter(status='available').select_related('category', 'brand').prefetch_related('images')
    serializer_class = CarListSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = CarFilter
    search_fields = ['make', 'model', 'vin', 'description']
    ordering_fields = ['price', 'year', 'mileage', 'created_at']
    ordering = ['-created_at']  # Default ordering


class CarDetailView(generics.RetrieveAPIView):
    """
    Public endpoint to get a single car's details.
    GET /api/cars/{id}/
    """
    queryset = Car.objects.all().select_related('category', 'brand').prefetch_related('images', 'maintenance_records')
    serializer_class = CarDetailSerializer
    permission_classes = [permissions.AllowAny]


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def record_car_view(request, pk):
    """
    Record a car view for analytics.
    POST /api/cars/{id}/view/
    """
    try:
        car = Car.objects.get(pk=pk)
        car.increment_views()

        # Also create a CarView record for analytics
        from apps.analytics.models import CarView
        CarView.objects.create(
            car=car,
            visitor_ip=request.META.get('REMOTE_ADDR', ''),
            session_id=request.session.session_key or ''
        )

        return Response({'message': 'View recorded'}, status=status.HTTP_200_OK)
    except Car.DoesNotExist:
        return Response({'error': 'Car not found'}, status=status.HTTP_404_NOT_FOUND)


# ============= ADMIN VIEWS =============

class AdminCarListCreateView(generics.ListCreateAPIView):
    """
    Admin endpoint to list all cars or create a new car.
    GET /api/admin/cars/
    POST /api/admin/cars/
    """
    queryset = Car.objects.all().select_related('category', 'brand').prefetch_related('images')
    permission_classes = [permissions.IsAdminUser]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CarCreateUpdateSerializer
        return CarListSerializer


class AdminCarDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Admin endpoint to get, update, or delete a car.
    GET /api/admin/cars/{id}/
    PUT /api/admin/cars/{id}/
    DELETE /api/admin/cars/{id}/
    """
    queryset = Car.objects.all()
    permission_classes = [permissions.IsAdminUser]

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return CarCreateUpdateSerializer
        return CarDetailSerializer


class AdminCarImageUploadView(generics.CreateAPIView):
    """
    Admin endpoint to upload images for a car.
    POST /api/admin/cars/{car_id}/images/
    """
    serializer_class = CarImageSerializer
    permission_classes = [permissions.IsAdminUser]

    def create(self, request, *args, **kwargs):
        car_id = kwargs.get('car_id')
        try:
            car = Car.objects.get(pk=car_id)
        except Car.DoesNotExist:
            return Response({'error': 'Car not found'}, status=status.HTTP_404_NOT_FOUND)

        # Handle multiple image uploads
        images = request.FILES.getlist('images')
        
        if not images:
            return Response({'error': 'No images provided'}, status=status.HTTP_400_BAD_REQUEST)

        created_images = []
        errors = []

        for image_file in images:
            try:
                # Upload to Cloudinary
                upload_result = cloudinary.uploader.upload(
                    image_file,
                    folder="renawicars/cars"
                )
                
                # Create CarImage record
                car_image = CarImage.objects.create(
                    car=car,
                    image_url=upload_result.get('secure_url'),
                    cloudinary_public_id=upload_result.get('public_id'),
                    is_primary=False
                )
                
                # If this is the first image, make it primary
                if car.images.count() == 1:
                    car_image.is_primary = True
                    car_image.save()
                
                serializer = self.get_serializer(car_image)
                created_images.append(serializer.data)
                
            except Exception as e:
                errors.append(f"Failed to upload {image_file.name}: {str(e)}")

        if not created_images and errors:
             return Response({'error': 'Failed to upload images', 'details': errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(created_images, status=status.HTTP_201_CREATED)


class AdminCarImageDeleteView(generics.DestroyAPIView):
    """
    Admin endpoint to delete a car image.
    DELETE /api/admin/cars/images/{id}/
    """
    queryset = CarImage.objects.all()
    permission_classes = [permissions.IsAdminUser]

    def perform_destroy(self, instance):
        # Delete from Cloudinary
        if instance.cloudinary_public_id:
            try:
                cloudinary.uploader.destroy(instance.cloudinary_public_id)
            except Exception as e:
                # Log error but continue with DB deletion
                print(f"Failed to delete image from Cloudinary: {e}")
        
        # Delete from DB
        instance.delete()


class AdminCategoryListCreateView(generics.ListCreateAPIView):
    """
    Admin endpoint to list or create categories.
    GET /api/admin/categories/
    POST /api/admin/categories/
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser]


class AdminCategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Admin endpoint to get, update, or delete a category.
    GET /api/admin/categories/{id}/
    PUT /api/admin/categories/{id}/
    DELETE /api/admin/categories/{id}/
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser]


class AdminBrandListCreateView(generics.ListCreateAPIView):
    """
    Admin endpoint to list or create brands.
    GET /api/admin/brands/
    POST /api/admin/brands/
    """
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [permissions.IsAdminUser]


class AdminBrandDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Admin endpoint to get, update, or delete a brand.
    GET /api/admin/brands/{id}/
    PUT /api/admin/brands/{id}/
    DELETE /api/admin/brands/{id}/
    """
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [permissions.IsAdminUser]
