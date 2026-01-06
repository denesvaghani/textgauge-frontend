"use client";

import { Formatter } from "@/components/Formatter";
import { FlowerBackground } from "@/components/FlowerBackground";
import { flowerThemes } from "@/config/flowerThemes";
import { parse, stringify } from "smol-toml";
import Link from "next/link";
import { GitCompare } from "lucide-react";

const theme = flowerThemes.frangipani;

export default function TomlFormatterPage() {

    const formatToml = async (input: string, _tabSize: number) => {
        const obj = parse(input);
        return stringify(obj);
    };

    const sampleData = `
# This is a TOML document

title = "TOML Example"

[owner]
name = "Tom Preston-Werner"
dob = 1979-05-27T07:32:00-08:00

[database]
enabled = true
ports = [ 8000, 8001, 8002 ]
data = [ ["delta", "phi"], [3.14] ]
temp_targets = { cpu = 79.5, case = 72.0 }

[servers]

  [servers.alpha]
  ip = "10.0.0.1"
  role = "frontend"

  [servers.beta]
  ip = "10.0.0.2"
  role = "backend"
`.trim();

    return (
        <FlowerBackground theme={theme} badgeText="TOML Tool">
            <div className="flex flex-col min-h-screen">
                <Formatter
                    title="TOML Formatter"
                    description="Format and validate TOML data."
                    inputType="toml"
                    outputType="toml"
                    onTransform={formatToml}
                    sampleData={sampleData}
                    flowerTheme={theme}
                    customActions={
                        <Link
                            href="/diff-checker"
                            className="group w-full py-2.5 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-orange-400 dark:hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 text-slate-700 dark:text-slate-200 font-semibold text-sm rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
                        >
                            <GitCompare size={16} className="text-slate-400 group-hover:text-orange-500 transition-colors" />
                            Diff
                        </Link>
                    }
                />
                
                {/* Key Features Section */}
                <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-sm border border-orange-200/50 dark:border-orange-800/30 p-8 transition-colors duration-200">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            Key Features
                        </h2>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-sm text-slate-600 dark:text-slate-300">
                            <div>
                                <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Format & Beautify
                                </h3>
                                <p className="leading-relaxed">
                                    Instantly format and beautify TOML files. Makes TOML configs readable and properly structured for Rust (Cargo), Python (pyproject.toml), and other tools.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Validation
                                </h3>
                                <p className="leading-relaxed">
                                    Validates TOML syntax and structure in real-time. Detects errors, types, and invalid TOML instantly with clear error messages.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> 100% Client-Side
                                </h3>
                                <p className="leading-relaxed">
                                    All processing happens in your browser. Your TOML configuration files never leave your device, ensuring complete privacy and security.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* When to choose TOML Section */}
                <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/20 dark:to-slate-900 rounded-2xl shadow-sm border border-orange-200/50 dark:border-orange-800/30 p-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            When to choose TOML?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-orange-100/50 dark:border-orange-800/30">
                                <h3 className="font-bold text-orange-600 dark:text-orange-400 mb-3 text-lg">Configuration Files</h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                    TOML is the gold standard for configuration files. Its key-value pair structure is intuitive and easy for humans to edit without syntax errors. Perfect for project settings like <strong>Cargo.toml</strong> (Rust) or <strong>pyproject.toml</strong> (Python).
                                </p>
                            </div>
                            <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-orange-100/50 dark:border-orange-800/30">
                                <h3 className="font-bold text-orange-600 dark:text-orange-400 mb-3 text-lg">Readability First</h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                    Choose TOML when you want data to be readable. Unlike JSON, it supports comments and doesn't require quotes for every key. Unlike YAML, it avoids ambiguous whitespace parsing issues.
                                </p>
                            </div>
                            <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-orange-100/50 dark:border-orange-800/30">
                                <h3 className="font-bold text-orange-600 dark:text-orange-400 mb-3 text-lg">Simple Data Structures</h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                    Use TOML for flat or moderately nested data. If your data is deeply nested or complex (like API responses), JSON might be better. TOML shines where clarity and simplicity are paramount.
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
                        <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-orange-200/50 dark:border-orange-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-orange-50/50 dark:hover:bg-orange-900/20 transition-colors">
                                What is TOML?
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-orange-100/50 dark:border-orange-800/30 pt-4">
                                TOML (Tom&apos;s Obvious, Minimal Language) is a <strong>configuration file format</strong> designed to be easy to read. It&apos;s used in <strong>Cargo.toml</strong> (Rust), <strong>pyproject.toml</strong> (Python), and many other project configurations.
                            </div>
                        </details>

                        <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-orange-200/50 dark:border-orange-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-orange-50/50 dark:hover:bg-orange-900/20 transition-colors">
                                How do I validate TOML?
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-orange-100/50 dark:border-orange-800/30 pt-4">
                                <strong>Paste your TOML</strong> into the editor. The tool <strong>automatically validates</strong> syntax and displays errors with <strong>line numbers</strong>. Common issues like missing brackets, invalid dates, and incorrect arrays are caught instantly.
                            </div>
                        </details>

                        <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-orange-200/50 dark:border-orange-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-orange-50/50 dark:hover:bg-orange-900/20 transition-colors">
                                TOML vs JSON vs YAML — which should I use?
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-orange-100/50 dark:border-orange-800/30 pt-4">
                                Use <strong>TOML</strong> for configuration files — it supports comments and is easy to edit. Use <strong>JSON</strong> for APIs and data exchange. Use <strong>YAML</strong> for DevOps configs (Docker, Kubernetes). TOML avoids YAML&apos;s whitespace pitfalls and JSON&apos;s lack of comments.
                            </div>
                        </details>

                        <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-orange-200/50 dark:border-orange-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-orange-50/50 dark:hover:bg-orange-900/20 transition-colors">
                                Is my TOML data secure?
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-orange-100/50 dark:border-orange-800/30 pt-4">
                                <strong>100% private.</strong> All parsing and formatting happens <strong>entirely in your browser</strong> using smol-toml. Your configuration files are <strong>never uploaded</strong> to any server — ideal for files containing API keys or credentials.
                            </div>
                        </details>
                    </div>
                </section>
            </div>
        </FlowerBackground>
    );
}
