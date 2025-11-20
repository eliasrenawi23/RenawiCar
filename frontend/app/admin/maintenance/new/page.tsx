'use client';

import { useMutation } from '@tanstack/react-query';
import { createMaintenanceRecord } from '@/lib/api';
import MaintenanceForm from '@/components/admin/MaintenanceForm';
import { useRouter } from 'next/navigation';

export default function NewMaintenancePage() {
  const router = useRouter();
  
  const createMutation = useMutation({
    mutationFn: createMaintenanceRecord,
    onSuccess: () => {
      router.push('/admin/maintenance');
    },
  });

  const handleSubmit = async (data: any) => {
    try {
      // Calculate total_cost from parts
      const totalCost = data.parts?.reduce((sum: number, part: any) => {
        return sum + (parseFloat(part.part_cost) * parseInt(part.quantity));
      }, 0) || 0;

      await createMutation.mutateAsync({
        ...data,
        total_cost: totalCost.toString(),
      });
    } catch (error) {
      console.error('Failed to create maintenance record', error);
      alert('Failed to create maintenance record. Please check the form and try again.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Add Maintenance Record</h1>
      <MaintenanceForm onSubmit={handleSubmit} isLoading={createMutation.isPending} />
    </div>
  );
}
