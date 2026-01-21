import { Metadata } from "next";
import { ImageCompressorClient } from "../ImageCompressorClient";

export const metadata: Metadata = {
  title: "Compress Image to 50KB - Ultra-Compressed Photos | TextGauge",
  description:
    "Compress images to under 50KB for ultra-fast loading. Ideal for thumbnails, avatars, and mobile-optimized websites. Free, private, browser-based compression.",
  keywords: ["compress image to 50kb", "reduce image size to 50kb", "tiny image compressor", "ultra compress photo"],
  alternates: {
    canonical: "https://www.countcharacters.org/image-compressor/compress-to-50kb",
  },
  openGraph: {
    title: "Compress Image to 50KB - Ultra-Compressed Photos",
    description:
      "Compress any image to under 50KB. Perfect for thumbnails, avatars, and fast-loading websites. 100% private processing.",
    type: "website",
  },
};

export default function CompressTo50KBPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Compress an Image to 50KB",
            "description": "Step-by-step guide to compress any image to under 50KB using our free online tool.",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Upload your image",
                "text": "Drag and drop or click to upload your JPG, PNG, or WebP image."
              },
              {
                "@type": "HowToStep",
                "name": "Select the 50KB preset",
                "text": "Click the '≤50KB' preset button to apply ultra-compression settings."
              },
              {
                "@type": "HowToStep",
                "name": "Download compressed image",
                "text": "Click Download to save your tiny compressed image."
              }
            ]
          })
        }}
      />
      <ImageCompressorClient />
    </>
  );
}
