'use client';

import { Editor } from "@/components/Editor";
import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";
import { flowerThemes } from "@/config/flowerThemes";

const tools = [
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
  {
    href: "/diff-checker",
    theme: flowerThemes.redRose,
    title: "Diff Checker",
    description: "Compare two texts and see differences instantly. Perfect for code reviews and config comparisons.",
    hoverBorder: "hover:border-rose-400/60 dark:hover:border-rose-400/40",
    hoverShadow: "hover:shadow-rose-500/20",
    hoverText: "group-hover:text-rose-600 dark:group-hover:text-rose-400",
  },
];

export default function Page() {
  return (
    <main className="bg-gradient-to-b from-amber-50/50 via-yellow-50/30 to-slate-50 dark:from-amber-950/20 dark:via-yellow-950/10 dark:to-slate-950 min-h-screen transition-colors duration-300 pb-12">
      {/* Sunflower glow for homepage */}
      <div 
        className="pointer-events-none fixed inset-0 opacity-50 dark:opacity-30"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(234, 179, 8, 0.15), transparent)`,
        }}
      />
      
      <ThemeToggle />

      {/* Hero Section */}
      <section className="relative bg-white/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 pt-12 pb-16 transition-colors duration-200">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
          {/* Sunflower Brand Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-yellow-200/50 dark:border-yellow-800/50 shadow-lg mb-6">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-yellow-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 shadow-md group-hover:scale-110 transition-transform">
              <Image
                src="/images/logo/sunflower-logo.webp"
                alt="TextGauge Sunflower"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-600 dark:text-yellow-400">
              Free Developer Tools
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-500 dark:from-yellow-400 dark:to-amber-400 tracking-tight mb-4 w-fit">
            Character Counter & Text Tools
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Free online tools to <strong>count characters</strong>, format <strong>JSON</strong> & <strong>YAML</strong>, and analyze text.
            Clean, privacy-focused, and developer-friendly.
          </p>
        </div>
      </section>

      {/* Editor Section */}
      <section className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 z-10">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl ring-1 ring-slate-900/5 dark:ring-white/10 overflow-hidden">
          <Editor />
        </div>
      </section>

      {/* Tools Grid */}
      <section className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            🌸 Our Flower-Powered Tools 🌸
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">Each tool has its own flower identity</p>
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

      {/* SEO Content Section */}
      <section className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 z-10">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 transition-colors duration-200">
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
      <section className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 z-10">
        <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            { q: "How do I count characters in my text?", a: "Simply paste or type your text in the editor above. The character count updates instantly as you type." },
            { q: "Is this tool free?", a: "Yes, 100% free with no limits. Analyze as much text as you need." },
            { q: "Does it count spaces?", a: "Yes, we provide counts both with and without spaces to suit your needs." },
            { q: "Is my text private?", a: "ABSOLUTELY. All analysis happens in your browser. Your text is never sent to our servers." }
          ].map((faq, i) => (
            <details key={i} className="w-full group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all duration-200">
              <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                {faq.q}
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800/50 pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
