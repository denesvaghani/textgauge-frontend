'use client';

import { Editor } from "@/components/Editor";
import Image from "next/image";
import { useState } from "react";
import { FlowerBackground } from "@/components/FlowerBackground";
import { SmartHeroHeader, HeroDescription } from "@/components/SmartHeroHeader";
import { 
  getToolsByCategory, 
  getCategoryIcon, 
  type ToolCategory,
  type ToolDefinition,
  TOOL_REGISTRY
} from "@/config/toolRegistry";
import { flowerThemes } from "@/config/flowerThemes";

// Category order for display
const CATEGORY_ORDER: ToolCategory[] = [
  "Formatters",
  "Converters",
  "Design Tools",
  "Media Tools",
  "Comparison",
  "Generators",
];

type CategoryKey = typeof CATEGORY_ORDER[number];

function ToolsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("Formatters");
  const tools = getToolsByCategory(activeCategory);

  return (
    <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
          🌸 Our Flower-Powered Tools 🌸
        </h2>
        <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base mb-6">Each tool has its own flower identity</p>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORY_ORDER.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-2 sm:px-5 sm:py-2.5 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                activeCategory === category
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
              }`}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden shrink-0 border border-current opacity-90 relative">
                <Image 
                    src={getCategoryIcon(category)} 
                    alt={`${category} category icon`} 
                    fill
                    sizes="24px"
                    className="object-cover"
                    priority
                />
              </div>
              <span>{category}</span>
              <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-slate-200/50 dark:bg-slate-700/50">
                {getToolsByCategory(category).length}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <a
            key={tool.href}
            href={tool.href}
            className={`group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 ${tool.hoverStyles.border} hover:shadow-2xl ${tool.hoverStyles.shadow} transition-all duration-300 overflow-hidden`}
          >
            {/* Gradient overlay on hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at 100% 0%, ${tool.theme.colors.glow}, transparent 50%)`,
              }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300 shadow-lg ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900"
                     style={{ boxShadow: `0 4px 20px ${tool.theme.colors.glow}`, borderColor: tool.theme.colors.primary }}>
                  <Image
                    src={tool.theme.image}
                    alt={tool.theme.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-slate-300 dark:text-slate-600 group-hover:translate-x-1 transition-transform text-2xl">→</span>
              </div>
              <h3 className={`text-xl font-bold text-slate-900 dark:text-white mb-2 ${tool.hoverStyles.text} transition-colors`}>
                {tool.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {tool.description}
              </p>
              
              {/* Flower name badge */}
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                   style={{ 
                     backgroundColor: `${tool.theme.colors.accent}`, 
                     color: tool.theme.colors.primary 
                   }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tool.theme.colors.primary }} />
                {tool.theme.name}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function HomeClient() {
  return (
    <FlowerBackground theme={flowerThemes.sunflower} showFlowerBadge={false}>
      <div className="flex flex-col min-h-screen">
        {/* Smart V3 Hero Header */}
        <SmartHeroHeader 
            title="Character Counter" 
            theme={flowerThemes.sunflower}
        />

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-0 w-full">
            {/* Editor Section */}
            <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl ring-1 ring-slate-900/5 dark:ring-white/10 overflow-hidden">
                    <Editor />
                </div>

                </div>

            {/* Tools Grid with Categories */}
            <ToolsSection />
      </main>

      {/* SEO Content Section */}
      <section className="w-full relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 z-10">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-sm border border-yellow-200/50 dark:border-yellow-800/30 p-8 transition-colors duration-200">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            The Ultimate Privacy-Focused Developer Toolkit
          </h2>
          
          <div className="space-y-12 text-slate-600 dark:text-slate-300 leading-relaxed">
            
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span> 
                        Why TextGauge is Different
                    </h3>
                    <p className="mb-4">
                        In a web filled with ad-heavy, slow, and data-hungry tools, <strong>TextGauge</strong> stands out by prioritizing <strong>speed, privacy, and simplicity</strong>. We believe that simple tasks like counting characters, formatting JSON, or converting images shouldn't require uploading your sensitive data to a remote server.
                    </p>
                    <p>
                        Our architecture is strictly <strong>Client-Side First</strong>. This means when you paste your API keys into our JSON Formatter or your private documents into our Character Counter, that data <em>never</em> leaves your device. The processing happens locally in your browser using modern WebAssembly and JavaScript technologies.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span> 
                        Optimized for Modern Development
                    </h3>
                    <p className="mb-4">
                        We understand the workflow of modern full-stack developers. You need tools that open instantly and work reliably. TextGauge is built as a Progressive Web App (PWA), meaning it loads fast, works offline, and feels like a native application on your desktop or mobile device.
                    </p>
                    <p>
                        Whether you are debugging a Kubernetes configuration with our <strong>YAML Validator</strong>, optimizing assets with our <strong>Image Compressor</strong>, or checking the diff between two code snippets, we provide a clean, distraction-free environment to get the job done.
                    </p>
                </div>
            </div>

            <hr className="border-yellow-100 dark:border-yellow-900/50" />

            <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 text-center">
                    Comprehensive Tool Suite Analysis
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">Character & Word Counting</h4>
                        <p className="text-sm">
                            More than just a simple counter. Our tool breaks down your text into characters (with and without spaces), words, sentences, paragraphs, and reading time. Essential for social media managers optimizing specifically for Twitter/X (280 chars), LinkedIn posts, or Google Ad headlines. Copywriters rely on our density analysis to avoid keyword stuffing.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">Data Formatting (JSON/YAML/TOML)</h4>
                        <p className="text-sm">
                            Malformed configuration files can bring down production environments. Our strict validators for JSON, YAML, and TOML ensure your syntax is perfect before you commit. Features include automatic indentation repair, minification for payload optimization, and tree-view visualization for navigating complex nested objects.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">Image Optimization</h4>
                        <p className="text-sm">
                            Web performance matters (Core Web Vitals). Our client-side Image Compressor reduces file sizes (JPG, PNG, WebP) by up to 80% without visible quality loss, helping you improve LCP scores and SEO rankings. We also offer specialized resizing and conversion tools to prepare assets for responsive web design.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">Dev Utilities</h4>
                        <p className="text-sm">
                            From generating secure v4 UUIDs for database primary keys to creating stronger passwords or calculating cryptographic hashes (MD5, SHA-256), our cryptographic tools are industry-standard. We also provide URL encoding/decoding and Base64 utilities for debugging API payloads.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">Text Transformation</h4>
                        <p className="text-sm">
                            Clean up messy inputs instantly. Convert text case (UPPERCASE, lowercase, Title Case, camelCase, snake_case) for variable naming conventions. Our "Repeats Finder" helps editors polish their prose by highlighting redundant phrases, ensuring your writing is concise and impactful.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">Diff Checking</h4>
                        <p className="text-sm">
                            Compare text or code side-by-side to spot changes instantly. Our Diff Checker highlights additions and removals in a clear, color-coded format, making it easier to review code snippets, configuration versions, or document revisions without needing a full IDE.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-xl border border-yellow-100 dark:border-yellow-900/30">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    Our Privacy Promise
                </h3>
                <p className="text-sm">
                    <strong>Zero-Knowledge Architecture:</strong> We do not store, record, or transmit your input data. All computations—whether it's hashing a password or compressing an image—occur strictly within your browser's memory sandbox. You can verify this by inspecting the network traffic in your browser's developer tools; you will see zero requests sending your payload to our backend.
                </p>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 z-10 relative">
        <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 w-full">
          {[
            { q: "How do I count characters in my text?", a: "Simply paste or type your text in the editor above. The character count updates instantly as you type." },
            { q: "Is this tool free?", a: "Yes, 100% free with no limits. Analyze as much text as you need." },
            { q: "Does it count spaces?", a: "Yes, we provide counts both with and without spaces to suit your needs." },
            { q: "Is my text private?", a: "ABSOLUTELY. All analysis happens in your browser. Your text is never sent to our servers." }
          ].map((faq, i) => (
            <details key={i} className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-yellow-200/50 dark:border-yellow-800/50 rounded-xl overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md hover:border-yellow-300/50 dark:hover:border-yellow-700/50">
              <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-yellow-50/50 dark:hover:bg-yellow-900/20 transition-colors">
                {faq.q}
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-yellow-100/50 dark:border-yellow-800/30 pt-4 bg-white/50 dark:bg-slate-900/50">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      </div>
    </FlowerBackground>
  );
}
