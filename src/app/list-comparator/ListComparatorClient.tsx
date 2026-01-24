"use client";

import { FlowerBackground } from "@/components/FlowerBackground";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { SmartHeroHeader } from "@/components/SmartHeroHeader";
import { flowerThemes } from "@/config/flowerThemes";
import { DynamicAd } from "@/components/DynamicAd";
import { Copy, Download, Trash2, ArrowRightLeft, ArrowRight, ArrowLeft, Upload, Camera, Printer, Image as ImageIcon } from "lucide-react";
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
  const [isProcessing, setIsProcessing] = useState(false);

  // Processing Logic
  // Processing Logic
  const processLists = useCallback(() => {
    setIsProcessing(true);
    
    // Use timeout to allow UI to update with loading state
    setTimeout(() => {
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
        
        setIsProcessing(false);
    }, 10); // Small delay to unblock main thread
  }, [inputA, inputB, delimiter, customDelimiter, caseSensitive, showInputB]);

  // Auto-process on input change (debounced could differ, but instant is fine for text)
  useEffect(() => {
    // Debounce to prevent flashing loading state
    const timer = setTimeout(() => {
        processLists();
    }, 300);
    return () => clearTimeout(timer);
  }, [processLists]);

  // Helper: Copy/Download
  const handleCopy = (items: string[]) => {
    navigator.clipboard.writeText(items.join("\n"));
  };

  const handleDownload = (items: string[], filename: string, format: "txt" | "csv" | "json" = "txt") => {
    let content = "";
    let type = "text/plain";
    let finalFilename = filename;

    if (format === "csv") {
        content = items.map(i => `"${i.replace(/"/g, '""')}"`).join("\n");
        type = "text/csv";
        finalFilename = filename.replace(".txt", ".csv");
    } else if (format === "json") {
        content = JSON.stringify(items, null, 2);
        type = "application/json";
        finalFilename = filename.replace(".txt", ".json");
    } else {
        content = items.join("\n");
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = finalFilename;
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

  // Export Features
  const handlePrint = () => {
    if (!resultsRef.current) return;
    
    // Get unique data to inject into print view directly rather than scraping DOM
    // This ensures clean state without UI artifacts
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>List Comparison Results - TextGauge</title>
          <style>
            @page { size: landscape; margin: 0.5cm; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 20px; color: #1e293b; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            h1 { text-align: center; color: #4f46e5; margin-bottom: 5px; }
            .meta { text-align: center; color: #64748b; font-size: 14px; margin-bottom: 30px; }
            .stats-bar { display: flex; justify-content: center; gap: 20px; margin-bottom: 30px; flex-wrap: wrap; }
            .stat-badge { background: #f1f5f9; padding: 5px 15px; border-radius: 20px; font-weight: 600; font-size: 14px; border: 1px solid #e2e8f0; }
            .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
            .card { border-radius: 12px; overflow: hidden; break-inside: avoid; page-break-inside: avoid; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
            .card-header { padding: 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; }
            .card-title { font-weight: 700; margin: 0; font-size: 16px; display: flex; align-items: center; gap: 8px; }
            .count-badge { padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: bold; }
            .card-content { padding: 15px; font-family: 'Menlo', 'Monaco', 'Courier New', monospace; font-size: 12px; line-height: 1.5; white-space: pre-wrap; min-height: 200px; }
            
            /* Theme Colors */
            .theme-violet .card-header { background: #f5f3ff; border-color: #ddd6fe; }
            .theme-violet .card-title { color: #5b21b6; }
            .theme-violet .count-badge { background: #ddd6fe; color: #5b21b6; }
            .theme-violet .card { border-color: #ddd6fe; }

            .theme-amber .card-header { background: #fffbeb; border-color: #fde68a; }
            .theme-amber .card-title { color: #92400e; }
            .theme-amber .count-badge { background: #fde68a; color: #92400e; }
            .theme-amber .card { border-color: #fde68a; }

            .theme-emerald .card-header { background: #ecfdf5; border-color: #a7f3d0; }
            .theme-emerald .card-title { color: #065f46; }
            .theme-emerald .count-badge { background: #a7f3d0; color: #065f46; }
            .theme-emerald .card { border-color: #a7f3d0; }

            .theme-blue .card-header { background: #eff6ff; border-color: #bfdbfe; }
            .theme-blue .card-title { color: #1e40af; }
            .theme-blue .count-badge { background: #bfdbfe; color: #1e40af; }
            .theme-blue .card { border-color: #bfdbfe; }
            
            @media print { button { display: none; } }
          </style>
        </head>
        <body>
          <h1>List Comparison Report</h1>
          <p class="meta">Generated by TextGauge on ${new Date().toLocaleString()}</p>
          
          <div class="stats-bar">
            <div class="stat-badge" style="color: #5b21b6; background: #f5f3ff; border-color: #ddd6fe;">List A: ${totalCountA.toLocaleString()}</div>
            ${showInputB ? `
                <div class="stat-badge" style="color: #1e40af; background: #eff6ff; border-color: #bfdbfe;">List B: ${totalCountB.toLocaleString()}</div>
                <div class="stat-badge" style="color: #065f46; background: #ecfdf5; border-color: #a7f3d0;">Unique: ${uniqueA.length.toLocaleString()}</div>
                <div class="stat-badge" style="color: #92400e; background: #fffbeb; border-color: #fde68a;">Only A: ${missingInB.length.toLocaleString()}</div>
                <div class="stat-badge" style="color: #1e40af; background: #eff6ff; border-color: #bfdbfe;">Only B: ${missingInA.length.toLocaleString()}</div>
                <div class="stat-badge" style="color: #065f46; background: #ecfdf5; border-color: #a7f3d0;">In Both: ${inBoth.length.toLocaleString()}</div>
            ` : ''}
          </div>

          <div class="grid" style="grid-template-columns: ${showInputB ? 'repeat(4, 1fr)' : '1fr'};">
             <!-- Unique A -->
             <div class="card theme-violet">
                <div class="card-header">
                    <h3 class="card-title">Unique List A</h3>
                    <span class="count-badge">${uniqueA.length.toLocaleString()}</span>
                </div>
                <div class="card-content">${uniqueA.join('\n') || 'No items'}</div>
             </div>

             ${showInputB ? `
                <!-- In A Only -->
                <div class="card theme-amber">
                    <div class="card-header">
                         <h3 class="card-title">In A Only</h3>
                         <span class="count-badge">${missingInB.length.toLocaleString()}</span>
                    </div>
                    <div class="card-content">${missingInB.join('\n') || 'No items'}</div>
                </div>

                <!-- In Both -->
                <div class="card theme-emerald">
                     <div class="card-header">
                         <h3 class="card-title">✓ In Both</h3>
                         <span class="count-badge">${inBoth.length.toLocaleString()}</span>
                     </div>
                     <div class="card-content">${inBoth.join('\n') || 'No items'}</div>
                </div>

                <!-- In B Only -->
                 <div class="card theme-blue">
                     <div class="card-header">
                         <h3 class="card-title">In B Only</h3>
                         <span class="count-badge">${missingInA.length.toLocaleString()}</span>
                     </div>
                     <div class="card-content">${missingInA.join('\n') || 'No items'}</div>
                </div>
             ` : ''}
          </div>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    } else {
      alert('Please allow popups to print/save the results.');
    }
  };

  const handleExportImage = async (action: 'download' | 'copy' = 'download') => {
    if (!resultsRef.current) return;
    setIsProcessing(true);
    
    try {
        const element = resultsRef.current;
        const canvas = await html2canvas(element, {
            backgroundColor: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff',
            scale: 2, 
            useCORS: true,
            allowTaint: true,
            foreignObjectRendering: false,
            logging: false,
            ignoreElements: (element) => {
                return element.tagName === 'BUTTON' || element.classList.contains('lucide');
            },
            onclone: (clonedDoc) => {
                const textareas = clonedDoc.getElementsByTagName('textarea');
                for (let i = 0; i < textareas.length; i++) {
                    textareas[i].style.height = 'auto';
                    textareas[i].style.height = textareas[i].scrollHeight + 'px';
                    textareas[i].style.overflow = 'visible';
                }
                const grid = clonedDoc.querySelector('.grid') as HTMLElement;
                if (grid) {
                    grid.style.overflow = 'visible';
                    grid.style.height = 'auto';
                }
            }
        });

        if (action === 'download') {
            const link = document.createElement('a');
            link.download = `list-comparison-${new Date().toISOString().slice(0,10)}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } else {
            canvas.toBlob(async (blob) => {
                if (!blob) throw new Error('Failed to generate image blob');
                try {
                    await navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': blob })
                    ]);
                    alert('Image copied to clipboard!');
                } catch (err) {
                    console.error('Clipboard write failed:', err);
                    alert('Failed to copy to clipboard. Downloading instead.');
                    // Fallback to download
                    const link = document.createElement('a');
                    link.download = `list-comparison-${new Date().toISOString().slice(0,10)}.png`;
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                }
            });
        }
    } catch (error) {
        console.error('Image export failed:', error);
        alert('Failed to create image. Try using the Print > Save as PDF option instead.');
    } finally {
        setIsProcessing(false);
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
          {/* Controls - Modern Design - Sticky Header */}
          <div className="sticky top-4 z-40 mb-6 transition-all duration-200">
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-indigo-500/20 to-violet-500/20 rounded-xl blur-sm"></div>
              <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
                  <div className="flex flex-wrap gap-4 items-center justify-between">
                      {/* Left section - Main controls */}
                      <div className="flex flex-wrap items-center gap-4">
                          <label className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer group">
                              <div className="relative">
                                  <input 
                                     type="checkbox" 
                                     checked={showInputB} 
                                     onChange={e => setShowInputB(e.target.checked)}
                                     className="sr-only peer"
                                  />
                                  <div className="w-14 h-7 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-violet-500 peer-checked:to-indigo-500 transition-all"></div>
                                  <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-7 shadow-md"></div>
                              </div>
                              <div className="flex flex-col">
                                  <span className="group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors font-semibold">Compare Two Lists</span>
                                  <span className="text-xs text-slate-400 dark:text-slate-500">{showInputB ? "Finding differences" : "Extracting unique items"}</span>
                              </div>
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
                              <div className="flex items-center gap-2">
                                  <span className="text-xs text-slate-500">Delimiter:</span>
                                  <input
                                      type="text"
                                      value={customDelimiter}
                                      onChange={(e) => setCustomDelimiter(e.target.value)}
                                      placeholder="e.g. ; or |"
                                      className="text-sm px-3 py-1.5 border border-violet-300 dark:border-violet-700 rounded-lg bg-violet-50 dark:bg-violet-900/30 w-24 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all placeholder:text-violet-300"
                                  />
                              </div>
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
                             onClick={handlePrint}
                             className="text-sm px-3 py-1.5 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 flex items-center gap-1.5 font-medium hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-all"
                             title="Print or Save as PDF"
                          >
                              <Printer size={14} /> Print PDF
                          </button>
                          <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-0.5 border border-blue-100 dark:border-blue-900/30">
                              <button 
                                 onClick={() => handleExportImage('download')}
                                 disabled={isProcessing}
                                 className="text-sm px-2.5 py-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1.5 font-medium hover:bg-white dark:hover:bg-blue-900/50 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                 title="Download as PNG Image"
                              >
                                  <ImageIcon size={14} /> Save Img
                              </button>
                              <div className="w-px h-3 bg-blue-200 dark:bg-blue-800"></div>
                              <button 
                                 onClick={() => handleExportImage('copy')}
                                 disabled={isProcessing}
                                 className="text-sm px-2 py-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1.5 font-medium hover:bg-white dark:hover:bg-blue-900/50 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                 title="Copy Image to Clipboard"
                              >
                                  <Copy size={14} />
                              </button>
                          </div>
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

          {/* Statistics Summary Bar */}
          {(totalCountA > 0 || totalCountB > 0) && (
              <div className="mb-6 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                  {isProcessing && (
                      <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 flex items-center justify-center z-10 backdrop-blur-sm">
                          <div className="flex items-center gap-2 text-violet-600 font-medium animate-pulse">
                              <span className="w-2 h-2 rounded-full bg-violet-600 animate-bounce"></span>
                              <span className="w-2 h-2 rounded-full bg-violet-600 animate-bounce delay-100"></span>
                              <span className="w-2 h-2 rounded-full bg-violet-600 animate-bounce delay-200"></span>
                              Processing...
                          </div>
                      </div>
                  )}
                  <div className="flex flex-wrap items-center gap-4 justify-center">
                      <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-600 dark:text-slate-400">List A:</span>
                          <span className="px-2.5 py-1 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 rounded-full text-sm font-bold">{totalCountA.toLocaleString()}</span>
                      </div>
                      <span className="text-slate-300 dark:text-slate-600">→</span>
                      <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-600 dark:text-slate-400">Unique:</span>
                          <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-bold">{uniqueA.length.toLocaleString()}</span>
                      </div>
                      {showInputB && (
                          <>
                              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
                              <div className="flex items-center gap-2">
                                  <span className="text-sm text-slate-600 dark:text-slate-400">List B:</span>
                                  <span className="px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-bold">{totalCountB.toLocaleString()}</span>
                              </div>
                              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
                              <div className="flex items-center gap-2">
                                  <span className="text-sm text-slate-600 dark:text-slate-400">Only in A:</span>
                                  <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-full text-sm font-bold">{missingInB.length.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                  <span className="text-sm text-slate-600 dark:text-slate-400">Only in B:</span>
                                  <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-bold">{missingInA.length.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                  <span className="text-sm text-slate-600 dark:text-slate-400">In Both:</span>
                                  <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-bold">{inBoth.length.toLocaleString()}</span>
                              </div>
                          </>
                      )}
                  </div>
              </div>
          )}

          {/* Results Grid */}
          <div ref={resultsRef} className={`grid gap-6 ${showInputB ? "md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"}`}>
              {/* Card 1: Unique A */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 ring-1 ring-slate-200/50 dark:ring-slate-700/50 shadow-md overflow-hidden flex flex-col h-[28rem]">
                  <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
                      <div className="flex flex-col gap-1">
                          <h3 className="font-bold text-slate-700 dark:text-slate-200">Unique List A</h3>
                          {totalCountA > 0 && totalCountA !== uniqueA.length && (
                              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                                  {((1 - uniqueA.length / totalCountA) * 100).toFixed(1)}% duplicates removed
                              </span>
                          )}
                      </div>
                      <span className="text-sm bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full font-bold">{uniqueA.length.toLocaleString()}</span>
                  </div>
                  {uniqueA.length === 0 ? (
                      <div className="flex-1 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm italic">
                          No items to display
                      </div>
                  ) : (
                      <textarea 
                        readOnly 
                        value={uniqueA.join("\n")}
                        className="flex-1 p-4 bg-transparent resize-none text-sm font-mono outline-none leading-6 text-slate-700 dark:text-slate-200"
                      />
                  )}
                  <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex gap-2 justify-end">
                      <button onClick={() => handleCopy(uniqueA)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500" title="Copy to clipboard">
                          <Copy size={16} />
                      </button>
                      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded p-0.5">
                          <button onClick={() => handleDownload(uniqueA, "unique_list_a.txt", "txt")} className="px-2 py-1.5 hover:bg-white dark:hover:bg-slate-700 rounded text-xs font-medium text-slate-600 dark:text-slate-400" title="Download TXT">TXT</button>
                          <button onClick={() => handleDownload(uniqueA, "unique_list_a.txt", "csv")} className="px-2 py-1.5 hover:bg-white dark:hover:bg-slate-700 rounded text-xs font-medium text-slate-600 dark:text-slate-400" title="Download CSV">CSV</button>
                          <button onClick={() => handleDownload(uniqueA, "unique_list_a.txt", "json")} className="px-2 py-1.5 hover:bg-white dark:hover:bg-slate-700 rounded text-xs font-medium text-slate-600 dark:text-slate-400" title="Download JSON">JSON</button>
                      </div>
                  </div>
              </div>

              {/* Comparisons - Only show if B enabled or manually triggered logic needed? */}
              {/* For simplicty, always show placeholders or empty states if B is hidden? No, hide if B hidden. */}
              
              {showInputB && (
                  <>
                    {/* Card 2: Only in A (Missing in B) */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-900/30 ring-1 ring-amber-200/50 dark:ring-amber-900/50 shadow-md overflow-hidden flex flex-col h-[28rem]">
                        <div className="p-4 border-b border-amber-100 dark:border-amber-900/30 bg-amber-50 dark:bg-amber-900/10 flex justify-between items-center">
                            <div className="flex flex-col gap-1">
                                <h3 className="font-bold text-amber-900 dark:text-amber-100 flex items-center gap-2">
                                    <ArrowRight size={16} /> In A Only
                                </h3>
                                {totalCountA > 0 && missingInB.length > 0 && (
                                    <span className="text-xs text-amber-700 dark:text-amber-200 font-medium">
                                        {((missingInB.length / uniqueA.length) * 100).toFixed(1)}% of unique A
                                    </span>
                                )}
                            </div>
                            <span className="text-sm bg-amber-200 dark:bg-amber-900/50 text-amber-900 dark:text-amber-100 px-3 py-1 rounded-full font-bold">{missingInB.length.toLocaleString()}</span>
                        </div>
                        {missingInB.length === 0 ? (
                            <div className="flex-1 flex items-center justify-center text-amber-400 dark:text-amber-600 text-sm italic">
                                No unique items in A only
                            </div>
                        ) : (
                            <textarea 
                                readOnly 
                                value={missingInB.join("\n")}
                                className="flex-1 p-4 bg-transparent resize-none text-sm font-mono outline-none leading-6 text-amber-900 dark:text-amber-100"
                            />
                        )}
                         <div className="p-3 border-t border-amber-100 dark:border-amber-900/30 flex gap-2 justify-end">
                            <button onClick={() => handleCopy(missingInB)} className="p-2 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded text-amber-700" title="Copy to clipboard">
                                <Copy size={16} />
                            </button>
                            <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 rounded p-0.5">
                                <button onClick={() => handleDownload(missingInB, "in_a_missing_in_b.txt", "txt")} className="px-2 py-1.5 hover:bg-white dark:hover:bg-slate-800 rounded text-xs font-medium text-amber-700 dark:text-amber-200" title="Download TXT">TXT</button>
                                <button onClick={() => handleDownload(missingInB, "in_a_missing_in_b.txt", "csv")} className="px-2 py-1.5 hover:bg-white dark:hover:bg-slate-800 rounded text-xs font-medium text-amber-700 dark:text-amber-200" title="Download CSV">CSV</button>
                                <button onClick={() => handleDownload(missingInB, "in_a_missing_in_b.txt", "json")} className="px-2 py-1.5 hover:bg-white dark:hover:bg-slate-800 rounded text-xs font-medium text-amber-700 dark:text-amber-200" title="Download JSON">JSON</button>
                            </div>
                        </div>
                    </div>


                    {/* Card 3: In Both (Intersection) */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-900/30 ring-1 ring-emerald-200/50 dark:ring-emerald-900/50 shadow-md overflow-hidden flex flex-col h-[28rem]">
                        <div className="p-4 border-b border-emerald-100 dark:border-emerald-900/30 bg-emerald-50 dark:bg-emerald-900/10 flex justify-between items-center">
                            <div className="flex flex-col gap-1">
                                <h3 className="font-bold text-emerald-900 dark:text-emerald-100 flex items-center gap-2">
                                    ✓ In Both
                                </h3>
                                {totalCountA > 0 && totalCountB > 0 && inBoth.length > 0 && (
                                    <span className="text-xs text-emerald-700 dark:text-emerald-200 font-medium">
                                        {(((inBoth.length / Math.max(uniqueA.length, (totalCountB - missingInA.length))) * 100).toFixed(1))}% overlap
                                    </span>
                                )}
                            </div>
                            <span className="text-sm bg-emerald-200 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-100 px-3 py-1 rounded-full font-bold">{inBoth.length.toLocaleString()}</span>
                        </div>
                        {inBoth.length === 0 ? (
                            <div className="flex-1 flex items-center justify-center text-emerald-400 dark:text-emerald-600 text-sm italic">
                                No items in common
                            </div>
                        ) : (
                            <textarea 
                                readOnly 
                                value={inBoth.join("\n")}
                                className="flex-1 p-4 bg-transparent resize-none text-sm font-mono outline-none leading-6 text-emerald-900 dark:text-emerald-100"
                            />
                        )}
                         <div className="p-3 border-t border-emerald-100 dark:border-emerald-900/30 flex gap-2 justify-end">
                            <button onClick={() => handleCopy(inBoth)} className="p-2 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded text-emerald-700" title="Copy to clipboard">
                                <Copy size={16} />
                            </button>
                            <div className="flex items-center gap-1 bg-emerald-100 dark:bg-emerald-900/30 rounded p-0.5">
                                <button onClick={() => handleDownload(inBoth, "in_both.txt", "txt")} className="px-2 py-1.5 hover:bg-white dark:hover:bg-slate-800 rounded text-xs font-medium text-emerald-700 dark:text-emerald-200" title="Download TXT">TXT</button>
                                <button onClick={() => handleDownload(inBoth, "in_both.txt", "csv")} className="px-2 py-1.5 hover:bg-white dark:hover:bg-slate-800 rounded text-xs font-medium text-emerald-700 dark:text-emerald-200" title="Download CSV">CSV</button>
                                <button onClick={() => handleDownload(inBoth, "in_both.txt", "json")} className="px-2 py-1.5 hover:bg-white dark:hover:bg-slate-800 rounded text-xs font-medium text-emerald-700 dark:text-emerald-200" title="Download JSON">JSON</button>
                            </div>
                        </div>
                    </div>
                    {/* Card 4: Only in B (Missing in A) */}
                     <div className="bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-900/30 ring-1 ring-blue-200/50 dark:ring-blue-900/50 shadow-md overflow-hidden flex flex-col h-[28rem]">
                        <div className="p-4 border-b border-blue-100 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-900/10 flex justify-between items-center">
                            <div className="flex flex-col gap-1">
                                <h3 className="font-bold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                                    <ArrowLeft size={16} /> In B Only
                                </h3>
                                {totalCountB > 0 && missingInA.length > 0 && (
                                    <span className="text-xs text-blue-700 dark:text-blue-200 font-medium">
                                        {((missingInA.length / totalCountB) * 100).toFixed(1)}% of B
                                    </span>
                                )}
                            </div>
                            <span className="text-sm bg-blue-200 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100 px-3 py-1 rounded-full font-bold">{missingInA.length.toLocaleString()}</span>
                        </div>
                        {missingInA.length === 0 ? (
                            <div className="flex-1 flex items-center justify-center text-blue-400 dark:text-blue-600 text-sm italic">
                                No unique items in B only
                            </div>
                        ) : (
                            <textarea 
                                readOnly 
                                value={missingInA.join("\n")}
                                className="flex-1 p-4 bg-transparent resize-none text-sm font-mono outline-none leading-6 text-blue-900 dark:text-blue-100"
                            />
                        )}
                        <div className="p-3 border-t border-blue-100 dark:border-blue-900/30 flex gap-2 justify-end">
                            <button onClick={() => handleCopy(missingInA)} className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded text-blue-700" title="Copy to clipboard">
                                <Copy size={16} />
                            </button>
                            <button onClick={() => handleDownload(missingInA, "in_b_missing_in_a.txt")} className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded text-blue-700" title="Download as TXT">
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
