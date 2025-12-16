"use client";

import { Formatter } from "@/components/Formatter";
import { SeoContent } from "@/components/SeoContent";

export default function JsonFormatterPage() {

    const formatJson = async (input: string, tabSize: number) => {
        // Basic validation / parse check
        const parsed = JSON.parse(input);
        return JSON.stringify(parsed, null, tabSize);
    };

    const minifyJson = async (input: string) => {
        const parsed = JSON.parse(input);
        return JSON.stringify(parsed);
    };

    const sampleData = `{\n  "name": "TextGauge",\n  "features": ["Count", "Format", "Analyze"],\n  "active": true\n}`;

    return (
        <div className="flex flex-col min-h-screen">
            <Formatter
                title="JSON Formatter, Validator & Beautifier"
                description="Free online tool to format, beautify, minify, and validate JSON. Fix JSON errors, structural issues, and format your code with 2-space, 4-space, or custom tab sizes. Prettier your JSON instantly."
                inputType="json"
                outputType="json"
                onTransform={formatJson}
                onMinify={minifyJson}
                sampleData={sampleData}
            />
            <SeoContent
                toolName="JSON"
                description="JSON Formatter working proper in Windows, Mac, Linux, Chrome, Firefox, Safari and Edge and it's Free."
                knowMoreLinks={[
                    { label: "What is JSON file?", href: "#what-is-json" },
                    { label: "JSON Examples.", href: "#json-examples" },
                ]}
                helperTasks={[
                    { label: "JSON Beautifier", href: "/json-formatter" },
                    { label: "JSON Parser", href: "/json-formatter" },
                    { label: "JSON Editor", href: "/json-formatter" },
                    { label: "JSON Viewer", href: "/json-formatter" },
                    { label: "JSON Formatter", href: "/json-formatter" },
                    { label: "JSON Pretty Print", href: "/json-formatter" },
                    { label: "JSON Minify", href: "/json-formatter" },
                    { label: "JSON Validator", href: "/json-formatter" },
                ]}
                discoverLinks={[]}
                features={[
                    "It helps to Change, add, move, remove, and duplicate fields and values.",
                    "It's also a Sort arrays and objects.",
                    "You can Search & highlight text in the tree view.",
                    "Undo and redo all actions.",
                    "JSON schema validation.",
                    "You can Format JSON Data and also compact JSON Data."
                ]}
                contentSections={[
                    {
                        id: "what-is-json",
                        title: "What is JSON file?",
                        content: (
                            <>
                                <p>
                                    JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate. It is based on a subset of the JavaScript Programming Language Standard ECMA-262 3rd Edition - December 1999.
                                </p>
                                <p>
                                    JSON is a text format that is completely language independent but uses conventions that are familiar to programmers of the C-family of languages, including C, C++, C#, Java, JavaScript, Perl, Python, and many others. These properties make JSON an ideal data-interchange language.
                                </p>
                            </>
                        )
                    },
                    {
                        id: "json-examples",
                        title: "JSON Examples",
                        content: (
                            <>
                                <p>Here is a simple example of JSON data representing a user:</p>
                                <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-md font-mono text-xs overflow-x-auto border border-slate-200 dark:border-slate-800">
                                    <pre>{`{
  "name": "John Doe",
  "age": 30,
  "isStudent": false,
  "courses": ["Math", "Science"],
  "address": {
    "city": "New York",
    "zip": "10001"
  }
}`}</pre>
                                </div>
                            </>
                        )
                    }
                ]}
            />
        </div>
    );
}
