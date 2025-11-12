import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

// Query keys for caching
export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: () => [...categoryKeys.lists()] as const,
};

/**
 * Hook to fetch all car categories
 * Categories are cached for a long time since they change rarely
 */
export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.list(),
    queryFn: () => api.categories.list(),
    staleTime: 30 * 60 * 1000, // 30 minutes - categories don't change often
    gcTime: 60 * 60 * 1000, // Keep in cache for 1 hour
  });
}
