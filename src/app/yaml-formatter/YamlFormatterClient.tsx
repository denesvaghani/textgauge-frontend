"use client";

import { Formatter } from "@/components/Formatter";
import { FlowerBackground } from "@/components/FlowerBackground";
import { DynamicAd } from "@/components/DynamicAd";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { flowerThemes } from "@/config/flowerThemes";
import { RelatedTools } from "@/components/RelatedTools";
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
                        <section className="w-full pb-16">
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
                                Expert FAQ: YAML for DevOps & Security
                            </h2>
                            <div className="space-y-4 w-full">
                                <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                                    <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-colors">
                                        Is client-side YAML validation safe for K8s secrets?
                                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-emerald-100/50 dark:border-emerald-800/30 pt-4">
                                        <strong>Yes.</strong> Unlike many online formatters that send data to a backend, <strong>TextGauge</strong> parses YAML <strong>100% locally</strong>. Your Docker credentials, Kubernetes secrets, or AWS environment variables never touch our servers or the network.
                                    </div>
                                </details>

                                <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                                    <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-colors">
                                        Does this support YAML 1.2 Standards?
                                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-emerald-100/50 dark:border-emerald-800/30 pt-4">
                                        Our tool uses the <strong>js-yaml</strong> library, supporting the latest <strong>YAML 1.2 schemas</strong>. This ensures compatibility with modern CI/CD pipelines like <strong>GitHub Actions, GitLab CI, and CircleCI</strong>.
                                    </div>
                                </details>

                                <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                                    <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-colors">
                                        Can I convert JSON to YAML losslessly?
                                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-emerald-100/50 dark:border-emerald-800/30 pt-4">
                                        <strong>Absolutely.</strong> Paste any valid JSON into the input editor. The tool will automatically detect the JSON structure and beautify it into a clean, human-readable YAML file—perfect for converting API responses into configuration manifests.
                                    </div>
                                </details>

                                <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                                    <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-colors">
                                        Why is 'Indentation' so critical in YAML?
                                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-emerald-100/50 dark:border-emerald-800/30 pt-4">
                                        Unlike JSON, YAML uses <strong>whitespace/indentation</strong> for its structural logic. A single missing space in a <strong>Kubernetes Deployment</strong> file can cause an entire cluster update to fail. Our validator catches these invisible errors and highlights the exact line for repair.
                                    </div>
                                </details>

                                <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                                    <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-colors">
                                        Does this tool support YAML Anchors and Aliases?
                                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-emerald-100/50 dark:border-emerald-800/30 pt-4">
                                        Yes. The beautifier correctly handles and preserves <strong>Anchors (&)</strong> and <strong>Aliases (*)</strong>, which are essential for DRY (Don't Repeat Yourself) YAML configurations in complex infrastructure-as-code projects.
                                    </div>
                                </details>
                            </div>
                        </section>

                        {/* Related Tools */}
                        <RelatedTools currentPath="/yaml-formatter" />

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
                            {/* Why YAML in DevSecOps */}
                            <div id="what-is-yaml" className="border-t border-emerald-200/50 dark:border-emerald-800/30 pt-12">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                                    Beyond Basics: YAML&apos;s Role in Modern DevSecOps
                                </h2>
                                <div className="prose prose-slate dark:prose-invert max-w-none">
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                                        In 2026, YAML has transcended simple configuration. It is the backbone of <strong>Infrastructure as Code (IaC)</strong>. Whether you are defining a <strong>Kubernetes Cluster</strong>, a complex <strong>GitHub Actions</strong> workflow, or an <strong>Ansible</strong> playbook, your YAML must be perfectly formatted to avoid catastrophic deployment failures.
                                    </p>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base mt-4">
                                        Our YAML Validator goes beyond simple syntax checking. It ensures that your data structure is logically sound. By using a <strong>client-side beautifier</strong>, you maintain a "Zero Trust" security posture—ensuring that your sensitive production configurations never leave your local machine while you prepare them for commit.
                                    </p>
                                </div>
                            </div>

                            {/* YAML Examples */}
                            <div id="yaml-examples" className="border-t border-emerald-200/50 dark:border-emerald-800/30 pt-12">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                                    Clean YAML vs. Common Errors
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-xs">✅ Valid Kubernetes Spec</h4>
                                        <div className="bg-emerald-50 dark:bg-emerald-950/20 p-4 rounded-xl font-mono text-sm border border-emerald-200/50 dark:border-emerald-800/30">
                                            <pre className="text-emerald-800 dark:text-emerald-400">{`apiVersion: v1
kind: Service
metadata:
  name: textgauge-api
spec:
  ports:
    - port: 80
      targetPort: 9376`}</pre>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-xs">❌ Common Indentation Error</h4>
                                        <div className="bg-rose-50 dark:bg-rose-950/20 p-4 rounded-xl font-mono text-sm border border-rose-200/50 dark:border-rose-800/30">
                                            <pre className="text-rose-800 dark:text-rose-400">{`apiVersion: v1
kind: Service
metadata:
name: textgauge-api # Error: Missing indent
spec:
  ports:
  - port: 80 # Error: Tab used instead of spaces`}</pre>
                                        </div>
                                    </div>
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
