import React, { createContext, useContext, useState, useEffect } from 'react';
import { Review } from '../types';
import { REVIEWS } from '../constants';

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'status' | 'date'>) => void;
  approveReview: (id: string) => void;
  rejectReview: (id: string) => void;
  pendingCount: number;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load reviews from local storage or initialize with default constants
  useEffect(() => {
    const storedReviews = localStorage.getItem('nearbySpace_reviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    } else {
      setReviews(REVIEWS);
    }
  }, []);

  // Save to local storage whenever reviews change
  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem('nearbySpace_reviews', JSON.stringify(reviews));
    }
  }, [reviews]);

  const addReview = (newReviewData: Omit<Review, 'id' | 'status' | 'date'>) => {
    const newReview: Review = {
      ...newReviewData,
      id: `r${Date.now()}`,
      status: 'pending',
      date: new Date().toISOString(),
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const approveReview = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' as const } : r));
  };

  const rejectReview = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' as const } : r));
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