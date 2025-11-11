"""
API Views for the Analytics app.
"""

from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Count, Sum
from django.utils import timezone
from datetime import timedelta
from .models import PageView, CarView, Inquiry, Sale
from .serializers import (
    InquirySerializer,
    InquiryCreateSerializer,
    SaleSerializer
)
from apps.cars.models import Car


# ============= PUBLIC VIEWS =============

class InquiryCreateView(generics.CreateAPIView):
    """
    Public endpoint to submit an inquiry.
    POST /api/inquiries/
    """
    serializer_class = InquiryCreateSerializer
    permission_classes = [permissions.AllowAny]


# ============= ADMIN VIEWS =============

class AdminInquiryListView(generics.ListAPIView):
    """
    Admin endpoint to list all inquiries.
    GET /api/admin/inquiries/
    """
    queryset = Inquiry.objects.all().select_related('car')
    serializer_class = InquirySerializer
    permission_classes = [permissions.IsAdminUser]


class AdminInquiryDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Admin endpoint to get, update, or delete an inquiry.
    GET /api/admin/inquiries/{id}/
    PATCH /api/admin/inquiries/{id}/
    DELETE /api/admin/inquiries/{id}/
    """
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    permission_classes = [permissions.IsAdminUser]


class AdminSaleListCreateView(generics.ListCreateAPIView):
    """
    Admin endpoint to list or create sales.
    GET /api/admin/sales/
    POST /api/admin/sales/
    """
    queryset = Sale.objects.all().select_related('car')
    serializer_class = SaleSerializer
    permission_classes = [permissions.IsAdminUser]


class AdminSaleDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Admin endpoint to get, update, or delete a sale.
    GET /api/admin/sales/{id}/
    PUT /api/admin/sales/{id}/
    DELETE /api/admin/sales/{id}/
    """
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    permission_classes = [permissions.IsAdminUser]


@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def analytics_overview(request):
    """
    Admin endpoint to get analytics overview.
    GET /api/admin/analytics/overview/
    """
    # Calculate date ranges
    today = timezone.now().date()
    first_day_of_month = today.replace(day=1)
    last_month = (first_day_of_month - timedelta(days=1)).replace(day=1)

    # Total cars
    total_cars = Car.objects.count()
    available_cars = Car.objects.filter(status='available').count()
    sold_cars = Car.objects.filter(status='sold').count()

    # Sales this month
    sales_this_month = Sale.objects.filter(
        sale_date__gte=first_day_of_month
    ).count()

    # Revenue this month
    revenue_this_month = Sale.objects.filter(
        sale_date__gte=first_day_of_month
    ).aggregate(
        total=Sum('sale_price')
    )['total'] or 0

    # Pending inquiries
    pending_inquiries = Inquiry.objects.filter(status='new').count()

    # Most viewed cars (top 10)
    popular_cars = Car.objects.order_by('-views_count')[:10]
    popular_cars_data = []
    for car in popular_cars:
        popular_cars_data.append({
            'car': {
                'id': str(car.id),
                'make': car.make,
                'model': car.model,
                'year': car.year,
                'price': str(car.price)
            },
            'view_count': car.views_count
        })

    # Recent inquiries (last 5)
    recent_inquiries = Inquiry.objects.select_related('car').order_by('-created_at')[:5]
    from .serializers import InquirySerializer
    recent_inquiries_data = InquirySerializer(recent_inquiries, many=True).data

    # Sales trend (last 6 months)
    sales_trend = []
    for i in range(5, -1, -1):
        month_date = first_day_of_month - timedelta(days=30 * i)
        next_month = (month_date.replace(day=28) + timedelta(days=4)).replace(day=1)

        sales = Sale.objects.filter(
            sale_date__gte=month_date,
            sale_date__lt=next_month
        )

        sales_trend.append({
            'month': month_date.strftime('%b %Y'),
            'sales': sales.count(),
            'revenue': float(sales.aggregate(total=Sum('sale_price'))['total'] or 0)
        })

    return Response({
        'total_cars': total_cars,
        'available_cars': available_cars,
        'sold_cars': sold_cars,
        'cars_sold_this_month': sales_this_month,
        'total_revenue_this_month': float(revenue_this_month),
        'pending_inquiries': pending_inquiries,
        'popular_cars': popular_cars_data,
        'recent_inquiries': recent_inquiries_data,
        'sales_trend': sales_trend
    })


