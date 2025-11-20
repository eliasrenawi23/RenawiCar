'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMaintenanceRecords, updateMaintenanceRecord } from '@/lib/api';
import MaintenanceForm from '@/components/admin/MaintenanceForm';
import { Spinner } from '@/components/ui/Spinner';
import { useRouter, useParams } from 'next/navigation';

export default function EditMaintenancePage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);
  const queryClient = useQueryClient();

  // Note: We need to fetch from the all records since we don't have a single record endpoint
  const { data: allRecords, isLoading, error } = useQuery({
    queryKey: ['maintenance-all'],
    queryFn: async () => {
      // This is a workaround - ideally we'd have a getMaintenanceRecord(id) function
      const records = await import('@/lib/api').then(m => m.getAllMaintenanceRecords());
      return records;
    },
  });

  const record = allRecords?.find((r: any) => r.id === id);

  const updateMutation = useMutation({
    mutationFn: (data: any) => updateMaintenanceRecord(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance-all'] });
      router.push('/admin/maintenance');
    },
  });

  const handleSubmit = async (data: any) => {
    try {
      // Calculate total_cost from parts
      const totalCost = data.parts?.reduce((sum: number, part: any) => {
        return sum + (parseFloat(part.part_cost) * parseInt(part.quantity));
      }, 0) || 0;

      await updateMutation.mutateAsync({
        ...data,
        total_cost: totalCost.toString(),
      });
    } catch (error) {
      console.error('Failed to update maintenance record', error);
      alert('Failed to update maintenance record. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !record) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error loading maintenance record.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Edit Maintenance Record</h1>
      <MaintenanceForm 
        initialData={record} 
        onSubmit={handleSubmit} 
        isLoading={updateMutation.isPending} 
        isEdit 
      />
    </div>
  );
}
