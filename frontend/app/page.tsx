'use client';

import Link from 'next/link';
import { Navbar, Footer, Container } from '@/components/layout';
import { Button, Card, CardContent, Spinner, Badge } from '@/components/ui';
import { CarGrid } from '@/components/cars';
import { useFeaturedCars, useCategories } from '@/hooks';

export default function Home() {
  const { data: featuredCars, isLoading: carsLoading } = useFeaturedCars(6);
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">
                Find Your Perfect Car Today
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Browse our extensive collection of quality vehicles. From luxury sedans to rugged SUVs, we have the perfect car waiting for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/cars">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Browse All Cars
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Statistics Section */}
        <section className="py-12 bg-white border-b">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {featuredCars?.results?.length || 0}+
                </div>
                <div className="text-gray-600">Quality Vehicles</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
                <div className="text-gray-600">Verified Listings</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-600">Customer Support</div>
              </div>
            </div>
          </Container>
        </section>

        {/* Categories Section */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Browse by Category
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find the perfect vehicle type that matches your lifestyle and needs
              </p>
            </div>

            {categoriesLoading ? (
              <div className="flex justify-center py-12">
                <Spinner size="lg" />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories?.map((category) => (
                  <Link key={category.id} href={`/cars?category=${category.id}`}>
                    <Card variant="shadow" className="hover:scale-105 transition-transform cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-3">🚗</div>
                        <h3 className="font-semibold text-gray-900">
                          {category.name}
                        </h3>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </Container>
        </section>

        {/* Featured Cars Section */}
        <section className="py-16 bg-gray-100">
          <Container>
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Featured Vehicles
                </h2>
                <p className="text-gray-600">
                  Check out our latest available cars
                </p>
              </div>
              <Link href="/cars">
                <Button variant="outline">View All</Button>
              </Link>
            </div>

            {carsLoading ? (
              <div className="flex justify-center py-12">
                <Spinner size="lg" />
              </div>
            ) : featuredCars?.results && featuredCars.results.length > 0 ? (
              <CarGrid cars={featuredCars.results} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No cars available at the moment.</p>
              </div>
            )}
          </Container>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-blue-600 text-white">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Find Your Dream Car?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Our team of experts is here to help you every step of the way. Contact us today to get started.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/cars">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Browse Inventory
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
