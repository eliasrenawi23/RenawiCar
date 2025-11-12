'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar, Footer, Container } from '@/components/layout';
import { Button, Spinner } from '@/components/ui';
import { CarGrid, CarFilters, SearchBar } from '@/components/cars';
import { useCars } from '@/hooks';
import type { CarFilters as CarFiltersType } from '@/types';

export default function CarsPage() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Partial<CarFiltersType>>({
    category: searchParams.get('category') || undefined,
    status: 'available',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { data: carsData, isLoading } = useCars({
    ...filters,
    search: searchQuery || undefined,
  });

  const handleFilterChange = (newFilters: Partial<CarFiltersType>) => {
    setFilters(newFilters);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 py-8">
        <Container>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Browse Our Inventory
            </h1>
            <p className="text-gray-600">
              Find your perfect vehicle from our extensive collection
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Results Summary */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {carsData?.count ? (
                <>
                  Showing <span className="font-semibold">{carsData.results.length}</span> of{' '}
                  <span className="font-semibold">{carsData.count}</span> vehicles
                </>
              ) : (
                'Loading...'
              )}
            </p>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <aside
              className={`lg:col-span-1 ${
                showFilters ? 'block' : 'hidden lg:block'
              }`}
            >
              <CarFilters filters={filters} onFilterChange={handleFilterChange} />
            </aside>

            {/* Car Grid */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <Spinner size="lg" />
                </div>
              ) : carsData?.results && carsData.results.length > 0 ? (
                <>
                  <CarGrid cars={carsData.results} />

                  {/* Pagination */}
                  {carsData.count > carsData.results.length && (
                    <div className="mt-8 flex justify-center">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          disabled={!carsData.previous}
                          onClick={() => {
                            // Handle previous page
                          }}
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          disabled={!carsData.next}
                          onClick={() => {
                            // Handle next page
                          }}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No vehicles found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <Button
                    onClick={() => {
                      setFilters({ status: 'available' });
                      setSearchQuery('');
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
