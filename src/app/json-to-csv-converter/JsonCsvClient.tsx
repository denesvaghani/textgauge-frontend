"use client";

import { Formatter } from "@/components/Formatter";
import { FlowerBackground } from "@/components/FlowerBackground";
import { flowerThemes } from "@/config/flowerThemes";
import { jsonToCsv, csvToJson } from "@/lib/converters/json-csv";
import { useState } from "react";
import { FileSpreadsheet } from "lucide-react";

const theme = flowerThemes.sunflower;

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

    const handleTransform = async (input: string, tabSize: number) => {
        if (direction === "json-csv") {
            return jsonToCsv(input, flatten);
        } else {
            return csvToJson(input);
        }
    };

    const toggleDirection = () => {
        setDirection(prev => prev === "json-csv" ? "csv-json" : "json-csv");
    };

    const directionToggle = (
        <div className="w-full flex items-center justify-center gap-4 py-1">
            {/* Left label - JSON → CSV */}
            <div className={`flex flex-col items-end text-sm font-medium transition-colors ${
                direction === "json-csv" 
                    ? "text-yellow-600 dark:text-yellow-400" 
                    : "text-slate-400 dark:text-slate-500"
            }`}>
                <span className="whitespace-nowrap">JSON →</span>
                <span>CSV</span>
            </div>
            
            <button
                onClick={toggleDirection}
                className="relative w-16 h-8 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 overflow-hidden"
                aria-label="Toggle conversion direction"
            >
                <span
                    className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-200 ${
                        direction === "csv-json" ? "translate-x-8" : "translate-x-0"
                    }`}
                />
            </button>
            
            {/* Right label - CSV → JSON */}
            <div className={`flex flex-col items-start text-sm font-medium transition-colors ${
                direction === "csv-json" 
                    ? "text-yellow-600 dark:text-yellow-400" 
                    : "text-slate-400 dark:text-slate-500"
            }`}>
                <span className="whitespace-nowrap">CSV →</span>
                <span>JSON</span>
            </div>
        </div>
    );

    return (
        <FlowerBackground theme={theme} badgeText="Converter Tool">
            <div className="flex flex-col min-h-screen">
                <Formatter
                    title="JSON to CSV Converter"
                    description="Convert JSON data to CSV format instantly. Support for nested objects, large files, and bidirectional conversion."
                    inputType={direction === "json-csv" ? "json" : "text"}
                    outputType={direction === "json-csv" ? "csv" : "json"}
                    onTransform={handleTransform}
                    sampleData={direction === "json-csv" ? sampleJson : sampleCsv}
                    customActions={directionToggle}
                    actionLabel="Convert"
                />
                
                {/* File Size Savings */}
                <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl p-8 text-white">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/20 rounded-xl">
                                    <FileSpreadsheet size={32} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">50-60% Smaller Files</h3>
                                    <p className="text-yellow-100">CSV removes redundant field names</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-8 text-center">
                                <div>
                                    <div className="text-3xl font-bold">~50%</div>
                                    <div className="text-sm text-yellow-100">Smaller</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">Excel</div>
                                    <div className="text-sm text-yellow-100">Ready</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">∞</div>
                                    <div className="text-sm text-yellow-100">Rows</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Features Section */}
                <section className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-sm border border-yellow-200/50 dark:border-yellow-800/30 p-8 transition-colors duration-200">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            Key Features
                        </h2>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-sm text-slate-600 dark:text-slate-300">
                            <div>
                                <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Reduce File Size
                                </h3>
                                <p className="leading-relaxed">
                                    CSV files are typically <strong>50-60% smaller</strong> than equivalent JSON. Perfect for reducing bandwidth costs and speeding up data transfers.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Flatten Objects
                                </h3>
                                <p className="leading-relaxed">
                                    Automatically flattens nested JSON objects into CSV columns using dot notation. Makes complex API responses spreadsheet-ready.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Bidirectional Conversion
                                </h3>
                                <p className="leading-relaxed">
                                    Convert JSON to CSV and CSV back to JSON. Switch between formats seamlessly for different use cases and applications.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> 100% Client-Side
                                </h3>
                                <p className="leading-relaxed">
                                    All conversion happens in your browser. Your data never leaves your device, ensuring complete privacy and security.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4 w-full">
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
                            <details key={i} className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-yellow-200/50 dark:border-yellow-800/30 rounded-xl overflow-hidden transition-all duration-200">
                                <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-yellow-50/50 dark:hover:bg-yellow-900/20 transition-colors">
                                    {faq.q}
                                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-yellow-100/50 dark:border-yellow-800/30 pt-4">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </section>

                {/* Educational Content */}
                <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-16">
                    <div id="what-is-json-to-csv" className="border-t border-yellow-200/50 dark:border-yellow-800/30 pt-12">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            What is JSON to CSV conversion?
                        </h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                                JSON (JavaScript Object Notation) is a popular data format for APIs and web services, while CSV (Comma Separated Values) is widely used for spreadsheets and data analysis. Converting JSON to CSV simplifies complex data structures into rows and columns, making it easy to open in Excel, Google Sheets, or import into databases.
                            </p>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base mt-4">
                                <strong>File Size Advantage:</strong> CSV files are typically <strong>50-60% smaller</strong> than their JSON equivalents. JSON repeats field names for every record, while CSV lists headers once. For example, a 0.27 KB JSON file becomes just 0.12 KB as CSV - perfect for reducing bandwidth and storage costs.
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-yellow-200/50 dark:border-yellow-800/30 pt-12">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                            Related Tools
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "JSON Beautifier", href: "/json-formatter" },
                                { label: "JSON Formatter", href: "/json-formatter" },
                                { label: "JSON to TOON", href: "/json-to-toon-converter" },
                                { label: "YAML Formatter", href: "/yaml-formatter" },
                            ].map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="px-4 py-2 text-center text-sm font-medium text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors border border-yellow-200 dark:border-yellow-800"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-yellow-200/50 dark:border-yellow-800/30 pt-12">
                        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 rounded-2xl border border-yellow-200 dark:border-yellow-800 p-6 text-center">
                            <p className="text-slate-700 dark:text-slate-300 font-medium text-base">
                                JSON to CSV Converter working properly in <strong>Windows</strong>, <strong>Mac</strong>, <strong>Linux</strong>, <strong>Chrome</strong>, <strong>Firefox</strong>, <strong>Safari</strong> and <strong>Edge</strong> and it&apos;s <strong className="text-yellow-600 dark:text-yellow-400">Free</strong>.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </FlowerBackground>
    );
}
