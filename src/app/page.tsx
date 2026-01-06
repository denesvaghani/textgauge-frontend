'use client';

import { Editor } from "@/components/Editor";
import Image from "next/image";
import { flowerThemes } from "@/config/flowerThemes";
import { useState } from "react";

const categories = {
  "Formatters": [
    {
      href: "/json-formatter",
      theme: flowerThemes.cherryBlossom,
      title: "JSON Formatter",
      description: "Validate, beautify, and minify JSON data with our advanced Monaco-based editor.",
      hoverBorder: "hover:border-pink-400/60 dark:hover:border-pink-400/40",
      hoverShadow: "hover:shadow-pink-500/20",
      hoverText: "group-hover:text-pink-600 dark:group-hover:text-pink-400",
    },
    {
      href: "/yaml-formatter",
      theme: flowerThemes.whiteLily,
      title: "YAML Formatter",
      description: "Convert, validate, and format YAML files with syntax highlighting and error detection.",
      hoverBorder: "hover:border-emerald-400/60 dark:hover:border-emerald-400/40",
      hoverShadow: "hover:shadow-emerald-500/20",
      hoverText: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    },
    {
      href: "/toml-formatter",
      theme: flowerThemes.frangipani,
      title: "TOML Formatter",
      description: "Validate, format, and beautify TOML configuration files (Cargo.toml, pyproject.toml) instantly.",
      hoverBorder: "hover:border-orange-400/60 dark:hover:border-orange-400/40",
      hoverShadow: "hover:shadow-orange-500/20",
      hoverText: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
    },
  ],
  "Converters": [
    {
      href: "/json-to-csv-converter",
      theme: flowerThemes.sunflower,
      title: "JSON to CSV",
      description: "Convert JSON data to CSV format instantly. Reduces file size by 50-60% for easy spreadsheet use.",
      hoverBorder: "hover:border-yellow-400/60 dark:hover:border-yellow-400/40",
      hoverShadow: "hover:shadow-yellow-500/20",
      hoverText: "group-hover:text-yellow-600 dark:group-hover:text-yellow-400",
    },
    {
      href: "/json-to-toon-converter",
      theme: flowerThemes.lavender,
      title: "JSON to TOON",
      description: "AI-optimized format. Reduce token usage by 30-60% for ChatGPT, Claude, and other LLMs.",
      hoverBorder: "hover:border-violet-400/60 dark:hover:border-violet-400/40",
      hoverShadow: "hover:shadow-violet-500/20",
      hoverText: "group-hover:text-violet-600 dark:group-hover:text-violet-400",
    },
  ],
  "Design Tools": [
    {
      href: "/palette-forge",
      theme: flowerThemes.orchid,
      title: "PaletteForge",
      description: "Extract colors from images and generate design tokens. Export to CSS, Tailwind, SCSS, Figma, and more.",
      hoverBorder: "hover:border-stone-400/60 dark:hover:border-stone-400/40",
      hoverShadow: "hover:shadow-stone-500/20",
      hoverText: "group-hover:text-stone-600 dark:group-hover:text-stone-400",
    },
  ],
  "Media Tools": [
    {
      href: "/image-compressor",
      theme: flowerThemes.hydrangea,
      title: "Image Compressor",
      description: "Compress JPG, PNG, WebP images to any size. Client-side processing - your images never leave your browser.",
      hoverBorder: "hover:border-blue-400/60 dark:hover:border-blue-400/40",
      hoverShadow: "hover:shadow-blue-500/20",
      hoverText: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
    },
  ],
  "Comparison": [
    {
      href: "/diff-checker",
      theme: flowerThemes.redRose,
      title: "Diff Checker",
      description: "Compare two texts and see differences instantly. Perfect for code reviews and config comparisons.",
      hoverBorder: "hover:border-rose-400/60 dark:hover:border-rose-400/40",
      hoverShadow: "hover:shadow-rose-500/20",
      hoverText: "group-hover:text-rose-600 dark:group-hover:text-rose-400",
    },
  ],
  "Generators": [
    {
      href: "/uuid-generator",
      theme: flowerThemes.dahlia,
      title: "UUID Generator",
      description: "Generate random UUIDs (v4) in bulk. Fast, free, and secure generation for developers.",
      hoverBorder: "hover:border-yellow-400/60 dark:hover:border-yellow-400/40",
      hoverShadow: "hover:shadow-yellow-500/20",
      hoverText: "group-hover:text-yellow-600 dark:group-hover:text-yellow-400",
    },
    {
      href: "/cron-job-generator",
      theme: flowerThemes.morningGlory,
      title: "Cron Generator",
      description: "Build cron schedules visually. Translate complex cron expressions into human-readable text.",
      hoverBorder: "hover:border-pink-400/60 dark:hover:border-pink-400/40",
      hoverShadow: "hover:shadow-pink-500/20",
      hoverText: "group-hover:text-pink-600 dark:group-hover:text-pink-400",
    },
    {
      href: "/base64-encoder",
      theme: flowerThemes.blueIris,
      title: "Base64 Tool",
      description: "Encode and decode Base64 strings and files. Supports Unicode and emoji handling.",
      hoverBorder: "hover:border-violet-400/60 dark:hover:border-violet-400/40",
      hoverShadow: "hover:shadow-violet-500/20",
      hoverText: "group-hover:text-violet-600 dark:group-hover:text-violet-400",
    },
  ],
};

