"use client";

import { Formatter } from "@/components/Formatter";

export default function JsonFormatterPage() {
    const formatJson = (input: string) => {
        const parsed = JSON.parse(input);
        return JSON.stringify(parsed, null, 2);
    };

    return (
        <Formatter
            title="JSON Formatter & Validator"
            description="Beautify your JSON code, validate it, and fix formatting errors instantly. Free online JSON formatter."
            inputType="json"
            outputType="json"
            transform={formatJson}
            placeholderInput='{"example": "paste your json here"}'
        />
    );
}
