"use client";

import { Formatter } from "@/components/Formatter";
import yaml from "js-yaml";

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
        <div className="flex flex-col min-h-screen">
            <Formatter
                title="YAML Formatter, Validator & Beautifier"
                description="Free online tool to format, beautify, and validate YAML files. Convert JSON to YAML, fix structural errors, and ensure valid YAML syntax. Prettier your YAML configuration files instantly."
                inputType="yaml"
                outputType="yaml"
                onTransform={formatYaml}
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
                                Instantly format and beautify YAML files with customizable indentation. Makes YAML configs readable and properly structured for Docker, Kubernetes, CI/CD pipelines.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> JSON to YAML Conversion
                            </h3>
                            <p className="leading-relaxed">
                                Automatically converts JSON data to YAML format. Perfect for transforming API responses into YAML configuration files.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Validation
                            </h3>
                            <p className="leading-relaxed">
                                Validates YAML syntax and structure in real-time. Detects indentation errors, syntax mistakes, and invalid YAML instantly with clear error messages.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> 100% Client-Side
                            </h3>
                            <p className="leading-relaxed">
                                All processing happens in your browser. Your YAML configuration files never leave your device, ensuring complete privacy and security.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {[
                        { 
                            q: "How do I validate YAML?", 
                            a: "Simply paste your YAML content into the editor. The tool automatically validates the syntax and structure, displaying any errors with line numbers and descriptions to help you fix them quickly." 
                        },
                        { 
                            q: "Can I convert YAML to JSON or JSON to YAML?", 
                            a: "Yes! Paste JSON data and click 'Beautify' to convert it to YAML format. The tool automatically detects the input format and handles the conversion." 
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
