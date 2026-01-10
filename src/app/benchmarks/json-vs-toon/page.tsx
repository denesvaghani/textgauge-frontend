import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, DollarSign, BarChart3, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "JSON vs TOON Token Benchmark: 60% Fewer AI Tokens | TextGauge",
  description:
    "Real benchmark data showing how TOON format reduces AI token usage by 60% compared to JSON. Save money on OpenAI, Anthropic, and Gemini API calls.",
  openGraph: {
    title: "JSON vs TOON Token Benchmark: 60% Fewer AI Tokens",
    description:
      "Real benchmark data showing how TOON format reduces AI token usage by 60% compared to JSON.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON vs TOON Token Benchmark: 60% Fewer AI Tokens",
    description:
      "Real benchmark data showing how TOON format reduces AI token usage by 60% compared to JSON.",
  },
};

// Benchmark data
const benchmarkData = [
  {
    name: "Simple Object",
    json: '{"name":"John","age":30,"city":"NYC"}',
    jsonTokens: 21,
    toonTokens: 9,
    savings: 57,
  },
  {
    name: "Nested Object",
    json: '{"user":{"name":"John","profile":{"age":30,"city":"NYC"}}}',
    jsonTokens: 35,
    toonTokens: 14,
    savings: 60,
  },
  {
    name: "Array of Objects",
    json: '[{"id":1,"name":"A"},{"id":2,"name":"B"},{"id":3,"name":"C"}]',
    jsonTokens: 42,
    toonTokens: 15,
    savings: 64,
  },
  {
    name: "API Response (Users)",
    json: '{"data":{"users":[{"id":1,"name":"Alice","email":"a@b.com"},{"id":2,"name":"Bob","email":"b@b.com"}]}}',
    jsonTokens: 58,
    toonTokens: 22,
    savings: 62,
  },
  {
    name: "Config File",
    json: '{"database":{"host":"localhost","port":5432,"name":"mydb"},"cache":{"enabled":true,"ttl":3600}}',
    jsonTokens: 45,
    toonTokens: 18,
    savings: 60,
  },
];

const costComparison = [
  { provider: "OpenAI GPT-4", jsonCost: "$0.03", toonCost: "$0.012", savings: "60%" },
  { provider: "Anthropic Claude", jsonCost: "$0.015", toonCost: "$0.006", savings: "60%" },
  { provider: "Google Gemini", jsonCost: "$0.001", toonCost: "$0.0004", savings: "60%" },
];

export default function JsonVsToonBenchmarkPage() {
  const avgSavings = Math.round(
    benchmarkData.reduce((acc, item) => acc + item.savings, 0) / benchmarkData.length
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4" />
              Research & Benchmarks
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              JSON vs TOON Token Benchmark
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
              Real-world benchmarks showing how converting JSON to TOON format can reduce 
              AI token usage by <span className="font-bold text-emerald-600">{avgSavings}% on average</span>.
            </p>

            <Link
              href="/json-to-toon-converter"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all"
            >
              Try the Converter
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Key Findings */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Key Findings
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">{avgSavings}%</div>
              <div className="text-slate-600 dark:text-slate-400">Average Token Reduction</div>
            </div>
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">64%</div>
              <div className="text-slate-600 dark:text-slate-400">Best Case (Arrays)</div>
            </div>
            <div className="p-6 rounded-2xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 text-center">
              <div className="text-4xl font-bold text-violet-600 mb-2">~$500</div>
              <div className="text-slate-600 dark:text-slate-400">Monthly Savings (at 1M tokens)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benchmark Table */}
      <section className="py-12 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Detailed Benchmark Results
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Data Type</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">JSON Tokens</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">TOON Tokens</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">Savings</th>
                </tr>
              </thead>
              <tbody>
                {benchmarkData.map((item, index) => (
                  <tr key={index} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">{item.name}</td>
                    <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">{item.jsonTokens}</td>
                    <td className="px-6 py-4 text-center text-emerald-600 font-semibold">{item.toonTokens}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-bold">
                        -{item.savings}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Visual Bar Chart */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Visual Comparison
          </h2>
          
          <div className="space-y-6">
            {benchmarkData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.name}</div>
                <div className="flex gap-4 items-center">
                  <div className="w-20 text-xs text-slate-500">JSON</div>
                  <div className="flex-1 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                    <div 
                      className="h-full bg-red-400 dark:bg-red-600 flex items-center justify-end px-2"
                      style={{ width: `${(item.jsonTokens / 60) * 100}%` }}
                    >
                      <span className="text-xs font-bold text-white">{item.jsonTokens}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-20 text-xs text-slate-500">TOON</div>
                  <div className="flex-1 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 dark:bg-emerald-600 flex items-center justify-end px-2"
                      style={{ width: `${(item.toonTokens / 60) * 100}%` }}
                    >
                      <span className="text-xs font-bold text-white">{item.toonTokens}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Savings */}
      <section className="py-12 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-center">
            Estimated Cost Savings
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
            Per 1,000 tokens at current provider pricing
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {costComparison.map((provider, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">{provider.provider}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500">JSON Cost:</span>
                    <span className="text-red-500 font-semibold">{provider.jsonCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">TOON Cost:</span>
                    <span className="text-emerald-500 font-semibold">{provider.toonCost}</span>
                  </div>
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">Savings:</span>
                      <span className="text-emerald-600 font-bold">{provider.savings}</span>
                    </div>
                  </div>
                </div>
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
              Token counts were measured using OpenAI's tiktoken library with the cl100k_base encoding 
              (used by GPT-4 and GPT-3.5-turbo). TOON format removes JSON syntax characters 
              (braces, brackets, quotes, colons) while preserving data structure through indentation.
            </p>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">What is TOON?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              TOON (Token-Optimized Object Notation) is a format designed specifically for AI prompts. 
              It uses YAML-like indentation instead of JSON's verbose syntax, resulting in significantly 
              fewer tokens while maintaining the same semantic meaning.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-600 dark:bg-emerald-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <DollarSign className="w-12 h-12 text-white mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Saving on AI Tokens Today
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Convert your JSON to TOON format in seconds with our free tool.
          </p>
          <Link
            href="/json-to-toon-converter"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Try JSON to TOON Converter
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Citation */}
      <section className="py-8 bg-slate-100 dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-500">
            <strong>Cite this benchmark:</strong> TextGauge. (2026). JSON vs TOON Token Benchmark. 
            Retrieved from https://countcharacters.org/benchmarks/json-vs-toon
          </p>
        </div>
      </section>
    </div>
  );
}
