import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-gray-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-corporate-600 dark:text-white mb-4">NearbySpace.app</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              The premier platform for discovering co-working spaces and office rentals across India. No hidden fees, just great spaces.
            </p>
            <div className="flex space-x-4">
              {/* Twitter / X */}
              <a href="#twitter" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-corporate-500 hover:shadow-md transition-all">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
              </a>
              {/* Facebook */}
              <a href="#facebook" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-corporate-500 hover:shadow-md transition-all">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
              </a>
              {/* Instagram */}
              <a href="#instagram" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-corporate-500 hover:shadow-md transition-all">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.047 1.407-.06 4.123-.06h.08zm-1.634 14.634a3.652 3.652 0 110-7.304 3.652 3.652 0 010 7.304zm0-5.936a2.284 2.284 0 100 4.568 2.284 2.284 0 000-4.568zm6.535-3.1a.913.913 0 110-1.826.913.913 0 010 1.826z" clipRule="evenodd"></path></svg>
              </a>
              {/* LinkedIn */}
              <a href="#linkedin" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-corporate-500 hover:shadow-md transition-all">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Explore</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-corporate-500 transition-colors">Home</Link></li>
              <li><Link to="/gallery" className="text-gray-600 dark:text-gray-400 hover:text-corporate-500 transition-colors">Browse Spaces</Link></li>
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
            &copy; {currentYear} NearbySpace.app. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
             <span>Made in</span>
             <span className="animate-pulse">🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;