import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    // Check local storage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Browse Spaces', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Determine text color based on scroll state and page
  // On Home + Top: White text for visibility on dark hero
  // Otherwise: Standard dark/light mode text
  const isTransparent = isHome && !isScrolled;
  
  const textColorClass = isTransparent 
    ? 'text-white hover:text-gray-200' 
    : 'text-gray-700 dark:text-gray-300 hover:text-corporate-600 dark:hover:text-white';

  const logoClass = isTransparent
    ? 'text-white'
    : 'bg-clip-text text-transparent bg-gradient-to-r from-corporate-600 to-corporate-400';

  const activeLinkClass = isTransparent
    ? 'text-white bg-white/20'
    : 'text-corporate-600 dark:text-corporate-400 bg-corporate-50 dark:bg-corporate-900/20';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md shadow-sm' 
        : isHome ? 'bg-gradient-to-b from-black/50 to-transparent' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <span className={`text-2xl font-bold transition-colors duration-300 ${logoClass}`}>
                NearbySpace
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? activeLinkClass
                      : textColorClass
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                isTransparent 
                  ? 'text-white hover:bg-white/20' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
            </button>
            <Link to="/list-your-space" className="bg-corporate-600 hover:bg-corporate-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md transition-transform transform hover:scale-105 border border-transparent hover:border-corporate-400">
              List Your Space
            </Link>
          </div>

          <div className="-mr-2 flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                isTransparent ? 'text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
               {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${
                isTransparent ? 'text-white hover:text-gray-200' : 'text-gray-700 dark:text-gray-200 hover:text-corporate-600'
              }`}
            >
              {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-dark-card border-b border-gray-200 dark:border-gray-800 animate-slide-up shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                   isActive(link.path)
                      ? 'text-corporate-600 dark:text-corporate-400 bg-corporate-50 dark:bg-corporate-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-corporate-600 dark:hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/list-your-space" 
              onClick={() => setIsOpen(false)}
              className="block w-full text-center mt-4 bg-corporate-600 text-white px-3 py-2 rounded-md font-medium"
            >
              List Your Space
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;