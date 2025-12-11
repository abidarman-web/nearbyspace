import React, { createContext, useContext, useState, useEffect } from 'react';
import { Review } from '../types';
import { supabase } from '../utils/supabaseClient';
import { REVIEWS } from '../constants';

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'status' | 'date'>) => Promise<void>;
  approveReview: (id: string) => Promise<void>;
  rejectReview: (id: string) => Promise<void>;
  pendingCount: number;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Fetch reviews from Supabase
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('date', { ascending: false });

        if (error) {
          console.error('Error fetching reviews:', error);
          // Fallback to local constants if database connection fails or table missing
          setReviews(REVIEWS);
        } else if (data) {
          setReviews(data as Review[]);
        }
      } catch (err) {
        console.error('Unexpected error fetching reviews:', err);
        setReviews(REVIEWS);
      }
    };

    fetchReviews();
  }, []);

  const addReview = async (newReviewData: Omit<Review, 'id' | 'status' | 'date'>) => {
    try {
      // We rely on the database to generate the ID (uuid or auto-increment)
      // or we can fallback to generating it if needed, but clean insert is better.
      const payload = {
        ...newReviewData,
        status: 'pending',
        date: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('reviews')
        .insert([payload])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        setReviews(prev => [data[0] as Review, ...prev]);
      }
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Failed to submit review. Please try again.');
    }
  };

  const approveReview = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ status: 'approved' })
        .eq('id', id);

      if (error) throw error;

      setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' as const } : r));
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };

  const rejectReview = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ status: 'rejected' })
        .eq('id', id);

      if (error) throw error;

      setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' as const } : r));
    } catch (error) {
      console.error('Error rejecting review:', error);
    }
  };

  const pendingCount = reviews.filter(r => r.status === 'pending').length;

  return (
    <ReviewContext.Provider value={{ reviews, addReview, approveReview, rejectReview, pendingCount }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};