import React, { useState } from 'react';
import SEO from '../components/SEO';
import { XMarkIcon } from '@heroicons/react/24/outline';

const GALLERY_IMAGES = [
  'https://picsum.photos/id/48/800/1200',
  'https://picsum.photos/id/60/1200/800',
  'https://picsum.photos/id/3/800/800',
  'https://picsum.photos/id/180/1000/600',
  'https://picsum.photos/id/2/600/1000',
  'https://picsum.photos/id/20/800/600',
  'https://picsum.photos/id/42/1200/800',
  'https://picsum.photos/id/101/800/800',
];

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <SEO 
        title="Gallery" 
        description="View high-quality images of co-working spaces listed on NearbySpace." 
      />
      <div className="pt-24 pb-16 min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Space Gallery</h1>
          <p className="text-gray-600 dark:text-gray-400">A visual tour of our premium workspaces.</p>
        </div>

        {/* Masonry-style Grid using CSS Columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {GALLERY_IMAGES.map((src, index) => (
            <div 
              key={index} 
              className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden"
              onClick={() => setSelectedImage(src)}
            >
              <img 
                src={src} 
                alt={`Workspace gallery ${index + 1}`} 
                className="w-full h-auto transform transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">View</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white hover:text-gray-300 p-2"
              onClick={() => setSelectedImage(null)}
            >
              <XMarkIcon className="h-8 w-8" />
            </button>
            <img 
              src={selectedImage} 
              alt="Full view" 
              className="max-h-[90vh] max-w-full rounded shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;
