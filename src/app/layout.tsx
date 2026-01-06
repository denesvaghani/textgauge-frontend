import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") || "www.countcharacters.org";
  const protocol = "https"; // Force HTTPS for canonicals
  const domain = host.includes("countcharacters.in")
    ? "www.countcharacters.in"
    : "www.countcharacters.org";
  const baseUrl = `${protocol}://${domain}`;

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
    icons: {
      icon: "/images/logo/sunflower-logo.webp",
      apple: "/images/logo/sunflower-logo.webp",
    },
    verification: {
      google:
        domain === "www.countcharacters.in"
          ? process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION_IN
          : process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION_ORG,
      other: {
        "msvalidate.01":
          (domain === "www.countcharacters.in"
            ? process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION_IN
            : process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION_ORG) || "",
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
