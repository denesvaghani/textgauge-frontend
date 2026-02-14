import type { Metadata } from 'next';
import LearnClient from './LearnClient';

export const metadata: Metadata = {
  title: 'Developer Resources, Guides & Tutorials | TextGauge',
  description:
    'Learn JSON, YAML, CSV, image optimization, and developer workflows with practical guides, tutorials, and comparisons.',
  alternates: {
    canonical: 'https://www.countcharacters.org/learn',
  },
  openGraph: {
    title: 'Developer Resources, Guides & Tutorials | TextGauge',
    description:
      'Practical developer guides, tutorials, and comparisons for JSON, YAML, CSV, cron, and image optimization.',
    url: 'https://www.countcharacters.org/learn',
    siteName: 'TextGauge',
    type: 'website',
  },
};

export default function LearnPage() {
  return <LearnClient />;
}
