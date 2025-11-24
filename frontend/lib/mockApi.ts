// Mock API implementation for development and testing
// This mirrors the real API functions in lib/api.ts but returns static mock data.

import type {
  Car,
  Category,
  Brand,
  Inquiry,
  Sale,
  MaintenanceRecord,
  AnalyticsOverview,
  PaginatedResponse,
} from '@/types';
import {
  mockCars,
  mockCategories,
  mockBrands,
  mockInquiries,
  mockSales,
  mockMaintenanceRecords,
  mockAnalyticsOverview,
  getMockPaginatedCars,
  getMockPaginatedCategories,
  getMockPaginatedBrands,
  getMockPaginatedInquiries,
  getMockPaginatedSales,
  getMockPaginatedMaintenance,
} from '@/mock/data';

// Utility to simulate network latency
const simulateDelay = <T>(data: T, ms = 200): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

// -------------------- PUBLIC ENDPOINTS --------------------
export const getCars = async (filters?: any): Promise<PaginatedResponse<Car>> => {
  // Ignoring filters for mock; return first page
  return simulateDelay(getMockPaginatedCars());
};

export const getCar = async (id: string): Promise<Car> => {
  const car = mockCars.find((c) => c.id === id);
  if (!car) throw new Error('Car not found');
  return simulateDelay(car);
};

export const getCategories = async (): Promise<Category[]> => {
  return simulateDelay(mockCategories);
};

export const getBrands = async (): Promise<Brand[]> => {
  return simulateDelay(mockBrands);
};

export const submitInquiry = async (data: any): Promise<Inquiry> => {
  const newInquiry: Inquiry = {
    id: mockInquiries.length + 1,
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
    car: data.car || null,
    status: 'new',
    created_at: new Date().toISOString(),
  } as Inquiry;
  mockInquiries.push(newInquiry);
  return simulateDelay(newInquiry);
};

// -------------------- ADMIN ENDPOINTS --------------------
export const login = async (username: string, password: string) => {
  // Simple mock: any credentials succeed and return dummy tokens
  const dummy = { access: 'mock-access-token', refresh: 'mock-refresh-token' };
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', dummy.access);
    localStorage.setItem('refresh_token', dummy.refresh);
  }
  return simulateDelay(dummy);
};

export const logout = async () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
  return simulateDelay(undefined);
};

export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('access_token');
  }
  return false;
};

export const createCar = async (data: Partial<Car>): Promise<Car> => {
  const newCar: Car = {
    id: (mockCars.length + 1).toString(),
    make: data.make ?? 'Unknown',
    model: data.model ?? 'Unknown',
    year: data.year ?? new Date().getFullYear(),
    price: data.price ?? '0',
    mileage: data.mileage ?? 0,
    vin: data.vin ?? 'UNKNOWNVIN',
    color: data.color ?? 'Unpainted',
    transmission: data.transmission ?? 'automatic',
    fuel_type: data.fuel_type ?? 'petrol',
    description: data.description ?? '',
    features: data.features ?? [],
    category: data.category ?? mockCategories[0],
    brand: data.brand ?? mockBrands[0],
    status: data.status ?? 'available',
    is_featured: data.is_featured ?? false,
    views_count: data.views_count ?? 0,
    images: data.images ?? [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  } as Car;
  mockCars.push(newCar);
  return simulateDelay(newCar);
};

export const updateCar = async (id: string, data: Partial<Car>): Promise<Car> => {
  const index = mockCars.findIndex((c) => c.id === id);
  if (index === -1) throw new Error('Car not found');
  const updated = { ...mockCars[index], ...data, updated_at: new Date().toISOString() } as Car;
  mockCars[index] = updated;
  return simulateDelay(updated);
};

export const deleteCar = async (id: string): Promise<void> => {
  const idx = mockCars.findIndex((c) => c.id === id);
  if (idx !== -1) mockCars.splice(idx, 1);
  return simulateDelay(undefined);
};

export const getMaintenanceRecords = async (carId: string): Promise<PaginatedResponse<MaintenanceRecord>> => {
  const records = mockMaintenanceRecords.filter((r) => r.car === carId);
  return simulateDelay({ count: records.length, next: null, previous: null, results: records });
};

export const getAllMaintenanceRecords = async (): Promise<PaginatedResponse<MaintenanceRecord>> => {
  return simulateDelay({ count: mockMaintenanceRecords.length, next: null, previous: null, results: mockMaintenanceRecords });
};

export const getInquiries = async (): Promise<PaginatedResponse<Inquiry>> => {
  return simulateDelay({ count: mockInquiries.length, next: null, previous: null, results: mockInquiries });
};

export const updateInquiryStatus = async (id: number, status: 'new' | 'contacted' | 'closed'): Promise<Inquiry> => {
  const inquiry = mockInquiries.find((i) => i.id === id);
  if (!inquiry) throw new Error('Inquiry not found');
  inquiry.status = status;
  return simulateDelay(inquiry);
};

export const getAnalyticsOverview = async (): Promise<AnalyticsOverview> => {
  return simulateDelay(mockAnalyticsOverview);
};

export const getSales = async (): Promise<PaginatedResponse<Sale>> => {
  return simulateDelay({ count: mockSales.length, next: null, previous: null, results: mockSales });
};

export const createSale = async (data: Partial<Sale>): Promise<Sale> => {
  const newSale: Sale = {
    id: mockSales.length + 1,
    car: data.car ?? mockCars[0].id,
    sale_price: data.sale_price ?? '0',
    sale_date: data.sale_date ?? new Date().toISOString().split('T')[0],
    customer_name: data.customer_name ?? 'Anonymous',
    created_at: new Date().toISOString(),
  } as Sale;
  mockSales.push(newSale);
  return simulateDelay(newSale);
};

export const createCategory = async (data: Partial<Category>): Promise<Category> => {
  const newCat: Category = {
    id: mockCategories.length + 1,
    name: data.name ?? 'Unnamed',
    slug: data.slug ?? `category-${mockCategories.length + 1}`,
    description: data.description ?? '',
    created_at: new Date().toISOString(),
  } as Category;
  mockCategories.push(newCat);
  return simulateDelay(newCat);
};

export const createBrand = async (data: Partial<Brand>): Promise<Brand> => {
  const newBrand: Brand = {
    id: mockBrands.length + 1,
    name: data.name ?? 'Unnamed',
    slug: data.slug ?? `brand-${mockBrands.length + 1}`,
    created_at: new Date().toISOString(),
  } as Brand;
  mockBrands.push(newBrand);
  return simulateDelay(newBrand);
};

// Export a mock API object compatible with the real one
export const mockApi = {
  cars: { list: getCars, get: getCar, create: createCar, update: updateCar, delete: deleteCar },
  categories: { list: getCategories, create: createCategory },
  brands: { list: getBrands, create: createBrand },
  inquiries: { submit: submitInquiry, list: getInquiries, updateStatus: updateInquiryStatus },
  maintenance: { getForCar: getMaintenanceRecords, getAll: getAllMaintenanceRecords },
  sales: { list: getSales, create: createSale },
  analytics: { overview: getAnalyticsOverview },
  auth: { login, logout, isAuthenticated },
};
