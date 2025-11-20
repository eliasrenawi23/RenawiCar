'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Car, Category, Brand } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { getCategories, getBrands, uploadCarImages, deleteCarImage } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface CarFormProps {
  initialData?: Car;
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
  isEdit?: boolean;
}

export default function CarForm({ initialData, onSubmit, isLoading, isEdit }: CarFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: initialData || {
      status: 'available',
      transmission: 'automatic',
      fuel_type: 'petrol',
      features: [],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, brds] = await Promise.all([getCategories(), getBrands()]);
        setCategories(cats);
        setBrands(brds);
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };
    fetchData();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !initialData?.id) return;
    
    setUploading(true);
    try {
      await uploadCarImages(initialData.id, Array.from(e.target.files));
      // Refresh page to show new images
      router.refresh();
    } catch (error) {
      console.error('Failed to upload images', error);
      alert('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!confirm('Delete this image?')) return;
    try {
      await deleteCarImage(imageId);
      router.refresh();
    } catch (error) {
      console.error('Failed to delete image', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <Card className="p-6 md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Make</label>
              <Input {...register('make', { required: 'Make is required' })} placeholder="e.g. Toyota" />
              {errors.make && <p className="text-red-500 text-sm mt-1">{errors.make.message as string}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Model</label>
              <Input {...register('model', { required: 'Model is required' })} placeholder="e.g. Camry" />
              {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model.message as string}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Year</label>
              <Input 
                type="number" 
                {...register('year', { required: 'Year is required', min: 1900, max: new Date().getFullYear() + 1 })} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price ($)</label>
              <Input 
                type="number" 
                step="0.01"
                {...register('price', { required: 'Price is required', min: 0 })} 
              />
            </div>
          </div>
        </Card>

        {/* Details */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Vehicle Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select 
                {...register('category')}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2"
              >
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Brand</label>
              <select 
                {...register('brand')}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2"
              >
                <option value="">Select Brand</option>
                {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mileage (km)</label>
              <Input type="number" {...register('mileage', { required: true })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">VIN</label>
              <Input {...register('vin', { required: true })} />
            </div>
          </div>
        </Card>

        {/* Specs */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Specifications</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Transmission</label>
              <select 
                {...register('transmission')}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2"
              >
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fuel Type</label>
              <select 
                {...register('fuel_type')}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2"
              >
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <Input {...register('color', { required: true })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select 
                {...register('status')}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2"
              >
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="reserved">Reserved</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Description */}
        <Card className="p-6 md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Description</h3>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2"
            placeholder="Detailed description of the vehicle..."
          />
        </Card>

        {/* Images (Only show in edit mode) */}
        {isEdit && initialData && (
          <Card className="p-6 md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Images</h3>
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={uploading}
                />
                <Button type="button" disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Upload Images'}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {initialData.images?.map((img) => (
                <div key={img.id} className="relative group aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img src={img.image_url} alt="Car" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(img.id)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                </div>
              ))}
              {initialData.images?.length === 0 && (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No images uploaded yet.
                </div>
              )}
            </div>
          </Card>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {isEdit ? 'Update Car' : 'Create Car'}
        </Button>
      </div>
    </form>
  );
}
