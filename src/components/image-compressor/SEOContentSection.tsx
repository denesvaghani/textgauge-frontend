import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
              We employ <strong>Smart Lossy</strong> compression for JPGs and WebP. This algorithm identifies and removes visual data that the human eye cannot perceive, allowing for file size reductions of up to <strong>90%</strong> while maintaining a &quot;retina-ready&quot; appearance.
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

        {/* Quick Preset Links - Internal Navigation */}
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-base mb-4 text-slate-900 dark:text-white">
            Popular Compression Presets
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link 
              href="/image-compressor/compress-to-100kb"
              className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-900/50 hover:shadow-md transition-shadow group"
            >
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">Compress to 100KB</span>
                <p className="text-xs text-slate-500 dark:text-slate-400">Email & form uploads</p>
              </div>
              <ArrowRight size={18} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/image-compressor/compress-to-50kb"
              className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-100 dark:border-purple-900/50 hover:shadow-md transition-shadow group"
            >
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">Compress to 50KB</span>
                <p className="text-xs text-slate-500 dark:text-slate-400">Thumbnails & avatars</p>
              </div>
              <ArrowRight size={18} className="text-purple-500 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/benchmarks/image-compression"
              className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-100 dark:border-emerald-900/50 hover:shadow-md transition-shadow group"
            >
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">Quality Benchmark</span>
                <p className="text-xs text-slate-500 dark:text-slate-400">JPEG vs PNG vs WebP</p>
              </div>
              <ArrowRight size={18} className="text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
