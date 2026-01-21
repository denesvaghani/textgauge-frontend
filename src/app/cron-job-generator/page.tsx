import { Metadata } from 'next';
import CronGeneratorClient from './CronGeneratorClient';

export const metadata: Metadata = {
  title: 'Cron Job Generator | Visual Crontab Builder',
  description: 'Free online Cron expression generator. Build standard crontab schedules visually with human-readable explanations. Includes quick presets for common schedules.',
  alternates: {
    canonical: 'https://www.countcharacters.org/cron-job-generator',
  },
  openGraph: {
    title: 'Cron Job Generator - Visual Builder',
    description: 'Build cron schedules easily. Free developer tool.',
    url: 'https://www.countcharacters.org/cron-job-generator',
    type: 'website',
  },
  keywords: ['cron generator', 'crontab generator', 'cron job builder', 'cron schedule', 'developer tools'],
  twitter: {
    card: 'summary_large_image',
    title: 'Cron Job Generator - Visual Builder',
    description: 'Build standard crontab schedules visually with human-readable explanations.',
    images: ['https://www.countcharacters.org/images/og-image.png'],
  },
};

import { StructuredData } from '@/components/StructuredData';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Cron Job Generator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Free online Cron expression generator. Build standard crontab schedules visually.',
};

export default function CronPage() {
  return (
    <>
      <StructuredData data={jsonLd} />
      <CronGeneratorClient />
    </>
  );
}
