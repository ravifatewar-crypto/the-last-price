import React from 'react';
import { OpportunityItem } from '@/types';

interface JsonLdProps {
  opportunity: OpportunityItem;
}

export const JsonLd: React.FC<JsonLdProps> = ({ opportunity }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: opportunity.title,
    description: opportunity.thesis,
    url: `https://thelastprice.in/opportunities/${opportunity.slug}`,
    datePosted: opportunity.createdAt || new Date().toISOString(),
    image: opportunity.images && opportunity.images.length > 0 ? opportunity.images[0] : undefined,
    offers: {
      '@type': 'Offer',
      price: opportunity.priceBand,
      priceCurrency: opportunity.country === 'UAE' ? 'AED' : 'INR',
      availability: 'https://schema.org/InStock',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: opportunity.city,
      addressCountry: opportunity.country,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
