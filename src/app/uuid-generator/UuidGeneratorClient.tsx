"use client";

import { FlowerBackground } from "@/components/FlowerBackground";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { SmartHeroHeader } from "@/components/SmartHeroHeader";
import { flowerThemes } from "@/config/flowerThemes";
import { generateIds, exportIds, ID_TYPE_INFO, type IdType, type ExportFormat } from "@/lib/uuid-utils";
import { Copy, Download, RefreshCw, ChevronDown, FileJson, FileText, Table, Database, Check } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

export default function UuidGeneratorClient() {
  const theme = flowerThemes.dahlia;
  const [idType, setIdType] = useState<IdType>('uuidv4');
  const [count, setCount] = useState(10);
  const [hyphens, setHyphens] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [prefix, setPrefix] = useState('');
  const [generatedIds, setGeneratedIds] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleGenerate = useCallback(() => {
    const ids = generateIds({
      type: idType,
      count,
      hyphens,
      uppercase,
      prefix,
    });
    setGeneratedIds(ids);
    setCopied(false);
  }, [idType, count, hyphens, uppercase, prefix]);

  useEffect(() => {
    handleGenerate();
  }, []); // Initial load

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedIds.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = (format: ExportFormat) => {
    const content = exportIds(generatedIds, format);
    const mimeTypes: Record<ExportFormat, string> = {
      txt: 'text/plain',
      json: 'application/json',
      csv: 'text/csv',
      sql: 'text/plain',
    };
    
    const blob = new Blob([content], { type: mimeTypes[format] });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${idType}-${generatedIds.length}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const typeInfo = ID_TYPE_INFO[idType];

  return (
    <FlowerBackground theme={theme} badgeText="UUID Tool">
      <SchemaMarkup
        name="UUID Generator - v4, v7, ULID, NanoID"
        description="Free online ID generator. Generate UUID v4, UUID v7, ULID, and NanoID in bulk. Export as TXT, JSON, CSV, or SQL. Up to 5,000 IDs instantly."
        url="https://www.countcharacters.org/uuid-generator"
      />
      <div className="flex flex-col min-h-screen">
        <SmartHeroHeader
          title="UUID & ID Generator"
          theme={theme}
        />

        <main className="flex-grow w-full">
          
          <div className="container mx-auto px-4 pt-8 pb-0 max-w-5xl">
            <div className="text-center text-slate-500 mb-8 max-w-2xl mx-auto">
              Generate UUIDs, ULIDs, and NanoIDs in bulk. Perfect for databases, APIs, and distributed systems.
            </div>

            {/* ID Type Selector */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 mb-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">ID Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.keys(ID_TYPE_INFO) as IdType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setIdType(type)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      idType === type
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900 dark:text-white">{ID_TYPE_INFO[type].name}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {ID_TYPE_INFO[type].description}
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Selected type info */}
              <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="text-xs text-slate-500 dark:text-slate-400">Example:</div>
                <code className="text-sm font-mono text-blue-600 dark:text-blue-400 break-all">
                  {typeInfo.example}
                </code>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 mb-4">
              <div className="flex flex-wrap items-end gap-4">
                
                {/* Quantity Slider */}
                <div className="flex flex-col gap-2 min-w-[180px] flex-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex justify-between">
                    <span>Quantity</span>
                    <span className="text-blue-600 font-bold">{count}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5000"
                    step="1"
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                {/* Prefix Input */}
                <div className="flex flex-col gap-2 min-w-[120px]">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Prefix
                  </label>
                  <input
                    type="text"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    placeholder="e.g., user_"
                    className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-mono"
                  />
                </div>

                {/* Options (only show for UUID types) */}
                {(idType === 'uuidv4' || idType === 'uuidv7') && (
                  <div className="flex gap-3 flex-wrap">
                    <label className="flex items-center gap-2 cursor-pointer select-none px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700">
                      <input
                        type="checkbox"
                        checked={hyphens}
                        onChange={(e) => setHyphens(e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Hyphens</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700">
                      <input
                        type="checkbox"
                        checked={uppercase}
                        onChange={(e) => setUppercase(e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Uppercase</span>
                    </label>
                  </div>
                )}

                {/* ULID/NanoID only supports uppercase */}
                {(idType === 'ulid' || idType === 'nanoid') && (
                  <label className="flex items-center gap-2 cursor-pointer select-none px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700">
                    <input
                      type="checkbox"
                      checked={uppercase}
                      onChange={(e) => setUppercase(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Uppercase</span>
                  </label>
                )}

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all active:scale-95 shadow-md shadow-blue-500/20"
                >
                  <RefreshCw size={18} />
                  Generate
                </button>
              </div>
            </div>

            {/* Output Area */}
            <div className="relative">
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check size={16} className="text-green-500" />
                      <span className="text-green-500 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>
                
                {/* Export Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
                  >
                    <Download size={16} />
                    Export
                    <ChevronDown size={14} />
                  </button>
                  
                  {showExportMenu && (
                    <div className="absolute top-full right-0 mt-1 w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden z-20">
                      <button
                        onClick={() => handleExport('txt')}
                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 text-left text-sm"
                      >
                        <FileText size={16} className="text-slate-400" />
                        Text (.txt)
                      </button>
                      <button
                        onClick={() => handleExport('json')}
                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 text-left text-sm"
                      >
                        <FileJson size={16} className="text-blue-500" />
                        JSON (.json)
                      </button>
                      <button
                        onClick={() => handleExport('csv')}
                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 text-left text-sm"
                      >
                        <Table size={16} className="text-green-500" />
                        CSV (.csv)
                      </button>
                      <button
                        onClick={() => handleExport('sql')}
                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 text-left text-sm"
                      >
                        <Database size={16} className="text-orange-500" />
                        SQL Insert
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <textarea
                value={generatedIds.join('\n')}
                readOnly
                className="w-full h-96 p-6 pt-14 font-mono tracking-wider text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-inner resize-y focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              
              {/* Stats bar */}
              <div className="flex justify-between items-center px-4 py-2 text-xs text-slate-400 bg-slate-50 dark:bg-slate-900 rounded-b-lg border-t border-slate-200 dark:border-slate-700">
                <span>{generatedIds.length} IDs generated</span>
                <span>{idType.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Understanding ID Types</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h3 className="font-bold text-blue-600 mb-2">UUID v4 (Random)</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      The most widely used UUID format. Uses 122 random bits, making collisions virtually impossible. 
                      Best for unpredictable, secure identifiers.
                    </p>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h3 className="font-bold text-emerald-600 mb-2">UUID v7 (Time-Ordered) 🔥 New</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      The new standard for database primary keys. Embeds a timestamp for natural sorting, 
                      improving database performance by 30-60% compared to v4.
                    </p>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h3 className="font-bold text-violet-600 mb-2">ULID (Sortable)</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      26-character lexicographically sortable identifier. Encodes timestamp in a URL-safe format. 
                      Popular in distributed systems and event logging.
                    </p>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h3 className="font-bold text-orange-600 mb-2">NanoID (Compact)</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      21-character URL-safe ID. Smaller than UUID but equally collision-resistant. 
                      Perfect for URLs, session tokens, and web applications.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">When to Use Which?</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Use Case</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Recommended</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600 dark:text-slate-400">
                      <tr className="border-b border-slate-100 dark:border-slate-800">
                        <td className="py-3 px-4">Database Primary Keys</td>
                        <td className="py-3 px-4 font-medium text-emerald-600">UUID v7</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-800">
                        <td className="py-3 px-4">Security Tokens / Session IDs</td>
                        <td className="py-3 px-4 font-medium text-blue-600">UUID v4</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-800">
                        <td className="py-3 px-4">Event Logging / Analytics</td>
                        <td className="py-3 px-4 font-medium text-violet-600">ULID</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-800">
                        <td className="py-3 px-4">URL Shorteners / User-Facing IDs</td>
                        <td className="py-3 px-4 font-medium text-orange-600">NanoID</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Distributed Systems</td>
                        <td className="py-3 px-4 font-medium text-emerald-600">UUID v7 or ULID</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 w-full">
              {[
                { q: "What is the difference between UUID v4 and v7?", a: "UUID v4 is purely random, while UUID v7 includes a timestamp prefix. V7 is better for database indexes because it's naturally sorted by time, improving write performance by 30-60%." },
                { q: "Why should I use ULID instead of UUID?", a: "ULIDs are shorter (26 chars vs 36), lexicographically sortable, and more URL-friendly. They're popular for systems that need time-ordered IDs without the complexity of UUID v7." },
                { q: "Is NanoID secure?", a: "Yes. NanoID uses crypto.getRandomValues() which is cryptographically secure. With 21 characters from a 64-char alphabet, it has ~126 bits of entropy, similar to UUID v4." },
                { q: "Do you store my generated IDs?", a: "No. All ID generation happens locally in your browser using JavaScript. We never see, store, or transmit the IDs you generate." },
                { q: "What export formats are available?", a: "You can export as TXT (one per line), JSON array, CSV with headers, or SQL INSERT statements ready to paste into your database." }
              ].map((faq, i) => (
                <details key={i} className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
                  <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    {faq.q}
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4 bg-white/50 dark:bg-slate-900/50">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

        </main>
      </div>
    </FlowerBackground>
  );
}
