"use client";

import { useState } from "react";
import { Converter } from "@/components/Converter";
import { jsonToCsv, csvToJson } from "@/lib/converters/json-csv";
import Script from "next/script";

// SEO Metadata (Client Component workaround: move metadata to layout or use standard export if allowed, 
// but since this file uses hooks, we'll need a wrapper or just use standard Next.js metadata in a separate layout file.
// Ideally, page.tsx should be server component and import client component. 
// For this pattern, let's make the Page Client Component (as per instruction "Create src/app/json-to-csv-converter/page.tsx")
// BUT Next.js App Router strongly prefers Server Components for Metadata.
// Let's split it: page.tsx (Server) -> ConverterClient (Client) to handle SEO properly.
// Wait, I will write this file as a Client Component for simplicity as requested, but I'll add the Metadata export 
// which only works in Server Components. 
// Solution: I will make this file the Server Component and the logic a separate Client Component?
// No, standard pattern: page.tsx is Server, imports logic.

// Let's stick to the single file pattern if possible, but metadata export won't work with "use client".
// I will implement this file as a CLIENT component for logic and use a separate layout.tsx for metadata? 
// Or better: Re-export metadata from a layout.tsx in the folder? 
// Correct approach: This page.tsx will be Server Component. It will import the interactive Converter wrapper.

// Wait, I can't put "use client" at the top if I export metadata. 
// So I will create `src/app/json-to-csv-converter/JsonCsvClient.tsx` for the logic.
// And `src/app/json-to-csv-converter/page.tsx` for the SEO/Server part.
// But the user instructions implied a single file or simple structure. I'll do the split for best SEO.

export default function JsonCsvClient() {
    const [flatten, setFlatten] = useState(true);

    return (
        <>
            <Converter
                title="JSON to CSV Converter"
                description="Convert JSON data to CSV format instantly. Support for nested objects, large files, and bidirectional conversion."
                leftTitle="JSON Input"
                rightTitle="CSV Output"
                leftLanguage="json"
                rightLanguage="csv"
                defaultLeft='[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "address": {
      "city": "New York",
      "zip": "10001"
    }
  },
  {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "address": {
      "city": "London",
      "zip": "SW1A"
    }
  }
]'
                options={
                    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-medium cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={flatten}
                            onChange={(e) => setFlatten(e.target.checked)}
                            className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                        />
                        Flatten Nested Objects
                    </label>
                }
                onConvertLeftToRight={(input) => jsonToCsv(input, flatten)}
                onConvertRightToLeft={(input) => csvToJson(input)}
            />

            {/* Content Section for SEO */}
            <div className="max-w-4xl mx-auto px-4 py-12 prose dark:prose-invert">
                <h2>How to Convert JSON to CSV?</h2>
                <p>
                    Our free <strong>JSON to CSV Converter</strong> tool makes it easy to transform structured JSON data into flat CSV tables compatible with Excel, Google Sheets, and databases.
                </p>
                <ol>
                    <li>Paste or upload your JSON code into the left editor.</li>
                    <li>Check "Flatten Nested Objects" if your data contains nested hierarchies.</li>
                    <li>Click the <strong>Convert</strong> button.</li>
                    <li>Download the result or copy it to your clipboard.</li>
                </ol>

                <h3>Why use this tool?</h3>
                <ul>
                    <li><strong>Secure:</strong> Conversion happens 100% in your browser. No data is sent to servers.</li>
                    <li><strong>Fast:</strong> handles large files efficiently.</li>
                    <li><strong>Smart Flattening:</strong> Automatically converts nested objects (e.g., <code>user.address.city</code>) into separate columns.</li>
                </ul>
            </div>
        </>
    );
}
