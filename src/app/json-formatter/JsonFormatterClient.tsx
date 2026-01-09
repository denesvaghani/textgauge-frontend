"use client";

import { Formatter } from "@/components/Formatter";
import { DynamicAd } from "@/components/DynamicAd";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { FlowerBackground } from "@/components/FlowerBackground";
import { RelatedTools } from "@/components/RelatedTools";
import { flowerThemes } from "@/config/flowerThemes";
import Link from "next/link";
import { FileSpreadsheet, GitCompare } from "lucide-react";

const theme = flowerThemes.cherryBlossom;

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
        <FlowerBackground theme={theme} badgeText="JSON Tool">
            <SchemaMarkup
                name="JSON Formatter & Validator"
                description="Free online JSON formatter, validator, and beautifier. Minify JSON, fix errors, and convert to other formats instantly."
                url="https://www.countcharacters.org/json-formatter"
            />
            <div className="flex flex-col min-h-screen">
                <Formatter
                    title="JSON Formatter, Validator & Beautifier"
                    description="Free online tool to format, beautify, minify, and validate JSON. Fix JSON errors, structural issues, and format your code with 2-space, 4-space, or custom tab sizes. Prettier your JSON instantly."
                    inputType="json"
                    outputType="json"
                    onTransform={formatJson}
                    onMinify={minifyJson}
                    sampleData={sampleData}
                    titleGradient="bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400"
                    flowerTheme={theme}
                    customActions={
                        <>
                            <Link
                                href="/json-to-csv-converter"
                                className="group w-full py-2.5 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-pink-400 dark:hover:border-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 text-slate-700 dark:text-slate-200 font-semibold text-sm rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
                            >
                                <FileSpreadsheet size={16} className="text-slate-400 group-hover:text-pink-500 transition-colors" />
                                To CSV
                            </Link>
                            <Link
                                href="/diff-checker"
                                className="group w-full py-2.5 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-pink-400 dark:hover:border-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 text-slate-700 dark:text-slate-200 font-semibold text-sm rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
                            >
                                <GitCompare size={16} className="text-slate-400 group-hover:text-pink-500 transition-colors" />
                                Diff
                            </Link>
                        </>
                    }
                />
                
                {/* Key Features Section */}
                <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-sm border border-pink-200/50 dark:border-pink-800/30 p-8 transition-colors duration-200">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            Key Features
                        </h2>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-sm text-slate-600 dark:text-slate-300">
                            <div>
                                <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span> Format & Beautify
                                </h3>
                                <p className="leading-relaxed">
                                    Instantly format and beautify JSON with customizable indentation (2-space, 4-space, or custom tabs). Makes JSON readable and properly structured.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span> Minify JSON
                                </h3>
                                <p className="leading-relaxed">
                                    Compress JSON by removing whitespace and line breaks. Perfect for reducing file size and optimizing API responses.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span> Validation
                                </h3>
                                <p className="leading-relaxed">
                                    Automatically validates JSON structure and syntax. Get instant error messages with line numbers for quick debugging.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span> 100% Client-Side
                                </h3>
                                <p className="leading-relaxed">
                                    All processing happens in your browser. Your JSON data never leaves your device, ensuring complete privacy and security.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ad: In-Article 1 */}
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
                        <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-pink-200/50 dark:border-pink-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-pink-50/50 dark:hover:bg-pink-900/20 transition-colors">
                                How do I format JSON?
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-pink-100/50 dark:border-pink-800/30 pt-4">
                                <strong>Paste your JSON</strong> into the editor and click <strong>Beautify</strong>. The tool automatically adds <strong>proper indentation</strong>, line breaks, and structure. You can also choose between <strong>2-space or 4-space</strong> indentation using the tab size option.
                            </div>
                        </details>

                        <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-pink-200/50 dark:border-pink-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-pink-50/50 dark:hover:bg-pink-900/20 transition-colors">
                                Can I minify JSON to reduce file size?
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-pink-100/50 dark:border-pink-800/30 pt-4">
                                Yes! Click the <strong>Minify</strong> button to remove <strong>all whitespace and line breaks</strong>. This is ideal for <strong>API responses</strong>, configuration files, or anywhere you need to reduce file size without changing the data.
                            </div>
                        </details>

                        <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-pink-200/50 dark:border-pink-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-pink-50/50 dark:hover:bg-pink-900/20 transition-colors">
                                Is my JSON data private and secure?
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-pink-100/50 dark:border-pink-800/30 pt-4">
                                <strong>100% private.</strong> All formatting and validation happens <strong>entirely in your browser</strong> using JavaScript. Your data is <strong>never uploaded</strong> to any server. We cannot see, store, or access your JSON — it never leaves your device.
                            </div>
                        </details>

                        <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-pink-200/50 dark:border-pink-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-pink-50/50 dark:hover:bg-pink-900/20 transition-colors">
                                What JSON errors does this tool detect?
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-pink-100/50 dark:border-pink-800/30 pt-4">
                                The tool detects <strong>syntax errors</strong> (missing commas, brackets, quotes), <strong>invalid structure</strong>, trailing commas, and <strong>data type issues</strong>. Error messages include <strong>line numbers</strong> to help you locate and fix problems quickly.
                            </div>
                        </details>

                        <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-pink-200/50 dark:border-pink-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-pink-50/50 dark:hover:bg-pink-900/20 transition-colors">
                                What is JSON used for?
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-pink-100/50 dark:border-pink-800/30 pt-4">
                                JSON (JavaScript Object Notation) is used for <strong>data exchange</strong> between servers and web applications, <strong>API responses</strong>, <strong>configuration files</strong>, and <strong>storing structured data</strong>. It&apos;s lightweight, human-readable, and supported by virtually all programming languages.
                            </div>
                        </details>

                        <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-pink-200/50 dark:border-pink-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-pink-50/50 dark:hover:bg-pink-900/20 transition-colors">
                                Can I convert JSON to other formats?
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-pink-100/50 dark:border-pink-800/30 pt-4">
                                Yes! Use our <strong>JSON to CSV</strong> converter for spreadsheet data, <strong>JSON to YAML</strong> for configuration files, or <strong>JSON to TOON</strong> to reduce token usage for AI applications. Each converter is designed for specific use cases.
                            </div>
                        </details>
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

                {/* Educational Content Sections */}
                <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-16">
                    {/* What is JSON file? */}
                    <div id="what-is-json" className="border-t border-pink-200/50 dark:border-pink-800/30 pt-12">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            What is JSON file?
                        </h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                                JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate. It is based on a subset of the JavaScript Programming Language Standard ECMA-262 3rd Edition - December 1999.
                            </p>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base mt-4">
                                JSON is a text format that is completely language independent but uses conventions that are familiar to programmers of the C-family of languages, including C, C++, C#, Java, JavaScript, Perl, Python, and many others. These properties make JSON an ideal data-interchange language.
                            </p>
                        </div>
                    </div>

                    {/* JSON Examples */}
                    <div id="json-examples" className="border-t border-pink-200/50 dark:border-pink-800/30 pt-12">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            JSON Examples
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 text-base">
                            Here is a simple example of JSON data representing a user:
                        </p>
                        <div className="bg-slate-100 dark:bg-slate-950 p-6 rounded-xl font-mono text-sm overflow-x-auto border border-pink-200/50 dark:border-pink-800/30">
                            <pre className="text-slate-800 dark:text-slate-200">{`{
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
                    </div>

                    {/* Helper Tasks */}
                    <div className="border-t border-pink-200/50 dark:border-pink-800/30 pt-12">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                            JSON Beautifier helps to perform below tasks:
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "JSON Beautifier", href: "/json-formatter" },
                                { label: "JSON Parser", href: "/json-formatter" },
                                { label: "JSON Editor", href: "/json-formatter" },
                                { label: "JSON Viewer", href: "/json-formatter" },
                                { label: "JSON Formatter", href: "/json-formatter" },
                                { label: "JSON Pretty Print", href: "/json-formatter" },
                                { label: "JSON Minify", href: "/json-formatter" },
                                { label: "JSON Validator", href: "/json-formatter" },
                            ].map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="px-4 py-2 text-center text-sm font-medium text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors border border-pink-200 dark:border-pink-800"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
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

                 {/* Related Tools */}
                 <RelatedTools currentPath="/json-formatter" />
            </div>
        </FlowerBackground>
    );
}
