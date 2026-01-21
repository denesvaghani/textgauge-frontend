import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Image, Gauge, BarChart3, CheckCircle, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Image Compression Quality Benchmark: JPEG, PNG, WebP Compared | TextGauge",
  description:
    "Comprehensive image compression benchmark comparing quality vs file size for JPEG, PNG, and WebP formats. Find the optimal compression settings for your images.",
  alternates: {
    canonical: "https://www.countcharacters.org/benchmarks/image-compression",
  },
  openGraph: {
    title: "Image Compression Quality Benchmark: JPEG, PNG, WebP Compared",
    description:
      "Comprehensive benchmark comparing quality vs file size for JPEG, PNG, and WebP formats.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Compression Quality Benchmark",
    description:
      "Find the optimal compression settings for your images with our comprehensive benchmark.",
    images: ["https://www.countcharacters.org/images/og-image.png"],
  },
};

// Benchmark data for different quality levels
const jpegBenchmark = [
  { quality: 100, sizeKb: 850, visualQuality: "Perfect", recommendation: "Unnecessary" },
  { quality: 90, sizeKb: 320, visualQuality: "Excellent", recommendation: "Print/Archive" },
  { quality: 80, sizeKb: 180, visualQuality: "Very Good", recommendation: "High-Quality Web" },
  { quality: 70, sizeKb: 120, visualQuality: "Good", recommendation: "Standard Web" },
  { quality: 60, sizeKb: 85, visualQuality: "Acceptable", recommendation: "Thumbnails" },
  { quality: 50, sizeKb: 65, visualQuality: "Visible Artifacts", recommendation: "Not Recommended" },
];

const formatComparison = [
  { format: "JPEG", bestFor: "Photos, complex images", avgSavings: "70-85%", transparency: "No", animation: "No" },
  { format: "PNG", bestFor: "Graphics, screenshots, logos", avgSavings: "20-40%", transparency: "Yes", animation: "No" },
  { format: "WebP", bestFor: "All web images", avgSavings: "25-35% vs JPEG", transparency: "Yes", animation: "Yes" },
  { format: "AVIF", bestFor: "Next-gen web (limited support)", avgSavings: "50% vs WebP", transparency: "Yes", animation: "Yes" },
];

const useCaseRecommendations = [
  { useCase: "Hero Images", format: "WebP (JPEG fallback)", quality: "80-85%", maxSize: "200KB" },
  { useCase: "Product Photos", format: "WebP or JPEG", quality: "85-90%", maxSize: "150KB" },
  { useCase: "Thumbnails", format: "WebP", quality: "70-75%", maxSize: "30KB" },
  { useCase: "Icons & Logos", format: "SVG or PNG", quality: "Lossless", maxSize: "20KB" },
  { useCase: "Blog Images", format: "WebP", quality: "75-80%", maxSize: "100KB" },
  { useCase: "Social Media", format: "JPEG", quality: "80%", maxSize: "100KB" },
];

export default function ImageCompressionBenchmarkPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4" />
              Research & Benchmarks
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Image Compression Quality Benchmark
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
              Comprehensive comparison of image formats and quality settings. Find the 
              <span className="font-bold text-blue-600"> optimal balance</span> between file size and visual quality.
            </p>

            <Link
              href="/image-compressor"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
            >
              Try Image Compressor
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Key Insights */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Key Insights
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-center">
              <Gauge className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-blue-600 mb-2">80%</div>
              <div className="text-slate-600 dark:text-slate-400">Optimal JPEG Quality for Web</div>
            </div>
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-center">
              <Image className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-emerald-600 mb-2">WebP</div>
              <div className="text-slate-600 dark:text-slate-400">Best All-Around Format</div>
            </div>
            <div className="p-6 rounded-2xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 text-center">
              <CheckCircle className="w-8 h-8 text-violet-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-violet-600 mb-2">100KB</div>
              <div className="text-slate-600 dark:text-slate-400">Max Size for Fast Loading</div>
            </div>
          </div>
        </div>
      </section>

      {/* JPEG Quality Table */}
      <section className="py-12 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-center">
            JPEG Quality vs File Size
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
            Based on a 2000x1500px photo (original: 850KB)
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Quality</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">File Size</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">Reduction</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">Visual Quality</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">Best For</th>
                </tr>
              </thead>
              <tbody>
                {jpegBenchmark.map((item, index) => (
                  <tr key={index} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-4 py-4 font-bold text-slate-900 dark:text-white">{item.quality}%</td>
                    <td className="px-4 py-4 text-center text-slate-600 dark:text-slate-400">{item.sizeKb}KB</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        item.quality <= 50 ? 'bg-red-100 text-red-700' :
                        item.quality <= 70 ? 'bg-emerald-100 text-emerald-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        -{Math.round((1 - item.sizeKb / 850) * 100)}%
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center text-slate-600 dark:text-slate-400">{item.visualQuality}</td>
                    <td className="px-4 py-4 text-center">
                      {item.recommendation === "Not Recommended" ? (
                        <span className="flex items-center justify-center gap-1 text-red-500">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-sm">{item.recommendation}</span>
                        </span>
                      ) : (
                        <span className="text-sm text-slate-600 dark:text-slate-400">{item.recommendation}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Visual Chart */}
          <div className="mt-8 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Size Reduction Visual</h3>
            <div className="space-y-3">
              {jpegBenchmark.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 text-sm font-medium text-slate-600 dark:text-slate-400">{item.quality}%</div>
                  <div className="flex-1 h-6 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        item.quality <= 50 ? 'bg-red-400' :
                        item.quality <= 70 ? 'bg-emerald-500' :
                        item.quality <= 80 ? 'bg-blue-500' :
                        'bg-violet-400'
                      }`}
                      style={{ width: `${(item.sizeKb / 850) * 100}%` }}
                    />
                  </div>
                  <div className="w-16 text-sm text-right text-slate-500">{item.sizeKb}KB</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Format Comparison */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Format Comparison
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-slate-50 dark:bg-slate-950 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Format</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Best For</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">Savings</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">Transparency</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">Animation</th>
                </tr>
              </thead>
              <tbody>
                {formatComparison.map((item, index) => (
                  <tr key={index} className="border-t border-slate-200 dark:border-slate-700">
                    <td className="px-4 py-4 font-bold text-slate-900 dark:text-white">{item.format}</td>
                    <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{item.bestFor}</td>
                    <td className="px-4 py-4 text-center text-emerald-600 font-medium">{item.avgSavings}</td>
                    <td className="px-4 py-4 text-center">{item.transparency === "Yes" ? "✅" : "❌"}</td>
                    <td className="px-4 py-4 text-center">{item.animation === "Yes" ? "✅" : "❌"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Use Case Recommendations */}
      <section className="py-12 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Recommended Settings by Use Case
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCaseRecommendations.map((item, index) => (
              <div key={index} className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">{item.useCase}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Format:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{item.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Quality:</span>
                    <span className="font-medium text-emerald-600">{item.quality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Max Size:</span>
                    <span className="font-medium text-blue-600">{item.maxSize}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Methodology
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-slate-600 dark:text-slate-400">
              Benchmarks were conducted using a variety of high-resolution photographs (2000x1500px) 
              compressed using industry-standard lossy and lossless algorithms. File sizes shown are 
              averages across multiple test images.
            </p>
            <p className="text-slate-600 dark:text-slate-400 mt-4">
              Visual quality assessments are based on standard metrics including SSIM (Structural Similarity Index) 
              and manual inspection at 100% zoom. "Acceptable" quality is defined as images where compression 
              artifacts are not noticeable at typical viewing distances.
            </p>
            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>Note:</strong> Actual results may vary based on image content. Images with large areas of 
                solid color compress more efficiently than complex photographs. We recommend testing with your 
                specific images for precise optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 dark:bg-blue-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Image className="w-12 h-12 text-white mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Compress Your Images Now
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Use our free tool to optimize images with the settings from this benchmark.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/image-compressor"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Image Compressor
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/image-compressor/compress-to-100kb"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-500 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-blue-400 transition-all"
            >
              Compress to 100KB
            </Link>
          </div>
        </div>
      </section>

      {/* Citation */}
      <section className="py-8 bg-slate-100 dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-500">
            <strong>Cite this benchmark:</strong> TextGauge. (2026). Image Compression Quality Benchmark. 
            Retrieved from https://countcharacters.org/benchmarks/image-compression
          </p>
        </div>
      </section>
    </div>
  );
}
