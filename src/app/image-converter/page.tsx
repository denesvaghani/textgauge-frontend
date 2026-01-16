import type { Metadata } from "next";
import { ImageConverterClient } from "./ImageConverterClient";

export const metadata: Metadata = {
  title: "Image Format Converter - Free Online JPG PNG WebP AVIF Converter",
  description: "Convert images between JPG, PNG, WebP, and AVIF formats instantly. Support for iPhone HEIC photos and SVG files. 100% private, browser-based processing. No upload required.",
  keywords: ["image converter", "jpg to png", "png to webp", "heic to jpg", "avif converter", "free image converter", "online image converter"],
  openGraph: {
    title: "Free Image Format Converter | TextGauge",
    description: "Convert images between any format instantly. JPG, PNG, WebP, AVIF supported. 100% private processing.",
    type: "website",
  },
  alternates: {
    canonical: "https://www.countcharacters.org/image-converter",
  },
};

export default function ImageConverterPage() {
  return <ImageConverterClient />;
}
