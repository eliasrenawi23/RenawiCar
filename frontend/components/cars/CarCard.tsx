import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, Badge } from '@/components/ui';
import { formatPrice } from '@/lib/utils';
import type { Car } from '@/types';

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const mainImage = car.images?.[0]?.image || '/placeholder-car.jpg';

  const statusVariant = {
    available: 'success' as const,
    sold: 'danger' as const,
    reserved: 'warning' as const,
  };

  return (
    <Link href={`/cars/${car.id}`}>
      <Card variant="shadow" className="overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
        {/* Image */}
        <div className="relative h-48 w-full bg-gray-200">
          <Image
            src={mainImage}
            alt={`${car.brand?.name} ${car.model}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3">
            <Badge variant={statusVariant[car.status]}>
              {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {car.brand?.name} {car.model}
          </h3>

          {/* Category */}
          {car.category && (
            <p className="text-sm text-gray-500 mb-3">{car.category.name}</p>
          )}

          {/* Specs */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{car.year}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>{car.mileage?.toLocaleString()} mi</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-3 border-t">
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(car.price)}
            </span>
            <span className="text-sm text-gray-500">View Details →</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
