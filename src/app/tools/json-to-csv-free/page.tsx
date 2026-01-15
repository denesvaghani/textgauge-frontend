import { Metadata } from "next";
import { AdLandingPage } from "@/components/AdLandingPage";
import { FileSpreadsheet, Zap, Table } from "lucide-react";

export const metadata: Metadata = {
  title: "Free JSON to CSV Converter Online | TextGauge",
  description:
    "Convert JSON to CSV instantly. Free online tool with nested object flattening, custom delimiters, and instant download. No sign-up required.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Free JSON to CSV Converter Online",
    description:
      "Convert JSON to CSV instantly with nested object flattening and custom delimiters.",
  },
};

export default function JsonToCsvLandingPage() {
  return (
    <AdLandingPage
      toolName="JSON to CSV Converter"
      toolSlug="json-to-csv-converter"
      headline="Convert JSON to CSV Instantly"
      subheadline="Transform complex JSON data into clean spreadsheet-ready CSV files. Automatically flattens nested objects and handles arrays intelligently."
      ctaText="Convert JSON to CSV - Free"
      features={[
        "Automatic nested object flattening",
        "Smart array handling for complex structures",
        "Custom delimiter support (comma, semicolon, tab)",
        "Preserves data types and handles special characters",
        "Instant preview before download",
        "Copy to clipboard with one click",
        "Works 100% in your browser - no data uploaded",
        "Supports large JSON files (up to 10MB)",
      ]}
      benefits={[
        {
          icon: <FileSpreadsheet className="w-6 h-6" />,
          title: "Spreadsheet Ready",
          description:
            "Output files open perfectly in Excel, Google Sheets, and other spreadsheet apps.",
        },
        {
          icon: <Zap className="w-6 h-6" />,
          title: "Instant Processing",
          description:
            "Convert megabytes of JSON data in seconds with client-side processing.",
        },
        {
          icon: <Table className="w-6 h-6" />,
          title: "Clean Output",
          description:
            "Smart algorithms flatten nested structures into readable columns.",
        },
      ]}
    />
  );
}
