import React, { useState } from 'react';
import { XMarkIcon, StarIcon } from '@heroicons/react/24/solid';
import { useReviews } from '../context/ReviewContext';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  const { addReview } = useReviews();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    text: '',
    rating: 5
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReview({
      ...formData,
      image: `https://picsum.photos/seed/${formData.name}/150/150` // Generate random avatar
    });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', role: '', text: '', rating: 5 });
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-dark-card w-full max-w-md rounded-2xl shadow-2xl p-6 animate-fade-in">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {!isSubmitted ? (
          <>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Write a Review</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                <input 
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-corporate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role / Job Title</label>
                <input 
                  required
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-corporate-500"
                  placeholder="e.g. Freelance Designer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({...formData, rating: star})}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <StarIcon className={`h-8 w-8 ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Review</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.text}
                  onChange={(e) => setFormData({...formData, text: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-corporate-500"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-corporate-600 hover:bg-corporate-700 text-white font-bold py-3 rounded-lg shadow-lg transform transition hover:-translate-y-1"
              >
                Submit Review
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <StarIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your review has been submitted for moderation. It will appear on the site once approved.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;