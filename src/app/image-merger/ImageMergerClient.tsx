"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { TrustPanel } from "@/components/TrustPanel";
import { animalThemes } from "@/config/animalThemes";
import { FlowerBackground } from "@/components/FlowerBackground";
import { SmartHeroHeader } from "@/components/SmartHeroHeader";
import { UploadZone } from "@/components/image-compressor/UploadZone";
import { Layout, ArrowDown, ArrowRight, X, GripVertical, Download, RefreshCw } from "lucide-react";
import { motion, Reorder, AnimatePresence } from "framer-motion";

interface MergeableImage {
    id: string;
    file: File;
    previewUrl: string;
    width: number;
    height: number;
}

export function ImageMergerClient() {
    const theme = animalThemes.wolf;
    const [images, setImages] = useState<MergeableImage[]>([]);
    const [direction, setDirection] = useState<"vertical" | "horizontal">("vertical");
    const [gap, setGap] = useState(0);
    const [padding, setPadding] = useState(0);
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [isGenerating, setIsGenerating] = useState(false);
    
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const onFilesSelected = useCallback((files: File[]) => {
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    setImages(prev => [...prev, {
                        id: crypto.randomUUID(),
                        file,
                        previewUrl: e.target?.result as string,
                        width: img.width,
                        height: img.height
                    }]);
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        });
    }, []);

    const removeImage = (id: string) => {
        setImages(prev => prev.filter(img => img.id !== id));
    };

    const handleMerge = async () => {
        if (images.length === 0) return;
        setIsGenerating(true);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Calculate total dimensions
        const totalWidth = direction === "horizontal" 
            ? images.reduce((sum, img) => sum + img.width, 0) + (images.length - 1) * gap + padding * 2
            : Math.max(...images.map(img => img.width)) + padding * 2;
            
        const totalHeight = direction === "vertical"
            ? images.reduce((sum, img) => sum + img.height, 0) + (images.length - 1) * gap + padding * 2
            : Math.max(...images.map(img => img.height)) + padding * 2;

        canvas.width = totalWidth;
        canvas.height = totalHeight;

        // Fill background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw images
        let offset = padding;
        const loadAndDraw = async (imgObj: MergeableImage) => {
            return new Promise<void>((resolve) => {
                const img = new Image();
                img.onload = () => {
                    if (direction === "vertical") {
                        // Center horizontally if widths differ
                        const x = (totalWidth - img.width) / 2;
                        ctx.drawImage(img, x, offset);
                        offset += img.height + gap;
                    } else {
                        // Center vertically if heights differ
                        const y = (totalHeight - img.height) / 2;
                        ctx.drawImage(img, offset, y);
                        offset += img.width + gap;
                    }
                    resolve();
                };
                img.src = imgObj.previewUrl;
            });
        };

        for (const img of images) {
            await loadAndDraw(img);
        }

        // Export
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `merged_image_${Date.now()}.png`;
        link.click();
        
        setIsGenerating(false);
    };

    return (
        <FlowerBackground theme={theme}>
            <div className="flex flex-col min-h-screen">
                <SmartHeroHeader
                    title="Image Merger"
                    theme={theme}
                    description="Combine multiple images into a single professional shot. Perfectly stitch scrolling screenshots or create horizontal comparisons in seconds."
                />

                <main className="flex-1 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Settings Panel */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                    <Layout size={20} className="text-blue-500" />
                                    Merger Settings
                                </h2>

                                <div className="space-y-6">
                                {/* Direction */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Stitch Direction</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button 
                                                onClick={() => setDirection("vertical")}
                                                className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${
                                                    direction === "vertical" 
                                                    ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 text-blue-600" 
                                                    : "border-slate-100 dark:border-slate-800 text-slate-500"
                                                }`}
                                            >
                                                <ArrowDown size={18} /> Vertical
                                            </button>
                                            <button 
                                                onClick={() => setDirection("horizontal")}
                                                className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${
                                                    direction === "horizontal" 
                                                    ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 text-blue-600" 
                                                    : "border-slate-100 dark:border-slate-800 text-slate-500"
                                                }`}
                                            >
                                                <ArrowRight size={18} /> Horizontal
                                            </button>
                                        </div>
                                    </div>

                                    {/* Background Color */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Background Color</label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <input
                                                    type="color"
                                                    value={backgroundColor}
                                                    onChange={(e) => setBackgroundColor(e.target.value)}
                                                    className="w-full h-10 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-700"
                                                />
                                            </div>
                                            <div className="flex gap-1">
                                                {["#ffffff", "#000000", "#f3f4f6", "transparent"].map((color) => (
                                                    <button
                                                        key={color}
                                                        onClick={() => setBackgroundColor(color)}
                                                        className={`w-10 h-10 rounded-lg border-2 transition-all ${
                                                            backgroundColor === color ? "border-blue-500 scale-105" : "border-slate-200 dark:border-slate-700"
                                                        } ${color === "transparent" ? "bg-[url('/images/transparent-bg.png')] bg-repeat" : ""}`}
                                                        style={{ backgroundColor: color === "transparent" ? undefined : color }}
                                                        title={color === "transparent" ? "Transparent" : color}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Spacing & Padding */}
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Spacing (Gap)</label>
                                                <span className="text-xs font-mono text-blue-500">{gap}px</span>
                                            </div>
                                            <input 
                                                type="range" min="0" max="100" value={gap} 
                                                onChange={(e) => setGap(parseInt(e.target.value))}
                                                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Canvas Padding</label>
                                                <span className="text-xs font-mono text-blue-500">{padding}px</span>
                                            </div>
                                            <input 
                                                type="range" min="0" max="100" value={padding} 
                                                onChange={(e) => setPadding(parseInt(e.target.value))}
                                                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-4 space-y-3">
                                        <button
                                            onClick={handleMerge}
                                            disabled={images.length < 2 || isGenerating}
                                            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:grayscale shadow-lg shadow-blue-500/20"
                                        >
                                            {isGenerating ? <RefreshCw className="animate-spin" size={20} /> : <Download size={20} />}
                                            Merge & Download
                                        </button>
                                        <button
                                            onClick={() => setImages([])}
                                            disabled={images.length === 0}
                                            className="w-full py-3 rounded-xl text-red-500 font-medium hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors disabled:opacity-30"
                                        >
                                            Clear All
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Upload & Reorder Panel */}
                        <div className="lg:col-span-2 space-y-6">
                            <UploadZone onFilesSelected={onFilesSelected} isProcessing={false} />

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-slate-800 dark:text-slate-200 uppercase text-xs tracking-widest">
                                        Image Sequence ({images.length})
                                    </h3>
                                    {images.length > 1 && (
                                        <span className="text-[10px] text-slate-400">Drag to reorder</span>
                                    )}
                                </div>

                                <Reorder.Group axis="y" values={images} onReorder={setImages} className="space-y-3">
                                    <AnimatePresence>
                                        {images.map((img) => (
                                            <Reorder.Item
                                                key={img.id}
                                                value={img}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 flex items-center gap-4 shadow-sm cursor-grab active:cursor-grabbing hover:border-blue-200 dark:hover:border-blue-900/50 transition-colors"
                                            >
                                                <GripVertical className="text-slate-300" size={20} />
                                                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800 shrink-0">
                                                    <img src={img.previewUrl} className="w-full h-full object-cover" alt="Preview" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">
                                                        {img.file.name}
                                                    </p>
                                                    <p className="text-[10px] text-slate-400 font-mono">
                                                        {img.width}x{img.height}px
                                                    </p>
                                                </div>
                                                <button 
                                                    onClick={() => removeImage(img.id)}
                                                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </Reorder.Item>
                                        ))}
                                    </AnimatePresence>
                                </Reorder.Group>

                                {images.length === 0 && (
                                    <div className="py-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400">
                                        <p>No images added yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <TrustPanel />
                </section>

                <canvas ref={canvasRef} className="hidden" />
            </div>
        </FlowerBackground>
    );
}
