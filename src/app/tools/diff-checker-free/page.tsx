import { Metadata } from "next";
import { AdLandingPage } from "@/components/AdLandingPage";
import { GitCompare, Eye, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Online Diff Checker - Compare Text & Code | TextGauge",
  description:
    "Compare two texts or code files side-by-side. Highlight differences instantly with our free online diff checker. Supports JSON, YAML, and more.",
  openGraph: {
    title: "Free Online Diff Checker - Compare Text & Code",
    description:
      "Compare two texts side-by-side. Highlight differences instantly with syntax highlighting.",
  },
};

export default function DiffCheckerLandingPage() {
  return (
    <AdLandingPage
      toolName="Diff Checker"
      toolSlug="diff-checker"
      headline="Compare Text & Code Instantly"
      subheadline="See exactly what changed between two files. Side-by-side or unified view with syntax highlighting for JSON, YAML, and more."
      ctaText="Compare Files Now - Free"
      features={[
        "Side-by-side and unified diff views",
        "Syntax highlighting for JSON, YAML, TOML, and CSV",
        "Line-by-line change tracking",
        "Ignore whitespace option for cleaner diffs",
        "Copy differences with one click",
        "Works entirely in your browser",
        "Perfect for code reviews and debugging",
        "Mobile-responsive design",
      ]}
      benefits={[
        {
          icon: <GitCompare className="w-6 h-6" />,
          title: "Smart Comparison",
          description:
            "Intelligent diff algorithm highlights insertions, deletions, and modifications.",
        },
        {
          icon: <Eye className="w-6 h-6" />,
          title: "Multiple Views",
          description:
            "Switch between side-by-side and unified views based on your preference.",
        },
        {
          icon: <Zap className="w-6 h-6" />,
          title: "Instant Results",
          description:
            "Real-time comparison as you type. No submit buttons, no waiting.",
        },
      ]}
    />
  );
}
