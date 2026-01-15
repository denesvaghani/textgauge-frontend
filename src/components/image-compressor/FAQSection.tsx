const FAQ_DATA = [
  {
    question: "How do I compress images to exactly 100KB or 50KB?",
    answer: "Select the '≤100KB' or '≤50KB' preset and upload. Our intelligent algorithm iteratively adjusts the <strong>MozJPEG/WebP quality factor</strong> and dimensions to bring the file size as close as possible to the target without sacrificing critical visual detail."
  },
  {
    question: "Is browser-side compression secure for enterprise use?",
    answer: "<strong>Yes.</strong> This tool uses the <strong>WebAssembly (Wasm)</strong> and <strong>Canvas API</strong> to process images entirely in your local RAM. Images are never transmitted over the network, making it compliant with strict data privacy policies and secure for proprietary corporate assets."
  },
  {
    question: "MozJPEG vs. WebP: Which should I choose?",
    answer: "<strong>WebP</strong> is superior for web performance, offering 25-35% better compression than standard JPEG. However, <strong>MozJPEG</strong> (our default JPEG engine) is excellent for maintaining maximum compatibility across older browsers and social media previews."
  },
  {
    question: "How does batch compression affect performance?",
    answer: "Our engine uses <strong>asynchronous processing</strong> to handle dozens of images simultaneously. While large batches (50+ images) may utilize significant system memory, the UI remains responsive, and you can download all results in a single <strong>optimized ZIP archive</strong>."
  },
  {
    question: "Does this tool strip Exif/Metadata?",
    answer: "By default, our compression process strips unnecessary metadata (GPS tags, camera settings) to further reduce file size and protect your privacy. If you need to preserve color profiles, we recommend using the 'High Quality' setting."
  },
  {
    question: "Why use this over server-side compressors?",
    answer: "Speed and Privacy. Server-side tools require time-consuming uploads/downloads and pose a privacy risk. <strong>TextGauge</strong> provides <strong>instant, zero-latency feedback</strong> and ensures your data remains under your absolute control at all times."
  }
];

export function FAQSection() {
  return (
    <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4 w-full">
        {FAQ_DATA.map((faq, i) => (
          <details 
            key={i} 
            className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50 rounded-xl overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors">
              {faq.question}
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-blue-100/50 dark:border-blue-800/30 pt-4">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

// Structured data for SEO (JSON-LD)
export function FAQStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_DATA.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
