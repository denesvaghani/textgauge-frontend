"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { TrustPanel } from "@/components/TrustPanel";
import { flowerThemes } from "@/config/flowerThemes";
import { FlowerBackground } from "@/components/FlowerBackground";
import { SmartHeroHeader } from "@/components/SmartHeroHeader";
import { DynamicAd } from "@/components/DynamicAd";
import { UploadZone } from "@/components/image-compressor/UploadZone";
import { 
  Download, 
  RefreshCw, 
  X, 
  Lock,
  Unlock,
  Maximize2,
  Archive,
  Image as ImageIcon
} from "lucide-react";
import JSZip from "jszip";
import { AnimatePresence, motion } from "framer-motion";

// Social media presets
const SOCIAL_PRESETS = [
  { name: "Instagram Post", width: 1080, height: 1080 },
  { name: "Instagram Story", width: 1080, height: 1920 },
  { name: "Twitter Post", width: 1200, height: 675 },
  { name: "LinkedIn Post", width: 1200, height: 627 },
  { name: "Facebook Post", width: 1200, height: 630 },
  { name: "YouTube Thumbnail", width: 1280, height: 720 },
  { name: "HD (1920x1080)", width: 1920, height: 1080 },
  { name: "4K (3840x2160)", width: 3840, height: 2160 },
];

interface ResizableImage {
  id: string;
  file: File;
  previewUrl: string;
  originalWidth: number;
  originalHeight: number;
  resizedBlob: Blob | null;
  resizedUrl: string | null;
  status: "idle" | "resizing" | "done" | "error";
}

