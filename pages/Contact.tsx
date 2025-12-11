import React, { useState } from 'react';
import SEO from '../components/SEO';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Listing Inquiry',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setStatus('success');
    setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', subject: 'Listing Inquiry', message: '' });
    }, 3000);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "description": "Contact NearbySpace support or visit our Chennai office."
  };

  return (
    <>
      <SEO 
        title="Contact Us" 
        description="Get in touch with NearbySpace.app team. Visit our office in Chennai or send us a message."
        schema={schema}
      />
      <div className="pt-24 pb-16 min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div className="animate-slide-up">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
              Have questions about listing your space or finding one? We're here to help.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-corporate-100 dark:bg-corporate-900/30 p-3 rounded-full">
                  <MapPinIcon className="h-6 w-6 text-corporate-600 dark:text-corporate-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Visit Us</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    NearbySpace HQ<br/>
                    123, Anna Salai, Teynampet<br/>
                    Chennai, Tamil Nadu 600018
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-corporate-100 dark:bg-corporate-900/30 p-3 rounded-full">
                  <EnvelopeIcon className="h-6 w-6 text-corporate-600 dark:text-corporate-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email Us</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    support@nearbyspace.app<br/>
                    listings@nearbyspace.app
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                 <div className="bg-corporate-100 dark:bg-corporate-900/30 p-3 rounded-full">
                  <PhoneIcon className="h-6 w-6 text-corporate-600 dark:text-corporate-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Call Us</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    +91 44 1234 5678<br/>
                    Mon - Fri, 9am - 6pm IST
                  </p>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="mt-12 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 h-64">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.845781033238!2d80.2483!3d13.0456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526632f41d9c01%3A0x6b492060851352!2sT.%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                title="Office Location"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-dark-card p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border-transparent focus:border-corporate-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-0 text-gray-900 dark:text-white transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border-transparent focus:border-corporate-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-0 text-gray-900 dark:text-white transition-colors"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border-transparent focus:border-corporate-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-0 text-gray-900 dark:text-white transition-colors"
                >
                  <option>Listing Inquiry</option>
                  <option>Booking Request</option>
                  <option>Partnership</option>
                  <option>General Support</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border-transparent focus:border-corporate-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-0 text-gray-900 dark:text-white transition-colors"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-corporate-600 hover:bg-corporate-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Send Message
              </button>

              {status === 'success' && (
                <div className="p-4 bg-green-100 text-green-700 rounded-lg text-center animate-fade-in">
                  Thank you! Your message has been sent successfully.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
