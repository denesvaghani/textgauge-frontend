import { Metadata } from "next";
import { AdLandingPage } from "@/components/AdLandingPage";
import { Zap, Shield, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "Free JSON Formatter & Validator Online | TextGauge",
  description:
    "Format, validate, and beautify JSON instantly. Free online JSON formatter with syntax highlighting, error detection, and copy-paste simplicity. No sign-up required.",
  openGraph: {
    title: "Free JSON Formatter & Validator Online",
    description:
      "Format, validate, and beautify JSON instantly. Free online tool with syntax highlighting.",
  },
};

export default function JsonFormatterLandingPage() {
  return (
    <AdLandingPage
      toolName="JSON Formatter"
      toolSlug="json-formatter"
      headline="Format & Validate JSON Instantly"
      subheadline="The fastest way to beautify, minify, and validate your JSON data. Syntax highlighting, error detection, and one-click copy."
      ctaText="Format JSON Now - It's Free"
      features={[
        "Instant JSON formatting with proper indentation",
        "Real-time syntax validation with error highlighting",
        "Minify JSON to reduce file size",
        "Syntax highlighting for easy reading",
        "Copy formatted output with one click",
        "Works 100% in your browser - no data sent to servers",
        "Dark mode support for comfortable viewing",
        "Mobile-friendly responsive design",
      ]}
      benefits={[
        {
          icon: <Zap className="w-6 h-6" />,
          title: "Lightning Fast",
          description:
            "Instant formatting as you paste. No waiting, no loading screens.",
        },
        {
          icon: <Shield className="w-6 h-6" />,
          title: "100% Private",
          description:
            "Your JSON never leaves your browser. Complete privacy guaranteed.",
        },
        {
          icon: <Code className="w-6 h-6" />,
          title: "Developer Friendly",
          description:
            "Keyboard shortcuts, error messages, and pro features for daily use.",
        },
      ]}
    />
  );
}
