"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface FormatterProps {
  title: string;
  description: string;
  inputType: "json" | "yaml" | "text";
  outputType: "json" | "yaml" | "text";
  // Function to transform input -> output
  transform: (input: string) => string | Promise<string>;
  // Validation function (optional)
  validate?: (input: string) => boolean | string | null;
  placeholderInput?: string;
}

export function Formatter({
  title,
  description,
  transform,
  placeholderInput = "",
}: FormatterProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFormat = async () => {
    setError(null);
    if (!input.trim()) {
      setOutput("");
      return;
    }

    try {
      const result = await transform(input);
      setOutput(result);
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : "An error occurred while formatting.";
      setError(message);
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50 transition-colors duration-200">
      <ThemeToggle />

      <header className="bg-white dark:bg-gray-900 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-250px)] min-h-[500px]">
          {/* Input Section */}
          <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 rounded-t-lg">
              <h2 className="font-semibold text-gray-700 dark:text-gray-200">Input</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleClear}
                  className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={handleFormat}
                  className="px-4 py-1.5 text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 rounded shadow-sm transition-colors"
                >
                  Format
                </button>
              </div>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholderInput}
              className="flex-1 w-full p-4 bg-transparent outline-none resize-none font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600 rounded-b-lg scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700"
              spellCheck={false}
            />
          </div>

          {/* Output Section */}
          <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 rounded-t-lg">
              <h2 className="font-semibold text-gray-700 dark:text-gray-200">Output</h2>
              <button
                onClick={handleCopy}
                disabled={!output}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${copied
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {copied ? "Copied!" : "Copy Output"}
              </button>
            </div>

            <div className="relative flex-1 w-full rounded-b-lg overflow-hidden bg-gray-50 dark:bg-gray-950/50">
              {error ? (
                <div className="absolute inset-0 p-4 text-red-600 dark:text-red-400 font-mono text-sm overflow-auto">
                  <strong className="block mb-2">Error:</strong>
                  {error}
                </div>
              ) : (
                <textarea
                  readOnly
                  value={output}
                  className="w-full h-full p-4 bg-transparent outline-none resize-none font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-200 rounded-b-lg scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700"
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
