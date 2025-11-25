import { Metadata } from 'next';
import CarsClient from './CarsClient';

export const metadata: Metadata = {
  title: 'Browse Inventory',
  description: 'Explore our wide selection of premium vehicles. Filter by make, model, price, and more to find your dream car.',
};

export default function Page() {
  return <CarsClient />;
}
