import { Metadata } from "next";
import { ImageMergerClient } from "./ImageMergerClient";

export const metadata: Metadata = {
  title: "Image Merger - Combine & Stitch Images Online | TextGauge",
  description:
    "Free online image merger. Combine multiple images into one. Stitch photos vertically for scrolling screenshots or horizontally for comparisons. 100% private and browser-based.",
  alternates: {
    canonical: "https://www.countcharacters.org/image-merger",
  },
  openGraph: {
    title: "Image Merger - Combine & Stitch Images Online | TextGauge",
    description:
      "Stitch multiple images into one. Choose vertical or horizontal layout. Free, secure, and processing happens entirely in your browser.",
    type: "website",
  },
};

export default function ImageMergerPage() {
  return <ImageMergerClient />;
}
