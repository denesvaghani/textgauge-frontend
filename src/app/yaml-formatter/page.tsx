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

    // YAML doesn't strictly have a "minify" in the same way JSON does (whitespace matters),
    // but we can make it compact or just JSON minify if they want JSON output. 
    // However, often users want JSON minified from YAML.
    // For 'minify' in YAML context, often people mean "convert to JSON and minify".
    // But let's stick to cleaning up YAML or just leave it undefined if standard yaml minification isn't standard.
    // Actually, yaml.dump(obj, { flowLevel: 0 }) creates a more block style, 
    // but let's just assume typically users want to VALIDATE and BEAUTIFY.

    const sampleData = `name: TextGauge\nfeatures:\n  - Count\n  - Format\n  - Analyze\nactive: true`;

    return (
        <Formatter
            title="YAML Formatter, Validator & Beautifier"
            description="Free online tool to format, beautify, and validate YAML files. Convert JSON to YAML, fix structural errors, and ensure valid YAML syntax. Prettier your YAML configuration files instantly."
            inputType="yaml"
            outputType="yaml"
            onTransform={formatYaml}
            // No standard 'minify' for YAML that stays as YAML, usually it becomes JSON. 
            // If user wants JSON, they should use a converter. We'll skip minify for YAML for now.
            sampleData={sampleData}
        />
    );
}
