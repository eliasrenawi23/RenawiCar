import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { InquiryCreate } from '@/types';

/**
 * Hook to submit a customer inquiry
 */
export function useSubmitInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: InquiryCreate) => api.inquiries.create(data),
    onSuccess: () => {
      // Invalidate inquiries list for admin panel
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
}
