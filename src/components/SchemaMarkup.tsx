import React from 'react';

interface SchemaMarkupProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  category?: string;
}

export function SchemaMarkup({ 
  name, 
  description, 
  url, 
  image = "https://www.countcharacters.org/images/logo/sunflower-logo.webp",
  category = "DeveloperApplication"
}: SchemaMarkupProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "url": url,
    "image": image,
    "applicationCategory": category,
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
