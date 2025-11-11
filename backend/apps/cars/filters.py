"""
Filters for the Cars app.
"""

import django_filters
from .models import Car


class CarFilter(django_filters.FilterSet):
    """
    Filter class for Car model.
    Allows filtering by various fields.
    """
    make = django_filters.CharFilter(field_name='make', lookup_expr='iexact')
    model = django_filters.CharFilter(field_name='model', lookup_expr='icontains')
    year_min = django_filters.NumberFilter(field_name='year', lookup_expr='gte')
    year_max = django_filters.NumberFilter(field_name='year', lookup_expr='lte')
    price_min = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    price_max = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    mileage_max = django_filters.NumberFilter(field_name='mileage', lookup_expr='lte')
    transmission = django_filters.CharFilter(field_name='transmission', lookup_expr='iexact')
    fuel_type = django_filters.CharFilter(field_name='fuel_type', lookup_expr='iexact')
    category = django_filters.NumberFilter(field_name='category__id')
    brand = django_filters.NumberFilter(field_name='brand__id')
    status = django_filters.CharFilter(field_name='status', lookup_expr='iexact')

    class Meta:
        model = Car
        fields = [
            'make', 'model', 'year_min', 'year_max',
            'price_min', 'price_max', 'mileage_max',
            'transmission', 'fuel_type', 'category', 'brand', 'status'
        ]
