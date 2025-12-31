'use client';

import Image from "next/image";
import { flowerThemes } from "@/config/flowerThemes";

const tools = [
  {
    href: "/json-formatter",
    id: "json-formatter",
    theme: flowerThemes.cherryBlossom,
    title: "JSON Formatter",
    description: "Validate, beautify, and minify JSON data with our advanced Monaco-based editor.",
    hoverBorder: "hover:border-pink-400/60 dark:hover:border-pink-400/40",
    hoverShadow: "hover:shadow-pink-500/20",
    hoverText: "group-hover:text-pink-600 dark:group-hover:text-pink-400",
  },
  {
    href: "/yaml-formatter",
    id: "yaml-formatter",
    theme: flowerThemes.whiteLily,
    title: "YAML Formatter",
    description: "Convert, validate, and format YAML files with syntax highlighting and error detection.",
    hoverBorder: "hover:border-emerald-400/60 dark:hover:border-emerald-400/40",
    hoverShadow: "hover:shadow-emerald-500/20",
    hoverText: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
  },
  {
    href: "/toml-formatter",
    id: "toml-formatter",
    theme: flowerThemes.frangipani,
    title: "TOML Formatter",
    description: "Validate, format, and beautify TOML configuration files (Cargo.toml, pyproject.toml) instantly.",
    hoverBorder: "hover:border-orange-400/60 dark:hover:border-orange-400/40",
    hoverShadow: "hover:shadow-orange-500/20",
    hoverText: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
  },
  {
    href: "/json-to-csv-converter",
    id: "json-to-csv-converter",
    theme: flowerThemes.sunflower,
    title: "JSON to CSV",
    description: "Convert JSON data to CSV format instantly. Reduces file size by 50-60% for easy spreadsheet use.",
    hoverBorder: "hover:border-yellow-400/60 dark:hover:border-yellow-400/40",
    hoverShadow: "hover:shadow-yellow-500/20",
    hoverText: "group-hover:text-yellow-600 dark:group-hover:text-yellow-400",
  },
  {
    href: "/json-to-toon-converter",
    id: "json-to-toon-converter",
    theme: flowerThemes.lavender,
    title: "JSON to TOON",
    description: "AI-optimized format. Reduce token usage by 30-60% for ChatGPT, Claude, and other LLMs.",
    hoverBorder: "hover:border-violet-400/60 dark:hover:border-violet-400/40",
    hoverShadow: "hover:shadow-violet-500/20",
    hoverText: "group-hover:text-violet-600 dark:group-hover:text-violet-400",
  },
  {
    href: "/diff-checker",
    id: "diff-checker",
    theme: flowerThemes.redRose,
    title: "Diff Checker",
    description: "Compare two texts and see differences instantly. Perfect for code reviews and config comparisons.",
    hoverBorder: "hover:border-rose-400/60 dark:hover:border-rose-400/40",
    hoverShadow: "hover:shadow-rose-500/20",
    hoverText: "group-hover:text-rose-600 dark:group-hover:text-rose-400",
  },
];

interface RelatedToolsProps {
  currentTool: string;
}

export function RelatedTools({ currentTool }: RelatedToolsProps) {
  const filteredTools = tools.filter((tool) => tool.id !== currentTool);

  return (
    <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
          🌸 Explore More Tools 🌸
        </h2>
        <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">
          Each tool has its own flower identity
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
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
                <div
                  className="w-14 h-14 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300 shadow-lg ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900"
                  style={{
                    boxShadow: `0 4px 20px ${tool.theme.colors.glow}`,
                    borderColor: tool.theme.colors.primary,
                  }}
                >
                  <Image
                    src={tool.theme.image}
                    alt={tool.theme.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-slate-300 dark:text-slate-600 group-hover:translate-x-1 transition-transform text-2xl">
                  →
                </span>
              </div>
              <h3
                className={`text-xl font-bold text-slate-900 dark:text-white mb-2 ${tool.hoverText} transition-colors`}
              >
                {tool.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {tool.description}
              </p>

              {/* Flower name badge */}
              <div
                className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${tool.theme.colors.accent}`,
                  color: tool.theme.colors.primary,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: tool.theme.colors.primary }}
                />
                {tool.theme.name}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
