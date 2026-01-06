"use client";

import { Formatter } from "@/components/Formatter";
import { FlowerBackground } from "@/components/FlowerBackground";
import { GoogleAdsense } from "@/components/GoogleAdsense";
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
                    flowerTheme={theme}
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

                {/* Ad: In-Article 1 */}
                {process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE && (
                    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex justify-center">
                        <div className="w-full max-w-4xl bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden min-h-[100px] flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-800">
                             <GoogleAdsense
                                adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE}
                                style={{ display: 'block', textAlign: 'center' }}
                                adFormat="fluid"
                                layout="in-article"
                             />
                        </div>
                    </div>
                )}

                {/* FAQ Section */}
                <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4 w-full">
                        <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-colors">
                                How do I validate YAML?
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-emerald-100/50 dark:border-emerald-800/30 pt-4">
                                <strong>Paste your YAML</strong> into the editor. The tool <strong>automatically validates</strong> syntax and structure, displaying errors with <strong>line numbers</strong> and descriptions. Common issues like indentation errors and missing colons are detected instantly.
                            </div>
                        </details>

                        <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-colors">
                                Is my YAML data secure?
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-emerald-100/50 dark:border-emerald-800/30 pt-4">
                                <strong>100% private.</strong> All parsing, validation, and formatting happens <strong>entirely in your browser</strong>. Your configuration files are <strong>never uploaded</strong> to any server. This is especially important for YAML files containing sensitive infrastructure configs.
                            </div>
                        </details>

                        <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-colors">
                                What is YAML used for?
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-emerald-100/50 dark:border-emerald-800/30 pt-4">
                                YAML is used for <strong>configuration files</strong> in tools like <strong>Docker, Kubernetes, GitHub Actions, Ansible</strong>, and CI/CD pipelines. It&apos;s preferred over JSON for configs because it&apos;s more readable and supports comments.
                            </div>
                        </details>

                        <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-colors">
                                Can I convert JSON to YAML?
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-emerald-100/50 dark:border-emerald-800/30 pt-4">
                                Yes! Simply <strong>paste JSON</strong> into the input — the formatter will <strong>automatically convert</strong> it to properly formatted YAML. This is useful for converting API responses into config files.
                            </div>
                        </details>

                        <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-colors">
                                What YAML versions are supported?
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-emerald-100/50 dark:border-emerald-800/30 pt-4">
                                This tool supports <strong>YAML 1.2</strong>, the latest standard. It&apos;s compatible with <strong>Docker Compose, Kubernetes manifests, GitHub Actions workflows</strong>, and all modern DevOps tools.
                            </div>
                        </details>
                    </div>
                </section>

                {/* Ad: In-Article 2 */}
                {process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE && (
                    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex justify-center">
                        <div className="w-full max-w-4xl bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden min-h-[100px] flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-800">
                             <GoogleAdsense
                                adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE}
                                style={{ display: 'block', textAlign: 'center' }}
                                adFormat="fluid"
                                layout="in-article"
                             />
                        </div>
                    </div>
                )}


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
                </section>
            </div>

                {/* Ad: Multiplex (Related Content) */}
                 {process.env.NEXT_PUBLIC_AD_SLOT_MULTIPLEX && (
                    <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                        <div className="w-full bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden min-h-[200px] border border-dashed border-slate-200 dark:border-slate-800 p-4">
                             <GoogleAdsense
                                adSlot={process.env.NEXT_PUBLIC_AD_SLOT_MULTIPLEX}
                                adFormat="autorelaxed"
                                style={{ display: 'block' }}
                             />
                        </div>
                    </section>
                )}
        </FlowerBackground>
    );
}
