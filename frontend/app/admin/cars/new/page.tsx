'use client';

import { useMutation } from '@tanstack/react-query';
import { createCar } from '@/lib/api';
import CarForm from '@/components/admin/CarForm';
import { useRouter } from 'next/navigation';

export default function NewCarPage() {
  const router = useRouter();
  
  const createMutation = useMutation({
    mutationFn: createCar,
    onSuccess: (data) => {
      // Redirect to edit page to upload images
      router.push(`/admin/cars/${data.id}`);
    },
  });

  const handleSubmit = async (data: any) => {
    try {
      await createMutation.mutateAsync(data);
    } catch (error) {
      console.error('Failed to create car', error);
      alert('Failed to create car. Please check the form and try again.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Add New Car</h1>
      <CarForm onSubmit={handleSubmit} isLoading={createMutation.isPending} />
    </div>
  );
}
