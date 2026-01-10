import { Metadata } from 'next';
import Base64Client from './Base64Client';

export const metadata: Metadata = {
  title: 'Base64 Encoder Decoder | Image to Base64',
  description: 'Free online Base64 encoder and decoder. Convert text and files to Base64 strings or decode Base64 back to text instantly. Supports image to Base64 conversion.',
  alternates: {
    canonical: 'https://www.countcharacters.org/base64-encoder',
  },
  openGraph: {
    title: 'Base64 Encoder & Decoder',
    description: 'Convert text/files to Base64 and back. Free developer tool.',
    url: 'https://www.countcharacters.org/base64-encoder',
    type: 'website',
  },
  keywords: ['base64 encode', 'base64 decode', 'image to base64', 'base64 converter', 'developer tools'],
};

export default function Base64Page() {
  return <Base64Client />;
}
