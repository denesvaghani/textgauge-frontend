import type { Metadata } from 'next';
import HomeClient from './HomeClient';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Character Counter & Text Analyzer | Free SEO Tools',
  description: 'Free online character counter, word counter, and SEO text analyzer. Check density, reading time, and more. No signup required.',
  alternates: {
    canonical: 'https://www.countcharacters.org',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TextGauge - Free Developer Tools Suite',
    description: 'Free, secure, and privacy-focused developer tools suite. Instantly count characters, format JSON/YAML, and analyze text.',
  }
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://www.countcharacters.org',
    name: 'TextGauge',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.countcharacters.org/?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
};

export default function Home() {
  return (
    <>
      <StructuredData data={jsonLd} />
      <HomeClient />
    </>
  );
}
