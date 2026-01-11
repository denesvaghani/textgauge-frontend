"use client";

import { FlowerBackground } from "@/components/FlowerBackground";
import { DynamicAd } from "@/components/DynamicAd";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { SmartHeroHeader } from "@/components/SmartHeroHeader";
import { flowerThemes } from "@/config/flowerThemes";
import {
  encodeURLComponent,
  decodeURLComponent,
  recursiveDecode,
  parseURL,
  parseQueryParams,
  buildQueryString,
  buildURL,
  getEncodingDepth,
  COMMON_ENCODINGS,
  type QueryParam,
  type URLComponents,
} from "@/lib/url-utils";
import { Copy, Plus, Trash2, X, Link, RefreshCw } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export default function URLEncoderClient() {
  const theme = flowerThemes.jasmine;
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [recursiveEnabled, setRecursiveEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlComponents, setUrlComponents] = useState<URLComponents | null>(null);
  const [queryParams, setQueryParams] = useState<QueryParam[]>([]);
  const [showUrlBreakdown, setShowUrlBreakdown] = useState(false);
  const [encodingDepth, setEncodingDepth] = useState(0);

  // Process input whenever it changes
  useEffect(() => {
    setError(null);
    if (!input.trim()) {
      setOutput('');
      setUrlComponents(null);
      setQueryParams([]);
      setEncodingDepth(0);
      return;
    }

    try {
      if (mode === 'encode') {
        setOutput(encodeURLComponent(input));
        setEncodingDepth(0);
      } else {
        // Decode mode
        const depth = getEncodingDepth(input);
        setEncodingDepth(depth);
        
        if (recursiveEnabled) {
          setOutput(recursiveDecode(input));
        } else {
          setOutput(decodeURLComponent(input));
        }
      }

      // Try to parse as URL for breakdown
      const decoded = mode === 'decode' 
        ? (recursiveEnabled ? recursiveDecode(input) : decodeURLComponent(input))
        : input;
      
      const parsed = parseURL(decoded);
      if (parsed.isValid) {
        setUrlComponents(parsed);
        setQueryParams(parseQueryParams(parsed.query));
        setShowUrlBreakdown(true);
      } else {
        setUrlComponents(null);
        setQueryParams([]);
      }
    } catch (e: any) {
      setError(e.message || 'Processing error');
      setOutput('');
    }
  }, [input, mode, recursiveEnabled]);

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
  }, []);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
    setError(null);
  }, []);

  // Query param manipulation
  const addQueryParam = useCallback(() => {
    setQueryParams(prev => [...prev, { key: '', value: '', id: crypto.randomUUID() }]);
  }, []);

  const removeQueryParam = useCallback((id: string) => {
    setQueryParams(prev => prev.filter(p => p.id !== id));
  }, []);

  const updateQueryParam = useCallback((id: string, field: 'key' | 'value', newValue: string) => {
    setQueryParams(prev => 
      prev.map(p => p.id === id ? { ...p, [field]: newValue } : p)
    );
  }, []);

  // Rebuild URL from edited params
  const rebuildFromParams = useCallback(() => {
    if (!urlComponents) return;
    
    const newQuery = buildQueryString(queryParams);
    const newUrl = buildURL({ ...urlComponents, query: newQuery });
    setInput(newUrl);
  }, [urlComponents, queryParams]);

  return (
    <FlowerBackground theme={theme} badgeText="URL Tool">
      <SchemaMarkup
        name="URL Encoder/Decoder"
        description="Free online URL encoder and decoder. Encode text for URLs, decode percent-encoded strings, parse query parameters visually."
        url="https://www.countcharacters.org/url-encoder"
      />
      <div className="flex flex-col min-h-screen">
        <SmartHeroHeader
          title="URL Encoder/Decoder"
          theme={theme}
        />

        <main className="flex-grow w-full">
          <div className="container mx-auto px-4 pt-8 pb-0 max-w-[1920px]">

            {/* Mode Toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg inline-flex">
                <button
                  onClick={() => setMode('encode')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    mode === 'encode'
                      ? 'bg-white dark:bg-slate-700 text-yellow-600 dark:text-yellow-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                  }`}
                >
                  Encode
                </button>
                <button
                  onClick={() => setMode('decode')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    mode === 'decode'
                      ? 'bg-white dark:bg-slate-700 text-yellow-600 dark:text-yellow-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                  }`}
                >
                  Decode
                </button>
              </div>
            </div>

            {/* Input/Output Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-500 uppercase flex justify-between items-center">
                  <span>Input</span>
                  {input && (
                    <button 
                      onClick={handleClear}
                      className="text-slate-400 hover:text-red-500 lowercase font-normal flex items-center gap-1"
                    >
                      <X size={14} /> Clear
                    </button>
                  )}
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={mode === 'encode' 
                    ? "Paste text or URL to encode..." 
                    : "Paste URL-encoded string to decode..."}
                  className={`w-full h-48 p-4 font-mono text-sm bg-white dark:bg-slate-900 border ${
                    error ? "border-red-300 dark:border-red-900/50" : "border-slate-200 dark:border-slate-800"
                  } rounded-xl resize-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none transition-all`}
                />
                {mode === 'decode' && (
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={recursiveEnabled}
                        onChange={(e) => setRecursiveEnabled(e.target.checked)}
                        className="rounded text-yellow-600"
                      />
                      <span className="text-sm text-slate-500">Recursive decode</span>
                    </label>
                    {encodingDepth > 0 && (
                      <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full">
                        {encodingDepth}x encoded
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Output */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-500 uppercase flex justify-between items-center">
                  <span>Output</span>
                  <button 
                    onClick={() => handleCopy(output)} 
                    className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 lowercase font-normal flex items-center gap-1"
                    disabled={!output}
                  >
                    <Copy size={14} /> Copy
                  </button>
                </label>
                <textarea
                  readOnly
                  value={output}
                  className={`w-full h-48 p-4 font-mono text-sm bg-slate-50 dark:bg-slate-950 border ${
                    error ? "border-red-300 dark:border-red-900/50" : "border-slate-200 dark:border-slate-800"
                  } rounded-xl resize-none focus:outline-none text-slate-600 dark:text-slate-400`}
                />
                {error && (
                  <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
                    <X size={16} /> {error}
                  </div>
                )}
              </div>
            </div>

            {/* URL Breakdown Section */}
            {urlComponents && urlComponents.isValid && (
              <details 
                open={showUrlBreakdown}
                className="mb-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center gap-2 p-4 cursor-pointer font-semibold text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <Link size={18} className="text-yellow-600 dark:text-yellow-400" />
                  URL Breakdown
                </summary>
                <div className="border-t border-slate-100 dark:border-slate-800 p-4 space-y-3">
                  {[
                    { label: 'Scheme', value: urlComponents.scheme },
                    { label: 'Host', value: urlComponents.host },
                    { label: 'Port', value: urlComponents.port },
                    { label: 'Path', value: urlComponents.path },
                    { label: 'Query', value: urlComponents.query },
                    { label: 'Fragment', value: urlComponents.fragment },
                  ].filter(item => item.value).map((item) => (
                    <div key={item.label} className="flex items-center gap-3 text-sm">
                      <span className="w-20 font-medium text-slate-500 dark:text-slate-400">{item.label}:</span>
                      <code className="flex-1 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-md font-mono text-slate-700 dark:text-slate-300 truncate">
                        {item.value}
                      </code>
                      <button
                        onClick={() => handleCopy(item.value)}
                        className="p-1.5 text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                        title={`Copy ${item.label}`}
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  ))}

                  {/* Query Parameters Table */}
                  {queryParams.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm">Query Parameters</h4>
                        <div className="flex gap-2">
                          <button
                            onClick={addQueryParam}
                            className="text-xs px-3 py-1.5 rounded-md bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50 flex items-center gap-1"
                          >
                            <Plus size={12} /> Add
                          </button>
                          <button
                            onClick={rebuildFromParams}
                            className="text-xs px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1"
                          >
                            <RefreshCw size={12} /> Rebuild URL
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {queryParams.map((param) => (
                          <div key={param.id} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={param.key}
                              onChange={(e) => updateQueryParam(param.id, 'key', e.target.value)}
                              placeholder="key"
                              className="flex-1 px-3 py-2 text-sm font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:ring-1 focus:ring-yellow-500 outline-none"
                            />
                            <span className="text-slate-400">=</span>
                            <input
                              type="text"
                              value={param.value}
                              onChange={(e) => updateQueryParam(param.id, 'value', e.target.value)}
                              placeholder="value"
                              className="flex-1 px-3 py-2 text-sm font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:ring-1 focus:ring-yellow-500 outline-none"
                            />
                            <button
                              onClick={() => removeQueryParam(param.id)}
                              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </details>
            )}

            <div className="mt-2 mb-0">
              <DynamicAd 
                adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE || ""} 
                layout="in-article"
                style={{ display: 'block', width: '100%', maxWidth: '100%' }}
              />
            </div>
          </div>

          {/* Educational Content */}
          <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 bg-white/50 dark:bg-slate-900/50">
            <div className="max-w-[1920px] mx-auto space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">What is URL Encoding?</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  <strong>URL encoding</strong> (also called percent-encoding) converts characters into a format safe for URLs. 
                  Since URLs can only contain a limited set of ASCII characters, special characters like spaces, ampersands (&amp;), 
                  and non-ASCII characters (like emojis 🎉) must be encoded using percent-sign notation.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">Query Parameters</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      When building search URLs like <code>?q=hello world</code>, the space must be encoded as <code>%20</code> 
                      or <code>+</code> to form a valid URL.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">API Requests</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      REST APIs often require properly encoded URLs. Special characters in paths or parameters 
                      can break requests if not encoded correctly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Common Encodings Reference */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Common URL Encodings</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                    <thead className="bg-slate-100 dark:bg-slate-800">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Character</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Encoded</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {COMMON_ENCODINGS.slice(0, 10).map((encoding, i) => (
                        <tr key={i} className="bg-white dark:bg-slate-900">
                          <td className="px-4 py-2 font-mono text-slate-900 dark:text-white">{encoding.char === ' ' ? '(space)' : encoding.char}</td>
                          <td className="px-4 py-2 font-mono text-yellow-600 dark:text-yellow-400">{encoding.encoded}</td>
                          <td className="px-4 py-2 text-slate-500 dark:text-slate-400">{encoding.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 w-full">
              {[
                { q: "What is URL encoding?", a: "URL encoding (percent-encoding) is a method to encode special characters in URLs using percent signs followed by hex values. For example, a space becomes %20." },
                { q: "What's the difference between encodeURI and encodeURIComponent?", a: "encodeURI encodes a full URL but preserves separators like /, ?, and #. encodeURIComponent encodes everything, making it safe for query parameter values." },
                { q: "Why do spaces become %20 or +?", a: "Both are valid. %20 is the standard percent-encoding. The + sign is an older convention from HTML form encoding (application/x-www-form-urlencoded)." },
                { q: "Is my data secure when using this tool?", a: "Yes! All processing happens 100% in your browser. Your data is never sent to any server." },
                { q: "Can I encode emojis and special characters?", a: "Absolutely! This tool fully supports UTF-8, so emojis, Chinese characters, Arabic text, and other Unicode characters are encoded correctly." },
                { q: "What is recursive URL decoding?", a: "Sometimes URLs are encoded multiple times (e.g., %252520 → %2520 → %20 → space). Recursive decoding keeps decoding until no more changes occur." },
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
