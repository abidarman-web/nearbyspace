import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSpaces } from '../context/SpaceContext';
import SEO from '../components/SEO';
import { Space } from '../types';
import { MapPinIcon, WifiIcon, ComputerDesktopIcon, PrinterIcon, CheckCircleIcon, UserGroupIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const SpaceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { spaces, loading } = useSpaces();
  const [space, setSpace] = useState<Space | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  
  // Synthesize a gallery since our DB currently only holds one image
  const [gallery, setGallery] = useState<string[]>([]);

  useEffect(() => {
    if (spaces.length > 0 && id) {
      const foundSpace = spaces.find(s => s.id === id);
      if (foundSpace) {
        setSpace(foundSpace);
        const mainImage = foundSpace.image;
        // Mock gallery images
        const additionalImages = [
          'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80'
        ];
        // Combine and ensure unique
        const fullGallery = [mainImage, ...additionalImages].slice(0, 4);
        setGallery(fullGallery);
        setActiveImage(mainImage);
      }
    }
  }, [spaces, id]);

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-corporate-600"></div>
      </div>
    );
  }

  if (!space) {
    return (
      <div className="pt-24 pb-16 min-h-screen text-center px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Space Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">We couldn't find the listing you're looking for.</p>
        <Link to="/gallery" className="bg-corporate-600 text-white px-6 py-3 rounded-lg hover:bg-corporate-700 transition-colors">
          Back to Listings
        </Link>
      </div>
    );
  }

  const handleBook = () => {
    alert("Booking request sent! The owner will contact you shortly.");
  };

  return (
    <>
      <SEO 
        title={`${space.title} in ${space.location}`} 
        description={`Rent ${space.type} at ${space.title} in ${space.location}. Amenities include ${space.amenities.join(', ')}.`} 
      />
      <div className="pt-24 pb-16 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-corporate-100 dark:bg-corporate-900/30 text-corporate-700 dark:text-corporate-300 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                  {space.type}
                </span>
                <div className="flex items-center text-yellow-500">
                  <StarIconSolid className="h-4 w-4" />
                  <span className="text-sm font-semibold ml-1 text-gray-700 dark:text-gray-300">{space.rating || 'New'}</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{space.title}</h1>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPinIcon className="h-5 w-5 mr-2 text-corporate-500" />
                <span>{space.location}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-left md:text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Rent</p>
              <p className="text-3xl font-bold text-corporate-600 dark:text-corporate-400">₹{space.price.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 h-96 md:h-[500px] animate-slide-up">
          <div className="md:col-span-3 h-full relative group rounded-2xl overflow-hidden shadow-xl">
             <img 
               src={activeImage} 
               alt={space.title} 
               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
             />
             <div className="absolute inset-0 ring-1 ring-black/10 rounded-2xl pointer-events-none"></div>
          </div>
          <div className="hidden md:flex flex-col gap-4 h-full">
            {gallery.map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveImage(img)}
                className={`relative flex-1 rounded-xl overflow-hidden cursor-pointer ${activeImage === img ? 'ring-2 ring-corporate-500' : 'opacity-70 hover:opacity-100'}`}
              >
                <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About this space</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                Experience a premium workspace environment at {space.title}. Located in the heart of {space.location}, 
                this {space.type} offers a perfect blend of professional ambiance and modern comfort. 
                Ideal for freelancers, startups, and remote teams looking for a productive base. 
                Enjoy high-speed internet, ergonomic furniture, and a vibrant community.
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                {space.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
                {/* Add some default amenities if list is short for demo */}
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <WifiIcon className="h-5 w-5 text-corporate-500 mr-3 flex-shrink-0" />
                  <span>High-Speed WiFi</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <ComputerDesktopIcon className="h-5 w-5 text-corporate-500 mr-3 flex-shrink-0" />
                  <span>Printing Support</span>
                </div>
              </div>
            </div>

            {/* Capacity */}
            {space.capacity && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Capacity</h2>
                <div className="flex items-center bg-gray-50 dark:bg-dark-card p-4 rounded-xl inline-block border border-gray-200 dark:border-gray-700">
                   <UserGroupIcon className="h-6 w-6 text-corporate-500 mr-3" />
                   <span className="text-lg font-semibold text-gray-900 dark:text-white">{space.capacity} Seats Available</span>
                </div>
              </div>
            )}

            {/* Location Map Placeholder */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Location</h2>
              <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(space.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  className="absolute inset-0 opacity-80 hover:opacity-100 transition-opacity"
                  title="Map"
                ></iframe>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Exact location provided after booking.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Book this Space</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                   <span className="text-gray-600 dark:text-gray-400">Monthly Rent</span>
                   <span className="font-semibold text-gray-900 dark:text-white">₹{space.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                   <span className="text-gray-600 dark:text-gray-400">Service Fee</span>
                   <span className="font-semibold text-green-600">₹0</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center">
                   <span className="font-bold text-lg text-gray-900 dark:text-white">Total</span>
                   <span className="font-bold text-2xl text-corporate-600 dark:text-corporate-400">₹{space.price.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                 <button 
                   type="button"
                   onClick={handleBook}
                   className="w-full bg-corporate-600 hover:bg-corporate-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-corporate-500/30 hover:shadow-corporate-500/50 transition-all transform hover:-translate-y-1 flex items-center justify-center"
                 >
                   Request to Book
                 </button>
                 {space.contact_email && (
                   <a 
                     href={`mailto:${space.contact_email}?subject=Inquiry about ${space.title}`}
                     className="w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 font-bold py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all transform hover:-translate-y-1 flex items-center justify-center shadow-sm hover:shadow-md"
                   >
                     <EnvelopeIcon className="h-5 w-5 mr-2" />
                     Contact Owner
                   </a>
                 )}
              </div>
              
              <div className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
                <p>No payment is taken at this step.</p>
                <p className="mt-1">You'll communicate directly with the space owner.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default SpaceDetails;