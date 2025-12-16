"use client";

import { Formatter } from "@/components/Formatter";
import { SeoContent } from "@/components/SeoContent";
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
            <SeoContent
                toolName="YAML"
                description="YAML Formatter working proper in Windows, Mac, Linux, Chrome, Firefox, Safari and Edge and it's Free."
                knowMoreLinks={[
                    { label: "What is YAML file?", href: "#what-is-yaml" },
                    { label: "YAML Examples.", href: "#yaml-examples" },
                ]}
                helperTasks={[
                    { label: "YAML Beautifier", href: "/yaml-formatter" },
                    { label: "YAML Parser", href: "/yaml-formatter" },
                    { label: "YAML Editor", href: "/yaml-formatter" },
                    { label: "YAML Viewer", href: "/yaml-formatter" },
                    { label: "YAML Formatter", href: "/yaml-formatter" },
                    { label: "YAML Pretty Print", href: "/yaml-formatter" },
                    { label: "YAML Validator", href: "/yaml-formatter" },
                ]}
                discoverLinks={[]}
                features={[
                    "It helps to Change, add, move, remove, and duplicate fields and values in YAML.",
                    "Validate and fix YAML syntax errors instantly.",
                    "You can Search & highlight text in the editor.",
                    "Undo and redo all actions with standard shortcuts.",
                    "Convert JSON data to YAML format automatically.",
                    "Format and beautify YAML files with custom indentation."
                ]}
                contentSections={[
                    {
                        id: "what-is-yaml",
                        title: "What is YAML file?",
                        content: (
                            <>
                                <p>
                                    YAML (YAML Ain't Markup Language) is a human-readable data serialization standard that can be used in conjunction with all programming languages and is often used to write configuration files.
                                </p>
                                <p>
                                    It caters to people using data rather than just computers processing it. YAML is often used for configuration files and in applications where data is being stored or transmitted.
                                </p>
                            </>
                        )
                    },
                    {
                        id: "yaml-examples",
                        title: "YAML Examples",
                        content: (
                            <>
                                <p>Here is a simple example of YAML data representing a server config:</p>
                                <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-md font-mono text-xs overflow-x-auto border border-slate-200 dark:border-slate-800">
                                    <pre>{`name: Production Server
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
                            </>
                        )
                    }
                ]}
            />
        </div>
    );
}
