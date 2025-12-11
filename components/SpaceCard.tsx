import React from 'react';
import { Space } from '../types';
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

interface SpaceCardProps {
  space: Space;
}

const SpaceCard: React.FC<SpaceCardProps> = ({ space }) => {
  return (
    <div className="group bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-800 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={space.image} 
          alt={space.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-corporate-600 dark:text-corporate-100 shadow-sm">
          {space.type}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{space.title}</h3>
          <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/30 px-1.5 py-0.5 rounded text-xs">
            <StarIcon className="h-3 w-3 text-yellow-500 mr-1" />
            <span className="font-bold text-yellow-700 dark:text-yellow-400">{space.rating || 'New'}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
          <MapPinIcon className="h-4 w-4 mr-1 text-corporate-500" />
          <span className="line-clamp-1">{space.location}</span>
          {space.distance !== undefined && (
            <span className="ml-2 text-xs bg-corporate-100 dark:bg-corporate-900 text-corporate-600 dark:text-corporate-100 px-2 py-0.5 rounded-full">
              {space.distance} km away
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {space.amenities.slice(0, 3).map((amenity, idx) => (
            <span key={idx} className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              {amenity}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 block">Starting from</span>
            <span className="text-lg font-bold text-corporate-600 dark:text-corporate-400">₹{space.price.toLocaleString()}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">/mo</span>
          </div>
          <Link 
            to={`/space/${space.id}`}
            className="bg-corporate-600 hover:bg-corporate-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-corporate-500/30"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;