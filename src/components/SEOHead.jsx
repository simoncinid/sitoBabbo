import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = () => {
  const siteUrl = 'https://maisenza.it';
  const siteName = 'Mai Senza Impermeabilizzazioni';
  const title = 'Mai Senza Impermeabilizzazioni | Mauro Simoncini - Esperti dal 2004';
  const description = 'Mai senza conoscenza, cura e il prodotto giusto. Mauro Simoncini, esperto in impermeabilizzazioni dal 2004. Consulenza gratuita, soluzioni professionali per terrazzi, bagni, cantine e piscine.';
  const image = `${siteUrl}/assets/hero.png`;
  const keywords = 'impermeabilizzazione, terrazzo, bagno, cantina, piscina, infiltrazioni, manutenzione, consulenza, Mauro Simoncini, riparazione, prevenzione';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteName,
    "description": description,
    "url": siteUrl,
    "telephone": "+39-123-456-7890",
    "email": "info@maisenza.it",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IT"
    },
    "founder": {
      "@type": "Person",
      "name": "Mauro Simoncini"
    },
    "serviceArea": {
      "@type": "Country",
      "name": "Italy"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servizi di Impermeabilizzazione",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Impermeabilizzazione Terrazzi"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Riparazione Infiltrazioni"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Consulenza Tecnica"
          }
        }
      ]
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Mauro Simoncini" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="language" content="Italian" />
      <meta name="geo.region" content="IT" />
      <meta name="geo.country" content="Italy" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="it_IT" />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="theme-color" content="#1a5f3f" />
      <meta name="msapplication-TileColor" content="#1a5f3f" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://app.gpt-trainer.com" />
    </Helmet>
  );
};

export default SEOHead; 