// Mock data for RenawiCars frontend application
// This file provides sample data for cars, categories, brands, inquiries, sales, maintenance records, and analytics.

import type { Car, Category, Brand, Inquiry, Sale, MaintenanceRecord, AnalyticsOverview, PaginatedResponse } from '@/types';

// Helper to mimic paginated response shape
const paginate = <T>(items: T[], page = 1, pageSize = 10): PaginatedResponse<T> => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const results = items.slice(start, end);
  return {
    count: items.length,
    next: end < items.length ? `/api/mock/${page + 1}` : null,
    previous: page > 1 ? `/api/mock/${page - 1}` : null,
    results,
  };
};

// -------------------- Cars --------------------
export const mockCars: Car[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Corolla',
    year: 2022,
    price: '21000',
    mileage: 15000,
    vin: 'VIN1234567890',
    color: 'White',
    transmission: 'automatic',
    fuel_type: 'petrol',
    description: 'A reliable compact sedan.',
    features: ['Air Conditioning', 'Bluetooth', 'Backup Camera'],
    category: { id: 1, name: 'Sedan', slug: 'sedan', description: 'Sedan cars', created_at: '2024-01-01T00:00:00Z' },
    brand: { id: 1, name: 'Toyota', slug: 'toyota', created_at: '2024-01-01T00:00:00Z' },
    status: 'available',
    is_featured: false,
    views_count: 34,
    images: [],
    created_at: '2024-09-01T12:00:00Z',
    updated_at: '2024-09-10T08:30:00Z',
  },
  {
    id: '2',
    make: 'BMW',
    model: 'X5',
    year: 2021,
    price: '58000',
    mileage: 8000,
    vin: 'VIN0987654321',
    color: 'Black',
    transmission: 'automatic',
    fuel_type: 'diesel',
    description: 'Luxury SUV with premium features.',
    features: ['Leather Seats', 'Sunroof', 'Navigation'],
    category: { id: 2, name: 'SUV', slug: 'suv', description: 'Sport Utility Vehicles', created_at: '2024-01-01T00:00:00Z' },
    brand: { id: 2, name: 'BMW', slug: 'bmw', created_at: '2024-01-01T00:00:00Z' },
    status: 'sold',
    is_featured: true,
    views_count: 78,
    images: [],
    created_at: '2024-08-15T09:45:00Z',
    updated_at: '2024-09-05T14:20:00Z',
  },
];

// -------------------- Categories --------------------
export const mockCategories: Category[] = [
  { id: 1, name: 'Sedan', slug: 'sedan', description: 'Sedan cars', created_at: '2024-01-01T00:00:00Z' },
  { id: 2, name: 'SUV', slug: 'suv', description: 'Sport Utility Vehicles', created_at: '2024-01-01T00:00:00Z' },
  { id: 3, name: 'Coupe', slug: 'coupe', description: 'Coupe cars', created_at: '2024-01-01T00:00:00Z' },
];

// -------------------- Brands --------------------
export const mockBrands: Brand[] = [
  { id: 1, name: 'Toyota', slug: 'toyota', created_at: '2024-01-01T00:00:00Z' },
  { id: 2, name: 'BMW', slug: 'bmw', created_at: '2024-01-01T00:00:00Z' },
  { id: 3, name: 'Mercedes', slug: 'mercedes', created_at: '2024-01-01T00:00:00Z' },
];

// -------------------- Inquiries --------------------
export const mockInquiries: Inquiry[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+972-50-1234567',
    message: 'I am interested in the Toyota Corolla.',
    car: mockCars[0].id,
    status: 'new',
    created_at: '2024-09-12T10:15:00Z',
  },
];

// -------------------- Sales --------------------
export const mockSales: Sale[] = [
  {
    id: 1,
    car: mockCars[1].id,
    sale_price: '57000',
    sale_date: '2024-09-20',
    customer_name: 'Sarah Cohen',
    created_at: new Date().toISOString(),
  },
];

// -------------------- Maintenance Records --------------------
export const mockMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: 1,
    car: mockCars[0].id,
    repair_date: '2024-08-30',
    total_cost: '120',
    description: 'Oil change',
    parts: [],
    created_at: '2024-08-30T10:00:00Z',
    updated_at: '2024-08-30T10:00:00Z',
  },
];

// -------------------- Analytics Overview --------------------
export const mockAnalyticsOverview: AnalyticsOverview = {
  total_cars: mockCars.length,
  total_views: mockCars.reduce((sum, c) => sum + (c.views_count ?? 0), 0),
  total_inquiries: mockInquiries.length,
  total_sales: mockSales.length,
  cars_sold_this_month: mockSales.length,
  total_revenue_this_month: mockSales.reduce((sum, s) => sum + parseFloat(s.sale_price), 0),
  pending_inquiries: mockInquiries.filter(i => i.status === 'new').length,
  popular_cars: mockCars.map(c => ({ car: c, view_count: c.views_count })),
  recent_inquiries: mockInquiries.slice(-5),
  sales_trend: [],
};

// Export paginated helpers for API compatibility
export const getMockPaginatedCars = (page = 1, pageSize = 10) => paginate(mockCars, page, pageSize);
export const getMockPaginatedCategories = (page = 1, pageSize = 10) => paginate(mockCategories, page, pageSize);
export const getMockPaginatedBrands = (page = 1, pageSize = 10) => paginate(mockBrands, page, pageSize);
export const getMockPaginatedInquiries = (page = 1, pageSize = 10) => paginate(mockInquiries, page, pageSize);
export const getMockPaginatedSales = (page = 1, pageSize = 10) => paginate(mockSales, page, pageSize);
export const getMockPaginatedMaintenance = (page = 1, pageSize = 10) => paginate(mockMaintenanceRecords, page, pageSize);
