import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

// Query keys for caching
export const brandKeys = {
  all: ['brands'] as const,
  lists: () => [...brandKeys.all, 'list'] as const,
  list: () => [...brandKeys.lists()] as const,
};

/**
 * Hook to fetch all car brands
 * Brands are cached for a long time since they change rarely
 */
export function useBrands() {
  return useQuery({
    queryKey: brandKeys.list(),
    queryFn: () => api.brands.list(),
    staleTime: 30 * 60 * 1000, // 30 minutes - brands don't change often
    gcTime: 60 * 60 * 1000, // Keep in cache for 1 hour
  });
}
