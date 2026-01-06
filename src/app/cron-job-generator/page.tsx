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
};

export default function CronPage() {
  return <CronGeneratorClient />;
}
