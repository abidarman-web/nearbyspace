import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  schema?: object;
}

const SEO: React.FC<SEOProps> = ({ title, description, canonical, schema }) => {
  useEffect(() => {
    document.title = `${title} | NearbySpace.app`;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update Canonical
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonical);
    }

    // Inject JSON-LD
    if (schema) {
      let scriptSchema = document.querySelector('#json-ld-schema');
      if (!scriptSchema) {
        scriptSchema = document.createElement('script');
        scriptSchema.id = 'json-ld-schema';
        scriptSchema.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptSchema);
      }
      scriptSchema.textContent = JSON.stringify(schema);
    }
  }, [title, description, canonical, schema]);

  return null;
};

export default SEO;
