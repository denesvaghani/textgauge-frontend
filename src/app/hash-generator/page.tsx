import type { Metadata } from "next";
import HashGeneratorClient from "./HashGeneratorClient";

export const metadata: Metadata = {
  title: "Hash Generator - MD5, SHA-256, SHA-512 | TextGauge",
  description: "Free online hash generator. Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512 hashes instantly. All algorithms at once, security badges, file hashing, batch processing, and hash verification. 100% client-side.",
  keywords: ["hash generator", "MD5 hash", "SHA-256 hash", "SHA-512 hash", "SHA-1 hash", "file hash", "checksum", "hash calculator", "online hash tool", "free hash generator"],
  alternates: {
    canonical: "https://www.countcharacters.org/hash-generator",
  },
  openGraph: {
    title: "Hash Generator - MD5, SHA-256, SHA-512",
    description: "Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512 hashes instantly. All algorithms at once with security indicators.",
    url: "https://www.countcharacters.org/hash-generator",
    type: "website",
  },
};

export default function HashGeneratorPage() {
  return <HashGeneratorClient />;
}
