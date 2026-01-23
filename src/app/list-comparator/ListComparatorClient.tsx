"use client";

import { FlowerBackground } from "@/components/FlowerBackground";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { SmartHeroHeader } from "@/components/SmartHeroHeader";
import { flowerThemes } from "@/config/flowerThemes";
import { DynamicAd } from "@/components/DynamicAd";
import { Copy, Download, Trash2, ArrowRightLeft, ArrowRight, ArrowLeft, Upload, Camera } from "lucide-react";
import { useState, useCallback, useEffect, useRef } from "react";
import html2canvas from "html2canvas";

export default function ListComparatorClient() {
  const theme = flowerThemes.protea; // distinct theme
  
  // Refs
  const fileInputARef = useRef<HTMLInputElement>(null);
  const fileInputBRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  // Constants
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  
  // State
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [delimiter, setDelimiter] = useState<"auto" | "newline" | "comma" | "semicolon" | "pipe" | "tab" | "custom">("auto");
  const [customDelimiter, setCustomDelimiter] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [showInputB, setShowInputB] = useState(false); // Toggle for simple vs comparison mode

  // Results
  const [uniqueA, setUniqueA] = useState<string[]>([]);
  const [totalCountA, setTotalCountA] = useState(0); // Track original count
  const [totalCountB, setTotalCountB] = useState(0); // Track original count for B
  const [missingInB, setMissingInB] = useState<string[]>([]); // A - B
  const [missingInA, setMissingInA] = useState<string[]>([]); // B - A
  const [inBoth, setInBoth] = useState<string[]>([]); // A ∩ B (intersection)

  // Processing Logic
  const processLists = useCallback(() => {
    // 1. Tokenizer
    const tokenize = (text: string) => {
      if (!text.trim()) return [];
      let items: string[] = [];
      
      if (delimiter === "newline") {
        items = text.split(/\n+/);
      } else if (delimiter === "comma") {
        items = text.split(/,/);
      } else if (delimiter === "semicolon") {
        items = text.split(/;/);
      } else if (delimiter === "pipe") {
        items = text.split(/\|/);
      } else if (delimiter === "tab") {
        items = text.split(/\t+/);
      } else if (delimiter === "custom" && customDelimiter) {
        // Escape special regex characters in custom delimiter
        const escaped = customDelimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        items = text.split(new RegExp(escaped));
      } else {
        // Auto: split by comma or newline (but preserve spaces for URLs)
        items = text.split(/[,\n]+/);
      }
      
      return items
        .map(i => i.trim())
        .filter(i => i.length > 0);
    };

    const listA = tokenize(inputA);
    const listB = tokenize(inputB);

    // Track original count
    setTotalCountA(listA.length);
    setTotalCountB(listB.length);

    // 2. Normalize if needed
    const normalize = (s: string) => caseSensitive ? s : s.toLowerCase();

    // 3. Unique A
    const setA_Raw = new Set(listA);
    const setA_Normalized = new Set(listA.map(normalize));
    
    setUniqueA(Array.from(setA_Raw));

    // 4. Comparison (if Input B exists)
    if (listB.length > 0 || showInputB) {
        // Correct Set Logic for O(N)
        const setB_Normalized = new Set(listB.map(normalize));

        const inA_notInB = listA.filter(item => !setB_Normalized.has(normalize(item)));
        // Deduplicate result
        setMissingInB(Array.from(new Set(inA_notInB)));

        const inB_notInA = listB.filter(item => !setA_Normalized.has(normalize(item)));
        setMissingInA(Array.from(new Set(inB_notInA)));

        // Intersection: items in both A and B
        const intersection = listA.filter(item => setB_Normalized.has(normalize(item)));
        setInBoth(Array.from(new Set(intersection)));
    } else {
        setMissingInB([]);
        setMissingInA([]);
        setInBoth([]);
    }

  }, [inputA, inputB, delimiter, customDelimiter, caseSensitive, showInputB]);

  // Auto-process on input change (debounced could differ, but instant is fine for text)
  useEffect(() => {
    processLists();
  }, [processLists]);

  // Helper: Copy/Download
  const handleCopy = (items: string[]) => {
    navigator.clipboard.writeText(items.join("\n"));
  };

  const handleDownload = (items: string[], filename: string) => {
    const blob = new Blob([items.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Load sample data
  const loadSample = () => {
    const sampleA = `https://example.com/api/v1/users
https://example.com/api/v1/products
https://example.com/api/v1/orders
https://example.com/api/v1/users
https://example.com/api/v1/payments
https://example.com/api/v1/products
https://example.com/api/v1/analytics`;

    const sampleB = `https://example.com/api/v1/users
https://example.com/api/v1/products
https://example.com/api/v1/cart
https://example.com/api/v1/checkout`;

    setInputA(sampleA);
    setInputB(sampleB);
    setShowInputB(true);
  };

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'A' | 'B') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (5MB limit)
    if (file.size > MAX_FILE_SIZE) {
      alert(`File too large. Maximum size is 5MB.`);
      return;
    }

    // Check file type
    const validTypes = ['.txt', '.csv', '.text'];
    const ext = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    if (!validTypes.includes(ext)) {
      alert('Please upload a .txt or .csv file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (target === 'A') {
        setInputA(content);
      } else {
        setInputB(content);
        setShowInputB(true);
      }
    };
    reader.readAsText(file);
    
    // Reset input so same file can be re-uploaded
    e.target.value = '';
  };

  // Screenshot export
  const handleScreenshot = async () => {
    if (!resultsRef.current) return;
    
    try {
      const canvas = await html2canvas(resultsRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
        useCORS: true, // Handle cross-origin images
        allowTaint: true, // Allow tainted canvas
        logging: false, // Disable logging
        imageTimeout: 0, // No timeout for images
        removeContainer: true, // Clean up after capture
        foreignObjectRendering: false, // Disable foreign object rendering (can cause issues)
      });
      
      const link = document.createElement('a');
      link.download = 'list-comparison-results.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Screenshot failed:', error);
      // Fallback: Try with simpler options
      try {
        const canvas = await html2canvas(resultsRef.current, {
          backgroundColor: '#ffffff',
          scale: 1,
          useCORS: true,
          logging: false,
        });
        const link = document.createElement('a');
        link.download = 'list-comparison-results.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (fallbackError) {
        console.error('Screenshot fallback failed:', fallbackError);
        alert('Screenshot capture failed. This may be due to browser security restrictions.');
      }
    }
  };

  return (
    <FlowerBackground theme={theme} badgeText="List Comparator">
      <SchemaMarkup
        name="List Comparator & Unique Extractor"
        description="Clean mixed text, extract unique IDs, and compare two lists. Free online checker for data reconciliation."
        url="https://www.countcharacters.org/list-comparator"
      />
      <div className="flex flex-col min-h-screen">
        <SmartHeroHeader
          title="List Comparator & Unique Extractor"
          theme={theme}
          description="Extract unique IDs from messy text or compare two lists to find differences."
        />

        <main className="flex-grow w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Hidden file inputs */}
          <input 
            type="file" 
            ref={fileInputARef} 
            onChange={(e) => handleFileUpload(e, 'A')} 
            accept=".txt,.csv,.text"
            className="hidden" 
          />
          <input 
            type="file" 
            ref={fileInputBRef} 
            onChange={(e) => handleFileUpload(e, 'B')} 
            accept=".txt,.csv,.text"
            className="hidden" 
          />
          {/* Controls - Modern Design */}
          <div className="relative mb-6">
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-indigo-500/20 to-violet-500/20 rounded-xl blur-sm"></div>
              <div className="relative bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex flex-wrap gap-4 items-center justify-between">
                      {/* Left section - Main controls */}
                      <div className="flex flex-wrap items-center gap-4">
                          <label className="flex items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer group">
                              <div className="relative">
                                  <input 
                                     type="checkbox" 
                                     checked={showInputB} 
                                     onChange={e => setShowInputB(e.target.checked)}
                                     className="sr-only peer"
                                  />
                                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-violet-500 peer-checked:to-indigo-500 transition-all"></div>
                                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
                              </div>
                              <span className="group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">Compare Two Lists</span>
                          </label>
                          <div className="h-8 w-px bg-gradient-to-b from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
                          <select 
                             value={delimiter}
                             onChange={(e) => setDelimiter(e.target.value as any)}
                             className="text-sm px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-violet-400 dark:hover:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
                          >
                              <option value="auto">Auto (Comma/NewLine)</option>
                              <option value="newline">New Line</option>
                              <option value="comma">Comma</option>
                              <option value="semicolon">Semicolon</option>
                              <option value="pipe">Pipe (|)</option>
                              <option value="tab">Tab</option>
                              <option value="custom">Custom</option>
                          </select>
                          {delimiter === "custom" && (
                              <input
                                  type="text"
                                  value={customDelimiter}
                                  onChange={(e) => setCustomDelimiter(e.target.value)}
                                  placeholder="Enter delimiter"
                                  className="text-sm px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 w-32 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
                              />
                          )}
                          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
                              <input 
                                 type="checkbox" 
                                 checked={caseSensitive} 
                                 onChange={e => setCaseSensitive(e.target.checked)}
                                 className="rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                              />
                              Case Sensitive
                          </label>
                      </div>
                      {/* Right section - Actions */}
                      <div className="flex items-center gap-2">
                          <button 
                             onClick={loadSample}
                             className="text-sm px-3 py-1.5 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center gap-1.5 font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all"
                          >
                              📝 Load Sample
                          </button>
                          <button 
                             onClick={() => { setInputA(""); setInputB(""); }}
                             className="text-sm px-3 py-1.5 text-red-500 hover:text-red-600 flex items-center gap-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                          >
                              <Trash2 size={14} /> Reset
                          </button>
                          <button 
                             onClick={handleScreenshot}
                             className="text-sm px-3 py-1.5 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 flex items-center gap-1.5 font-medium hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-all"
                          >
                              <Camera size={14} /> Screenshot
                          </button>
                      </div>
                  </div>
              </div>
          </div>

          {/* Inputs Grid */}
          <div className={`grid gap-6 mb-8 ${showInputB ? "md:grid-cols-2" : "grid-cols-1"}`}>
              {/* Input A */}
              <div className="flex flex-col gap-2">
                   <label className="flex items-center gap-2">
                       <span className="text-lg">📝</span>
                       <span className="font-bold bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
                           List A
                       </span>
                       <button
                           onClick={() => fileInputARef.current?.click()}
                           className="text-xs px-2.5 py-1 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-900/30 hover:bg-violet-100 dark:hover:bg-violet-900/50 flex items-center gap-1.5 rounded-md transition-all font-medium"
                           title="Upload file (.txt, .csv) - Max 5MB"
                       >
                           <Upload size={12} /> Upload
                       </button>
                       <span className="ml-auto font-normal text-slate-400 text-sm">
                           {totalCountA > 0 && `${totalCountA} items`}
                       </span>
                   </label>
                  <textarea
                      value={inputA}
                      onChange={(e) => setInputA(e.target.value)}
                      placeholder="Paste your text here... (IDs separated by newlines, commas, or paragraphs)"
                      className="w-full h-64 p-4 font-mono text-sm leading-6 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-300 dark:focus:border-violet-600 outline-none resize-none placeholder:text-slate-400"
                  />
              </div>

              {/* Input B (Conditional) */}
              {showInputB && (
                  <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2">
                          <span className="text-lg">📄</span>
                          <span className="font-bold bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                              List B
                          </span>
                          <button
                              onClick={() => fileInputBRef.current?.click()}
                              className="text-xs px-2.5 py-1 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 flex items-center gap-1.5 rounded-md transition-all font-medium"
                              title="Upload file (.txt, .csv) - Max 5MB"
                          >
                              <Upload size={12} /> Upload
                          </button>
                          <span className="ml-auto font-normal text-slate-400 text-sm">
                              {totalCountB > 0 ? `${totalCountB} items` : "Comparison Target"}
                          </span>
                      </label>
                      <textarea
                          value={inputB}
                          onChange={(e) => setInputB(e.target.value)}
                          placeholder="Paste the second list to compare against..."
                          className="w-full h-64 p-4 font-mono text-sm leading-6 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-300 dark:focus:border-violet-600 outline-none resize-none placeholder:text-slate-400"
                      />
                  </div>
              )}
          </div>

          {/* Results Grid */}
          <div ref={resultsRef} className={`grid gap-6 ${showInputB ? "md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"}`}>
              
              {/* Card 1: Unique A */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 ring-1 ring-slate-200/50 dark:ring-slate-700/50 shadow-md overflow-hidden flex flex-col h-96">
                  <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
                      <div className="flex flex-col gap-1">
                          <h3 className="font-bold text-slate-700 dark:text-slate-200">Unique List A</h3>
                          {totalCountA > 0 && totalCountA !== uniqueA.length && (
                              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                                  {((1 - uniqueA.length / totalCountA) * 100).toFixed(1)}% duplicates removed
                              </span>
                          )}
                      </div>
                      <span className="text-xs bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded-full">{uniqueA.length}</span>
                  </div>
                  <textarea 
                    readOnly 
                    value={uniqueA.join("\n")}
                    className="flex-1 p-4 bg-transparent resize-none text-sm font-mono outline-none"
                  />
                  <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex gap-2 justify-end">
                      <button onClick={() => handleCopy(uniqueA)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500" title="Copy">
                          <Copy size={16} />
                      </button>
                      <button onClick={() => handleDownload(uniqueA, "unique_list_a.txt")} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500" title="Download">
                          <Download size={16} />
                      </button>
                  </div>
              </div>

              {/* Comparisons - Only show if B enabled or manually triggered logic needed? */}
              {/* For simplicty, always show placeholders or empty states if B is hidden? No, hide if B hidden. */}
              
              {showInputB && (
                  <>
                    {/* Card 2: Only in A (Missing in B) */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-900/30 ring-1 ring-amber-200/50 dark:ring-amber-900/50 shadow-md overflow-hidden flex flex-col h-96">
                        <div className="p-4 border-b border-amber-100 dark:border-amber-900/30 bg-amber-50 dark:bg-amber-900/10 flex justify-between items-center">
                            <div className="flex flex-col gap-1">
                                <h3 className="font-bold text-amber-900 dark:text-amber-100 flex items-center gap-2">
                                    <ArrowRight size={16} /> In A Only
                                </h3>
                                {totalCountA > 0 && missingInB.length > 0 && (
                                    <span className="text-xs text-amber-700 dark:text-amber-200 font-medium">
                                        {((missingInB.length / totalCountA) * 100).toFixed(1)}% of A missing in B
                                    </span>
                                )}
                            </div>
                            <span className="text-xs bg-amber-200 dark:bg-amber-900/50 text-amber-900 dark:text-amber-100 px-2 py-1 rounded-full">{missingInB.length}</span>
                        </div>
                        <textarea 
                            readOnly 
                            value={missingInB.join("\n")}
                            className="flex-1 p-4 bg-transparent resize-none text-sm font-mono outline-none text-amber-900 dark:text-amber-100"
                        />
                         <div className="p-3 border-t border-amber-100 dark:border-amber-900/30 flex gap-2 justify-end">
                            <button onClick={() => handleCopy(missingInB)} className="p-2 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded text-amber-700" title="Copy">
                                <Copy size={16} />
                            </button>
                            <button onClick={() => handleDownload(missingInB, "in_a_missing_in_b.txt")} className="p-2 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded text-amber-700" title="Download">
                                <Download size={16} />
                            </button>
                        </div>
                    </div>


                    {/* Card 3: In Both (Intersection) */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-900/30 ring-1 ring-emerald-200/50 dark:ring-emerald-900/50 shadow-md overflow-hidden flex flex-col h-96">
                        <div className="p-4 border-b border-emerald-100 dark:border-emerald-900/30 bg-emerald-50 dark:bg-emerald-900/10 flex justify-between items-center">
                            <div className="flex flex-col gap-1">
                                <h3 className="font-bold text-emerald-900 dark:text-emerald-100 flex items-center gap-2">
                                    ✓ In Both
                                </h3>
                                {totalCountA > 0 && totalCountB > 0 && inBoth.length > 0 && (
                                    <span className="text-xs text-emerald-700 dark:text-emerald-200 font-medium">
                                        {(((inBoth.length / Math.max(totalCountA, totalCountB)) * 100).toFixed(1))}% overlap
                                    </span>
                                )}
                            </div>
                            <span className="text-xs bg-emerald-200 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-100 px-2 py-1 rounded-full">{inBoth.length}</span>
                        </div>
                        <textarea 
                            readOnly 
                            value={inBoth.join("\n")}
                            className="flex-1 p-4 bg-transparent resize-none text-sm font-mono outline-none text-emerald-900 dark:text-emerald-100"
                        />
                         <div className="p-3 border-t border-emerald-100 dark:border-emerald-900/30 flex gap-2 justify-end">
                            <button onClick={() => handleCopy(inBoth)} className="p-2 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded text-emerald-700" title="Copy">
                                <Copy size={16} />
                            </button>
                            <button onClick={() => handleDownload(inBoth, "in_both.txt")} className="p-2 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded text-emerald-700" title="Download">
                                <Download size={16} />
                            </button>
                        </div>
                    </div>
                    {/* Card 3: Only in B (Missing in A) */}
                     <div className="bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-900/30 ring-1 ring-blue-200/50 dark:ring-blue-900/50 shadow-md overflow-hidden flex flex-col h-96">
                        <div className="p-4 border-b border-blue-100 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-900/10 flex justify-between items-center">
                            <div className="flex flex-col gap-1">
                                <h3 className="font-bold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                                    <ArrowLeft size={16} /> In B Only
                                </h3>
                                {totalCountB > 0 && missingInA.length > 0 && (
                                    <span className="text-xs text-blue-700 dark:text-blue-200 font-medium">
                                        {((missingInA.length / totalCountB) * 100).toFixed(1)}% of B missing in A
                                    </span>
                                )}
                            </div>
                            <span className="text-xs bg-blue-200 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100 px-2 py-1 rounded-full">{missingInA.length}</span>
                        </div>
                        <textarea 
                            readOnly 
                            value={missingInA.join("\n")}
                            className="flex-1 p-4 bg-transparent resize-none text-sm font-mono outline-none text-blue-900 dark:text-blue-100"
                        />
                        <div className="p-3 border-t border-blue-100 dark:border-blue-900/30 flex gap-2 justify-end">
                            <button onClick={() => handleCopy(missingInA)} className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded text-blue-700" title="Copy">
                                <Copy size={16} />
                            </button>
                            <button onClick={() => handleDownload(missingInA, "in_b_missing_in_a.txt")} className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded text-blue-700" title="Download">
                                <Download size={16} />
                            </button>
                        </div>
                    </div>
                  </>
              )}
          </div>
          
           {/* Ad */}
           <div className="mt-8">
               <DynamicAd 
                  adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE || ""} 
                  layout="in-article"
                  style={{ display: 'block', width: '100%', maxWidth: '100%' }}
               />
          </div>

        </main>
      </div>
    </FlowerBackground>
  );
}
