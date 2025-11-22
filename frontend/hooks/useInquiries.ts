import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { InquiryFormData } from '@/types';

/**
 * Hook to submit a customer inquiry
 */
export function useSubmitInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: InquiryFormData) => api.inquiries.submit(data),
    onSuccess: () => {
      // Invalidate inquiries list for admin panel
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
}