const categoryLabels: Record<string, { image: string; color: string }> = {
  "Formatters": { image: flowerThemes.cherryBlossom.image, color: "violet" },
  "Converters": { image: flowerThemes.sunflower.image, color: "yellow" },
  "Design Tools": { image: flowerThemes.orchid.image, color: "stone" },
  "Media Tools": { image: flowerThemes.hydrangea.image, color: "blue" },
  "Comparison": { image: flowerThemes.redRose.image, color: "rose" },
  "Generators": { image: flowerThemes.dahlia.image, color: "slate" },
};

type CategoryKey = keyof typeof categories;

function ToolsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("Formatters");
  const categoryKeys = Object.keys(categories) as CategoryKey[];
  const tools = categories[activeCategory];

  return (
    <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
          🌸 Our Flower-Powered Tools 🌸
        </h2>
        <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base mb-6">Each tool has its own flower identity</p>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {categoryKeys.map((category) => (
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
                    src={categoryLabels[category]?.image} 
                    alt="" 
                    fill
                    sizes="24px"
                    className="object-cover"
                    priority
                />
              </div>
              <span>{category}</span>
              <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-slate-200/50 dark:bg-slate-700/50">
                {categories[category].length}
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
            className={`group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 ${tool.hoverBorder} hover:shadow-2xl ${tool.hoverShadow} transition-all duration-300 overflow-hidden`}
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
              <h3 className={`text-xl font-bold text-slate-900 dark:text-white mb-2 ${tool.hoverText} transition-colors`}>
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

import { FlowerBackground } from "@/components/FlowerBackground";
import { SmartHeroHeader, HeroDescription } from "@/components/SmartHeroHeader";

export default function Page() {
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

                {/* SEO Description - Moved Below Editor */}
                <HeroDescription text="Free developer tools suite to count characters, format JSON & YAML, and analyze text." />
            </div>

            {/* Tools Grid with Categories */}
            <ToolsSection />
      </main>

      {/* SEO Content Section */}
      <section className="w-full relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 z-10">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-sm border border-yellow-200/50 dark:border-yellow-800/30 p-8 transition-colors duration-200">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Everything you need to analyze text
          </h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-sm text-slate-600 dark:text-slate-300">
            <div>
              <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Character & Word Count
              </h3>
              <p className="leading-relaxed">
                Instantly <strong>count characters</strong> and <strong>count words</strong> as you type.
                Perfect for Twitter posts (280 chars), meta descriptions (155-160 chars), essays, and articles.
                We also track sentences, paragraphs, and reading time.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Case Converter
              </h3>
              <p className="leading-relaxed">
                Transform text to Title Case, lowercase, UPPERCASE, or snake_case instantly.
                Format your content quickly without retyping.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Repeats Finder
              </h3>
              <p className="leading-relaxed">
                Detect repeated phrases automatically. Our tool identifies redundant 3-word phrases
                to help you improve readability and style.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> SEO Analysis
              </h3>
              <p className="leading-relaxed">
                Analyze keyword density and structure. Essential for content writers looking to optimize
                articles for search engines.
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
