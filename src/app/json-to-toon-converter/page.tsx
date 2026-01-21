import type { Metadata } from "next";
import JsonToonClient from "./JsonToonClient";

export const metadata: Metadata = {
    title: "JSON to TOON Converter – Reduce AI Token Usage by 60% | TextGauge",
    description: "Convert JSON to TOON format for LLM efficiency. TOON reduces token count by 30-60%, perfect for ChatGPT, Claude, and AI applications. Free online tool with bidirectional conversion.",
    keywords: [
        "JSON to TOON",
        "TOON converter",
        "TOON format",
        "AI token optimization",
        "LLM efficiency",
        "ChatGPT optimization",
        "Claude API",
        "token reduction",
        "data serialization",
        "AI data format"
    ],
    openGraph: {
        title: "JSON to TOON Converter – Save 60% on AI Tokens",
        description: "TOON is the AI-native data format. Convert JSON to TOON and reduce your LLM token usage by 30-60%. Free, private, instant.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "JSON to TOON Converter – AI Token Optimization",
        description: "Reduce AI API costs by 30-60% with TOON format. Free online converter.",
        images: ["https://www.countcharacters.org/images/og-image.png"],
    },
    alternates: {
        canonical: "https://www.countcharacters.org/json-to-toon-converter",
    },
};

export default function JsonToToonPage() {
    return <JsonToonClient />;
}
