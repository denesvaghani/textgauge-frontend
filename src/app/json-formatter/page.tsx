import { Metadata } from "next";
import JsonFormatterClient from "./JsonFormatterClient";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator | Beautify, Minify & Fix JSON Online",
  description: "Free online JSON Formatter, Validator, and Beautifier. Fix JSON errors, format with 2-space or 4-space indentation, and minify JSON files instantly. Secure, client-side processing.",
  alternates: {
    canonical: "https://www.countcharacters.org/json-formatter",
  },
  openGraph: {
    title: "JSON Formatter & Validator | Beautify, Minify & Fix JSON Online",
    description: "Free online JSON Formatter, Validator, and Beautifier. Fix JSON errors, format with 2-space or 4-space indentation, and minify JSON files instantly.",
    url: "https://www.countcharacters.org/json-formatter",
    siteName: "countcharacters.org",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Formatter & Validator",
    description: "Free online JSON Formatter, Validator, and Beautifier. Fix JSON errors instantly.",
  },
};

import { StructuredData } from "@/components/StructuredData";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "JSON Formatter",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description: "Free online JSON Formatter, Validator, and Beautifier. Fix JSON errors, format with 2-space or 4-space indentation.",
};

export default function Page() {
  return (
    <>
      <StructuredData data={jsonLd} />
      <JsonFormatterClient />
    </>
  );
}
