'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Navbar, Footer, Container } from '@/components/layout';
import { Button, Spinner, Badge, Card, CardContent, Input } from '@/components/ui';
import { CarGallery, CarSpecs } from '@/components/cars';
import { useCar, useRecordCarView, useSubmitInquiry } from '@/hooks';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';

export default function CarDetailPage() {
  const params = useParams();
  const carId = parseInt(params.id as string);

  const { data: car, isLoading } = useCar(carId);
  const recordView = useRecordCarView();
  const submitInquiry = useSubmitInquiry();

  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // Record view when component mounts
  useState(() => {
    if (carId) {
      recordView.mutate(carId);
    }
  });

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitInquiry.mutateAsync({
        ...inquiryForm,
        car: carId,
      });
      setInquirySuccess(true);
      setInquiryForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setInquirySuccess(false), 5000);
    } catch (error) {
      console.error('Failed to submit inquiry:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <Spinner size="lg" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 py-20">
          <Container>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Vehicle Not Found
              </h1>
              <p className="text-gray-600 mb-8">
                The vehicle you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/cars">
                <Button>Browse All Cars</Button>
              </Link>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }

  const statusVariant = {
    available: 'success' as const,
    sold: 'danger' as const,
    reserved: 'warning' as const,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 py-8">
        <Container>
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/cars" className="text-blue-600 hover:underline">
              Cars
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">
              {car.brand?.name} {car.model}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images and Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Gallery */}
              <CarGallery
                images={car.images || []}
                alt={`${car.brand?.name} ${car.model}`}
              />

              {/* Specifications */}
              <CarSpecs car={car} />
            </div>

            {/* Right Column - Price and Contact */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Price Card */}
                <Card variant="shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {car.brand?.name} {car.model}
                      </h1>
                      <Badge variant={statusVariant[car.status]}>
                        {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
                      </Badge>
                    </div>

                    {car.category && (
                      <p className="text-gray-600 mb-4">{car.category.name}</p>
                    )}

                    <div className="text-4xl font-bold text-blue-600 mb-6">
                      {formatPrice(car.price)}
                    </div>

                    {/* Key Specs */}
                    <div className="space-y-3 mb-6 pb-6 border-b">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Year:</span>
                        <span className="font-medium">{car.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mileage:</span>
                        <span className="font-medium">
                          {car.mileage?.toLocaleString()} miles
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transmission:</span>
                        <span className="font-medium">
                          {car.transmission?.charAt(0).toUpperCase() + car.transmission?.slice(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fuel Type:</span>
                        <span className="font-medium">
                          {car.fuel_type?.charAt(0).toUpperCase() + car.fuel_type?.slice(1)}
                        </span>
                      </div>
                    </div>

                    {car.status === 'available' && (
                      <div className="space-y-3">
                        <Button className="w-full" size="lg">
                          Schedule Test Drive
                        </Button>
                        <Button className="w-full" variant="outline" size="lg">
                          Make an Offer
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Contact Form */}
                <Card variant="shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Interested in this car?
                    </h3>

                    {inquirySuccess && (
                      <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800 text-sm">
                          Thank you! We'll get back to you shortly.
                        </p>
                      </div>
                    )}

                    <form onSubmit={handleInquirySubmit} className="space-y-4">
                      <Input
                        label="Name"
                        type="text"
                        value={inquiryForm.name}
                        onChange={(e) =>
                          setInquiryForm({ ...inquiryForm, name: e.target.value })
                        }
                        required
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={inquiryForm.email}
                        onChange={(e) =>
                          setInquiryForm({ ...inquiryForm, email: e.target.value })
                        }
                        required
                      />
                      <Input
                        label="Phone"
                        type="tel"
                        value={inquiryForm.phone}
                        onChange={(e) =>
                          setInquiryForm({ ...inquiryForm, phone: e.target.value })
                        }
                        required
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Message
                        </label>
                        <textarea
                          value={inquiryForm.message}
                          onChange={(e) =>
                            setInquiryForm({ ...inquiryForm, message: e.target.value })
                          }
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="I'm interested in this vehicle..."
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        isLoading={submitInquiry.isPending}
                      >
                        Send Inquiry
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
