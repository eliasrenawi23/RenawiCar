import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Car, CarFilters } from '@/types';

// Query keys for caching
export const carKeys = {
  all: ['cars'] as const,
  lists: () => [...carKeys.all, 'list'] as const,
  list: (filters?: CarFilters) => [...carKeys.lists(), filters] as const,
  details: () => [...carKeys.all, 'detail'] as const,
  detail: (id: number) => [...carKeys.details(), id] as const,
};

/**
 * Hook to fetch list of cars with optional filters
 * Supports pagination, search, and filtering
 */
export function useCars(filters?: CarFilters) {
  return useQuery({
    queryKey: carKeys.list(filters),
    queryFn: () => api.cars.list(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch a single car by ID
 */
export function useCar(id: number) {
  return useQuery({
    queryKey: carKeys.detail(id),
    queryFn: () => api.cars.get(id),
    enabled: !!id, // Only run if ID exists
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to record a car view (for analytics)
 */
export function useRecordCarView() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (carId: number) => api.cars.recordView(carId),
    onSuccess: () => {
      // Invalidate analytics queries if needed
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
}

/**
 * Hook to get featured/available cars for homepage
 */
export function useFeaturedCars(limit: number = 6) {
  return useQuery({
    queryKey: [...carKeys.lists(), 'featured', limit],
    queryFn: () => api.cars.list({ status: 'available', page_size: limit }),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
