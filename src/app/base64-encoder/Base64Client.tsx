"use client";

import { FlowerBackground } from "@/components/FlowerBackground";
import { GoogleAdsense } from "@/components/GoogleAdsense";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { SmartHeroHeader } from "@/components/SmartHeroHeader";
import { flowerThemes } from "@/config/flowerThemes";
import { fromBase64, toBase64 } from "@/lib/base64-utils";
import { Copy, Upload, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Base64Client() {
  const theme = flowerThemes.blueIris;
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isUrlSafe, setIsUrlSafe] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState<string | null>(null); // Re-introducing error state for file upload

  useEffect(() => {
    setError(null); // Clear error on input/mode/urlsafe change
    if (!input) {
      setOutput('');
      return;
    }

    try {
      if (mode === 'encode') {
        const result = toBase64(input, isUrlSafe);
        setOutput(result);
      } else {
        const result = fromBase64(input);
        setOutput(result);
      }
    } catch (e: any) {
      // Only show error for decode if it's a real error, not just partial input
      if (mode === 'decode') {
        setError("Invalid Base64 string");
      }
      setOutput(''); // Clear output on error
    }
  }, [input, mode, isUrlSafe]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null); // Clear previous errors
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError("File is too large (max 5MB)");
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      
      if (mode === 'encode') {
          // For encoding, we want the base64 representation of the file.
          // If it's a data URL (e.g., image), we can use that directly.
          // If it's a text file, we read it as text and then encode.
          if (result.startsWith("data:")) {
            // It's already a data URL, which is base64 encoded.
            // We can set the output directly and provide a placeholder for input.
            setOutput(result);
            setInput(`[File: ${file.name} encoded]`); // Placeholder for input
          } else {
            // Assume it's a text file, read as text and then encode.
            const textReader = new FileReader();
            textReader.onload = (ev) => {
                setInput(ev.target?.result as string); // This will trigger the useEffect to encode
            }
            textReader.readAsText(file);
          }
      } else {
          // For decoding, we assume the file contains a Base64 string.
          // Read the file as text and set it as input.
          const textReader = new FileReader();
          textReader.onload = (ev) => {
              setInput(ev.target?.result as string); // This will trigger the useEffect to decode
          }
          textReader.readAsText(file);
      }
    };

    // For encoding, read as data URL for binary files (images, etc.)
    // For decoding, read as text (assuming the file contains base64 text)
    if (mode === 'encode' && file.type.startsWith('image/')) { // Example for images
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <FlowerBackground theme={theme} badgeText="Base64 Tool">
       <SchemaMarkup
        name="Base64 Encoder/Decoder"
        description="Free online Base64 encoder and decoder. Convert text and files to Base64 strings and vice versa securely in your browser."
        url="https://www.countcharacters.org/base64-converter"
      />
      <div className="flex flex-col min-h-screen">
        <SmartHeroHeader
          title="Base64 Encoder/Decoder"
          theme={theme}
        />

        <main className="flex-grow w-full">
          
          <div className="container mx-auto px-4 pt-8 pb-0 max-w-5xl">

            <div className="flex justify-center mb-8">
                <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg inline-flex">
                    <button
                        onClick={() => setMode('encode')}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                            mode === 'encode'
                                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                        }`}
                    >
                        Encode
                    </button>
                    <button
                        onClick={() => setMode('decode')}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                            mode === 'decode'
                                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                        }`}
                    >
                        Decode
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Input */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-500 uppercase flex justify-between items-center">
                        <span>Input</span>
                        {mode === 'encode' && (
                             <label className="cursor-pointer text-blue-500 hover:text-blue-600 lowercase font-normal flex items-center gap-1">
                                <Upload size={14} />
                                <span>Upload File</span>
                                <input type="file" className="hidden" onChange={handleFileUpload} />
                             </label>
                        )}
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'encode' ? "Paste text to encode..." : "Paste Base64 to decode..."}
                        className={`w-full h-80 p-4 font-mono text-sm bg-white dark:bg-slate-900 border ${error && mode === 'decode' ? "border-red-300 dark:border-red-900/50" : "border-slate-200 dark:border-slate-800"} rounded-xl resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all`}
                    />
                     {mode === 'encode' && (
                        <label className="flex items-center gap-2 cursor-pointer mt-1">
                            <input 
                                type="checkbox" 
                                checked={isUrlSafe}
                                onChange={(e) => setIsUrlSafe(e.target.checked)}
                                className="rounded text-blue-600"
                            />
                            <span className="text-sm text-slate-500">URL Safe (replace +/ with -_)</span>
                        </label>
                    )}
                </div>

                {/* Output */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-500 uppercase flex justify-between items-center">
                        <span>Output</span>
                        <button onClick={handleCopy} className="text-blue-500 hover:text-blue-600 lowercase font-normal flex items-center gap-1">
                            <Copy size={14} /> Copy
                        </button>
                    </label>
                    <textarea
                        readOnly
                        value={output}
                        className={`w-full h-80 p-4 font-mono text-sm bg-slate-50 dark:bg-slate-950 border ${error ? "border-red-300 dark:border-red-900/50" : "border-slate-200 dark:border-slate-800"} rounded-xl resize-none focus:outline-none text-slate-600 dark:text-slate-400`}
                    />
                    {error && (
                        <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-lg flex items-center gap-2 mt-1">
                            <X size={16} /> {error}
                        </div>
                    )}
                </div>
            </div>

             <div className="mt-4 mb-2 min-h-[50px] flex justify-center">
                <GoogleAdsense 
                    adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE || ""} 
                    layout="in-article"
                    style={{ display: 'block', width: '100%', maxWidth: '100%' }}
                />
            </div>
          </div>

          {/* FAQ Section */}
          <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 w-full">
              {[
                 { q: "What is Base64 encoding?", a: "Base64 is a way to represent binary data (like images or files) using only 64 ASCII characters. It ensures data remains intact during transport over protocols that might otherwise mangle binary content." },
                 { q: "Is my data secure?", a: "Yes. All processing happens locally in your browser. We never upload your text or files to our servers." },
                 { q: "Can I convert images to Base64?", a: "Yes! Switch to 'Encode' mode and upload an image file. The tool will generate the Base64 string that you can use in HTML or CSS." },
                 { q: "Does this support emojis?", a: "Yes. Our tool correctly handles UTF-8 characters, so emojis and non-Latin scripts are encoded and decoded without errors." }
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
