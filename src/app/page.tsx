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

// WebSite schema for search action
const websiteSchema = {
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

// FAQ schema for rich results in Google
const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I count characters in my text?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Simply paste or type your text in the editor above. The character count updates instantly as you type. We show counts with and without spaces.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is this tool free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100% free with no limits. All our tools are free to use with unlimited usage. We sustain the platform through non-intrusive advertising.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does it count spaces?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we provide counts both with and without spaces to suit your needs. This is useful for platforms with different counting rules.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is my text private?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. All analysis happens 100% in your browser. Your text is never sent to our servers. We prioritize your privacy above all else.'
        }
      }
    ]
};

export default function Home() {
  return (
    <>
      <StructuredData data={websiteSchema} />
      <StructuredData data={faqSchema} />
      <HomeClient />
    </>
  );
}
