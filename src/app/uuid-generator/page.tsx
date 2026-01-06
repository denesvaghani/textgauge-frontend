import { Metadata } from 'next';
import UuidGeneratorClient from './UuidGeneratorClient';

export const metadata: Metadata = {
  title: 'UUID Generator | Quick & Bulk v4 UUIDs',
  description: 'Free online bulk UUID generator. Generate up to 10,000 random version 4 UUIDs instantly. Features hyphen and uppercase toggles, copy to clipboard, and file download.',
  alternates: {
    canonical: 'https://www.countcharacters.org/uuid-generator',
  },
  openGraph: {
    title: 'UUID Generator - Bulk & Fast',
    description: 'Generate 1000s of unique UUIDs instantly. Free developer tool.',
    url: 'https://www.countcharacters.org/uuid-generator',
    type: 'website',
  },
  keywords: ['uuid generator', 'guid generator', 'random uuid', 'v4 uuid', 'bulk uuid generator', 'developer tools'],
};

export default function UuidGeneratorPage() {
  return <UuidGeneratorClient />;
}
