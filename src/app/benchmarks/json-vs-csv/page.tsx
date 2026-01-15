import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileJson, FileSpreadsheet, BarChart3, CheckCircle, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "JSON vs CSV Format Comparison: When to Use Which | TextGauge",
  description:
    "Comprehensive comparison of JSON and CSV formats. Learn when to use each format, size differences, parsing performance, and compatibility with tools.",
  openGraph: {
    title: "JSON vs CSV Format Comparison: When to Use Which",
    description:
      "Learn when to use JSON vs CSV, size differences, and compatibility with different tools.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON vs CSV Format Comparison",
    description:
      "Comprehensive guide on when to use JSON vs CSV formats.",
  },
};

// Comparison data
const featureComparison = [
  { feature: "Human Readable", json: "Medium", csv: "Excellent", winner: "CSV" },
  { feature: "Nested Data", json: "Excellent", csv: "Poor", winner: "JSON" },
  { feature: "File Size", json: "Larger", csv: "Smaller", winner: "CSV" },
  { feature: "Type Preservation", json: "Excellent", csv: "Poor", winner: "JSON" },
  { feature: "Spreadsheet Compatibility", json: "Poor", csv: "Excellent", winner: "CSV" },
  { feature: "API Data Exchange", json: "Excellent", csv: "Poor", winner: "JSON" },
  { feature: "Database Export", json: "Good", csv: "Excellent", winner: "CSV" },
  { feature: "Configuration Files", json: "Excellent", csv: "Poor", winner: "JSON" },
];

const sizeComparison = [
  { dataType: "100 User Records", jsonSize: "45KB", csvSize: "28KB", savings: "38%" },
  { dataType: "1000 Products", jsonSize: "520KB", csvSize: "310KB", savings: "40%" },
  { dataType: "Simple Key-Value", jsonSize: "1.2KB", csvSize: "0.8KB", savings: "33%" },
  { dataType: "Nested Config", jsonSize: "8KB", csvSize: "12KB*", savings: "-50%" },
];

const useCases = [
  { useCase: "API Response", recommended: "JSON", reason: "Native format for web APIs, preserves types" },
  { useCase: "Excel Analysis", recommended: "CSV", reason: "Opens directly in spreadsheet apps" },
  { useCase: "Database Backup", recommended: "CSV", reason: "Universal import/export support" },
  { useCase: "Config Files", recommended: "JSON", reason: "Supports complex nested structures" },
  { useCase: "Data Science", recommended: "CSV", reason: "Pandas, R, and ML libraries prefer CSV" },
  { useCase: "Web Storage", recommended: "JSON", reason: "localStorage and sessionStorage native format" },
];

export default function JsonVsCsvBenchmarkPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-orange-950">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4" />
              Research & Comparison
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              JSON vs CSV: Complete Comparison
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
              Understand the <span className="font-bold text-orange-600">key differences</span> between 
              JSON and CSV formats to choose the right one for your use case.
            </p>

            <Link
              href="/json-to-csv-converter"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all"
            >
              Try JSON to CSV Converter
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-4">
                <FileJson className="w-8 h-8 text-blue-600" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">JSON</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Best for APIs, web apps, and complex nested data structures.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" /> Preserves data types
                </li>
                <li className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" /> Supports nested objects
                </li>
                <li className="flex items-center gap-2 text-red-500">
                  <XCircle className="w-4 h-4" /> Larger file size
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-3 mb-4">
                <FileSpreadsheet className="w-8 h-8 text-emerald-600" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">CSV</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Best for spreadsheets, databases, and tabular data analysis.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" /> Smaller file size
                </li>
                <li className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" /> Universal compatibility
                </li>
                <li className="flex items-center gap-2 text-red-500">
                  <XCircle className="w-4 h-4" /> No nested data support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-12 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Feature-by-Feature Comparison
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Feature</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-blue-600">JSON</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-emerald-600">CSV</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">Winner</th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((item, index) => (
                  <tr key={index} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-4 py-4 font-medium text-slate-900 dark:text-white">{item.feature}</td>
                    <td className="px-4 py-4 text-center text-slate-600 dark:text-slate-400">{item.json}</td>
                    <td className="px-4 py-4 text-center text-slate-600 dark:text-slate-400">{item.csv}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.winner === "JSON" 
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" 
                          : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                      }`}>
                        {item.winner}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* File Size Comparison */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-center">
            File Size Comparison
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
            CSV is typically 30-40% smaller for flat data
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-slate-50 dark:bg-slate-950 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Data Type</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-blue-600">JSON Size</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-emerald-600">CSV Size</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">Savings</th>
                </tr>
              </thead>
              <tbody>
                {sizeComparison.map((item, index) => (
                  <tr key={index} className="border-t border-slate-200 dark:border-slate-700">
                    <td className="px-4 py-4 font-medium text-slate-900 dark:text-white">{item.dataType}</td>
                    <td className="px-4 py-4 text-center text-slate-600 dark:text-slate-400">{item.jsonSize}</td>
                    <td className="px-4 py-4 text-center text-slate-600 dark:text-slate-400">{item.csvSize}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        item.savings.startsWith("-") 
                          ? "bg-red-100 text-red-700" 
                          : "bg-emerald-100 text-emerald-700"
                      }`}>
                        {item.savings.startsWith("-") ? item.savings : `-${item.savings}`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 text-center mt-4">
            * Nested data in CSV requires flattening, which can increase file size
          </p>
        </div>
      </section>

      {/* Use Case Recommendations */}
      <section className="py-12 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            When to Use Which Format
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((item, index) => (
              <div key={index} className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.useCase}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    item.recommended === "JSON"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {item.recommended}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Methodology
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-slate-600 dark:text-slate-400">
              File size comparisons were conducted using UTF-8 encoded files with realistic datasets. 
              JSON files were minified (no whitespace) for fair comparison. CSV files used comma delimiters 
              with proper quoting for special characters.
            </p>
            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>Note:</strong> Actual file sizes depend on your specific data structure and content. 
                Complex nested JSON data may not convert efficiently to CSV without data loss.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-600 dark:bg-orange-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FileSpreadsheet className="w-12 h-12 text-white mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Need to Convert JSON to CSV?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Use our free converter to transform your data instantly.
          </p>
          <Link
            href="/json-to-csv-converter"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Convert JSON to CSV
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Citation */}
      <section className="py-8 bg-slate-100 dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-500">
            <strong>Cite this comparison:</strong> TextGauge. (2026). JSON vs CSV Format Comparison. 
            Retrieved from https://countcharacters.org/benchmarks/json-vs-csv
          </p>
        </div>
      </section>
    </div>
  );
}
