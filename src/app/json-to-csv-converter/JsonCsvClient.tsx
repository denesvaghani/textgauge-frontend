"use client";

import { useState } from "react";
import { Converter } from "@/components/Converter";
import { jsonToCsv, csvToJson } from "@/lib/converters/json-csv";

export default function JsonCsvClient() {
    const [flatten, setFlatten] = useState(true);

    const sampleJson = `[
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
]`;

    return (
        <>
            <Converter
                title="JSON to CSV Converter"
                description="Convert JSON data to CSV format instantly. Support for nested objects, large files, and bidirectional conversion."
                leftTitle="JSON Input"
                rightTitle="CSV Output"
                leftLanguage="json"
                rightLanguage="csv"
                defaultLeft=""
                sampleData={sampleJson}
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

            {/* Content Section Match User Request */}
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto prose dark:prose-invert">

                    <section className="mb-12">
                        <h2>Know more about JSON to CSV Converter.</h2>
                        <ul className="list-none pl-0 space-y-2">
                            <li>
                                <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">What is JSON file?</a>
                            </li>
                            <li>
                                <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">JSON Examples.</a>
                            </li>
                        </ul>
                        <p className="mt-4 text-slate-600 dark:text-slate-300">
                            JSON to CSV Converter works properly in Windows, Mac, Linux, Chrome, Firefox, Safari and Edge and it's Free.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h3>JSON Converter helps to perform below tasks:</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-4">
                            <a href="/json-formatter" className="text-indigo-600 dark:text-indigo-400 hover:underline">JSON Beautifier</a>
                            <a href="/json-formatter" className="text-indigo-600 dark:text-indigo-400 hover:underline">JSON Parser</a>
                            <a href="/json-formatter" className="text-indigo-600 dark:text-indigo-400 hover:underline">JSON Editor</a>
                            <a href="/json-formatter" className="text-indigo-600 dark:text-indigo-400 hover:underline">JSON Viewer</a>
                            <a href="/json-formatter" className="text-indigo-600 dark:text-indigo-400 hover:underline">JSON Formatter</a>
                            <a href="/json-formatter" className="text-indigo-600 dark:text-indigo-400 hover:underline">JSON Pretty Print</a>
                            <a href="/json-formatter" className="text-indigo-600 dark:text-indigo-400 hover:underline">JSON Minify</a>
                            <a href="/json-formatter" className="text-indigo-600 dark:text-indigo-400 hover:underline">JSON Validator</a>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h3>Key Features</h3>
                        <ul className="space-y-2 mt-4 text-slate-700 dark:text-slate-300">
                            <li>• <strong>Instant Conversion:</strong> Convert JSON data to CSV format in real-time.</li>
                            <li>• <strong>Flatten Objects:</strong> Automatically flattens nested JSON objects into proper CSV columns.</li>
                            <li>• <strong>Secure:</strong> All conversion happens in your browser. No data needs for server.</li>
                            <li>• <strong>Load from URL:</strong> Fetch JSON data directly from a URL.</li>
                            <li>• <strong>Bidirectional:</strong> You can also convert CSV back to JSON.</li>
                            <li>• <strong>Large File Support:</strong> Optimized for handling large datasets efficiently.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h3>What is JSON to CSV conversion?</h3>
                        <p className="text-slate-700 dark:text-slate-300">
                            JSON (JavaScript Object Notation) is a popular data format for APIs and web services, while CSV (Comma Separated Values) is widely used for spreadsheets and data analysis. Converting JSON to CSV simplifies complex data structures into rows and columns, making it easy to open in Excel, Google Sheets, or import into databases.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h3>JSON Examples</h3>
                        <p className="mb-4 text-slate-700 dark:text-slate-300">Here is a simple example of JSON data representing a user:</p>
                        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-sm overflow-x-auto">
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
                    </section>

                </div>
            </div>
        </>
    );
}
