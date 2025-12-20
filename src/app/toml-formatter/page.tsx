"use client";

import { Formatter } from "@/components/Formatter";
import { parse, stringify } from "smol-toml";
import Link from "next/link";
import { GitCompare } from "lucide-react";

export default function TomlFormatterPage() {

    const formatToml = async (input: string, _tabSize: number) => {
        // smol-toml doesn't support tabSize configuration in stringify directly in the same way,
        // but it produces standard formatted TOML.
        // We parse to validate, then stringify to format.
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
        <div className="flex flex-col min-h-screen">
            <Formatter
                id="toml-formatter"
                title="TOML Formatter & Validator"
                description="Free online tool to format, beautify, and validate TOML files. Fix structural errors and ensure valid TOML syntax instantly."
                inputType="toml"
                outputType="toml"
                onTransform={formatToml}
                sampleData={sampleData}
                customActions={
                    <Link
                        href="/diff-checker"
                        className="group w-full py-2.5 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200 font-semibold text-sm rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                        <GitCompare size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                        Diff
                    </Link>
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
                                Instantly format and beautify TOML files. Makes TOML configs readable and properly structured for Rust (Cargo), Python (pyproject.toml), and other tools.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Validation
                            </h3>
                            <p className="leading-relaxed">
                                Validates TOML syntax and structure in real-time. Detects errors, types, and invalid TOML instantly with clear error messages.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> 100% Client-Side
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
                <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                        When to choose TOML?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-100 dark:border-slate-800/50">
                            <h3 className="font-bold text-indigo-600 dark:text-indigo-400 mb-3 text-lg">Configuration Files</h3>
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                TOML is the gold standard for configuration files. Its key-value pair structure is intuitive and easy for humans to edit without syntax errors. Perfect for project settings like <strong>Cargo.toml</strong> (Rust) or <strong>pyproject.toml</strong> (Python).
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-100 dark:border-slate-800/50">
                            <h3 className="font-bold text-indigo-600 dark:text-indigo-400 mb-3 text-lg">Readability First</h3>
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                Choose TOML when you want data to be readable. Unlike JSON, it supports comments and doesn't require quotes for every key. Unlike YAML, it avoids ambiguous whitespace parsing issues.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-100 dark:border-slate-800/50">
                            <h3 className="font-bold text-indigo-600 dark:text-indigo-400 mb-3 text-lg">Simple Data Structures</h3>
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
                    {[
                        { 
                            q: "What is TOML?", 
                            a: "TOML acts as a configuration file format that is easy to read due to obvious semantics. It is widely used in Rust (Cargo.toml), Python (pyproject.toml), and Go projects." 
                        },
                        { 
                            q: "How do I validate TOML?", 
                            a: "Simply paste your TOML content into the editor. The tool automatically parses and validates the syntax, displaying any errors found." 
                        },
                        { 
                            q: "Is my TOML data secure?", 
                            a: "Absolutely! All TOML parsing and formatting happens entirely in your browser using smol-toml. Your files are never uploaded to any server." 
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
        </div>
    );
}
