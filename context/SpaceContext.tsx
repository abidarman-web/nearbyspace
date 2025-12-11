import React, { createContext, useContext, useState, useEffect } from 'react';
import { Space } from '../types';
import { supabase } from '../utils/supabaseClient';
import { FEATURED_SPACES } from '../constants';

interface SpaceContextType {
  spaces: Space[];
  addSpace: (space: Omit<Space, 'id' | 'rating' | 'coordinates' | 'distance'>) => Promise<void>;
  loading: boolean;
}

const SpaceContext = createContext<SpaceContextType | undefined>(undefined);

export const SpaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [spaces, setSpaces] = useState<Space[]>(FEATURED_SPACES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const { data, error } = await supabase
          .from('spaces')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching spaces:', error.message || error);
          // Don't overwrite spaces here, keep FEATURED_SPACES default
        } else if (data) {
          // Map DB fields to Space interface (handling potential missing coords by defaulting)
          const dbSpaces: Space[] = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            location: item.location,
            price: item.price,
            type: item.type,
            image: item.image || 'https://picsum.photos/800/600',
            rating: item.rating || 0,
            amenities: item.amenities || [],
            capacity: item.capacity,
            contact_email: item.contact_email,
            coordinates: { lat: 13.0827, lng: 80.2707 }, // Default to Chennai if no coords stored
          }));
          setSpaces([...FEATURED_SPACES, ...dbSpaces]);
        }
      } catch (err) {
        console.error('Unexpected error fetching spaces:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  const addSpace = async (newSpace: Omit<Space, 'id' | 'rating' | 'coordinates' | 'distance'>) => {
    try {
      const { data, error } = await supabase
        .from('spaces')
        .insert([{
          title: newSpace.title,
          location: newSpace.location,
          price: newSpace.price,
          type: newSpace.type,
          image: newSpace.image,
          amenities: newSpace.amenities,
          capacity: newSpace.capacity,
          contact_email: newSpace.contact_email,
          status: 'approved' // Auto-approve for now
        }])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        const createdSpace: Space = {
            id: data[0].id,
            title: data[0].title,
            location: data[0].location,
            price: data[0].price,
            type: data[0].type,
            image: data[0].image,
            rating: 0,
            amenities: data[0].amenities || [],
            capacity: data[0].capacity,
            contact_email: data[0].contact_email,
            coordinates: { lat: 13.0827, lng: 80.2707 },
        };
        setSpaces(prev => [createdSpace, ...prev]);
      }
    } catch (error: any) {
      console.error('Error adding space:', error.message || error);
      throw error;
    }
  };

  return (
    <SpaceContext.Provider value={{ spaces, addSpace, loading }}>
      {children}
    </SpaceContext.Provider>
  );
};

export const useSpaces = () => {
  const context = useContext(SpaceContext);
  if (!context) {
    throw new Error('useSpaces must be used within a SpaceProvider');
  }
  return context;
};