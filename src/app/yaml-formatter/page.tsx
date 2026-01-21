import { Metadata } from "next";
import YamlFormatterClient from "./YamlFormatterClient";

export const metadata: Metadata = {
  title: "YAML Formatter & Validator | Convert JSON to YAML Online",
  description: "Free online YAML Formatter and Validator. Validate syntax, fix indentation errors, and Convert JSON to YAML instantly. Secure, client-side filtering for DevOps configuration files.",
  alternates: {
    canonical: "https://www.countcharacters.org/yaml-formatter",
  },
  openGraph: {
    title: "YAML Formatter & Validator | Convert JSON to YAML Online",
    description: "Free online YAML Formatter and Validator. Validate syntax, fix indentation errors, and Convert JSON to YAML instantly.",
    url: "https://www.countcharacters.org/yaml-formatter",
    siteName: "TextGauge",
    type: "website",
  },
};

export default function Page() {
  return <YamlFormatterClient />;
}
