import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";



export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://www.countcharacters.org";

  return {
    title: {
      default: "TextGauge - Free Developer Tools Suite",
      template: "%s | TextGauge",
    },
    description:
      "Free developer tools: compress images, format JSON/YAML, generate UUIDs & hashes, compare text, and more. 100% browser-based, no server uploads.",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      title: "TextGauge - Free Developer Tools Suite",
      description:
        "Free developer tools: compress images, format JSON/YAML, generate UUIDs & hashes, compare text, and more. 100% browser-based, no uploads.",
      url: baseUrl,
      siteName: "TextGauge",
      type: "website",
      locale: "en_US",
    },
    manifest: "/manifest.json",
    themeColor: "#4f46e5",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.png", type: "image/png" },
        { url: "/images/logo/sunflower-logo.webp", type: "image/webp" },
      ],
      apple: "/images/logo/sunflower-logo.webp",
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION_ORG,
      other: {
        "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION_ORG || "",
      },
    },
  };
}

// Schema markup for Google Sitelinks and rich results
const structuredData = [
  // WebSite schema - enables SearchAction (search box in Google)
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.countcharacters.org/#website",
    name: "TextGauge",
    alternateName: "CountCharacters",
    url: "https://www.countcharacters.org",
    description: "Free developer tools: compress images, format JSON/YAML, generate UUIDs & hashes, compare text, and more. 100% browser-based, no uploads.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.countcharacters.org/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    inLanguage: "en-US"
  },
  // Organization schema - establishes brand identity
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.countcharacters.org/#organization",
    name: "TextGauge",
    url: "https://www.countcharacters.org",
    logo: {
      "@type": "ImageObject",
      url: "https://www.countcharacters.org/images/logo/sunflower-logo.webp",
      width: 512,
      height: 512
    },
    sameAs: [
      "https://www.linkedin.com/in/denesvaghani/"
    ],
    founder: {
      "@type": "Person",
      name: "Denes Vaghani",
      url: "https://www.countcharacters.org/team"
    }
  },
  // WebApplication schema
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://www.countcharacters.org/#application",
    name: "TextGauge - Developer Tools Suite",
    url: "https://www.countcharacters.org",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    description: "Free developer tools: compress images, format JSON/YAML, generate UUIDs & hashes, compare text, and more. 100% browser-based, no uploads.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    publisher: {
      "@id": "https://www.countcharacters.org/#organization"
    }
  },
  // SiteNavigationElement - helps Google understand main navigation
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://www.countcharacters.org/#navigation",
    name: "Main Navigation",
    itemListElement: [
      { "@type": "SiteNavigationElement", position: 1, name: "Character Counter", url: "https://www.countcharacters.org/" },
      { "@type": "SiteNavigationElement", position: 2, name: "JSON Formatter", url: "https://www.countcharacters.org/json-formatter" },
      { "@type": "SiteNavigationElement", position: 3, name: "Diff Checker", url: "https://www.countcharacters.org/diff-checker" },
      { "@type": "SiteNavigationElement", position: 4, name: "Image Compressor", url: "https://www.countcharacters.org/image-compressor" },
      { "@type": "SiteNavigationElement", position: 5, name: "JSON to CSV", url: "https://www.countcharacters.org/json-to-csv" },
      { "@type": "SiteNavigationElement", position: 6, name: "UUID Generator", url: "https://www.countcharacters.org/uuid-generator" },
      { "@type": "SiteNavigationElement", position: 7, name: "About Us", url: "https://www.countcharacters.org/about" },
      { "@type": "SiteNavigationElement", position: 8, name: "Team", url: "https://www.countcharacters.org/team" }
    ]
  }
];

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

        {/* AdSense Verification Meta Tag */}
        {adsenseId && (
          <meta name="google-adsense-account" content={adsenseId} />
        )}

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
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 font-sans antialiased selection:bg-indigo-200 selection:text-indigo-900 dark:selection:bg-indigo-500/40 dark:selection:text-indigo-50 flex flex-col min-h-screen">
        <ThemeProvider>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          
          {/* PWA: Register Service Worker */}
          <Script
             id="sw-registration"
             strategy="afterInteractive"
             dangerouslySetInnerHTML={{
               __html: `
                 if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
                   window.addEventListener('load', function() {
                     navigator.serviceWorker.register('/service-worker.js');
                   });
                 }
               `,
             }}
          />

          {/* Google Analytics 4 */}
          {gaId && <GoogleAnalytics measurementId={gaId} />}
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
