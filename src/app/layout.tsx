import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    default: "TextGauge - Free Word Counter & SEO Analyzer Tool",
    template: "%s | TextGauge",
  },
  description:
    "Free online word counter and SEO analyzer. Count words, characters, sentences, paragraphs. Analyze keyword density, reading time, and detect repeated phrases. No signup required.",
  keywords: [
    "word counter",
    "character counter",
    "SEO analyzer",
    "keyword density",
    "reading time calculator",
    "text analysis",
    "content optimization",
    "free word count",
    "sentence counter",
    "paragraph counter",
    "repeated phrase detector",
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
    url: "https://textgauge.com",
    siteName: "TextGauge",
    title: "TextGauge - Free Word Counter & SEO Analyzer",
    description:
      "Analyze word count, character count, reading time, keyword density, and repeated phrases instantly. Free SEO tool for content writers and bloggers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TextGauge - Free Word Counter & SEO Analyzer",
    description:
      "Free online word counter and SEO analyzer. Count words, analyze keyword density, and optimize your content.",
  },
  alternates: {
    canonical: "https://textgauge.com",
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
    name: "TextGauge",
    applicationCategory: "UtilityApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online word counter and SEO analyzer tool. Count words, characters, analyze keyword density and optimize your content.",
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
      </body>
    </html>
  );
}
