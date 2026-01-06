"use client";

import { FlowerBackground } from "@/components/FlowerBackground";
import { GoogleAdsense } from "@/components/GoogleAdsense";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { SmartHeroHeader } from "@/components/SmartHeroHeader";
import { flowerThemes } from "@/config/flowerThemes";
import { fromBase64, toBase64 } from "@/lib/base64-utils";
import { Copy, Upload, X } from "lucide-react";
import { useState } from "react";

export default function Base64Client() {
  const theme = flowerThemes.lavender;
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleTransform = (value: string, currentMode: "encode" | "decode") => {
    setInput(value);
    setError(null);
    if (!value) {
      setOutput("");
      return;
    }

    try {
      if (currentMode === "encode") {
        setOutput(toBase64(value));
      } else {
        setOutput(fromBase64(value));
      }
    } catch (err) {
      // Don't show error for empty decode attempts that are invalid partials
      if (currentMode === "decode") {
         // Only show error if the string is plausibly complete or user stopped typing
         // For now, simple error handling
         // setError("Invalid Base64 string"); 
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError("File is too large (max 5MB)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setMode("encode");
      // result is already a data URL (base64)
      // If we want just the base64 content without data prefix:
      // const base64 = result.split(',')[1];
      // But usually "Image to Base64" implies the whole data string for CSS.
      setInput(`[File: ${file.name}]`); 
      setOutput(result);
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <FlowerBackground theme={theme} badgeText="Base64 Tool">
      <SchemaMarkup
        name="Base64 Encoder & Decoder"
        description="Free online Base64 encoder and decoder. Convert text and files to Base64 string or decode Base64 back to text instantly."
        url="https://www.countcharacters.org/base64-encoder"
      />
      <div className="flex flex-col min-h-screen">
        <SmartHeroHeader
          title="Base64 Encoder/Decoder"
          theme={theme}
        />

        <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
          
          <div className="text-center text-slate-500 mb-8 max-w-2xl mx-auto">
             Encode text and files to Base64 or decode Base64 strings back to readable format.
          </div>

          {/* Controls */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-2 mb-6 max-w-md mx-auto flex">
             <button
                onClick={() => { setMode("encode"); handleTransform(input, "encode"); }}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                    mode === "encode" 
                    ? "bg-white dark:bg-slate-800 text-blue-600 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700" 
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
             >
                Encode
             </button>
             <button
                onClick={() => { setMode("decode"); handleTransform(input, "decode"); }}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                    mode === "decode" 
                    ? "bg-white dark:bg-slate-800 text-blue-600 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700" 
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
             >
                Decode
             </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Input */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Input {mode === "encode" ? "Text or File" : "Base64 String"}
                    </label>
                    {mode === "encode" && (
                        <div className="relative">
                            <input 
                                type="file" 
                                onChange={handleFileUpload} 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <button className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors">
                                <Upload size={14} /> Upload File
                            </button>
                        </div>
                    )}
                </div>
                <textarea
                    value={input}
                    onChange={(e) => handleTransform(e.target.value, mode)}
                    placeholder={mode === "encode" ? "Type text to encode..." : "Paste Base64 to decode..."}
                    className="w-full h-[400px] p-4 font-mono text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-inner resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
            </div>

            {/* Output */}
            <div className="space-y-3">
                 <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Result
                    </label>
                    <button
                        onClick={handleCopy}
                        disabled={!output}
                        className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
                    >
                         {copied ? "Copied!" : <><Copy size={14} /> Copy Result</>}
                    </button>
                </div>
                <div className="relative">
                    <textarea
                        value={output}
                        readOnly
                        placeholder="Result will appear here..."
                        className={`w-full h-[400px] p-4 font-mono text-sm bg-slate-50 dark:bg-slate-900 border ${error ? "border-red-300 dark:border-red-900/50" : "border-slate-200 dark:border-slate-800"} rounded-xl shadow-inner resize-none focus:outline-none`}
                    />
                    {error && (
                        <div className="absolute bottom-4 left-4 right-4 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
                            <X size={16} /> {error}
                        </div>
                    )}
                </div>
            </div>
          </div>

           <div className="mt-8">
            <GoogleAdsense 
                adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE || ""} 
                layout="in-article"
            />
          </div>

        </main>
      </div>
    </FlowerBackground>
  );
}
