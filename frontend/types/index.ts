/**
 * TypeScript types for the Car Dealership application.
 * These match the Django models on the backend.
 */

// Category type (SUV, Sedan, etc.)
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  created_at: string;
}

// Brand type (Toyota, BMW, etc.)
export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo_url?: string;
  created_at: string;
}

// Car Image type
export interface CarImage {
  id: number;
  car: string; // UUID
  image_url: string;
  cloudinary_public_id: string;
  is_primary: boolean;
  order: number;
  uploaded_at: string;
}

// Main Car type
export interface Car {
  id: string; // UUID
  make: string;
  model: string;
  year: number;
  price: string; // Decimal as string
  mileage: number;
  vin: string;
  color: string;
  transmission: 'automatic' | 'manual';
  fuel_type: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  description: string;
  features: string[]; // JSON array
  category?: Category;
  brand?: Brand;
  status: 'available' | 'sold' | 'reserved';
  is_featured: boolean;
  views_count: number;
  images: CarImage[];
  created_at: string;
  updated_at: string;
}

// Maintenance Part type
export interface MaintenancePart {
  id: number;
  maintenance_record: number;
  part_name: string;
  part_cost: string; // Decimal as string
  quantity: number;
  notes?: string;
  total_cost: string; // Calculated property
}

// Maintenance Record type
export interface MaintenanceRecord {
  id: number;
  car: string; // UUID
  repair_date: string;
  total_cost: string; // Decimal as string
  description: string;
  parts: MaintenancePart[];
  created_at: string;
  updated_at: string;
}

// Inquiry type
export interface Inquiry {
  id: number;
  car?: string; // UUID (optional)
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  created_at: string;
  resolved_at?: string;
}

// Sale type
export interface Sale {
  id: number;
  car: string; // UUID
  sale_price: string; // Decimal as string
  sale_date: string;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  notes?: string;
  profit_margin?: number;
  created_at: string;
}

// API Response types
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiError {
  detail?: string;
  message?: string;
  [key: string]: any;
}

// Form types
export interface CarFilters {
  search?: string;
  make?: string;
  model?: string;
  year_min?: number;
  year_max?: number;
  price_min?: number;
  price_max?: number;
  mileage_max?: number;
  transmission?: string;
  fuel_type?: string;
  category?: number;
  brand?: number;
  status?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
}

export interface InquiryFormData {
  car?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Analytics types
export interface AnalyticsOverview {
  total_cars: number;
  total_views: number;
  total_inquiries: number;
  total_sales: number;
  cars_sold_this_month: number;
  total_revenue_this_month: number;
  pending_inquiries: number;
  popular_cars: Array<{
    car: Car;
    view_count: number;
  }>;
  recent_inquiries: Inquiry[];
  sales_trend: Array<{
    month: string;
    sales: number;
    revenue: number;
  }>;
}
