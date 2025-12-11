import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

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

import { Navigation } from "@/components/Navigation";
import { CopyProtection } from "@/components/CopyProtection";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const adsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />

        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Google AdSense – load once, after hydration */}
        {adsenseId && (
          <Script
            id="adsense-script"
            strategy="afterInteractive"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 font-sans antialiased selection:bg-indigo-100 dark:selection:bg-indigo-900/30">
        <ThemeProvider>
          <Navigation />
          {children}

          {/* Floating theme toggle, if you’re using it globally */}
          <ThemeToggle />

          {/* Google Analytics 4 */}
          {gaId && <GoogleAnalytics measurementId={gaId} />}
        </ThemeProvider>
      </body>
    </html>
  );
}
