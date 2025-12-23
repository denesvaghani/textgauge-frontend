'use client';

import { Editor } from "@/components/Editor";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Page() {
  return (
    <main className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-200 pb-12">
      <ThemeToggle />

      {/* Hero Section */}
      <section className="bg-white/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 pt-12 pb-16 transition-colors duration-200">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6">
            ✨ Free Developer Tools
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Character Counter & Text Tools
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Free online tools to <strong>count characters</strong>, format <strong>JSON</strong> & <strong>YAML</strong>, and analyze text.
            Clean, privacy-focused, and developer-friendly.
          </p>
        </div>
      </section>

      {/* Editor Section */}
      <section className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl ring-1 ring-slate-900/5 dark:ring-white/10 overflow-hidden">
          <Editor />
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <a href="/json-formatter" className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-200">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <span className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors">→</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">JSON Formatter</h3>
            <p className="text-slate-600 dark:text-slate-400">Validate, beautify, and minify JSON data with our advanced Monaco-based editor.</p>
          </a>

          <a href="/yaml-formatter" className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-200">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M4 14.8V19"></path><path d="M20 12.5v1.8"></path><path d="M4 12.8V9"></path><path d="M20 17v1.8"></path></svg>
              </div>
              <span className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors">→</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">YAML Formatter</h3>
            <p className="text-slate-600 dark:text-slate-400">Convert, validate, and format YAML files with syntax highlighting and error detection.</p>
          </a>

          <a href="/json-to-csv-converter" className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-200">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </div>
              <span className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors">→</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">JSON to CSV</h3>
            <p className="text-slate-600 dark:text-slate-400">Convert JSON data to CSV format instantly. Reduces file size by 50-60% for easy spreadsheet use.</p>
          </a>

          <a href="/json-to-toon-converter" className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-200">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
              </div>
              <span className="text-slate-300 dark:text-slate-600 group-hover:text-emerald-500 transition-colors">→</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">JSON to TOON</h3>
            <p className="text-slate-600 dark:text-slate-400">AI-optimized format. Reduce token usage by 30-60% for ChatGPT, Claude, and other LLMs.</p>
          </a>

          <a href="/toml-formatter" className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-200">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <span className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors">→</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">TOML Formatter</h3>
            <p className="text-slate-600 dark:text-slate-400">Validate, format, and beautify TOML configuration files (Cargo.toml, pyproject.toml) instantly.</p>
          </a>

          <a href="/diff-checker" className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-200">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><path d="M11 18H8a2 2 0 0 1-2-2V9"></path></svg>
              </div>
              <span className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors">→</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Diff Checker</h3>
            <p className="text-slate-600 dark:text-slate-400">Compare two texts and see differences instantly. Perfect for code reviews, config comparisons, and documentation updates.</p>
          </a>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 transition-colors duration-200">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Everything you need to analyze text
          </h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-sm text-slate-600 dark:text-slate-300">
            <div>
              <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Character & Word Count
              </h3>
              <p className="leading-relaxed">
                Instantly <strong>count characters</strong> and <strong>count words</strong> as you type.
                Perfect for Twitter posts (280 chars), meta descriptions (155-160 chars), essays, and articles.
                We also track sentences, paragraphs, and reading time.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Case Converter
              </h3>
              <p className="leading-relaxed">
                Transform text to Title Case, lowercase, UPPERCASE, or snake_case instantly.
                Format your content quickly without retyping.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Repeats Finder
              </h3>
              <p className="leading-relaxed">
                Detect repeated phrases automatically. Our tool identifies redundant 3-word phrases
                to help you improve readability and style.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> SEO Analysis
              </h3>
              <p className="leading-relaxed">
                Analyze keyword density and structure. Essential for content writers looking to optimize
                articles for search engines.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> TOML Validation
              </h3>
              <p className="leading-relaxed">
                Validate and format <strong>TOML</strong> files instantly. Perfect for managing configuration files
                for Rust (Cargo), Python (pyproject), and Go projects with error detection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
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
