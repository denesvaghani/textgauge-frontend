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
    default: "TextGauge - Count Characters, Convert Case, Find Repeating Phrases | Free SEO Tool",
    template: "%s | TextGauge",
  },
  description:
    "Free online tool to count characters, convert case (italic, uppercase, lowercase), detect repeating phrases, and analyze SEO. Text formatting and keyword density checker. No signup required.",
  keywords: [
    "count the character",
    "count characters online",
    "character counter free",
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
    "word counter",
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
    url: "https://textgauge.com",
    siteName: "TextGauge",
    title: "TextGauge - Count Characters, Convert Case, Find Repeating Phrases",
    description:
      "Free tool to count the character, convert the case (italic online free), detect repeating phrases, and analyze SEO. Perfect for content writers and bloggers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Count Characters, Convert Case & Detect Repeating Phrases Free",
    description:
      "Free online tool: count characters, convert case to italic/uppercase/lowercase, find repeating phrases, analyze keyword density. No signup required.",
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
