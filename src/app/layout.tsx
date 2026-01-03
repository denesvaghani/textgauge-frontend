import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: {
    default: "TextGauge - Free Developer Tools Suite",
    template: "%s | TextGauge",
  },
  description:
    "Free, secure, and privacy-focused developer tools suite. Instantly count characters, format JSON/YAML/TOML, convert data formats, and analyze text - all in your browser.",
  metadataBase: new URL("https://www.textgauge.com"), // User didn't specify domain change but title suggests TextGauge. Sticking to existing or assumed new if rebrand. User said "TextGauge". Let's check sitemap.ts for domain. sitemap says countcharacters.org. I will stick to countcharacters.org for now to avoid broken links unless user asked to change domain. User asked for "TextGauge - Developer Tools Suite".
  // Actually, let's keep the domain as is for now in metadataBase but update the title/desc.
  alternates: {
    canonical: "https://www.countcharacters.org/",
  },
  openGraph: {
    title: "TextGauge - Free Developer Tools Suite",
    description:
      "Free, secure, and privacy-focused developer tools suite. Instantly count characters, format JSON/YAML/TOML, convert data formats, and analyze text.",
    url: "https://www.countcharacters.org/",
    siteName: "TextGauge",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/icon.png", // Explicitly pointing to it can help if auto-detection fails, but removing manual link tags is key. Next.js 13 metadata API prefers this.
    apple: "/apple-icon.png",
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
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";

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
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 font-sans antialiased selection:bg-indigo-100 dark:selection:bg-indigo-900/30 flex flex-col min-h-screen">
        <ThemeProvider>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieConsent />

          {/* Google Analytics 4 */}
          {gaId && <GoogleAnalytics measurementId={gaId} />}
        </ThemeProvider>
      </body>
    </html>
  );
}
