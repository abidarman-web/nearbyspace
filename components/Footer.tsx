import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-5 dark:bg-black border-t border-gray-200 dark:border-gray-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-corporate-600 dark:text-white mb-4">NearbySpace.app</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              The premier platform for discovering co-working spaces and office rentals across India. No hidden fees, just great spaces.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                <a key={social} href={`#${social}`} className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-corporate-500 hover:shadow-md transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current opacity-50"></div> {/* Placeholder icon */}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Explore</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-corporate-500 transition-colors">Home</Link></li>
              <li><Link to="/gallery" className="text-gray-600 dark:text-gray-400 hover:text-corporate-500 transition-colors">Gallery</Link></li>
              <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-corporate-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-corporate-500 transition-colors">Contact</Link></li>
              <li><Link to="/admin" className="text-gray-600 dark:text-gray-400 hover:text-corporate-500 transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="mr-2">🏢</span>
                <span>123, Anna Salai, Teynampet,<br/>Chennai, Tamil Nadu 600018</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📧</span>
                <a href="mailto:hello@nearbyspace.app" className="hover:text-corporate-500">hello@nearbyspace.app</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-4 md:mb-0">
            &copy; 2024 NearbySpace.app. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
             <span>Made in</span>
             <span className="animate-pulse">🇮🇳</span>
             <span className="font-signature text-xl ml-2 text-corporate-600 dark:text-corporate-400">by Gowri and gowri alone</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;