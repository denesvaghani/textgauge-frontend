"use client";

import { Formatter } from "@/components/Formatter";

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
        <Formatter
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
