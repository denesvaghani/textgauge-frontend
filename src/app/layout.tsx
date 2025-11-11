import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Character Counter - Free Word Count & Character Count Tool Online",
    template: "%s | Character Counter",
  },
  description:
    "Free character counter and word count tool. Count characters, words, sentences instantly. Convert case, find repeating phrases, analyze keyword density for SEO. No signup required.",
  keywords: [
    "character counter",
    "word count",
    "character count",
    "word counter",
    "count characters",
    "count words",
    "count the character",
    "count characters online",
    "character counter free",
    "word count tool",
    "free word counter",
    "convert the case",
    "case converter online",
    "uppercase lowercase converter",
    "italic online free",
    "text formatting online",
    "repeating phrases",
    "repeated phrase detector",
    "find repeated words",
    "seo analyzer",
    "seo tool free",
    "keyword density checker",
    "text analysis tool",
    "content optimization",
    "reading time calculator",
  ],
  authors: [{ name: "TextGauge" }],
  creator: "TextGauge",
  publisher: "TextGauge",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.countcharacters.org",
    siteName: "Character Counter",
    title: "Character Counter - Free Word Count & Character Count Tool",
    description:
      "Free character counter and word count tool. Count words and characters instantly. Perfect for writers, bloggers, and content creators.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Character Counter - Free Word Count Tool",
    description:
      "Free online character counter and word count tool. Count words, characters, sentences instantly. No signup required.",
  },
  alternates: {
    canonical: "https://www.countcharacters.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Character Counter",
    applicationCategory: "UtilityApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online character counter and word count tool. Count words, characters, sentences, and paragraphs instantly. Analyze keyword density and optimize your content for SEO.",
  };

  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
