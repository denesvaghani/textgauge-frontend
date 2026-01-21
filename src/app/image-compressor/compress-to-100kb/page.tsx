import { Metadata } from "next";
import { ImageCompressorClient } from "../ImageCompressorClient";

export const metadata: Metadata = {
  title: "Compress Image to 100KB - Free Online Tool | TextGauge",
  description:
    "Compress any JPG, PNG, or WebP image to under 100KB for free. Perfect for email attachments, form uploads, and ID photos. Client-side processing - your images stay private.",
  keywords: ["compress image to 100kb", "reduce image size to 100kb", "image compressor 100kb", "photo under 100kb"],
  alternates: {
    canonical: "https://www.countcharacters.org/image-compressor/compress-to-100kb",
  },
  openGraph: {
    title: "Compress Image to 100KB - Free Online Tool",
    description:
      "Compress any image to under 100KB instantly. Perfect for email, forms, and ID photos. 100% private - no upload to servers.",
    type: "website",
  },
};

export default function CompressTo100KBPage() {
  return (
    <>
      {/* Schema.org structured data for this specific page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Compress an Image to 100KB",
            "description": "Step-by-step guide to compress any image to under 100KB using our free online tool.",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Upload your image",
                "text": "Drag and drop or click to upload your JPG, PNG, or WebP image."
              },
              {
                "@type": "HowToStep",
                "name": "Select the 100KB preset",
                "text": "Click the '≤100KB' preset button to apply optimal settings."
              },
              {
                "@type": "HowToStep",
                "name": "Download compressed image",
                "text": "Click Download to save your compressed image under 100KB."
              }
            ]
          })
        }}
      />
      
      {/* Reuse main component - preset will be selected via URL or user action */}
      <ImageCompressorClient />
    </>
  );
}
