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
      "Free, secure, and privacy-focused developer tools suite. Instantly count characters, format JSON/YAML/TOML, convert data formats, and analyze text - all in your browser.",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      title: "TextGauge - Free Developer Tools Suite",
      description:
        "Free, secure, and privacy-focused developer tools suite. Instantly count characters, format JSON/YAML/TOML, convert data formats, and analyze text.",
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "TextGauge - Developer Tools Suite",
  url: "https://www.countcharacters.org",
  applicationCategory: "UtilityApplication",
  operatingSystem: "All",
  description:
    "Free, secure, and privacy-focused developer tools suite. Instantly count characters, format JSON/YAML/TOML, convert data formats, and analyze text - all in your browser.",
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
