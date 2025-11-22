/**
 * API client for communicating with Django backend.
 * Uses axios for HTTP requests.
 */

import axios from 'axios';
import type {
  Car,
  Category,
  Brand,
  MaintenanceRecord,
  Inquiry,
  Sale,
  PaginatedResponse,
  CarFilters,
  InquiryFormData,
  AnalyticsOverview,
} from '@/types';

// Get API URL from environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage (for admin pages)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we have a refresh token, try to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (typeof window !== 'undefined') {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          try {
            const response = await axios.post(`${API_URL}/auth/refresh/`, {
              refresh: refreshToken,
            });
            const { access } = response.data;
            localStorage.setItem('access_token', access);
            originalRequest.headers.Authorization = `Bearer ${access}`;
            return apiClient(originalRequest);
          } catch (refreshError) {
            // Refresh failed, clear tokens
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/admin/login';
          }
        }
      }
    }

    return Promise.reject(error);
  }
);

// ============= PUBLIC API ENDPOINTS =============

/**
 * Get all cars with optional filters and pagination
 */
export const getCars = async (filters?: CarFilters): Promise<PaginatedResponse<Car>> => {
  const response = await apiClient.get('/cars/', { params: filters });
  return response.data;
};

/**
 * Get a single car by ID
 */
export const getCar = async (id: string): Promise<Car> => {
  const response = await apiClient.get(`/cars/${id}/`);
  return response.data;
};

/**
 * Record a car view (for analytics)
 */
export const recordCarView = async (id: string): Promise<void> => {
  await apiClient.post(`/cars/${id}/view/`);
};

/**
 * Get all categories
 */
export const getCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get('/cars/categories/');
  return response.data.results || response.data;
};

/**
 * Get all brands
 */
export const getBrands = async (): Promise<Brand[]> => {
  const response = await apiClient.get('/cars/brands/');
  return response.data.results || response.data;
};

/**
 * Submit an inquiry
 */
export const submitInquiry = async (data: InquiryFormData): Promise<Inquiry> => {
  const response = await apiClient.post('/analytics/inquiries/', data);
  return response.data;
};

// ============= ADMIN API ENDPOINTS =============

/**
 * Login admin user
 */
export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login/`, {
    username,
    password,
  });
  const { access, refresh } = response.data;

  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  return response.data;
};

/**
 * Logout admin user
 */
export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('access_token');
  }
  return false;
};

/**
 * Create a new car (admin only)
 */
export const createCar = async (data: Partial<Car>): Promise<Car> => {
  const response = await apiClient.post('/cars/admin/cars/', data);
  return response.data;
};

/**
 * Update a car (admin only)
 */
export const updateCar = async (id: string, data: Partial<Car>): Promise<Car> => {
  const response = await apiClient.put(`/cars/admin/cars/${id}/`, data);
  return response.data;
};

/**
 * Delete a car (admin only)
 */
export const deleteCar = async (id: string): Promise<void> => {
  await apiClient.delete(`/cars/admin/cars/${id}/`);
};

/**
 * Upload car images (admin only)
 */
export const uploadCarImages = async (carId: string, files: File[]): Promise<void> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('images', file);
  });
  await apiClient.post(`/cars/admin/cars/${carId}/images/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * Delete a car image (admin only)
 */
export const deleteCarImage = async (imageId: number): Promise<void> => {
  await apiClient.delete(`/cars/admin/cars/images/${imageId}/`);
};

/**
 * Get maintenance records for a car (admin only)
 */
export const getMaintenanceRecords = async (carId: string): Promise<MaintenanceRecord[]> => {
  const response = await apiClient.get(`/maintenance/admin/car/${carId}/`);
  return response.data;
};

/**
 * Get all maintenance records (admin only)
 */
export const getAllMaintenanceRecords = async (): Promise<MaintenanceRecord[]> => {
  const response = await apiClient.get('/maintenance/admin/all/');
  return response.data;
};

/**
 * Create maintenance record (admin only)
 */
export const createMaintenanceRecord = async (
  data: Partial<MaintenanceRecord>
): Promise<MaintenanceRecord> => {
  const response = await apiClient.post('/maintenance/admin/', data);
  return response.data;
};

/**
 * Update maintenance record (admin only)
 */
export const updateMaintenanceRecord = async (
  id: number,
  data: Partial<MaintenanceRecord>
): Promise<MaintenanceRecord> => {
  const response = await apiClient.put(`/maintenance/admin/${id}/`, data);
  return response.data;
};

/**
 * Delete maintenance record (admin only)
 */
export const deleteMaintenanceRecord = async (id: number): Promise<void> => {
  await apiClient.delete(`/maintenance/admin/${id}/`);
};

/**
 * Get all inquiries (admin only)
 */
export const getInquiries = async (): Promise<PaginatedResponse<Inquiry>> => {
  const response = await apiClient.get('/analytics/admin/inquiries/');
  return response.data;
};

/**
 * Update inquiry status (admin only)
 */
export const updateInquiryStatus = async (
  id: number,
  status: 'new' | 'contacted' | 'closed'
): Promise<Inquiry> => {
  const response = await apiClient.patch(`/analytics/admin/inquiries/${id}/`, { status });
  return response.data;
};

/**
 * Get analytics overview (admin only)
 */
export const getAnalyticsOverview = async (): Promise<AnalyticsOverview> => {
  const response = await apiClient.get('/analytics/admin/overview/');
  return response.data;
};

/**
 * Get all sales (admin only)
 */
export const getSales = async (): Promise<PaginatedResponse<Sale>> => {
  const response = await apiClient.get('/analytics/admin/sales/');
  return response.data;
};

/**
 * Create a sale record (admin only)
 */
export const createSale = async (data: Partial<Sale>): Promise<Sale> => {
  const response = await apiClient.post('/analytics/admin/sales/', data);
  return response.data;
};

/**
 * Create category (admin only)
 */
export const createCategory = async (data: Partial<Category>): Promise<Category> => {
  const response = await apiClient.post('/cars/admin/categories/', data);
  return response.data;
};

/**
 * Create brand (admin only)
 */
/**
 * Create brand (admin only)
 */
export const createBrand = async (data: Partial<Brand>): Promise<Brand> => {
  const response = await apiClient.post('/cars/admin/brands/', data);
  return response.data;
};

// ============= API OBJECT FOR HOOKS =============

/**
 * Grouped API object for use in custom hooks
 */
export const api = {
  cars: {
    list: getCars,
    get: getCar,
    recordView: recordCarView,
    create: createCar,
    update: updateCar,
    delete: deleteCar,
    uploadImages: uploadCarImages,
    deleteImage: deleteCarImage,
  },
  categories: {
    list: getCategories,
    create: createCategory,
  },
  brands: {
    list: getBrands,
    create: createBrand,
  },
  inquiries: {
    submit: submitInquiry,
    list: getInquiries,
    updateStatus: updateInquiryStatus,
  },
  maintenance: {
    getForCar: getMaintenanceRecords,
    getAll: getAllMaintenanceRecords,
    create: createMaintenanceRecord,
    update: updateMaintenanceRecord,
    delete: deleteMaintenanceRecord,
  },
  sales: {
    list: getSales,
    create: createSale,
  },
  analytics: {
    overview: getAnalyticsOverview,
  },
  auth: {
    login,
    logout,
    isAuthenticated,
  },
};

export default apiClient;

