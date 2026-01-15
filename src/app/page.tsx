import type { Metadata } from 'next';
import HomeClient from './HomeClient';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'TextGauge: Character Counter & Developer Tools | countcharacters.org',
  description: 'TextGauge is a suite of free, secure developer tools: character counter, JSON/YAML formatters, and AI converters. 100% client-side and privacy-focused.',
  alternates: {
    canonical: 'https://www.countcharacters.org',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TextGauge: Free Developer Tools by countcharacters.org',
    description: 'Privacy-focused developer tools: Format JSON, Convert YAML, Compress Images, and AI Token Optimization. 100% Secure.',
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