@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def page_views_stats(request):
    """
    Admin endpoint to get page view statistics.
    GET /api/admin/analytics/page-views/
    """
    total_views = PageView.objects.count()
    today = timezone.now().date()
    views_today = PageView.objects.filter(
        timestamp__date=today
    ).count()
    views_this_week = PageView.objects.filter(
        timestamp__gte=today - timedelta(days=7)
    ).count()
    views_this_month = PageView.objects.filter(
        timestamp__month=today.month,
        timestamp__year=today.year
    ).count()

    # Most visited pages
    popular_pages = PageView.objects.values('page_url').annotate(
        view_count=Count('id')
    ).order_by('-view_count')[:10]

    return Response({
        'total_views': total_views,
        'views_today': views_today,
        'views_this_week': views_this_week,
        'views_this_month': views_this_month,
        'popular_pages': list(popular_pages)
    })


@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def car_views_stats(request):
    """
    Admin endpoint to get car view statistics.
    GET /api/admin/analytics/car-views/
    """
    # Most viewed cars
    most_viewed = Car.objects.order_by('-views_count')[:10]
    most_viewed_data = [{
        'car': {
            'id': str(car.id),
            'make': car.make,
            'model': car.model,
            'year': car.year
        },
        'views': car.views_count
    } for car in most_viewed]

    # Views by category
    from apps.cars.models import Category
    views_by_category = []
    for category in Category.objects.all():
        total_views = Car.objects.filter(category=category).aggregate(
            total=Sum('views_count')
        )['total'] or 0
        views_by_category.append({
            'category': category.name,
            'views': total_views
        })

    return Response({
        'most_viewed_cars': most_viewed_data,
        'views_by_category': views_by_category
    })


@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def inquiries_stats(request):
    """
    Admin endpoint to get inquiry statistics.
    GET /api/admin/analytics/inquiries/
    """
    total_inquiries = Inquiry.objects.count()
    new_inquiries = Inquiry.objects.filter(status='new').count()
    contacted_inquiries = Inquiry.objects.filter(status='contacted').count()
    closed_inquiries = Inquiry.objects.filter(status='closed').count()

    # Inquiries by status
    by_status = {
        'new': new_inquiries,
        'contacted': contacted_inquiries,
        'closed': closed_inquiries
    }

    return Response({
        'total_inquiries': total_inquiries,
        'by_status': by_status
    })


@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def sales_stats(request):
    """
    Admin endpoint to get sales statistics.
    GET /api/admin/analytics/sales/
    """
    total_sales = Sale.objects.count()
    total_revenue = Sale.objects.aggregate(
        total=Sum('sale_price')
    )['total'] or 0

    # Average sale price
    from django.db.models import Avg
    avg_price = Sale.objects.aggregate(
        avg=Avg('sale_price')
    )['avg'] or 0

    # Sales by category
    from apps.cars.models import Category
    sales_by_category = []
    for category in Category.objects.all():
        category_sales = Sale.objects.filter(car__category=category).aggregate(
            count=Count('id'),
            revenue=Sum('sale_price')
        )
        if category_sales['count']:
            sales_by_category.append({
                'category': category.name,
                'sales': category_sales['count'],
                'revenue': float(category_sales['revenue'] or 0)
            })

    return Response({
        'total_sales': total_sales,
        'total_revenue': float(total_revenue),
        'average_sale_price': float(avg_price),
        'sales_by_category': sales_by_category
    })
