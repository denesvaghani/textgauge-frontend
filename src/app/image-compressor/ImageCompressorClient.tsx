"use client";


import { TrustPanel } from "@/components/TrustPanel";
import { flowerThemes } from "@/config/flowerThemes";
import { FlowerBackground } from "@/components/FlowerBackground";
import { SmartHeroHeader } from "@/components/SmartHeroHeader";
import { DynamicAd } from "@/components/DynamicAd";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { useImageCompression } from "@/hooks/useImageCompression";
import { UploadZone } from "@/components/image-compressor/UploadZone";
import { CompressionControls } from "@/components/image-compressor/CompressionControls";
import { ImageCard } from "@/components/image-compressor/ImageCard";
import { FAQSection, FAQStructuredData } from "@/components/image-compressor/FAQSection";
import { SEOContentSection } from "@/components/image-compressor/SEOContentSection";
import { Archive, RefreshCw, X } from "lucide-react";
import JSZip from "jszip";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function ImageCompressorClient() {
  const theme = flowerThemes.hydrangea;
  const { 
    images, 
    addFiles, 
    removeImage, 
    globalSettings, 
    setGlobalSettings,
    recompressAll,
    isProcessing 
  } = useImageCompression();

  const [isZipping, setIsZipping] = useState(false);

  // Handle re-compression when settings change
  const handleSettingsChange = (newSettings: Partial<typeof globalSettings>) => {
    const updated = { ...globalSettings, ...newSettings };
    setGlobalSettings(updated);
    
    if (images.length > 0) {
        recompressAll(updated, images);
    }
  };

  // Batch Download Logic
  const handleDownloadAll = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      let count = 0;

      images.forEach((img) => {
        if (img.status === "done" && img.compressedResult) {
           const format = globalSettings.fileType || img.originalFile.type;
           let ext = img.originalFile.name.split('.').pop();
           if (format === 'image/webp') ext = 'webp';
           if (format === 'image/jpeg') ext = 'jpg';
           if (format === 'image/png') ext = 'png';
           
           const fileName = `compressed_${img.originalFile.name.replace(/\.[^/.]+$/, "")}.${ext}`;
           zip.file(fileName, img.compressedResult.compressedFile);
           count++;
        }
      });

      if (count === 0) return;

      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "compressed_images.zip";
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("ZIP Generation failed", error);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <FlowerBackground theme={theme}>
      <FAQStructuredData />
      <div className="flex flex-col min-h-screen">
        <SmartHeroHeader
            title="Image Compressor"
            theme={theme}
        />
        
        <main className="flex-1 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
           
           {/* Top Area: Controls + Upload */}
           <div className="grid lg:grid-cols-3 gap-8 items-start">
               
               {/* Left Column: Settings */}
               <div className="lg:col-span-1 space-y-6">
                   <CompressionControls 
                       settings={globalSettings} 
                       onSettingsChange={handleSettingsChange}
                       disabled={isProcessing}
                   />
                   
                   {/* Batch Actions */}
                   {images.length > 0 && (
                       <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                           <h3 className="font-bold text-slate-900 dark:text-white">Batch Actions</h3>
                           <button
                             onClick={handleDownloadAll}
                             disabled={isZipping || isProcessing || !images.some(i => i.status === 'done')}
                             className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                           >
                              {isZipping ? <RefreshCw className="animate-spin" size={18} /> : <Archive size={18} />}
                              Download All as ZIP
                           </button>
                           
                           <button
                             onClick={() => {
                                 images.forEach(img => removeImage(img.id));
                             }}
                             className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                           >
                              <X size={18} />
                              Clear All
                           </button>
                       </div>
                   )}
               </div>

               {/* Right Column: Upload & list */}
               <div className="lg:col-span-2 space-y-6">
                    <UploadZone onFilesSelected={addFiles} isProcessing={isProcessing} />
                    
                    <AnimatePresence>
                        {images.length > 0 && (
                             <motion.div 
                               initial={{ opacity: 0 }} 
                               animate={{ opacity: 1 }}
                               className="grid grid-cols-1 gap-6"
                             >
                                 {images.map((img) => (
                                     <motion.div 
                                        key={img.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                     >
                                         <ImageCard image={img} onRemove={removeImage} />
                                     </motion.div>
                                 ))}
                             </motion.div>
                        )}
                    </AnimatePresence>

                    {images.length === 0 && (
                        <div className="text-center py-12 text-slate-400">
                            <p>No images uploaded yet.</p>
                        </div>
                    )}
               </div>
           </div>
        </main>

        {/* Ad: In-Article 1 */}
        {process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE && (
            <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex justify-center">
                 <DynamicAd
                    adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE}
                    adFormat="fluid"
                    layout="in-article"
                 />
            </div>
        )}

        {/* SEO Content */}
        <SEOContentSection />

        {/* Ad: In-Article 2 */}
        {process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE && (
            <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex justify-center">
                 <DynamicAd
                    adSlot={process.env.NEXT_PUBLIC_AD_SLOT_IN_ARTICLE}
                    adFormat="fluid"
                    layout="in-article"
                 />
            </div>
        )}
        
        {/* Trust Panel (Item 6) */}
        <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <TrustPanel />
        </section>

        {/* FAQ */}
        <FAQSection />

        {/* Ad: Multiplex (Related Content) */}
            {process.env.NEXT_PUBLIC_AD_SLOT_MULTIPLEX && (
            <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                 <DynamicAd
                    adSlot={process.env.NEXT_PUBLIC_AD_SLOT_MULTIPLEX}
                    adFormat="autorelaxed"
                 />
            </section>
        )}
      </div>
    </FlowerBackground>
  );
}

