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
        <div className="flex flex-col min-h-screen">
            <Formatter
                title="JSON Formatter, Validator & Beautifier"
                description="Free online tool to format, beautify, minify, and validate JSON. Fix JSON errors, structural issues, and format your code with 2-space, 4-space, or custom tab sizes. Prettier your JSON instantly."
                inputType="json"
                outputType="json"
                onTransform={formatJson}
                onMinify={minifyJson}
                sampleData={sampleData}
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
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
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
