'use client';

import { useForm } from 'react-hook-form';
import { Sale } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useRouter } from 'next/navigation';

interface SaleFormProps {
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export default function SaleForm({ onSubmit, isLoading }: SaleFormProps) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      car: '',
      sale_price: '',
      sale_date: new Date().toISOString().split('T')[0],
      customer_name: '',
      customer_email: '',
      customer_phone: '',
      notes: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 gap-6">
        {/* Sale Details */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Sale Details</h3>
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
              <label className="block text-sm font-medium mb-1">Sale Price ($)</label>
              <Input 
                type="number" 
                step="0.01"
                {...register('sale_price', { required: 'Sale price is required', min: 0 })} 
                placeholder="0.00"
              />
              {errors.sale_price && <p className="text-red-500 text-sm mt-1">{errors.sale_price.message as string}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sale Date</label>
              <Input 
                type="date" 
                {...register('sale_date', { required: 'Sale date is required' })} 
              />
              {errors.sale_date && <p className="text-red-500 text-sm mt-1">{errors.sale_date.message as string}</p>}
            </div>
          </div>
        </Card>

        {/* Customer Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Customer Name</label>
              <Input 
                {...register('customer_name', { required: 'Customer name is required' })} 
                placeholder="John Doe"
              />
              {errors.customer_name && <p className="text-red-500 text-sm mt-1">{errors.customer_name.message as string}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email (Optional)</label>
              <Input 
                type="email"
                {...register('customer_email')} 
                placeholder="customer@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone (Optional)</label>
              <Input 
                type="tel"
                {...register('customer_phone')} 
                placeholder="+1 234 567 8900"
              />
            </div>
          </div>
        </Card>

        {/* Additional Notes */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Additional Notes</h3>
          <textarea
            {...register('notes')}
            rows={4}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2"
            placeholder="Any additional information about this sale..."
          />
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          Record Sale
        </Button>
      </div>
    </form>
  );
}
