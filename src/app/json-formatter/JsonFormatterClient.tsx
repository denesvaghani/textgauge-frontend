"use client";

import { Formatter } from "@/components/Formatter";

export default function JsonFormatterClient() {

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
        <>
            {/* 
        Note: Metadata for SEO is typically handled in layout.tsx or via Next.js Metadata API. 
        Since this is a client component, I can't export 'metadata'. 
        If you need specific metadata for this page, check if you have a wrapper or if 
        this should be a server component rendering the client component.
        For now, the page content itself serves SEO. 
      */}
            <Formatter
                title="JSON Formatter, Validator & Beautifier"
                description="Free online tool to format, beautify, minify, and validate JSON. Fix JSON errors, structural issues, and format your code with 2-space, 4-space, or custom tab sizes. Prettier your JSON instantly."
                inputType="json"
                outputType="json"
                onTransform={formatJson}
                onMinify={minifyJson}
                sampleData={sampleData}
            />
        </>
    );
}
