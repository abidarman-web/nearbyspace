import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import SpaceCard from '../components/SpaceCard';
import AdUnit from '../components/AdUnit';
import ReviewModal from '../components/ReviewModal';
import { useReviews } from '../context/ReviewContext';
import { Space, GeoLocationState } from '../types';
import { FEATURED_SPACES, POPULAR_LOCATIONS } from '../constants';
import { getUserLocation, calculateDistance } from '../utils/geo';
import { MagnifyingGlassIcon, MapPinIcon, CurrencyRupeeIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

const Home: React.FC = () => {
  const { reviews } = useReviews();
  const [spaces, setSpaces] = useState<Space[]>(FEATURED_SPACES);
  const [geoState, setGeoState] = useState<GeoLocationState>({
    coords: null,
    error: null,
    loading: true,
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  // Search state
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  
  // Modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Load recent searches
  useEffect(() => {
    const saved = localStorage.getItem('recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Handle outside click to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Initial load animation
    const loadGeo = async () => {
      try {
        const position = await getUserLocation();
        const { latitude, longitude } = position.coords;
        setGeoState({ coords: { latitude, longitude }, error: null, loading: false });
        
        // Calculate distances and sort
        const spacesWithDistance = FEATURED_SPACES.map(space => ({
          ...space,
          distance: calculateDistance(latitude, longitude, space.coordinates.lat, space.coordinates.lng)
        })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
        
        setSpaces(spacesWithDistance);
      } catch (err) {
        setGeoState({ coords: null, error: 'Location permission denied. Showing all spaces.', loading: false });
      }
    };
    loadGeo();
  }, []);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 0) {
      const filtered = POPULAR_LOCATIONS.filter(loc => 
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setSearchSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(true);
      setSearchSuggestions([]);
    }
  };

  const handleSelectLocation = (location: string) => {
    setSearchTerm(location);
    setShowSuggestions(false);
    
    // Save to recent searches
    const updatedRecents = [location, ...recentSearches.filter(s => s !== location)].slice(0, 5);
    setRecentSearches(updatedRecents);
    localStorage.setItem('recent_searches', JSON.stringify(updatedRecents));
  };

  const handleUseCurrentLocation = async () => {
    setShowSuggestions(false);
    if (!geoState.coords) {
      // Trigger geo load if not already
      try {
         const position = await getUserLocation();
         const { latitude, longitude } = position.coords;
         setGeoState({ coords: { latitude, longitude }, error: null, loading: false });
         setSearchTerm(""); // Clear text to show "Near You" results logic
      } catch (e) {
        alert("Could not access location.");
      }
    } else {
      setSearchTerm(""); // Reset search term to default "Near You" sorting
    }
  };

  const filteredSpaces = spaces.filter(space => 
    space.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    space.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const approvedReviews = reviews.filter(r => r.status === 'approved');

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NearbySpace.app",
    "url": "https://nearbyspace.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://nearbyspace.app/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <SEO 
        title="Find Co-working & Office Space Rentals" 
        description="Discover premium co-working spaces and office rentals nearby in India. Zero subscription fees, direct owner connection."
        schema={schema}
      />
      
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://picsum.photos/id/193/1920/1080)',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white dark:to-dark-bg"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl px-4 text-center text-white animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Find Your Perfect <br className="hidden md:block" />
            <span className="text-corporate-400">Workspace Nearby</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Discover inspiring co-working environments and private offices across India. 
            No subscription fees. Just plug and play.
          </p>

          <div ref={searchContainerRef} className="relative max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-2xl flex items-center">
              <div className="pl-4 text-gray-300">
                <MapPinIcon className="h-6 w-6" />
              </div>
              <input
                type="text"
                placeholder="Search by city, area, or workspace name..."
                value={searchTerm}
                onChange={handleSearchInput}
                onFocus={() => setShowSuggestions(true)}
                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-300 px-4 py-3 text-lg"
              />
              <button className="bg-corporate-600 hover:bg-corporate-500 text-white px-8 py-3 rounded-full font-semibold transition-all">
                Search
              </button>
            </div>
            
            {/* Dynamic Autocomplete Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-card rounded-xl shadow-2xl overflow-hidden text-left z-50 animate-fade-in border border-gray-100 dark:border-gray-700">
                <button 
                  onClick={handleUseCurrentLocation}
                  className="w-full px-4 py-3 flex items-center hover:bg-corporate-50 dark:hover:bg-corporate-900/20 text-corporate-600 dark:text-corporate-400 transition-colors border-b border-gray-100 dark:border-gray-800"
                >
                  <MapPinIcon className="h-5 w-5 mr-3" />
                  <span className="font-medium">Use Current Location</span>
                </button>
                
                {searchSuggestions.length === 0 && searchTerm === '' && recentSearches.length > 0 && (
                   <div>
                     <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800/50">
                       Recent Searches
                     </div>
                     {recentSearches.map((term, idx) => (
                       <button
                         key={idx}
                         onClick={() => handleSelectLocation(term)}
                         className="w-full px-4 py-3 flex items-center hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors"
                       >
                         <ClockIcon className="h-4 w-4 mr-3 text-gray-400" />
                         {term}
                       </button>
                     ))}
                   </div>
                )}

                {searchSuggestions.map((suggestion, idx) => (
                   <button
                     key={idx}
                     onClick={() => handleSelectLocation(suggestion)}
                     className="w-full px-4 py-3 flex items-center hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors"
                   >
                     <MapPinIcon className="h-4 w-4 mr-3 text-gray-400" />
                     {suggestion}
                   </button>
                ))}
              </div>
            )}
          </div>
          
          {geoState.loading && (
             <div className="mt-4 text-sm text-gray-300 flex justify-center items-center">
               <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               Locating nearby spaces...
             </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <AdUnit />
        
        {/* Listings Section */}
        <section className="py-12">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {geoState.coords && !searchTerm ? 'Spaces Near You' : searchTerm ? `Results for "${searchTerm}"` : 'Recently Listed Spaces'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Handpicked professional environments for maximum productivity.
              </p>
            </div>
            <a href="/gallery" className="hidden md:inline-flex text-corporate-600 dark:text-corporate-400 font-semibold hover:underline">
              View All Spaces &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSpaces.slice(0, 6).map((space, index) => (
              <div key={space.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <SpaceCard space={space} />
              </div>
            ))}
          </div>
          {filteredSpaces.length === 0 && (
             <div className="text-center py-12 text-gray-500">
               No spaces found matching your search. Try checking our popular locations.
             </div>
          )}
        </section>

        {/* Why NearbySpace */}
        <section className="py-16 border-t border-gray-100 dark:border-gray-800">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Choose NearbySpace?</h2>
             <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
               We're revolutionizing how Indian professionals find work environments.
             </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: <CurrencyRupeeIcon className="h-12 w-12 mx-auto text-corporate-500 mb-4" />,
                title: 'Zero Subscription Fees',
                desc: 'Completely free for seekers. No hidden monthly charges or booking commissions.'
              },
              {
                icon: <MapPinIcon className="h-12 w-12 mx-auto text-corporate-500 mb-4" />,
                title: 'Hassle-Free Discovery',
                desc: 'Geo-location powered search helps you find the closest desk within seconds.'
              },
              {
                icon: <UserGroupIcon className="h-12 w-12 mx-auto text-corporate-500 mb-4" />,
                title: 'Direct Owner Connection',
                desc: 'Connect directly with building owners. No middlemen, transparent dealings.'
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-6 bg-gray-50 dark:bg-dark-card rounded-2xl hover:shadow-lg transition-shadow">
                {feature.icon}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Carousel */}
        <section className="py-16 overflow-hidden relative">
           <div className="flex justify-between items-center mb-12 px-2">
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trusted by Professionals</h2>
             <button 
               onClick={() => setIsReviewModalOpen(true)}
               className="bg-corporate-100 hover:bg-corporate-200 text-corporate-700 dark:bg-corporate-900 dark:text-corporate-100 dark:hover:bg-corporate-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
             >
               Write a Review
             </button>
           </div>
           
           <div className="relative w-full">
             <div className="flex space-x-6 animate-scroll w-max hover:[animation-play-state:paused]">
               {[...approvedReviews, ...approvedReviews].map((review, idx) => (
                 <div key={`${review.id}-${idx}`} className="w-80 md:w-96 bg-white dark:bg-dark-card p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 flex-shrink-0">
                    <div className="flex items-center mb-4">
                      <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{review.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{review.role}</p>
                      </div>
                    </div>
                    <div className="flex text-yellow-500 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 italic">"{review.text}"</p>
                 </div>
               ))}
             </div>
           </div>
        </section>
      </div>
      
      <ReviewModal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} />
    </>
  );
};

export default Home;