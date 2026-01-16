"use client";

import { useState, useCallback } from "react";
import { TrustPanel } from "@/components/TrustPanel";
import { flowerThemes } from "@/config/flowerThemes";
import { FlowerBackground } from "@/components/FlowerBackground";
import { SmartHeroHeader } from "@/components/SmartHeroHeader";
import { DynamicAd } from "@/components/DynamicAd";
import { UploadZone } from "@/components/image-compressor/UploadZone";
import { 
  ArrowRight, 
  Download, 
  RefreshCw, 
  X, 
  Archive,
  FileImage,
  CheckCircle2
} from "lucide-react";
import JSZip from "jszip";
import { AnimatePresence, motion } from "framer-motion";
import { 
  ImageFormat, 
  SUPPORTED_FORMATS, 
  FORMAT_LABELS, 
  FORMAT_EXTENSIONS 
} from "@/lib/image-compressor/compressionService";

interface ConvertableImage {
  id: string;
  file: File;
  previewUrl: string;
  originalFormat: string;
  convertedBlob: Blob | null;
  convertedUrl: string | null;
  status: "idle" | "converting" | "done" | "error";
  error?: string;
}

export function ImageConverterClient() {
  const theme = flowerThemes.orchid;
  const [images, setImages] = useState<ConvertableImage[]>([]);
  const [targetFormat, setTargetFormat] = useState<ImageFormat>("image/webp");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  const addFiles = useCallback((files: File[]) => {
    const newImages: ConvertableImage[] = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      originalFormat: file.type || "unknown",
      convertedBlob: null,
      convertedUrl: null,
      status: "idle",
    }));
    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const convertImage = async (img: ConvertableImage): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas context not available"));
          return;
        }
        
        // Fill white background for formats that don't support transparency
        if (targetFormat === "image/jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        ctx.drawImage(image, 0, 0);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Conversion failed"));
            }
          },
          targetFormat,
          0.92
        );
      };
      image.onerror = () => reject(new Error("Failed to load image"));
      image.src = img.previewUrl;
    });
  };

  const handleConvertAll = async () => {
    setIsProcessing(true);
    
    for (const img of images) {
      if (img.status === "done") continue;
      
      setImages((prev) =>
        prev.map((i) => (i.id === img.id ? { ...i, status: "converting" } : i))
      );

      try {
        const blob = await convertImage(img);
        const url = URL.createObjectURL(blob);
        
        setImages((prev) =>
          prev.map((i) =>
            i.id === img.id
              ? { ...i, convertedBlob: blob, convertedUrl: url, status: "done" }
              : i
          )
        );
      } catch (error) {
        console.error(error);
        setImages((prev) =>
          prev.map((i) =>
            i.id === img.id ? { ...i, status: "error", error: "Conversion failed" } : i
          )
        );
      }
    }
    
    setIsProcessing(false);
  };

  const handleDownloadAll = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      let count = 0;

      images.forEach((img) => {
        if (img.status === "done" && img.convertedBlob) {
          const ext = FORMAT_EXTENSIONS[targetFormat] || "img";
          const baseName = img.file.name.replace(/\.[^/.]+$/, "");
          zip.file(`${baseName}.${ext}`, img.convertedBlob);
          count++;
        }
      });

      if (count === 0) return;

      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "converted_images.zip";
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("ZIP Generation failed", error);
    } finally {
      setIsZipping(false);
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
        if (target.convertedUrl) URL.revokeObjectURL(target.convertedUrl);
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <FlowerBackground theme={theme}>
      <div className="flex flex-col min-h-screen">
        <SmartHeroHeader
          title="Image Format Converter"
          theme={theme}
          description="Convert images between JPG, PNG, WebP, and AVIF formats instantly. Support for HEIC and SVG input. 100% private, browser-based processing."
        />

        <main className="flex-1 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Settings Panel */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                  Conversion Settings
                </h3>

                {/* Target Format */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Convert To
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SUPPORTED_FORMATS.output.map((format) => (
                      <button
                        key={format}
                        onClick={() => setTargetFormat(format)}
                        disabled={isProcessing}
                        className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                          targetFormat === format
                            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                            : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-purple-300"
                        }`}
                      >
                        {FORMAT_LABELS[format]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format Info */}
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                  <p><strong>WebP:</strong> Best for web, 25-35% smaller than JPG</p>
                  <p><strong>AVIF:</strong> Next-gen format, superior compression</p>
                  <p><strong>PNG:</strong> Lossless, supports transparency</p>
                  <p><strong>JPG:</strong> Universal compatibility</p>
                </div>

                {/* Convert Button */}
                <button
                  onClick={handleConvertAll}
                  disabled={images.length === 0 || isProcessing}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <RefreshCw className="animate-spin" size={18} />
                  ) : (
                    <ArrowRight size={18} />
                  )}
                  Convert {images.length > 0 ? `(${images.length})` : "All"}
                </button>
              </div>

              {/* Batch Actions */}
              {images.some((i) => i.status === "done") && (
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 dark:text-white">Batch Actions</h3>
                  <button
                    onClick={handleDownloadAll}
                    disabled={isZipping}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isZipping ? <RefreshCw className="animate-spin" size={18} /> : <Archive size={18} />}
                    Download All as ZIP
                  </button>
                  <button
                    onClick={() => setImages([])}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                  >
                    <X size={18} />
                    Clear All
                  </button>
                </div>
              )}
            </div>

            {/* Upload & Results */}
            <div className="lg:col-span-2 space-y-6">
              <UploadZone onFilesSelected={addFiles} isProcessing={isProcessing} />

              <AnimatePresence>
                {images.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    {images.map((img) => (
                      <motion.div
                        key={img.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
                      >
                        {/* Preview */}
                        <div className="relative aspect-video bg-slate-100 dark:bg-slate-800">
                          <img
                            src={img.previewUrl}
                            alt={img.file.name}
                            className="w-full h-full object-contain"
                          />
                          {img.status === "converting" && (
                            <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 flex items-center justify-center">
                              <RefreshCw className="animate-spin text-purple-500" size={32} />
                            </div>
                          )}
                          {img.status === "done" && (
                            <div className="absolute top-2 right-2 p-1.5 bg-green-500 rounded-full">
                              <CheckCircle2 className="text-white" size={16} />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="p-4 space-y-2">
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                            {img.file.name}
                          </p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              {FORMAT_LABELS[img.originalFormat] || "Unknown"}
                            </span>
                            <ArrowRight size={12} className="text-slate-400" />
                            <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                              {FORMAT_LABELS[targetFormat]}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs text-slate-500">
                            <span>Original: {formatFileSize(img.file.size)}</span>
                            {img.convertedBlob && (
                              <span className="text-green-600 dark:text-green-400">
                                New: {formatFileSize(img.convertedBlob.size)}
                              </span>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 pt-2">
                            {img.status === "done" && img.convertedUrl && (
                              <a
                                href={img.convertedUrl}
                                download={`${img.file.name.replace(/\.[^/.]+$/, "")}.${FORMAT_EXTENSIONS[targetFormat]}`}
                                className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-purple-600 text-white text-xs font-medium hover:bg-purple-700 transition-colors"
                              >
                                <Download size={14} />
                                Download
                              </a>
                            )}
                            <button
                              onClick={() => removeImage(img.id)}
                              className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {images.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  <FileImage size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Upload images to convert them to {FORMAT_LABELS[targetFormat]}</p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Ad */}
        {process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE && (
          <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex justify-center">
            <DynamicAd
              adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE}
              adFormat="fluid"
              layout="in-article"
            />
          </div>
        )}

        {/* SEO Educational Content */}
        <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Complete Guide to Image Format Conversion
            </h2>
            
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Converting images between formats is essential for optimizing web performance, ensuring compatibility, 
                and reducing file sizes. Our free online image converter supports all major formats including 
                <strong> JPG, PNG, WebP, and AVIF</strong>, plus special input support for <strong>HEIC</strong> (iPhone photos) 
                and <strong>SVG</strong> vector graphics.
              </p>

              <h3>When to Use Each Format</h3>
              
              <div className="grid md:grid-cols-2 gap-4 not-prose mt-4">
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <h4 className="font-bold text-blue-700 dark:text-blue-400">WebP — Best for Web</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                    25-35% smaller than JPEG at equivalent quality. Supports transparency. 
                    Ideal for websites, blogs, and web applications.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                  <h4 className="font-bold text-purple-700 dark:text-purple-400">AVIF — Next-Gen Compression</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                    50% smaller than JPEG with excellent quality. Growing browser support. 
                    Perfect for performance-critical applications.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <h4 className="font-bold text-green-700 dark:text-green-400">PNG — Lossless Quality</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                    No quality loss during compression. Full transparency support. 
                    Best for logos, icons, screenshots, and graphics with text.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                  <h4 className="font-bold text-orange-700 dark:text-orange-400">JPG — Universal Compatibility</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                    Supported everywhere. Excellent for photographs. 
                    Use when maximum compatibility is required across all platforms.
                  </p>
                </div>
              </div>

              <h3 className="mt-8">Convert HEIC to JPG or PNG</h3>
              <p>
                HEIC (High Efficiency Image Container) is Apple&apos;s default photo format on iPhones and iPads. 
                While it offers excellent compression, many websites and applications don&apos;t support it. 
                Use our converter to instantly convert HEIC photos to universally compatible JPG or PNG format.
              </p>

              <h3>Why Convert Images Online?</h3>
              <ul>
                <li><strong>Privacy First:</strong> All conversion happens in your browser — no uploads to servers</li>
                <li><strong>Batch Processing:</strong> Convert multiple images at once with ZIP download</li>
                <li><strong>No Installation:</strong> Works on any device with a modern browser</li>
                <li><strong>Free & Unlimited:</strong> No file size limits, no watermarks, no sign-up required</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <TrustPanel />
        </section>
      </div>
    </FlowerBackground>
  );
}
