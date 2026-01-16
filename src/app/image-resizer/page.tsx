import type { Metadata } from "next";
import { ImageResizerClient } from "./ImageResizerClient";

export const metadata: Metadata = {
  title: "Image Resizer - Free Online Batch Image Resize Tool",
  description: "Resize images to exact dimensions, percentage, or fit within bounds. Perfect for social media (Instagram, Twitter, LinkedIn), web assets, and print. 100% private, browser-based.",
  keywords: ["image resizer", "resize images online", "batch resize", "instagram size", "social media image resizer", "free image resizer"],
  openGraph: {
    title: "Free Image Resizer | TextGauge",
    description: "Resize images to any size instantly. Social media presets included. 100% private processing.",
    type: "website",
  },
  alternates: {
    canonical: "https://www.countcharacters.org/image-resizer",
  },
};

export default function ImageResizerPage() {
  return <ImageResizerClient />;
}
