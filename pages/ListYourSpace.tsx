import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useSpaces } from '../context/SpaceContext';
import { BuildingOfficeIcon, MapPinIcon, BanknotesIcon, UsersIcon, PhotoIcon } from '@heroicons/react/24/outline';

const ListYourSpace: React.FC = () => {
  const navigate = useNavigate();
  const { addSpace } = useSpaces();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    type: 'Hot Desk',
    capacity: '',
    image: '',
    amenities: '',
    contact_email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addSpace({
        title: formData.title,
        location: formData.location,
        price: Number(formData.price),
        type: formData.type,
        capacity: Number(formData.capacity),
        image: formData.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        amenities: formData.amenities.split(',').map(s => s.trim()),
        contact_email: formData.contact_email
      });
      alert('Your space has been listed successfully!');
      navigate('/gallery');
    } catch (error) {
      alert('Failed to list space. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="List Your Space" description="List your co-working space or office on NearbySpace.app" />
      <div className="pt-24 pb-16 min-h-screen px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">List Your Space</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Reach thousands of professionals looking for their next workspace.
          </p>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Basic Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
                Property Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Property Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      required
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-corporate-500 focus:border-corporate-500 py-2.5"
                      placeholder="e.g. Skyline Hub"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location (City/Area)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPinIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      required
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-corporate-500 focus:border-corporate-500 py-2.5"
                      placeholder="e.g. Indiranagar, Bangalore"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Space Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-corporate-500 focus:border-corporate-500 py-2.5 px-3"
                  >
                    <option>Hot Desk</option>
                    <option>Private Office</option>
                    <option>Meeting Room</option>
                    <option>Virtual Office</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Seating Capacity</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UsersIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      required
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-corporate-500 focus:border-corporate-500 py-2.5"
                      placeholder="e.g. 50"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing & Media */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
                Pricing & Media
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monthly Price (₹)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BanknotesIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      required
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-corporate-500 focus:border-corporate-500 py-2.5"
                      placeholder="e.g. 5000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PhotoIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-corporate-500 focus:border-corporate-500 py-2.5"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Leave blank for a random office image.</p>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
                Amenities & Contact
              </h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amenities (comma separated)</label>
                  <input
                    type="text"
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-corporate-500 focus:border-corporate-500 py-2.5 px-3"
                    placeholder="WiFi, Coffee, Parking, 24/7 Access"
                  />
                </div>
                
                 <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Owner Contact Email</label>
                  <input
                    required
                    type="email"
                    name="contact_email"
                    value={formData.contact_email}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-corporate-500 focus:border-corporate-500 py-2.5 px-3"
                    placeholder="owner@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-corporate-600 hover:bg-corporate-700 text-white font-bold py-3.5 rounded-xl shadow-lg transform transition hover:-translate-y-1 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Submitting...' : 'List My Space Now'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default ListYourSpace;