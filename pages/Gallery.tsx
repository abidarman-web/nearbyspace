import React from 'react';
import SEO from '../components/SEO';
import SpaceCard from '../components/SpaceCard';
import { useSpaces } from '../context/SpaceContext';
import { Link } from 'react-router-dom';

const Gallery: React.FC = () => {
  const { spaces, loading } = useSpaces();

  return (
    <>
      <SEO 
        title="All Listings" 
        description="Browse all co-working spaces and office rentals available on NearbySpace.app." 
      />
      <div className="pt-24 pb-16 min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Property Listings</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Explore our complete collection of premium workspaces tailored for your business needs.
            </p>
          </div>
          <Link 
            to="/list-your-space" 
            className="mt-4 md:mt-0 bg-corporate-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-corporate-700 transition-colors shadow-lg"
          >
            + Add Your Property
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-800 h-96 rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {spaces.map((space, index) => (
              <div key={space.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <SpaceCard space={space} />
                {space.capacity && (
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex justify-between px-2">
                    <span>Capacity: <span className="font-semibold text-gray-700 dark:text-gray-300">{space.capacity} Seats</span></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {spaces.length === 0 && !loading && (
            <div className="text-center py-20 bg-gray-50 dark:bg-dark-card rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No Listings Found</h3>
                <p className="text-gray-500">Be the first to list a property in this area.</p>
            </div>
        )}
      </div>
    </>
  );
};

export default Gallery;