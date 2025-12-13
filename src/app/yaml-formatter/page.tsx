"use client";

import dynamic from 'next/dynamic';
import yaml from "js-yaml";

// Dynamically import Formatter with loading state
const DynamicFormatter = dynamic(
    () => import("@/components/Formatter").then(mod => ({ default: mod.Formatter })),
    {
        loading: () => (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400 mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400">Loading YAML Formatter...</p>
                </div>
            </div>
        ),
        ssr: false // Disable server-side rendering for Monaco Editor
    }
);

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
        <DynamicFormatter
            title="YAML Formatter, Validator & Beautifier"
            description="Free online tool to format, beautify, and validate YAML files. Convert JSON to YAML, fix structural errors, and ensure valid YAML syntax. Prettier your YAML configuration files instantly."
            inputType="yaml"
            outputType="yaml"
            onTransform={formatYaml}
            sampleData={sampleData}
        />
    );
}
