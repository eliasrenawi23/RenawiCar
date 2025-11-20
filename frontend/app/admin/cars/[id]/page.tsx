'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCar, updateCar } from '@/lib/api';
import CarForm from '@/components/admin/CarForm';
import { Spinner } from '@/components/ui/Spinner';
import { useRouter, useParams } from 'next/navigation';

export default function EditCarPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const queryClient = useQueryClient();

  const { data: car, isLoading, error } = useQuery({
    queryKey: ['car', id],
    queryFn: () => getCar(id),
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => updateCar(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['car', id] });
      queryClient.invalidateQueries({ queryKey: ['cars'] });
      alert('Car updated successfully!');
    },
  });

  const handleSubmit = async (data: any) => {
    try {
      await updateMutation.mutateAsync(data);
    } catch (error) {
      console.error('Failed to update car', error);
      alert('Failed to update car. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error loading car details.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Edit Car</h1>
      <CarForm 
        initialData={car} 
        onSubmit={handleSubmit} 
        isLoading={updateMutation.isPending} 
        isEdit 
      />
    </div>
  );
}
