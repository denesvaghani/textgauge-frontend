export function SEOContentSection() {
  return (
    <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-sm border border-blue-200/50 dark:border-blue-800/30 p-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Advanced Image Optimization for 2026 Web Standards
        </h2>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-sm text-slate-600 dark:text-slate-300">
          <div>
            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Core Web Vitals & LCP
            </h3>
            <p className="leading-relaxed">
              Google&apos;s <strong>Largest Contentful Paint (LCP)</strong> metric is heavily influenced by image file size. By compressing your hero images to under 100KB using our <strong>WebP engine</strong>, you significantly improve your site&apos;s performance score and search engine visibility.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Lossless vs. Smart Lossy
            </h3>
            <p className="leading-relaxed">
              We employ <strong>Smart Lossy</strong> compression for JPGs and WebP. This algorithm identifies and removes visual data that the human eye cannot perceive, allowing for file size reductions of up to <strong>90%</strong> while maintaining a "retina-ready" appearance.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Secure Privacy Posture
            </h3>
            <p className="leading-relaxed">
              In an era of increasing data breaches, uploading proprietary images to a cloud-based compressor is a security risk. <strong>TextGauge</strong> provides a sandbox environment directly in your browser, ensuring no data ever traverses the public internet.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Optimized ZIP Delivery
            </h3>
            <p className="leading-relaxed">
              For developers and content managers, we support <strong>parallel processing</strong>. Drop an entire folder of assets, optimize them with global settings, and download the entire set in a structured ZIP, ready for immediate deployment to your CDN.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
