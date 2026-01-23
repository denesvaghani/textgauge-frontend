"use client";

import { Formatter } from "@/components/Formatter";
import { FlowerBackground } from "@/components/FlowerBackground";
import { DynamicAd } from "@/components/DynamicAd";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { flowerThemes } from "@/config/flowerThemes";
import { jsonToCsv, csvToJson } from "@/lib/converters/json-csv";
import { useState } from "react";
import { FileSpreadsheet } from "lucide-react";
import { RelatedTools } from "@/components/RelatedTools";

const theme = flowerThemes.lilac;

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
        <div className="w-full flex items-center justify-center gap-2 py-1">
            {/* Left label - JSON → CSV */}
            <div className={`text-sm font-medium transition-colors text-right ${
                direction === "json-csv" 
                    ? "text-yellow-600 dark:text-yellow-400" 
                    : "text-slate-400 dark:text-slate-500"
            }`}>
                <div className="whitespace-nowrap">JSON →</div>
                <div className="pr-2">CSV</div>
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
            <div className={`text-sm font-medium transition-colors text-left ${
                direction === "csv-json" 
                    ? "text-yellow-600 dark:text-yellow-400" 
                    : "text-slate-400 dark:text-slate-500"
            }`}>
                <div className="whitespace-nowrap">CSV →</div>
                <div className="pl-2">JSON</div>
            </div>
        </div>
    );

    return (
        <FlowerBackground theme={theme} badgeText="Converter Tool">
            <div className="flex flex-col min-h-screen">
                <Formatter
                    isEmbedded={true}
                    title="JSON to CSV Converter"
                    description="Convert JSON data to CSV format instantly. Support for nested objects, large files, and bidirectional conversion."
                    inputType={direction === "json-csv" ? "json" : "csv"}
                    outputType={direction === "json-csv" ? "csv" : "json"}
                    onTransform={handleTransform}
                    sampleData={direction === "json-csv" ? sampleJson : sampleCsv}
                    customActions={directionToggle}
                    titleGradient="bg-gradient-to-r from-yellow-600 to-amber-600 dark:from-yellow-400 dark:to-amber-400"
                    actionLabel="Convert"
                    flowerTheme={theme}
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

                {/* Ad: In-Article 1 */}
                {process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE && (
                    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex justify-center">
                        <div className="w-full max-w-4xl bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden min-h-[100px] flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-800">
                             <DynamicAd
                                adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE}
                                adFormat="fluid"
                                layout="in-article"
                             />
                        </div>
                    </div>
                )}

                {/* Ad: In-Article 1 */}
                {process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE && (
                    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex justify-center">
                        <div className="w-full max-w-4xl bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden min-h-[100px] flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-800">
                             <DynamicAd
                                adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE}
                                adFormat="fluid"
                                layout="in-article"
                             />
                        </div>
                    </div>
                )}

                {/* Key Features Section */}
                <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
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

                {/* Ad: In-Article 2 */}
                {process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE && (
                    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex justify-center">
                         <DynamicAd
                            adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE}
                            adFormat="fluid"
                            layout="in-article"
                         />
                    </div>
                )}

                {/* FAQ Section */}
                <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4 w-full">
                        <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-yellow-200/50 dark:border-yellow-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-yellow-50/50 dark:hover:bg-yellow-900/20 transition-colors">
                                How does JSON to CSV conversion work?
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-yellow-100/50 dark:border-yellow-800/30 pt-4">
                                The tool converts <strong>JSON arrays</strong> into CSV format. Each <strong>JSON object becomes a row</strong>, and object properties become columns. Nested objects are <strong>automatically flattened</strong> using dot notation (e.g., &apos;address.city&apos;).
                            </div>
                        </details>

                        <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-yellow-200/50 dark:border-yellow-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-yellow-50/50 dark:hover:bg-yellow-900/20 transition-colors">
                                Will my data be uploaded to servers?
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-yellow-100/50 dark:border-yellow-800/30 pt-4">
                                <strong>No, 100% private.</strong> All conversion happens <strong>entirely in your browser</strong> using JavaScript. Your JSON and CSV data <strong>never leaves your computer</strong>, ensuring complete privacy.
                            </div>
                        </details>

                        <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-yellow-200/50 dark:border-yellow-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-yellow-50/50 dark:hover:bg-yellow-900/20 transition-colors">
                                Can I convert CSV back to JSON?
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-yellow-100/50 dark:border-yellow-800/30 pt-4">
                                <strong>Yes!</strong> Use the toggle to switch to <strong>CSV → JSON</strong> mode. The tool reconstructs <strong>nested objects from dot notation</strong> (e.g., &apos;user.name&apos; becomes a nested object). Perfect for converting spreadsheet data to JSON.
                            </div>
                        </details>

                        <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-yellow-200/50 dark:border-yellow-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-yellow-50/50 dark:hover:bg-yellow-900/20 transition-colors">
                                What happens to nested JSON objects?
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-yellow-100/50 dark:border-yellow-800/30 pt-4">
                                Nested objects are <strong>automatically flattened</strong> into CSV columns using <strong>dot notation</strong>. For example, <code className="bg-yellow-100 dark:bg-yellow-900/50 px-1 rounded">{"{\"user\": {\"name\": \"John\"}}"}</code> becomes a column named &apos;user.name&apos;. This makes complex JSON data <strong>spreadsheet-ready</strong>.
                            </div>
                        </details>

                        <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-yellow-200/50 dark:border-yellow-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-yellow-50/50 dark:hover:bg-yellow-900/20 transition-colors">
                                Why is CSV file size smaller than JSON?
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-yellow-100/50 dark:border-yellow-800/30 pt-4">
                                CSV files are typically <strong>50-60% smaller</strong>. JSON repeats field names for every record, while CSV lists headers <strong>once at the top</strong>. This reduces bandwidth costs and speeds up data transfers.
                            </div>
                        </details>
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
                        {/* Related Tools */}
                        <RelatedTools currentPath="/json-to-csv-converter" />
                    </div>
                </section>
                {/* Ad: Multiplex (Related Content) */}
                 {process.env.NEXT_PUBLIC_AD_SLOT_MULTIPLEX && (
                    <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                         <DynamicAd
                            adSlot={process.env.NEXT_PUBLIC_AD_SLOT_MULTIPLEX}
                            adFormat="autorelaxed"
                         />
                    </section>
                )}
            </div>
        </FlowerBackground>
    );
}
