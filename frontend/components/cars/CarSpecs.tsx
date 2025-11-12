import type { Car } from '@/types';
import { formatNumber } from '@/lib/utils';

interface CarSpecsProps {
  car: Car;
}

export function CarSpecs({ car }: CarSpecsProps) {
  const specs = [
    { label: 'Year', value: car.year },
    { label: 'Brand', value: car.brand?.name },
    { label: 'Model', value: car.model },
    { label: 'Category', value: car.category?.name },
    { label: 'Mileage', value: car.mileage ? `${formatNumber(car.mileage)} miles` : 'N/A' },
    { label: 'Color', value: car.color },
    { label: 'Transmission', value: car.transmission?.charAt(0).toUpperCase() + car.transmission?.slice(1) },
    { label: 'Fuel Type', value: car.fuel_type?.charAt(0).toUpperCase() + car.fuel_type?.slice(1) },
    { label: 'Engine Size', value: car.engine_size ? `${car.engine_size}L` : 'N/A' },
    { label: 'Horsepower', value: car.horsepower ? `${car.horsepower} HP` : 'N/A' },
    { label: 'VIN', value: car.vin || 'N/A' },
    { label: 'Stock Number', value: car.stock_number || 'N/A' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specs.map((spec, index) => (
          <div key={index} className="flex justify-between py-3 border-b border-gray-200">
            <span className="font-medium text-gray-700">{spec.label}:</span>
            <span className="text-gray-900">{spec.value || 'N/A'}</span>
          </div>
        ))}
      </div>

      {/* Description */}
      {car.description && (
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
          <p className="text-gray-700 whitespace-pre-line">{car.description}</p>
        </div>
      )}

      {/* Features */}
      {car.features && (
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
          <p className="text-gray-700 whitespace-pre-line">{car.features}</p>
        </div>
      )}
    </div>
  );
}
