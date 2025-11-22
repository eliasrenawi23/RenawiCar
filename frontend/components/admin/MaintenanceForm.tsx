'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { MaintenanceRecord } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useRouter } from 'next/navigation';

interface MaintenanceFormProps {
  initialData?: MaintenanceRecord;
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
  isEdit?: boolean;
}

export default function MaintenanceForm({ initialData, onSubmit, isLoading, isEdit }: MaintenanceFormProps) {
  const router = useRouter();
  const { register, handleSubmit, control, formState: { errors }, watch } = useForm({
    defaultValues: initialData || {
      car: '',
      repair_date: new Date().toISOString().split('T')[0],
      description: '',
      parts: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'parts',
  });

  const parts = watch('parts');
  const totalCost = parts?.reduce((sum: number, part: any) => {
    const partCost = parseFloat(part.part_cost || 0);
    const quantity = parseInt(part.quantity || 0);
    return sum + (partCost * quantity);
  }, 0) || 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 gap-6">
        {/* Basic Info */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Maintenance Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Car ID (UUID)</label>
              <Input 
                {...register('car', { required: 'Car ID is required' })} 
                placeholder="e.g. 123e4567-e89b-12d3-a456-426614174000"
              />
              {errors.car && <p className="text-red-500 text-sm mt-1">{errors.car.message as string}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Repair Date</label>
              <Input 
                type="date" 
                {...register('repair_date', { required: 'Repair date is required' })} 
              />
              {errors.repair_date && <p className="text-red-500 text-sm mt-1">{errors.repair_date.message as string}</p>}
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={4}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2"
              placeholder="Describe the maintenance work performed..."
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message as string}</p>}
          </div>
        </Card>

        {/* Parts */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Parts Used</h3>
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ part_name: '', part_cost: '', quantity: 1, notes: '' } as any)}
            >
              ➕ Add Part
            </Button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Part Name</label>
                    <Input {...register(`parts.${index}.part_name` as const, { required: true })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Cost ($)</label>
                    <Input 
                      type="number" 
                      step="0.01"
                      {...register(`parts.${index}.part_cost` as const, { required: true })} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Quantity</label>
                    <Input 
                      type="number" 
                      {...register(`parts.${index}.quantity` as const, { required: true, min: 1 })} 
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium mb-1">Notes (Optional)</label>
                  <Input {...register(`parts.${index}.notes` as const)} placeholder="Additional notes..." />
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subtotal: ${((Number(parts?.[index]?.part_cost || 0) * Number(parts?.[index]?.quantity || 0))).toFixed(2)}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => remove(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}

            {fields.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No parts added yet. Click "Add Part" to get started.
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Cost:</span>
              <span className="text-primary-600 dark:text-primary-400">${totalCost.toFixed(2)}</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {isEdit ? 'Update Record' : 'Create Record'}
        </Button>
      </div>
    </form>
  );
}
