"use client";

import { Formatter } from "@/components/Formatter";
import { DynamicAd } from "@/components/DynamicAd";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { FlowerBackground } from "@/components/FlowerBackground";
import { RelatedTools } from "@/components/RelatedTools";
import { flowerThemes } from "@/config/flowerThemes";
import Link from "next/link";
import { FileSpreadsheet, GitCompare, Zap } from "lucide-react";

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
                
                {/* 3-Column Layout Wrapper */}
                <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-center gap-6 2xl:gap-8">
                    
                    {/* LEFT AD COLUMN (Desktop XL+) */}
                    {process.env.NEXT_PUBLIC_AD_SLOT_SKYSCRAPER_LEFT && (
                        <div className="hidden 2xl:block w-[160px] shrink-0">
                            <div className="sticky top-24 h-fit min-h-[600px] flex items-start justify-center">
                                <DynamicAd
                                adSlot={process.env.NEXT_PUBLIC_AD_SLOT_SKYSCRAPER_LEFT}
                                adFormat="vertical"
                                style={{ width: '160px', height: '600px', display: 'block' }}
                                />
                            </div>
                        </div>
                    )}

                    {/* CENTER CONTENT */}
                    <div className="flex-1 min-w-0">
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
                        <section className="w-full pb-16">
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
                            <div className="w-full pb-16 flex justify-center">
                                <DynamicAd
                                    adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE}
                                    adFormat="fluid"
                                    layout="in-article"
                                />
                            </div>
                        )}

                        {/* FAQ Section */}
                        <section className="w-full pb-16">
                            <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
                                Expert FAQ: JSON Formatting & Security
                            </h2>
                            <div className="space-y-4 w-full">
                                <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-pink-200/50 dark:border-pink-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                                    <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-pink-50/50 dark:hover:bg-pink-900/20 transition-colors">
                                        Why is client-side JSON formatting safer?
                                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-pink-100/50 dark:border-pink-800/30 pt-4">
                                        Most online formatters upload your JSON to a server for processing. If your JSON contains <strong>API keys, PII, or internal config</strong>, it is at risk. <strong>TextGauge</strong> processes data <strong>100% locally</strong> in your browser using JavaScript. We never see your data, and it never touches a network.
                                    </div>
                                </details>

                                <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-pink-200/50 dark:border-pink-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                                    <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-pink-50/50 dark:hover:bg-pink-900/20 transition-colors">
                                        How does the validator handle Large JSON files?
                                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-pink-100/50 dark:border-pink-800/30 pt-4">
                                        Our tool uses a highly optimized parser that can handle JSON files up to <strong>10MB</strong> without freezing the UI. For massive datasets, we recommend using our specialized converters to reduce memory overhead.
                                    </div>
                                </details>

                                <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-pink-200/50 dark:border-pink-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                                    <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-pink-50/50 dark:hover:bg-pink-900/20 transition-colors">
                                        What is the "JSON to TOON" feature?
                                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-pink-100/50 dark:border-pink-800/30 pt-4">
                                        <strong>Exclusive to TextGauge:</strong> TOON is an LLM-optimized data format. When you convert JSON to TOON, you can reduce <strong>token usage by up to 40%</strong> in ChatGPT, Claude, and Gemini prompts, saving you money and increasing prompt performance.
                                    </div>
                                </details>

                                <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-pink-200/50 dark:border-pink-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                                    <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-pink-50/50 dark:hover:bg-pink-900/20 transition-colors">
                                        Does this support JSONC or JSONL?
                                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-pink-100/50 dark:border-pink-800/30 pt-4">
                                        Currently, we focus on standard <strong>ECMA-404 JSON</strong> validation. Support for <strong>JSON with Comments (JSONC)</strong> and <strong>JSON Lines (JSONL)</strong> is planned for our Q2 2026 roadmap.
                                    </div>
                                </details>

                                <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-pink-200/50 dark:border-pink-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                                    <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-pink-50/50 dark:hover:bg-pink-900/20 transition-colors">
                                        Can I use this for API debugging?
                                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-pink-100/50 dark:border-pink-800/30 pt-4">
                                        Yes. The editor provides <strong>syntax highlighting</strong> and <strong>real-time error detection</strong>. If your API returns a mess of text, paste it here to immediately see the structure and identify missing fields or malformed arrays.
                                    </div>
                                </details>
                            </div>
                        </section>

                        {/* Related Tools - Moved below FAQ */}
                        <RelatedTools currentPath="/json-formatter" />

                        {/* Ad: In-Article 2 */}
                        {process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE && (
                            <div className="w-full pb-16 flex justify-center">
                                <DynamicAd
                                    adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE}
                                    adFormat="fluid"
                                    layout="in-article"
                                />
                            </div>
                        )}

                        {/* Educational Content Sections */}
                        <section className="w-full pb-16 space-y-16">
                            {/* Why JSON Standard matters */}
                            <div id="what-is-json" className="border-t border-pink-200/50 dark:border-pink-800/30 pt-12">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                                    Beyond Basics: Why JSON Structure Matters in 2026
                                </h2>
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                                        While JSON remains the <strong>lingua franca</strong> of the web, the way we use it has evolved. With the rise of <strong>LLMs (Large Language Models)</strong> and complex microservices, malformed JSON doesn't just crash an app—it wastes expensive tokens and causes "hallucinations" in AI responses.
                                    </p>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base mt-4">
                                        Using a <strong>JSON Formatter</strong> isn't just about readability; it's about <strong>structural integrity</strong>. Our validator ensures that your data follows strict ECMA-404 standards, preventing silent errors in data pipelines and ensuring your AI agents receive perfectly parsed context every time.
                                    </p>
                                </div>
                            </div>

                            {/* Pro Tip: TOON Format */}
                            <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 p-8 rounded-2xl border border-pink-200/50 dark:border-pink-800/30">
                                <h3 className="text-xl font-bold text-pink-700 dark:text-pink-400 mb-4 flex items-center gap-2">
                                    <Zap size={20} /> Pro Tip: Optimize for AI with TOON
                                </h3>
                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                    If you are sending status updates or configuration to an LLM like <strong>GPT-4o or Claude 3.5</strong>, standard JSON carries a lot of "metadata overhead" (quotes, braces, commas) that consumes tokens. 
                                    Use our <Link href="/json-to-toon-converter" className="font-bold underline text-pink-600 dark:text-pink-400">JSON to TOON converter</Link> to strip this overhead while keeping the data perfectly readable for AI, extending your context window and reducing cost.
                                </p>
                            </div>

                            {/* JSON Examples */}
                            <div id="json-examples" className="border-t border-pink-200/50 dark:border-pink-800/30 pt-12">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                                    Clean vs. Malformed JSON
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-xs">✅ Valid JSON</h4>
                                        <div className="bg-emerald-50 dark:bg-emerald-950/20 p-4 rounded-xl font-mono text-sm border border-emerald-200/50 dark:border-emerald-800/30">
                                            <pre className="text-emerald-800 dark:text-emerald-400">{`{
  "user": "antigravity",
  "status": "online",
  "tags": ["fast", "secure"]
}`}</pre>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-xs">❌ Common Malformed Error</h4>
                                        <div className="bg-rose-50 dark:bg-rose-950/20 p-4 rounded-xl font-mono text-sm border border-rose-200/50 dark:border-rose-800/30">
                                            <pre className="text-rose-800 dark:text-rose-400">{`{
  'user': "antigravity", // Single quotes invalid
  "status": "online",
  "tags": ["fast", "secure",] // Trailing comma
}`}</pre>
                                        </div>
                                    </div>
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
                            <section className="w-full pb-16">
                                <DynamicAd
                                    adSlot={process.env.NEXT_PUBLIC_AD_SLOT_MULTIPLEX}
                                    adFormat="autorelaxed"
                                />
                            </section>
                        )}
                        
                    </div>

                    {/* RIGHT AD COLUMN (Desktop XL+) */}
                    {process.env.NEXT_PUBLIC_AD_SLOT_SKYSCRAPER_RIGHT && (
                        <div className="hidden 2xl:block w-[160px] shrink-0">
                            <div className="sticky top-24 h-fit min-h-[600px] flex items-start justify-center">
                                <DynamicAd
                                adSlot={process.env.NEXT_PUBLIC_AD_SLOT_SKYSCRAPER_RIGHT}
                                adFormat="vertical"
                                style={{ width: '160px', height: '600px', display: 'block' }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </FlowerBackground>
    );
}
