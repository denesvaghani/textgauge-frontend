"use client";

import { Formatter } from "@/components/Formatter";
import { FlowerBackground } from "@/components/FlowerBackground";
import { flowerThemes } from "@/config/flowerThemes";
import { jsonToToon, toonToJson } from "@/lib/converters/json-toon";
import { useState } from "react";
import { Zap, Brain, TrendingDown, Shield, ArrowRight, Sparkles } from "lucide-react";

const theme = flowerThemes.lavender;

export default function JsonToonClient() {
    const [direction, setDirection] = useState<"json-toon" | "toon-json">("json-toon");

    const sampleJson = `[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Developer",
    "score": 95
  },
  {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "Designer",
    "score": 88
  }
]`;

    const sampleToon = `[2]
name, email, role, score
John Doe, john@example.com, Developer, 95
Jane Smith, jane@example.com, Designer, 88`;

    const handleTransform = async (input: string, tabSize: number) => {
        if (direction === "json-toon") {
            return jsonToToon(input);
        } else {
            return toonToJson(input);
        }
    };

    const toggleDirection = () => {
        setDirection(prev => prev === "json-toon" ? "toon-json" : "json-toon");
    };

    const directionToggle = (
        <div className="w-full flex items-center justify-center gap-4 py-1">
            {/* Left label - JSON → TOON */}
            <div className={`text-sm font-medium transition-colors text-right ${
                direction === "json-toon" 
                    ? "text-violet-600 dark:text-violet-400" 
                    : "text-slate-400 dark:text-slate-500"
            }`}>
                <div className="whitespace-nowrap">JSON →</div>
                <div className="pr-2">TOON</div>
            </div>
            
            <button
                onClick={toggleDirection}
                className="relative w-16 h-8 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 overflow-hidden"
                aria-label="Toggle conversion direction"
            >
                <span
                    className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-200 ${
                        direction === "toon-json" ? "translate-x-8" : "translate-x-0"
                    }`}
                />
            </button>
            
            {/* Right label - TOON → JSON */}
            <div className={`text-sm font-medium transition-colors text-left ${
                direction === "toon-json" 
                    ? "text-violet-600 dark:text-violet-400" 
                    : "text-slate-400 dark:text-slate-500"
            }`}>
                <div className="whitespace-nowrap">TOON →</div>
                <div className="pl-2">JSON</div>
            </div>
        </div>
    );

    return (
        <FlowerBackground theme={theme} badgeText="TOON Converter">
            <div className="flex flex-col min-h-screen">
                <Formatter
                    title="JSON to TOON Converter"
                    description="Convert JSON to TOON format – the AI-native data format that reduces token usage by 30-60%."
                    inputType={direction === "json-toon" ? "json" : "text"}
                    outputType={direction === "json-toon" ? "text" : "json"}
                    onTransform={handleTransform}
                    sampleData={direction === "json-toon" ? sampleJson : sampleToon}
                    customActions={directionToggle}
                    actionLabel="Convert"
                />
                
                {/* Token Savings Highlight */}
                <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-8 text-white">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/20 rounded-xl">
                                    <TrendingDown size={32} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">30-60% Token Reduction</h3>
                                    <p className="text-violet-100">Same data, fewer tokens, lower AI costs</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-8 text-center">
                                <div>
                                    <div className="text-3xl font-bold">~60%</div>
                                    <div className="text-sm text-violet-100">Fewer Tokens</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">100%</div>
                                    <div className="text-sm text-violet-100">Lossless</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">∞</div>
                                    <div className="text-sm text-violet-100">Conversions</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Features Section */}
                <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-sm border border-violet-200/50 dark:border-violet-800/30 p-8 transition-colors duration-200">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            Key Features
                        </h2>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-sm text-slate-600 dark:text-slate-300">
                            <div>
                                <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> AI-Optimized Format
                                </h3>
                                <p className="leading-relaxed">
                                    TOON is designed specifically for LLMs like ChatGPT and Claude. It reduces token count while maintaining perfect data fidelity.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> Tabular Arrays
                                </h3>
                                <p className="leading-relaxed">
                                    Arrays of objects are converted to a compact tabular format with headers declared once, similar to CSV but with explicit structure.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> Bidirectional Conversion
                                </h3>
                                <p className="leading-relaxed">
                                    Convert JSON to TOON and TOON back to JSON losslessly. Your data structure is preserved exactly.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> 100% Client-Side
                                </h3>
                                <p className="leading-relaxed">
                                    All conversion happens in your browser. Your data never leaves your device, ensuring complete privacy and security.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why TOON is Better Section */}
                <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="border-t border-violet-200/50 dark:border-violet-800/30 pt-12">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                            <Zap className="text-violet-500" size={28} />
                            Why TOON is Better Than JSON for AI
                        </h2>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-violet-50/50 dark:bg-violet-900/20 rounded-xl p-6 border border-violet-200/50 dark:border-violet-800/30">
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <TrendingDown className="text-violet-500" size={20} />
                                    Token Economy
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 mb-4">
                                    LLMs charge per token. JSON wastes tokens on repetitive syntax:
                                </p>
                                <div className="bg-white dark:bg-slate-900 rounded-lg p-4 font-mono text-sm">
                                    <div className="text-red-500 dark:text-red-400 mb-2">
                                        JSON: <code>{`{"name": "John"}`}</code> = 7 tokens
                                    </div>
                                    <div className="text-violet-500 dark:text-violet-400">
                                        TOON: <code>name: John</code> = 3 tokens
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-violet-50/50 dark:bg-violet-900/20 rounded-xl p-6 border border-violet-200/50 dark:border-violet-800/30">
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Brain className="text-violet-500" size={20} />
                                    Better LLM Parsing
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 mb-4">
                                    TOON&apos;s explicit structure helps AI understand data better:
                                </p>
                                <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm">
                                    <li className="flex items-start gap-2">
                                        <ArrowRight className="text-violet-500 mt-0.5 flex-shrink-0" size={16} />
                                        Explicit array length declarations
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ArrowRight className="text-violet-500 mt-0.5 flex-shrink-0" size={16} />
                                        Clear field headers
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ArrowRight className="text-violet-500 mt-0.5 flex-shrink-0" size={16} />
                                        Reduced ambiguity in nested structures
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Comparison Table */}
                        <div className="mt-8 overflow-x-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl border border-violet-200/50 dark:border-violet-800/30">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-violet-200/50 dark:border-violet-800/30">
                                        <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Aspect</th>
                                        <th className="text-left py-3 px-4 font-semibold text-red-600 dark:text-red-400">JSON</th>
                                        <th className="text-left py-3 px-4 font-semibold text-violet-600 dark:text-violet-400">TOON</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-600 dark:text-slate-300">
                                    <tr className="border-b border-violet-100/50 dark:border-violet-900/30">
                                        <td className="py-3 px-4">Token Count</td>
                                        <td className="py-3 px-4">100% (baseline)</td>
                                        <td className="py-3 px-4 text-violet-600 dark:text-violet-400 font-semibold">40-70%</td>
                                    </tr>
                                    <tr className="border-b border-violet-100/50 dark:border-violet-900/30">
                                        <td className="py-3 px-4">API Costs</td>
                                        <td className="py-3 px-4">Higher</td>
                                        <td className="py-3 px-4 text-violet-600 dark:text-violet-400 font-semibold">30-60% savings</td>
                                    </tr>
                                    <tr className="border-b border-violet-100/50 dark:border-violet-900/30">
                                        <td className="py-3 px-4">Human Readability</td>
                                        <td className="py-3 px-4">Good</td>
                                        <td className="py-3 px-4 font-semibold">Excellent (YAML-like)</td>
                                    </tr>
                                    <tr className="border-b border-violet-100/50 dark:border-violet-900/30">
                                        <td className="py-3 px-4">LLM Parse Accuracy</td>
                                        <td className="py-3 px-4">Variable</td>
                                        <td className="py-3 px-4 text-violet-600 dark:text-violet-400 font-semibold">Improved</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4">Use Case</td>
                                        <td className="py-3 px-4">Web APIs, Config</td>
                                        <td className="py-3 px-4 font-semibold">AI/LLM Applications</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* TOON and AI Section */}
                <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="border-t border-violet-200/50 dark:border-violet-800/30 pt-12">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                            <Sparkles className="text-violet-500" size={28} />
                            TOON and AI: The Perfect Match
                        </h2>
                        
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base mb-6">
                                TOON (Token-Oriented Object Notation) was created specifically to address the challenges of using structured data with Large Language Models. Here&apos;s why it matters:
                            </p>
                            
                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 rounded-xl p-6 border border-violet-200 dark:border-violet-800">
                                    <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900 rounded-lg flex items-center justify-center mb-4">
                                        <TrendingDown className="text-violet-600 dark:text-violet-400" size={24} />
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">Lower API Costs</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">
                                        Every token costs money. TOON reduces your ChatGPT and Claude API bills by 30-60% on data-heavy prompts.
                                    </p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                                        <Brain className="text-purple-600 dark:text-purple-400" size={24} />
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">Better Accuracy</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">
                                        TOON&apos;s explicit structure (array lengths, field headers) reduces parsing errors and improves model responses.
                                    </p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 rounded-xl p-6 border border-violet-200 dark:border-violet-800">
                                    <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900 rounded-lg flex items-center justify-center mb-4">
                                        <Shield className="text-violet-600 dark:text-violet-400" size={24} />
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">Lossless Conversion</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">
                                        TOON preserves the complete JSON data model. Convert back and forth without losing any information.
                                    </p>
                                </div>
                            </div>

                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                                <strong>When to use TOON:</strong> Use TOON whenever you&apos;re sending structured data to AI models – whether it&apos;s user profiles, product catalogs, or any tabular data. The token savings compound quickly with larger datasets and frequent API calls.
                            </p>
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
                                q: "What is TOON format?", 
                                a: "TOON (Token-Oriented Object Notation) is a data serialization format designed for AI/LLM applications. It reduces token usage by 30-60% compared to JSON while maintaining human readability and lossless data representation." 
                            },
                            { 
                                q: "How does TOON reduce tokens?", 
                                a: "TOON eliminates redundant syntax from JSON: no curly braces, no square brackets, minimal quotes. For arrays of objects, it uses a tabular format where field names appear once as headers rather than repeating for each object." 
                            },
                            { 
                                q: "Is TOON conversion lossless?", 
                                a: "Yes! TOON is a lossless representation of the JSON data model. You can convert JSON to TOON and back to JSON without losing any information. Data types, nesting, and structure are all preserved." 
                            },
                            { 
                                q: "When should I use TOON instead of JSON?", 
                                a: "Use TOON when sending data to LLMs like ChatGPT or Claude, especially with tabular data or large datasets. The token savings reduce API costs and can help fit more data within context limits. Use JSON for web APIs and traditional applications." 
                            },
                            {
                                q: "Does this tool upload my data?",
                                a: "No! All conversion happens 100% in your browser using JavaScript. Your JSON and TOON data never leaves your computer, ensuring complete privacy and security."
                            }
                        ].map((faq, i) => (
                            <details key={i} className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-violet-200/50 dark:border-violet-800/30 rounded-xl overflow-hidden transition-all duration-200">
                                <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-violet-50/50 dark:hover:bg-violet-900/20 transition-colors">
                                    {faq.q}
                                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-violet-100/50 dark:border-violet-800/30 pt-4">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </section>

                {/* Related Tools */}
                <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="border-t border-violet-200/50 dark:border-violet-800/30 pt-12">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                            Related Tools
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "JSON Formatter", href: "/json-formatter" },
                                { label: "YAML Formatter", href: "/yaml-formatter" },
                                { label: "TOML Formatter", href: "/toml-formatter" },
                                { label: "JSON to CSV", href: "/json-to-csv-converter" },
                            ].map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="px-4 py-2 text-center text-sm font-medium text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-colors border border-violet-200 dark:border-violet-800"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Platform Compatibility */}
                <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-2xl border border-violet-200 dark:border-violet-800 p-6 text-center">
                        <p className="text-slate-700 dark:text-slate-300 font-medium text-base">
                            JSON to TOON Converter works on <strong>Windows</strong>, <strong>Mac</strong>, <strong>Linux</strong>, <strong>Chrome</strong>, <strong>Firefox</strong>, <strong>Safari</strong> and <strong>Edge</strong> – and it&apos;s <strong className="text-violet-600 dark:text-violet-400">Free</strong>.
                        </p>
                    </div>
                </section>
            </div>
        </FlowerBackground>
    );
}
