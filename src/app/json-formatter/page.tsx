"use client";

import { Formatter } from "@/components/Formatter";
import Link from "next/link";
import { FileSpreadsheet, GitCompare } from "lucide-react";

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
        <div className="flex flex-col min-h-screen">
            <Formatter
                title="JSON Formatter, Validator & Beautifier"
                description="Free online tool to format, beautify, minify, and validate JSON. Fix JSON errors, structural issues, and format your code with 2-space, 4-space, or custom tab sizes. Prettier your JSON instantly."
                inputType="json"
                outputType="json"
                onTransform={formatJson}
                onMinify={minifyJson}
                sampleData={sampleData}
                customActions={
                    <>
                        <Link
                            href="/json-to-csv-converter"
                            className="group w-full py-2.5 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200 font-semibold text-sm rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
                        >
                            <FileSpreadsheet size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                            To CSV
                        </Link>
                        <Link
                            href="/diff-checker"
                            className="group w-full py-2.5 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200 font-semibold text-sm rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
                        >
                            <GitCompare size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                            Diff
                        </Link>
                    </>
                }
            />
            
            {/* Key Features Section */}
            <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 transition-colors duration-200">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                        Key Features
                    </h2>
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-sm text-slate-600 dark:text-slate-300">
                        <div>
                            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Format & Beautify
                            </h3>
                            <p className="leading-relaxed">
                                Instantly format and beautify JSON with customizable indentation (2-space, 4-space, or custom tabs). Makes JSON readable and properly structured.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Minify JSON
                            </h3>
                            <p className="leading-relaxed">
                                Compress JSON by removing whitespace and line breaks. Perfect for reducing file size and optimizing API responses.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Validation
                            </h3>
                            <p className="leading-relaxed">
                                Automatically validates JSON structure and syntax. Get instant error messages with line numbers for quick debugging.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> 100% Client-Side
                            </h3>
                            <p className="leading-relaxed">
                                All processing happens in your browser. Your JSON data never leaves your device, ensuring complete privacy and security.
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
                            q: "How do I format JSON?", 
                            a: "Simply paste your JSON data into the editor and click the 'Beautify' button. The tool will automatically format your JSON with proper indentation and structure." 
                        },
                        { 
                            q: "Can I minify JSON to reduce file size?", 
                            a: "Yes! Use the 'Minify' button to remove all unnecessary whitespace and line breaks from your JSON, making it more compact for storage or transmission." 
                        },
                        { 
                            q: "Is my JSON data private and secure?", 
                            a: "Absolutely! All JSON formatting and validation happens entirely in your browser. Your data is never uploaded to any server, ensuring complete privacy." 
                        },
                        { 
                            q: "What JSON errors does this tool detect?", 
                            a: "The tool detects syntax errors (missing commas, brackets, quotes), invalid structure, incorrect data types, and provides detailed error messages with line numbers to help you fix issues quickly." 
                        }
                    ].map((faq, i) => (
                        <details key={i} className="w-full group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all duration-200">
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

            {/* Educational Content Sections - Full Width */}
            <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-16">
                {/* What is JSON file? */}
                <div id="what-is-json" className="border-t border-slate-200 dark:border-slate-800 pt-12">
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
                <div id="json-examples" className="border-t border-slate-200 dark:border-slate-800 pt-12">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                        JSON Examples
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 text-base">
                        Here is a simple example of JSON data representing a user:
                    </p>
                    <div className="bg-slate-100 dark:bg-slate-950 p-6 rounded-xl font-mono text-sm overflow-x-auto border border-slate-200 dark:border-slate-800">
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
                <div className="border-t border-slate-200 dark:border-slate-800 pt-12">
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
                                className="px-4 py-2 text-center text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors border border-indigo-200 dark:border-indigo-800"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Platform Compatibility */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-12">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-2xl border border-indigo-200 dark:border-indigo-800 p-6 text-center">
                        <p className="text-slate-700 dark:text-slate-300 font-medium text-base">
                            JSON Formatter working properly in <strong>Windows</strong>, <strong>Mac</strong>, <strong>Linux</strong>, <strong>Chrome</strong>, <strong>Firefox</strong>, <strong>Safari</strong> and <strong>Edge</strong> and it's <strong className="text-indigo-600 dark:text-indigo-400">Free</strong>.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
