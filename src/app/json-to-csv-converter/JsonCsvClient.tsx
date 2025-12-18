"use client";

import { Formatter } from "@/components/Formatter";
import { SeoContent } from "@/components/SeoContent";
import { jsonToCsv, csvToJson } from "@/lib/converters/json-csv";
import { useState } from "react";

export default function JsonCsvClient() {
    const [flatten, setFlatten] = useState(true);
    const [direction, setDirection] = useState<"json-csv" | "csv-json">("json-csv");

    const sampleJson = `[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "address": {
      "city": "New York",
      "zip": "10001"
    }
  },
  {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "address": {
      "city": "London",
      "zip": "SW1A"
    }
  }
]`;

    const sampleCsv = `name,email,address.city,address.zip
John Doe,john@example.com,New York,10001
Jane Smith,jane@example.com,London,SW1A`;

    // Transform function that handles both directions
    const handleTransform = async (input: string, tabSize: number) => {
        if (direction === "json-csv") {
            return jsonToCsv(input, flatten);
        } else {
            return csvToJson(input);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Formatter
                title="JSON to CSV Converter"
                description="Convert JSON data to CSV format instantly. Support for nested objects, large files, and bidirectional conversion."
                inputType={direction === "json-csv" ? "json" : "text"}
                outputType={direction === "json-csv" ? "csv" : "json"}
                onTransform={handleTransform}
                sampleData={direction === "json-csv" ? sampleJson : sampleCsv}
            />
            
            {/* SEO Content */}
            <SeoContent
                toolName="JSON to CSV"
                description="JSON to CSV Converter works properly in Windows, Mac, Linux, Chrome, Firefox, Safari and Edge and it's Free."
                knowMoreLinks={[
                    { label: "What is JSON to CSV?", href: "#what-is-json-to-csv" },
                ]}
                helperTasks={[
                    { label: "JSON Beautifier", href: "/json-formatter" },
                    { label: "JSON Parser", href: "/json-formatter" },
                    { label: "JSON Editor", href: "/json-formatter" },
                    { label: "JSON Viewer", href: "/json-formatter" },
                    { label: "JSON Formatter", href: "/json-formatter" },
                    { label: "JSON Pretty Print", href: "/json-formatter" },
                    { label: "JSON Minify", href: "/json-formatter" },
                    { label: "JSON Validator", href: "/json-formatter" },
                ]}
                discoverLinks={[]}
                features={[
                    "Reduce File Size: CSV files are typically 50-60% smaller than JSON for the same data.",
                    "Instant Conversion: Convert JSON data to CSV format in real-time.",
                    "Flatten Objects: Automatically flattens nested JSON objects into proper CSV columns.",
                    "Secure: All conversion happens in your browser. No data sent to servers.",
                    "Load from URL: Fetch JSON data directly from a URL.",
                    "Bidirectional: You can also convert CSV back to JSON.",
                    "Large File Support: Optimized for handling large datasets efficiently.",
                ]}
                contentSections={[
                    {
                        id: "what-is-json-to-csv",
                        title: "What is JSON to CSV conversion?",
                        content: (
                            <>
                                <p>
                                    JSON (JavaScript Object Notation) is a popular data format for APIs and web services, while CSV (Comma Separated Values) is widely used for spreadsheets and data analysis. Converting JSON to CSV simplifies complex data structures into rows and columns, making it easy to open in Excel, Google Sheets, or import into databases.
                                </p>
                                <p className="mt-4">
                                    <strong>File Size Advantage:</strong> CSV files are typically <strong>50-60% smaller</strong> than their JSON equivalents. JSON repeats field names for every record, while CSV lists headers once. For example, a 0.27 KB JSON file becomes just 0.12 KB as CSV - perfect for reducing bandwidth and storage costs.
                                </p>
                            </>
                        )
                    }
                ]}
            />
        </div>
    );
}
