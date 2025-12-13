"use client";

import dynamic from 'next/dynamic';
import { Formatter } from "@/components/Formatter";

// Dynamically import Formatter with loading state
const DynamicFormatter = dynamic(
    () => import("@/components/Formatter").then(mod => ({ default: mod.Formatter })),
    {
        loading: () => (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400 mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400">Loading JSON Formatter...</p>
                </div>
            </div>
        ),
        ssr: false // Disable server-side rendering for Monaco Editor
    }
);

export default function JsonFormatterPage() {

    const formatJson = async (input: string, tabSize: number) => {
        // Basic validation / parse check
        const parsed = JSON.parse(input);
        return JSON.stringify(parsed, null, tabSize);
    };

    const minifyJson = async (input: string) => {
        const parsed = JSON.parse(input);
        return JSON.stringify(parsed);
    };

    const sampleData = `{\n  "name": "TextGauge",\n  "features": ["Count", "Format", "Analyze"],\n  "active": true\n}`;

    return (
        <DynamicFormatter
            title="JSON Formatter, Validator & Beautifier"
            description="Free online tool to format, beautify, minify, and validate JSON. Fix JSON errors, structural issues, and format your code with 2-space, 4-space, or custom tab sizes. Prettier your JSON instantly."
            inputType="json"
            outputType="json"
            onTransform={formatJson}
            onMinify={minifyJson}
            sampleData={sampleData}
        />
    );
}
