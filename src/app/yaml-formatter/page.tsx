"use client";

import { Formatter } from "@/components/Formatter";
import yaml from "js-yaml";

export default function YamlFormatterPage() {
    const formatYaml = (input: string) => {
        // Try parsing as JSON first, then YAML.
        // This allows users to convert JSON -> YAML or beautify YAML.
        let obj;
        try {
            obj = JSON.parse(input);
        } catch {
            obj = yaml.load(input);
        }

        return yaml.dump(obj, { indent: 2, lineWidth: -1 });
    };

    return (
        <Formatter
            title="YAML Formatter & Validator"
            description="Format, validate, and convert YAML. Convert JSON to YAML instantly. Free online YAML tool."
            inputType="yaml"
            outputType="yaml"
            transform={formatYaml}
            placeholderInput="name: Example&#10;list:&#10;  - item 1&#10;  - item 2"
        />
    );
}
