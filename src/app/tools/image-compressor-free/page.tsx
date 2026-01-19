import { Metadata } from "next";
import { AdLandingPage } from "@/components/AdLandingPage";
import { Image, Gauge, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Image Compressor - Compress JPG, PNG, WebP Online | TextGauge",
  description:
    "Compress images without losing quality. Reduce JPG, PNG, and WebP file sizes instantly. Free online tool with batch processing and preset targets.",
  alternates: {
    canonical: "https://www.countcharacters.org/tools/image-compressor-free",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Free Image Compressor - Compress JPG, PNG, WebP Online",
    description:
      "Compress images without losing quality. Reduce file sizes instantly with batch processing.",
  },
};

export default function ImageCompressorLandingPage() {
  return (
    <AdLandingPage
      toolName="Image Compressor"
      toolSlug="image-compressor"
      headline="Compress Images Without Quality Loss"
      subheadline="Reduce JPG, PNG, and WebP file sizes by up to 80%. Perfect for web optimization, email attachments, and social media uploads."
      ctaText="Compress Images Now - Free"
      features={[
        "Compress to specific sizes: 100KB, 50KB, or custom",
        "Batch processing - compress multiple images at once",
        "Before/after preview with quality comparison",
        "Supports JPG, PNG, WebP, and GIF formats",
        "Download individually or as a ZIP file",
        "100% browser-based - your images stay private",
        "Maintain image quality with smart compression",
        "One-click presets for web, email, and print",
      ]}
      benefits={[
        {
          icon: <Image className="w-6 h-6" />,
          title: "Quality Preserved",
          description:
            "Advanced compression algorithms maintain visual quality while reducing file size.",
        },
        {
          icon: <Gauge className="w-6 h-6" />,
          title: "Size Presets",
          description:
            "One-click presets for common targets: 100KB, 50KB, or set your own limit.",
        },
        {
          icon: <Download className="w-6 h-6" />,
          title: "Batch Download",
          description:
            "Compress multiple images and download them all as a convenient ZIP file.",
        },
      ]}
    />
  );
}
