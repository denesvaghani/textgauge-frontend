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
                inputType={direction === "json-csv" ? "json" : "yaml"}
                outputType={direction === "json-csv" ? "yaml" : "json"}
                onTransform={handleTransform}
                sampleData={direction === "json-csv" ? sampleJson : sampleCsv}
            />
            
            {/* SEO Content */}
            <SeoContent
                toolName="JSON to CSV"
                description="JSON to CSV Converter works properly in Windows, Mac, Linux, Chrome, Firefox, Safari and Edge and it's Free."
                knowMoreLinks={[
                    { label: "What is JSON file?", href: "#what-is-json" },
                    { label: "JSON Examples.", href: "#json-examples" },
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
                    "Instant Conversion: Convert JSON data to CSV format in real-time.",
                    "Flatten Objects: Automatically flattens nested JSON objects into proper CSV columns.",
                    "Secure: All conversion happens in your browser. No data sent to servers.",
                    "Load from URL: Fetch JSON data directly from a URL.",
                    "Bidirectional: You can also convert CSV back to JSON.",
                    "Large File Support: Optimized for handling large datasets efficiently.",
                ]}
                contentSections={[
                    {
                        id: "what-is-json",
                        title: "What is JSON to CSV conversion?",
                        content: (
                            <p>
                                JSON (JavaScript Object Notation) is a popular data format for APIs and web services, while CSV (Comma Separated Values) is widely used for spreadsheets and data analysis. Converting JSON to CSV simplifies complex data structures into rows and columns, making it easy to open in Excel, Google Sheets, or import into databases.
                            </p>
                        )
                    },
                    {
                        id: "json-examples",
                        title: "JSON Examples",
                        content: (
                            <>
                                <p>Here is a simple example of JSON data representing a user:</p>
                                <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-md font-mono text-xs overflow-x-auto border border-slate-200 dark:border-slate-800">
                                    <pre>{`{
  "name": "John Doe",
  "age": 30,
  "isStudent": false,
  "courses": ["Math", "Science"],
  "address": {
    "city": "New York",
    "zip": "10001"
  }
}`}</pre>
                                </div>
                            </>
                        )
                    }
                ]}
            />
        </div>
    );
}
