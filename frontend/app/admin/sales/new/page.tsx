'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSale } from '@/lib/api';
import SaleForm from '@/components/admin/SaleForm';
import { useRouter } from 'next/navigation';

export default function NewSalePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const createMutation = useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      router.push('/admin/sales');
    },
  });

  const handleSubmit = async (data: any) => {
    try {
      await createMutation.mutateAsync(data);
    } catch (error) {
      console.error('Failed to create sale record', error);
      alert('Failed to create sale record. Please check the form and try again.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Record New Sale</h1>
      <SaleForm onSubmit={handleSubmit} isLoading={createMutation.isPending} />
    </div>
  );
}
