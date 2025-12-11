import React from 'react';
import SEO from '../components/SEO';

const About: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "NearbySpace.app",
      "description": "Connecting building owners and professionals for workspace rentals in India."
    }
  };

  return (
    <>
      <SEO 
        title="About Us" 
        description="Learn about NearbySpace.app's mission to democratize workspace rentals in India."
        schema={schema}
      />
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Reimagining Workspaces in India</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              We believe that finding a productive place to work shouldn't be complicated or expensive. 
              NearbySpace connects unused real estate with the vibrant workforce of tomorrow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16 animate-slide-up">
            <div className="rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
               <img src="https://picsum.photos/id/1/800/1000" alt="Team working" className="w-full h-auto" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                To create a decentralized network of accessible, affordable, and high-quality workspaces 
                within walking distance for every Indian professional.
              </p>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h2>
              <p className="text-gray-600 dark:text-gray-400">
                A world where "going to the office" means a short walk to a nearby hub, reducing commute stress, 
                pollution, and overhead costs while fostering local communities.
              </p>
            </div>
          </div>

          <div className="bg-corporate-50 dark:bg-dark-card rounded-2xl p-8 md:p-12 text-center animate-slide-up">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-sm">🤝</div>
                <h3 className="font-bold text-lg mb-2 dark:text-white">Trust</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Verified listings and genuine reviews.</p>
              </div>
              <div>
                 <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-sm">⚡</div>
                 <h3 className="font-bold text-lg mb-2 dark:text-white">Speed</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Find a desk in under 2 minutes.</p>
              </div>
              <div>
                 <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-sm">🇮🇳</div>
                 <h3 className="font-bold text-lg mb-2 dark:text-white">Local</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Built for India, by India.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
