import { Metadata } from "next";
import { ImageCompressorClient } from "./ImageCompressorClient";

export const metadata: Metadata = {
  title: "Image Compressor - Compress JPG, PNG, WebP Online | TextGauge",
  description:
    "Free online image compressor. Compress JPG, PNG, and WebP images while maintaining quality. Resize, convert formats, and download optimized images client-side.",
  openGraph: {
    title: "Image Compressor - Compress JPG, PNG, WebP Online | TextGauge",
    description:
      "Free online image compressor. Compress JPG, PNG, and WebP images while maintaining quality. Resize, convert formats, and download optimized images client-side.",
    type: "website",
  },
};

export default function ImageCompressorPage() {
  return <ImageCompressorClient />;
}
