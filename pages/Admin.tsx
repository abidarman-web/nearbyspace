import React from 'react';
import { useReviews } from '../context/ReviewContext';
import SEO from '../components/SEO';
import { CheckCircleIcon, XCircleIcon, StarIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

const Admin: React.FC = () => {
  const { reviews, approveReview, rejectReview } = useReviews();
  
  const pendingReviews = reviews.filter(r => r.status === 'pending');
  const historyReviews = reviews.filter(r => r.status !== 'pending');

  return (
    <>
      <SEO title="Admin Dashboard" description="Manage user reviews." />
      <div className="pt-24 pb-16 min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Review Moderation Dashboard</h1>

        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <ExclamationCircleIcon className="h-6 w-6 text-yellow-500 mr-2" />
            Pending Reviews ({pendingReviews.length})
          </h2>
          
          {pendingReviews.length === 0 ? (
            <div className="bg-white dark:bg-dark-card p-8 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-center text-gray-500">
              No pending reviews to moderate.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {pendingReviews.map((review) => (
                <div key={review.id} className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                       <span className="font-bold text-lg text-gray-900 dark:text-white mr-3">{review.name}</span>
                       <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{review.role}</span>
                    </div>
                    <div className="flex items-center text-yellow-400 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 italic">"{review.text}"</p>
                    <p className="text-xs text-gray-400 mt-2">Submitted: {new Date(review.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => approveReview(review.id)}
                      className="flex items-center px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium"
                    >
                      <CheckCircleIcon className="h-5 w-5 mr-1" /> Approve
                    </button>
                    <button 
                      onClick={() => rejectReview(review.id)}
                      className="flex items-center px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors font-medium"
                    >
                      <XCircleIcon className="h-5 w-5 mr-1" /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
           <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Moderation History</h2>
           <div className="bg-white dark:bg-dark-card rounded-xl shadow overflow-hidden border border-gray-200 dark:border-gray-700">
             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
               <thead className="bg-gray-50 dark:bg-gray-800">
                 <tr>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Review</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                 </tr>
               </thead>
               <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-gray-700">
                 {historyReviews.slice(0, 10).map((review) => (
                   <tr key={review.id}>
                     <td className="px-6 py-4 whitespace-nowrap">
                       <div className="text-sm font-medium text-gray-900 dark:text-white">{review.name}</div>
                       <div className="text-sm text-gray-500 dark:text-gray-400">{review.role}</div>
                     </td>
                     <td className="px-6 py-4">
                       <div className="text-sm text-gray-900 dark:text-gray-300 line-clamp-1">{review.text}</div>
                     </td>
                     <td className="px-6 py-4 whitespace-nowrap">
                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                         review.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                       }`}>
                         {review.status}
                       </span>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </>
  );
};

export default Admin;