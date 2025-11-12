'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { CarImage } from '@/types';

interface CarGalleryProps {
  images: CarImage[];
  alt: string;
}

export function CarGallery({ images, alt }: CarGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">No images available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
        <Image
          src={images[selectedIndex].image}
          alt={`${alt} - Image ${selectedIndex + 1}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(index)}
              className={`relative h-20 bg-gray-200 rounded-lg overflow-hidden transition-all ${
                selectedIndex === index
                  ? 'ring-2 ring-blue-600'
                  : 'hover:ring-2 hover:ring-gray-300'
              }`}
            >
              <Image
                src={image.image}
                alt={`${alt} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="150px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      <div className="text-center text-sm text-gray-600">
        {selectedIndex + 1} / {images.length}
      </div>
    </div>
  );
}
