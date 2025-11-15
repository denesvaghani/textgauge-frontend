// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Character Counter – Word & Character Count Tool",
  description:
    "Free online character counter and word count tool. Instantly count characters, words, sentences, and paragraphs, and analyze keyword density for SEO.",
  metadataBase: new URL("https://www.countcharacters.org"),
  alternates: {
    canonical: "https://www.countcharacters.org/",
    languages: {
      "en-IN": "https://www.countcharacters.in/",
    },
  },
  openGraph: {
    title: "Character Counter – Word & Character Count Tool",
    description:
      "Instantly count characters, words, sentences, and paragraphs, and optimize your writing for SEO.",
    url: "https://www.countcharacters.org/",
    siteName: "CountCharacters.org",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Character Counter – Word & Character Count Tool",
  url: "https://www.countcharacters.org",
  applicationCategory: "UtilityApplication",
  operatingSystem: "All",
  description:
    "Free online character counter and word count tool. Instantly count characters, words, sentences, and paragraphs, and analyze keyword density for SEO.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon / basic links */}
        <link rel="icon" href="/favicon.ico" />

        {/* ✅ JSON-LD: same on server + client, no conditional logic */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* ✅ AdSense: use Next <Script> so it loads after hydration, no mismatch */}
        {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID && (
          <Script
            id="adsense-loader"
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50">
        {/* ✅ ThemeProvider wraps everything that uses useTheme() */}
        <ThemeProvider>
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
