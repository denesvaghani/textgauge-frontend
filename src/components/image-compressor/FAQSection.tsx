const FAQ_DATA = [
  {
    question: "How do I compress an image to 100KB?",
    answer: "Click the '≤100KB' preset button, upload your image, and download. Our tool automatically adjusts quality and dimensions to meet the 100KB target."
  },
  {
    question: "Is my data safe? Do you upload my images?",
    answer: "100% safe. All compression happens directly in your browser. Your images never leave your device - we don't upload or store anything on our servers."
  },
  {
    question: "What image formats are supported?",
    answer: "We support JPG, PNG, and WebP for both input and output. You can also convert between formats (e.g., PNG to WebP for better compression)."
  },
  {
    question: "Can I compress multiple images at once?",
    answer: "Yes! Upload as many images as you need. Process them all with the same settings, then download individually or as a ZIP file."
  },
  {
    question: "What's the best format for web images?",
    answer: "WebP offers the best compression-to-quality ratio for web. It's 25-35% smaller than JPG at the same quality. Use our 'Web' preset for optimal results."
  },
  {
    question: "How much can I reduce file size?",
    answer: "Typical reductions are 50-80% for photos. A 5MB image can often compress to under 500KB with no visible quality loss using WebP format."
  }
];

export function FAQSection() {
  return (
    <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4 max-w-3xl mx-auto">
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
