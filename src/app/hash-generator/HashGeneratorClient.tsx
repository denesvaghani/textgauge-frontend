"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { FlowerBackground } from "@/components/FlowerBackground";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { SmartHeroHeader } from "@/components/SmartHeroHeader";
import { flowerThemes } from "@/config/flowerThemes";
import { 
  generateAllHashes, 
  generateFileHashes,
  exportHashesAsJson, 
  exportHashesAsCsv, 
  exportHashesAsTxt,
  type HashResult 
} from "@/lib/hash-utils";
import { 
  Copy, 
  Check, 
  FileText, 
  Upload, 
  List, 
  CheckCircle, 
  AlertTriangle, 
  Shield, 
  ShieldAlert,
  Download,
  X
} from "lucide-react";

type Mode = 'text' | 'file' | 'batch' | 'verify';

export default function HashGeneratorClient() {
  const theme = flowerThemes.magnolia;
  const [mode, setMode] = useState<Mode>('text');
  const [input, setInput] = useState('');
  const [results, setResults] = useState<HashResult[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [isHashing, setIsHashing] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [expectedHash, setExpectedHash] = useState('');
  const [verifyResult, setVerifyResult] = useState<'match' | 'mismatch' | null>(null);
  const [batchInput, setBatchInput] = useState('');
  const [batchResults, setBatchResults] = useState<{ input: string; hashes: HashResult[] }[]>([]);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Live hashing with debounce - works for both text AND verify mode
  useEffect(() => {
    if ((mode !== 'text' && mode !== 'verify') || !input) {
      if (!input) setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setIsHashing(true);
      const hashes = await generateAllHashes(input);
      setResults(hashes);
      setIsHashing(false);
    }, 150);

    return () => clearTimeout(timeout);
  }, [input, mode]);

  // Verify mode logic
  useEffect(() => {
    if (mode !== 'verify' || !expectedHash || results.length === 0) {
      setVerifyResult(null);
      return;
    }

    const normalizedExpected = expectedHash.toLowerCase().trim().replace(/-/g, '');
    const isMatch = results.some(r => r.hash.toLowerCase() === normalizedExpected);
    setVerifyResult(isMatch ? 'match' : 'mismatch');
  }, [expectedHash, results, mode]);

  const handleCopy = async (hash: string, index: number) => {
    await navigator.clipboard.writeText(hash);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = async () => {
    const text = results.map(r => `${r.algorithm}: ${r.hash}`).join('\n');
    await navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleExport = (format: 'json' | 'csv' | 'txt') => {
    let content: string;
    let mimeType: string;
    let ext: string;

    switch (format) {
      case 'json':
        content = exportHashesAsJson(input || fileName || 'file', results);
        mimeType = 'application/json';
        ext = 'json';
        break;
      case 'csv':
        content = exportHashesAsCsv(results);
        mimeType = 'text/csv';
        ext = 'csv';
        break;
      default:
        content = exportHashesAsTxt(results);
        mimeType = 'text/plain';
        ext = 'txt';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hashes.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsHashing(true);
    const hashes = await generateFileHashes(file);
    setResults(hashes);
    setIsHashing(false);
  };

  const handleBatchProcess = useCallback(async () => {
    const lines = batchInput.split('\n').filter(line => line.trim());
    if (lines.length === 0) return;

    setIsHashing(true);
    const results = await Promise.all(
      lines.map(async (line) => ({
        input: line,
        hashes: await generateAllHashes(line),
      }))
    );
    setBatchResults(results);
    setIsHashing(false);
  }, [batchInput]);

  const clearAll = () => {
    setInput('');
    setResults([]);
    setFileName(null);
    setExpectedHash('');
    setVerifyResult(null);
    setBatchInput('');
    setBatchResults([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getSecurityIcon = (security: string) => {
    switch (security) {
      case 'insecure':
        return <ShieldAlert size={16} className="text-red-500 shrink-0" />;
      case 'weak':
        return <AlertTriangle size={16} className="text-amber-500 shrink-0" />;
      default:
        return <Shield size={16} className="text-emerald-500 shrink-0" />;
    }
  };

  const getSecurityBadge = (security: string) => {
    switch (security) {
      case 'insecure':
        return <span className="text-[10px] px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full font-medium whitespace-nowrap">Insecure</span>;
      case 'weak':
        return <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full font-medium whitespace-nowrap">Weak</span>;
      default:
        return <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full font-medium whitespace-nowrap">Secure</span>;
    }
  };

  return (
    <FlowerBackground theme={theme} badgeText="Hash Tool">
      <SchemaMarkup
        name="Hash Generator - MD5, SHA-256, SHA-512"
        description="Free online hash generator. Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512 hashes instantly. All algorithms at once, file hashing, batch processing, and hash verification."
        url="https://www.countcharacters.org/hash-generator"
      />
      <div className="flex flex-col min-h-screen">
        <SmartHeroHeader title="Hash Generator" theme={theme} />

        <main className="flex-grow w-full">
          <div className="container mx-auto px-4 pt-8 pb-0 max-w-5xl">
            <div className="text-center text-slate-500 mb-8 max-w-2xl mx-auto">
              Generate MD5, SHA-256, SHA-512 hashes instantly. All algorithms displayed at once with security indicators.
            </div>

            {/* Mode Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {[
                { id: 'text', icon: FileText, label: 'Text' },
                { id: 'file', icon: Upload, label: 'File' },
                { id: 'batch', icon: List, label: 'Batch' },
                { id: 'verify', icon: CheckCircle, label: 'Verify' },
              ].map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => { setMode(id as Mode); clearAll(); }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                    mode === id
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </div>

            {/* Input Section */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 mb-4">
              {mode === 'text' && (
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                    Enter text to hash
                  </label>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type or paste text here... Hashes update as you type!"
                    className="w-full h-32 p-4 font-mono text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    autoFocus
                  />
                </div>
              )}

              {mode === 'file' && (
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                    Upload file to hash
                  </label>
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center hover:border-violet-400 transition-colors">
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-input"
                    />
                    <label htmlFor="file-input" className="cursor-pointer">
                      <Upload size={40} className="mx-auto text-slate-400 mb-3" />
                      {fileName ? (
                        <p className="text-violet-600 font-medium">{fileName}</p>
                      ) : (
                        <>
                          <p className="text-slate-600 dark:text-slate-300 font-medium">Click to upload or drag and drop</p>
                          <p className="text-xs text-slate-400 mt-1">Any file type supported</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              )}

              {mode === 'batch' && (
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                    Enter multiple lines (one per line)
                  </label>
                  <textarea
                    value={batchInput}
                    onChange={(e) => setBatchInput(e.target.value)}
                    placeholder="Enter each string on a new line:&#10;password123&#10;mysecretkey&#10;anotherstring"
                    className="w-full h-32 p-4 font-mono text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  />
                  <button
                    onClick={handleBatchProcess}
                    disabled={!batchInput.trim() || isHashing}
                    className="mt-3 px-6 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-medium rounded-lg transition-all"
                  >
                    {isHashing ? 'Processing...' : 'Generate Hashes'}
                  </button>
                </div>
              )}

              {mode === 'verify' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                      Enter text to hash
                    </label>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Enter the original text..."
                      className="w-full h-24 p-4 font-mono text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                      Expected hash to verify
                    </label>
                    <input
                      type="text"
                      value={expectedHash}
                      onChange={(e) => setExpectedHash(e.target.value)}
                      placeholder="Paste the expected hash here..."
                      className="w-full p-4 font-mono text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    />
                  </div>
                  {verifyResult && (
                    <div className={`p-4 rounded-lg flex items-center gap-3 ${
                      verifyResult === 'match' 
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    }`}>
                      {verifyResult === 'match' ? (
                        <>
                          <CheckCircle size={24} />
                          <span className="font-bold text-lg">✓ Hash Matches!</span>
                        </>
                      ) : (
                        <>
                          <X size={24} />
                          <span className="font-bold text-lg">✗ Hash Does Not Match</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Results Section */}
            {(results.length > 0 && (mode === 'text' || mode === 'file' || mode === 'verify')) && (
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-4">
                <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between flex-wrap gap-2">
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                    {isHashing ? 'Generating...' : 'Hash Results'}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyAll}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                    >
                      {copiedAll ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      {copiedAll ? 'Copied!' : 'Copy All'}
                    </button>
                    
                    {/* Export Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setShowExportMenu(!showExportMenu)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                      >
                        <Download size={14} />
                        Export
                      </button>
                      
                      {showExportMenu && (
                        <div className="absolute top-full right-0 mt-1 w-32 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden z-20">
                          <button
                            onClick={() => handleExport('txt')}
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 text-left text-sm"
                          >
                            TXT
                          </button>
                          <button
                            onClick={() => handleExport('json')}
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 text-left text-sm"
                          >
                            JSON
                          </button>
                          <button
                            onClick={() => handleExport('csv')}
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 text-left text-sm"
                          >
                            CSV
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {results.map((result, index) => (
                    <div key={result.algorithm} className="p-3 sm:p-4 flex items-start sm:items-center gap-2 sm:gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex-col sm:flex-row">
                      <div className="flex items-center gap-2 shrink-0">
                        {getSecurityIcon(result.security)}
                        <span className="font-bold text-sm text-slate-700 dark:text-slate-200 w-16">{result.algorithm}</span>
                        <div className="sm:hidden">
                          {getSecurityBadge(result.security)}
                        </div>
                      </div>
                      <div className="hidden sm:block shrink-0">
                        {getSecurityBadge(result.security)}
                      </div>
                      <code className="flex-1 font-mono text-xs text-slate-600 dark:text-slate-400 break-all select-all bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded w-full sm:w-auto">
                        {result.hash}
                      </code>
                      <button
                        onClick={() => handleCopy(result.hash, index)}
                        className="shrink-0 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors self-end sm:self-auto"
                        title="Copy"
                      >
                        {copiedIndex === index ? (
                          <Check size={18} className="text-green-500" />
                        ) : (
                          <Copy size={18} className="text-slate-400" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Batch Results */}
            {batchResults.length > 0 && mode === 'batch' && (
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                    Batch Results ({batchResults.length} items)
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                      <tr>
                        <th className="text-left p-3 font-semibold text-slate-600 dark:text-slate-300">Input</th>
                        <th className="text-left p-3 font-semibold text-slate-600 dark:text-slate-300">SHA-256</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {batchResults.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="p-3 font-mono text-slate-700 dark:text-slate-300">{item.input}</td>
                          <td className="p-3 font-mono text-xs text-slate-500 dark:text-slate-400 break-all">
                            {item.hashes.find(h => h.algorithm === 'SHA-256')?.hash}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Educational Content */}
          <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 bg-white/50 dark:bg-slate-900/50">
            <div className="max-w-[1920px] mx-auto space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Understanding Hash Algorithms</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldAlert size={20} className="text-red-500" />
                      <h3 className="font-bold text-slate-900 dark:text-white">MD5 (128-bit)</h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Fast but cryptographically broken. Use only for non-security checksums like file integrity verification where tampering isn&apos;t a concern.
                    </p>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle size={20} className="text-amber-500" />
                      <h3 className="font-bold text-slate-900 dark:text-white">SHA-1 (160-bit)</h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Deprecated since 2017. Collision attacks are practical. Avoid for new systems; use only for legacy compatibility.
                    </p>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield size={20} className="text-emerald-500" />
                      <h3 className="font-bold text-slate-900 dark:text-white">SHA-256 (256-bit)</h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Industry standard for security. Used in SSL/TLS, Bitcoin, and most modern cryptographic applications. Recommended for most uses.
                    </p>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield size={20} className="text-emerald-500" />
                      <h3 className="font-bold text-slate-900 dark:text-white">SHA-512 (512-bit)</h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Maximum security with 512-bit output. Slightly slower but provides the highest collision resistance available.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Common Use Cases</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">File Integrity</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Verify downloaded files haven&apos;t been corrupted or tampered with by comparing hashes.
                    </p>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">Data Deduplication</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Quickly identify duplicate files by comparing their hash values instead of content.
                    </p>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">Digital Signatures</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Create unique fingerprints for documents to ensure authenticity and detect modifications.
                    </p>
                  </div>
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
                { q: "What is a hash?", a: "A hash is a fixed-size string generated from input data using a mathematical algorithm. The same input always produces the same hash, but you cannot reverse a hash back to the original data." },
                { q: "Is my data secure?", a: "Yes! All hashing happens 100% in your browser using JavaScript. Your data never leaves your device - we don't send anything to our servers." },
                { q: "What's the difference between MD5 and SHA-256?", a: "MD5 is faster but cryptographically broken (vulnerable to collisions). SHA-256 is the industry standard for security. Use SHA-256 for anything security-related." },
                { q: "Can I use hashes for passwords?", a: "Not directly. For password storage, use specialized algorithms like bcrypt, scrypt, or Argon2 that include salting and key stretching. Plain hashes are too fast and vulnerable to rainbow tables." },
                { q: "What is the Verify mode for?", a: "Verify mode lets you check if a file or text produces an expected hash. This is useful for verifying downloaded files match the hash provided by the source." },
                { q: "Why do I see 'Insecure' and 'Weak' badges?", a: "These badges indicate the security level of each algorithm. MD5 and SHA-1 have known vulnerabilities and should only be used for non-security purposes like checksums." }
              ].map((faq, i) => (
                <details key={i} className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    {faq.q}
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
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