export function ImageResizerClient() {
  const theme = flowerThemes.dahlia;
  const [images, setImages] = useState<ResizableImage[]>([]);
  const [targetWidth, setTargetWidth] = useState<number>(800);
  const [targetHeight, setTargetHeight] = useState<number>(600);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [resizeMode, setResizeMode] = useState<"exact" | "percentage" | "fit">("exact");
  const [percentage, setPercentage] = useState(50);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  
  const aspectRatioRef = useRef<number>(targetWidth / targetHeight);

  const addFiles = useCallback((files: File[]) => {
    files.forEach((file) => {
      const img = new Image();
      img.onload = () => {
        setImages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            file,
            previewUrl: URL.createObjectURL(file),
            originalWidth: img.width,
            originalHeight: img.height,
            resizedBlob: null,
            resizedUrl: null,
            status: "idle",
          },
        ]);
        // Set initial dimensions from first image
        if (images.length === 0) {
          setTargetWidth(img.width);
          setTargetHeight(img.height);
          aspectRatioRef.current = img.width / img.height;
        }
      };
      img.src = URL.createObjectURL(file);
    });
  }, [images.length]);

  const handleWidthChange = (value: number) => {
    setTargetWidth(value);
    if (lockAspectRatio) {
      setTargetHeight(Math.round(value / aspectRatioRef.current));
    }
  };

  const handleHeightChange = (value: number) => {
    setTargetHeight(value);
    if (lockAspectRatio) {
      setTargetWidth(Math.round(value * aspectRatioRef.current));
    }
  };

  const applyPreset = (preset: typeof SOCIAL_PRESETS[0]) => {
    setTargetWidth(preset.width);
    setTargetHeight(preset.height);
    aspectRatioRef.current = preset.width / preset.height;
    setResizeMode("exact");
  };

  const resizeImage = async (img: ResizableImage): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        let newWidth: number;
        let newHeight: number;

        switch (resizeMode) {
          case "percentage":
            newWidth = Math.round(img.originalWidth * (percentage / 100));
            newHeight = Math.round(img.originalHeight * (percentage / 100));
            break;
          case "fit":
            // Fit within bounds while maintaining aspect ratio
            const ratio = Math.min(targetWidth / img.originalWidth, targetHeight / img.originalHeight);
            newWidth = Math.round(img.originalWidth * ratio);
            newHeight = Math.round(img.originalHeight * ratio);
            break;
          default: // exact
            newWidth = targetWidth;
            newHeight = lockAspectRatio 
              ? Math.round(targetWidth / (img.originalWidth / img.originalHeight))
              : targetHeight;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas context not available"));
          return;
        }

        // Use high-quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(image, 0, 0, newWidth, newHeight);

        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Resize failed"));
          },
          "image/png",
          1.0
        );
      };
      image.onerror = () => reject(new Error("Failed to load image"));
      image.src = img.previewUrl;
    });
  };

  const handleResizeAll = async () => {
    setIsProcessing(true);

    for (const img of images) {
      setImages((prev) =>
        prev.map((i) => (i.id === img.id ? { ...i, status: "resizing" } : i))
      );

      try {
        const blob = await resizeImage(img);
        const url = URL.createObjectURL(blob);

        setImages((prev) =>
          prev.map((i) =>
            i.id === img.id
              ? { ...i, resizedBlob: blob, resizedUrl: url, status: "done" }
              : i
          )
        );
      } catch (error) {
        console.error(error);
        setImages((prev) =>
          prev.map((i) =>
            i.id === img.id ? { ...i, status: "error" } : i
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
      images.forEach((img) => {
        if (img.status === "done" && img.resizedBlob) {
          const baseName = img.file.name.replace(/\.[^/.]+$/, "");
          zip.file(`${baseName}_resized.png`, img.resizedBlob);
        }
      });

      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "resized_images.zip";
      link.click();
      URL.revokeObjectURL(link.href);
    } finally {
      setIsZipping(false);
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
        if (target.resizedUrl) URL.revokeObjectURL(target.resizedUrl);
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  return (
    <FlowerBackground theme={theme}>
      <div className="flex flex-col min-h-screen">
        <SmartHeroHeader
          title="Image Resizer"
          theme={theme}
          description="Resize images to exact dimensions, percentage, or fit within bounds. Perfect for social media, web assets, and print. 100% private, browser-based."
        />

        <main className="flex-1 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Settings Panel */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-1 h-6 bg-pink-500 rounded-full"></span>
                  Resize Settings
                </h3>

                {/* Resize Mode */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Resize Mode
                  </label>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    {[
                      { id: "exact", label: "Exact" },
                      { id: "percentage", label: "%" },
                      { id: "fit", label: "Fit" },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setResizeMode(mode.id as typeof resizeMode)}
                        className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${
                          resizeMode === mode.id
                            ? "bg-white dark:bg-slate-700 text-pink-600 dark:text-pink-400 shadow-sm"
                            : "text-slate-500"
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {resizeMode === "percentage" ? (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Scale
                      </label>
                      <span className="text-sm font-bold text-pink-600">{percentage}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      value={percentage}
                      onChange={(e) => setPercentage(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg accent-pink-500"
                    />
                  </div>
                ) : (
                  <>
                    {/* Dimensions */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Width (px)</label>
                        <input
                          type="number"
                          value={targetWidth}
                          onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Height (px)</label>
                        <input
                          type="number"
                          value={targetHeight}
                          onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                          disabled={lockAspectRatio && resizeMode === "exact"}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm disabled:opacity-50"
                        />
                      </div>
                    </div>

                    {/* Lock Aspect Ratio */}
                    {resizeMode === "exact" && (
                      <button
                        onClick={() => setLockAspectRatio(!lockAspectRatio)}
                        className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg border transition-all ${
                          lockAspectRatio
                            ? "border-pink-300 bg-pink-50 dark:bg-pink-900/20 text-pink-600"
                            : "border-slate-200 dark:border-slate-700 text-slate-500"
                        }`}
                      >
                        {lockAspectRatio ? <Lock size={16} /> : <Unlock size={16} />}
                        <span className="text-sm font-medium">
                          {lockAspectRatio ? "Aspect Ratio Locked" : "Aspect Ratio Unlocked"}
                        </span>
                      </button>
                    )}
                  </>
                )}

                {/* Social Presets */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Quick Presets
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {SOCIAL_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => applyPreset(preset)}
                        className="p-2 text-left rounded-lg border border-slate-200 dark:border-slate-700 hover:border-pink-300 dark:hover:border-pink-700 transition-colors"
                      >
                        <p className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">{preset.name}</p>
                        <p className="text-[10px] text-slate-400">{preset.width}×{preset.height}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Resize Button */}
                <button
                  onClick={handleResizeAll}
                  disabled={images.length === 0 || isProcessing}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-pink-600 text-white font-bold hover:bg-pink-700 transition-colors disabled:opacity-50"
                >
                  {isProcessing ? <RefreshCw className="animate-spin" size={18} /> : <Maximize2 size={18} />}
                  Resize {images.length > 0 ? `(${images.length})` : "All"}
                </button>
              </div>

              {/* Batch Actions */}
              {images.some((i) => i.status === "done") && (
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <button
                    onClick={handleDownloadAll}
                    disabled={isZipping}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium"
                  >
                    {isZipping ? <RefreshCw className="animate-spin" size={18} /> : <Archive size={18} />}
                    Download All as ZIP
                  </button>
                  <button
                    onClick={() => setImages([])}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
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
                        <div className="relative aspect-video bg-slate-100 dark:bg-slate-800">
                          <img
                            src={img.resizedUrl || img.previewUrl}
                            alt={img.file.name}
                            className="w-full h-full object-contain"
                          />
                          {img.status === "resizing" && (
                            <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 flex items-center justify-center">
                              <RefreshCw className="animate-spin text-pink-500" size={32} />
                            </div>
                          )}
                        </div>

                        <div className="p-4 space-y-2">
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                            {img.file.name}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span>{img.originalWidth}×{img.originalHeight}</span>
                            {img.status === "done" && (
                              <>
                                <span>→</span>
                                <span className="text-pink-600 font-medium">
                                  {resizeMode === "percentage"
                                    ? `${Math.round(img.originalWidth * percentage / 100)}×${Math.round(img.originalHeight * percentage / 100)}`
                                    : `${targetWidth}×${targetHeight}`}
                                </span>
                              </>
                            )}
                          </div>

                          <div className="flex gap-2 pt-2">
                            {img.status === "done" && img.resizedUrl && (
                              <a
                                href={img.resizedUrl}
                                download={`${img.file.name.replace(/\.[^/.]+$/, "")}_resized.png`}
                                className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-pink-600 text-white text-xs font-medium hover:bg-pink-700 transition-colors"
                              >
                                <Download size={14} />
                                Download
                              </a>
                            )}
                            <button
                              onClick={() => removeImage(img.id)}
                              className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
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
                  <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Upload images to resize them</p>
                </div>
              )}
            </div>
          </div>
        </main>

        {process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE && (
          <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex justify-center">
            <DynamicAd
              adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE}
              adFormat="fluid"
              layout="in-article"
            />
          </div>
        )}

        <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <TrustPanel />
        </section>
      </div>
    </FlowerBackground>
  );
}
