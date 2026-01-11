import type { Metadata } from 'next';
import URLEncoderClient from './URLEncoderClient';

export const metadata: Metadata = {
  title: 'URL Encoder Decoder | Free Online URL Encoding Tool',
  description: 'Free online URL encoder and decoder. Encode text for URLs, decode percent-encoded strings, parse query parameters, and build URLs visually. 100% client-side processing.',
  alternates: {
    canonical: 'https://www.countcharacters.org/url-encoder',
  },
  openGraph: {
    title: 'URL Encoder & Decoder',
    description: 'Encode and decode URLs instantly. Parse query parameters, handle UTF-8/emoji characters. Free developer tool.',
    url: 'https://www.countcharacters.org/url-encoder',
  },
  keywords: ['url encode', 'url decode', 'percent encoding', 'query string encoder', 'urlencode', 'developer tools'],
};

export default function URLEncoderPage() {
  return <URLEncoderClient />;
}
