"use client";

import { Formatter } from "@/components/Formatter";
import { FlowerBackground } from "@/components/FlowerBackground";
import { flowerThemes } from "@/config/flowerThemes";
import yaml from "js-yaml";
import Link from "next/link";
import { GitCompare } from "lucide-react";

const theme = flowerThemes.whiteLily;

export default function YamlFormatterPage() {

    const formatYaml = async (input: string, tabSize: number) => {
        // Try parsing as JSON first, then YAML to allow JSON->YAML conversion
        let obj;
        try {
            obj = JSON.parse(input);
        } catch {
            obj = yaml.load(input);
        }

        // yaml.dump indent option
        return yaml.dump(obj, { indent: tabSize, lineWidth: -1 });
    };

    const sampleData = `name: TextGauge\nfeatures:\n  - Count\n  - Format\n  - Analyze\nactive: true`;

    return (
        <FlowerBackground theme={theme} badgeText="YAML Tool">
            <div className="flex flex-col min-h-screen">
                <Formatter
                    id="yaml-formatter"
                    title="YAML Formatter, Validator & Beautifier"
                    description="Free online tool to format, beautify, and validate YAML files. Convert JSON to YAML, fix structural errors, and ensure valid YAML syntax. Prettier your YAML configuration files instantly."
                    inputType="yaml"
                    outputType="yaml"
                    onTransform={formatYaml}
                    sampleData={sampleData}
                    titleGradient="bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400"
                    customActions={
                        <Link
                            href="/diff-checker"
                            className="group w-full py-2.5 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-slate-700 dark:text-slate-200 font-semibold text-sm rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
                        >
                            <GitCompare size={16} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                            Diff
                        </Link>
                    }
                />
                
                {/* Key Features Section */}
                <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-sm border border-emerald-200/50 dark:border-emerald-800/30 p-8 transition-colors duration-200">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            Key Features
                        </h2>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-sm text-slate-600 dark:text-slate-300">
                            <div>
                                <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Format & Beautify
                                </h3>
                                <p className="leading-relaxed">
                                    Instantly format and beautify YAML files with customizable indentation. Makes YAML configs readable and properly structured for Docker, Kubernetes, CI/CD pipelines.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Validation
                                </h3>
                                <p className="leading-relaxed">
                                    Validates YAML syntax and structure in real-time. Detects indentation errors, syntax mistakes, and invalid YAML instantly with clear error messages.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 100% Client-Side
                                </h3>
                                <p className="leading-relaxed">
                                    All processing happens in your browser. Your YAML configuration files never leave your device, ensuring complete privacy and security.
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
                                q: "How do I validate YAML?", 
                                a: "Simply paste your YAML content into the editor. The tool automatically validates the syntax and structure, displaying any errors with line numbers and descriptions to help you fix them quickly." 
                            },

                            { 
                                q: "Is my YAML data secure?", 
                                a: "Absolutely! All YAML parsing, validation, and formatting happens entirely in your browser. Your configuration files are never uploaded to any server, ensuring complete privacy." 
                            },
                            { 
                                q: "What YAML versions are supported?", 
                                a: "Our tool supports YAML 1.2 standard, which is compatible with most modern applications including Docker, Kubernetes, Ansible, and GitHub Actions configurations." 
                            }
                        ].map((faq, i) => (
                            <details key={i} className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/30 rounded-xl overflow-hidden transition-all duration-200">
                                <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-colors">
                                    {faq.q}
                                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-emerald-100/50 dark:border-emerald-800/30 pt-4">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </section>

                {/* Educational Content Sections */}
                <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-16">
                    {/* What is YAML file? */}
                    <div id="what-is-yaml" className="border-t border-emerald-200/50 dark:border-emerald-800/30 pt-12">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            What is YAML file?
                        </h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                                YAML (YAML Ain't Markup Language) is a human-readable data serialization standard that can be used in conjunction with all programming languages and is often used to write configuration files.
                            </p>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base mt-4">
                                It caters to people using data rather than just computers processing it. YAML is often used for configuration files and in applications where data is being stored or transmitted.
                            </p>
                        </div>
                    </div>

                    {/* YAML Examples */}
                    <div id="yaml-examples" className="border-t border-emerald-200/50 dark:border-emerald-800/30 pt-12">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            YAML Examples
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 text-base">
                            Here is a simple example of YAML data representing a server config:
                        </p>
                        <div className="bg-slate-100 dark:bg-slate-950 p-6 rounded-xl font-mono text-sm overflow-x-auto border border-emerald-200/50 dark:border-emerald-800/30">
                            <pre className="text-slate-800 dark:text-slate-200">{`name: Production Server
version: 1.0.0
dependencies:
  - name: nginx
    version: 1.18.0
  - name: postgresql
    version: 13.2
settings:
  debug: false
  max_connections: 100`}</pre>
                        </div>
                    </div>

                    {/* Helper Tasks */}
                    <div className="border-t border-emerald-200/50 dark:border-emerald-800/30 pt-12">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                            YAML Beautifier helps to perform below tasks:
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "YAML Beautifier", href: "/yaml-formatter" },
                                { label: "YAML Parser", href: "/yaml-formatter" },
                                { label: "YAML Editor", href: "/yaml-formatter" },
                                { label: "YAML Viewer", href: "/yaml-formatter" },
                                { label: "YAML Formatter", href: "/yaml-formatter" },
                                { label: "YAML Pretty Print", href: "/yaml-formatter" },
                                { label: "YAML Validator", href: "/yaml-formatter" },
                            ].map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="px-4 py-2 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors border border-emerald-200 dark:border-emerald-800"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Platform Compatibility */}
                    <div className="border-t border-emerald-200/50 dark:border-emerald-800/30 pt-12">
                        <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800 p-6 text-center">
                            <p className="text-slate-700 dark:text-slate-300 font-medium text-base">
                                YAML Formatter working properly in <strong>Windows</strong>, <strong>Mac</strong>, <strong>Linux</strong>, <strong>Chrome</strong>, <strong>Firefox</strong>, <strong>Safari</strong> and <strong>Edge</strong> and it's <strong className="text-emerald-600 dark:text-emerald-400">Free</strong>.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </FlowerBackground>
    );
}
