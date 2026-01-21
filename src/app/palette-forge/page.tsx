import type { Metadata } from 'next';
import { PaletteForgeClient } from './PaletteForgeClient';
import { FlowerBackground } from '@/components/FlowerBackground';
import { flowerThemes } from '@/config/flowerThemes';

const theme = flowerThemes.orchid;

export const metadata: Metadata = {
  title: 'PaletteForge - Design Token Extractor | Convert Designs to Code Tokens',
  description:
    'Upload any design mockup and get production-ready color tokens for Tailwind, CSS, SCSS, and Figma. AI-powered palette extraction with accessibility checks and semantic naming. 100% free.',
  keywords: [
    'design tokens',
    'color palette',
    'tailwind colors',
    'css variables',
    'design system',
    'color extractor',
    'figma tokens',
    'accessibility checker',
    'wcag contrast',
    'color scale generator',
  ],
  alternates: {
    canonical: 'https://www.countcharacters.org/palette-forge',
  },
  openGraph: {
    title: 'PaletteForge - Design to Tokens in Seconds',
    description:
      'Convert design mockups to production-ready color tokens. Support for Tailwind, Figma, CSS, SCSS, and more.',
    type: 'website',
  },
};

export default function PaletteForge() {
  return (
    <FlowerBackground theme={theme} badgeText="Palette Extractor">
      <PaletteForgeClient />
    </FlowerBackground>
  );
}
