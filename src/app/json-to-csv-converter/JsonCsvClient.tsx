"use client";

import { Formatter } from "@/components/Formatter";
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
            
            {/* Key Features Section */}
            <section className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 transition-colors duration-200">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                        Key Features
                    </h2>
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-sm text-slate-600 dark:text-slate-300">
                        <div>
                            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Reduce File Size
                            </h3>
                            <p className="leading-relaxed">
                                CSV files are typically <strong>50-60% smaller</strong> than equivalent JSON. Perfect for reducing bandwidth costs and speeding up data transfers.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Flatten Objects
                            </h3>
                            <p className="leading-relaxed">
                                Automatically flattens nested JSON objects into CSV columns using dot notation. Makes complex API responses spreadsheet-ready.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Bidirectional Conversion
                            </h3>
                            <p className="leading-relaxed">
                                Convert JSON to CSV and CSV back to JSON. Switch between formats seamlessly for different use cases and applications.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> 100% Client-Side
                            </h3>
                            <p className="leading-relaxed">
                                All conversion happens in your browser. Your data never leaves your device, ensuring complete privacy and security.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {[
                        { 
                            q: "How does JSON to CSV conversion work?", 
                            a: "The tool converts JSON arrays into CSV format. Each JSON object becomes a row, and object properties become columns. Nested objects are automatically flattened using dot notation (e.g., 'address.city')." 
                        },
                        { 
                            q: "Will my data be uploaded to servers?", 
                            a: "No! All conversion happens 100% in your browser using JavaScript. Your JSON and CSV data never leaves your computer, ensuring complete privacy." 
                        },
                        { 
                            q: "Can I convert CSV back to JSON?", 
                            a: "Yes! The tool supports bidirectional conversion. Paste your CSV data and the tool will convert it back to properly formatted JSON, reconstructing nested objects from dot notation." 
                        },
                        { 
                            q: "What happens to nested JSON objects?", 
                            a: "Nested objects are automatically flattened into CSV columns using dot notation. For example, {\"user\": {\"name\": \"John\"}} becomes a column named 'user.name'. This makes complex JSON data spreadsheet-ready." 
                        }
                    ].map((faq, i) => (
                        <details key={i} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all duration-200">
                            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                {faq.q}
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800/50 pt-4">
                                {faq.a}
                            </div>
                        </details>
                    ))}
                </div>
            </section>
        </div>
    );
}
