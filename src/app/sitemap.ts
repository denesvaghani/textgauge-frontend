import { MetadataRoute } from "next";
import { LEARN_ARTICLES } from "@/config/learnArticles";

// Last major update dates for each section
const LAST_UPDATED = {
  core: '2026-01-19',        // Today's SEO audit
  tools: '2026-01-19',       // Image optimization update
  converters: '2026-01-15',  // Converter updates
  company: '2026-01-19',     // About page expansion
  legal: '2025-12-01',       // Initial legal pages
  benchmarks: '2025-12-20',  // Benchmark pages created
  adLanding: '2026-01-19',   // Noindex removed
  learn: '2026-01-22',       // Learn section created
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.countcharacters.org";

  return [
    // Homepage - highest priority
    {
      url: baseUrl,
      lastModified: LAST_UPDATED.core,
      changeFrequency: "weekly",
      priority: 1,
    },
    // Core Tools - high priority
    {
      url: `${baseUrl}/json-formatter`,
      lastModified: LAST_UPDATED.tools,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/yaml-formatter`,
      lastModified: LAST_UPDATED.tools,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/json-to-toon-converter`,
      lastModified: LAST_UPDATED.converters,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/palette-forge`,
      lastModified: LAST_UPDATED.tools,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/image-compressor`,
      lastModified: LAST_UPDATED.tools,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/image-merger`,
      lastModified: LAST_UPDATED.tools,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/image-compressor/compress-to-100kb`,
      lastModified: LAST_UPDATED.tools,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/image-compressor/compress-to-50kb`,
      lastModified: LAST_UPDATED.tools,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/diff-checker`,
      lastModified: LAST_UPDATED.tools,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/toml-formatter`,
      lastModified: LAST_UPDATED.tools,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/json-to-csv-converter`,
      lastModified: LAST_UPDATED.converters,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Dynamic Converter Routes
    {
      url: `${baseUrl}/converter/json-to-yaml`,
      lastModified: LAST_UPDATED.converters,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/converter/yaml-to-json`,
      lastModified: LAST_UPDATED.converters,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Core Utilities
    {
      url: `${baseUrl}/uuid-generator`,
      lastModified: LAST_UPDATED.tools,
      changeFrequency: "monthly",
      priority: 0.9,
    },
     {
      url: `${baseUrl}/base64-encoder`,
      lastModified: LAST_UPDATED.tools,
      changeFrequency: "monthly",
      priority: 0.9,
    },
     {
      url: `${baseUrl}/cron-job-generator`,
      lastModified: LAST_UPDATED.tools,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hash-generator`,
      lastModified: LAST_UPDATED.tools,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/url-encoder`,
      lastModified: LAST_UPDATED.tools,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Company Pages
    {
      url: `${baseUrl}/about`,
      lastModified: LAST_UPDATED.company,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: LAST_UPDATED.company,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: LAST_UPDATED.company,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    // Legal Pages
    {
      url: `${baseUrl}/privacy`,
      lastModified: LAST_UPDATED.legal,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: LAST_UPDATED.legal,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: LAST_UPDATED.legal,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // Benchmark Pages (Linkable Assets)
    {
      url: `${baseUrl}/benchmarks/json-vs-toon`,
      lastModified: LAST_UPDATED.benchmarks,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/benchmarks/image-compression`,
      lastModified: LAST_UPDATED.benchmarks,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/benchmarks/json-vs-csv`,
      lastModified: LAST_UPDATED.benchmarks,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Image Tools
    {
      url: `${baseUrl}/image-converter`,
      lastModified: LAST_UPDATED.tools,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/image-resizer`,
      lastModified: LAST_UPDATED.tools,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Learn Section - Educational Articles
    {
      url: `${baseUrl}/learn`,
      lastModified: LAST_UPDATED.learn,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Dynamic Learn Articles
    ...LEARN_ARTICLES.map((article) => ({
      url: `${baseUrl}/learn/${article.slug}`,
      lastModified: article.updatedDate || article.publishDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
