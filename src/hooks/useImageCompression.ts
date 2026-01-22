import { useState, useCallback } from "react";
import { 
  CompressionService, 
  CompressionSettings, 
  CompressionResult, 
  defaultSettings
} from "@/lib/image-compressor/compressionService";

export interface CompressedImageObj {
  id: string; // unique ID
  originalFile: File;
  compressedResult: CompressionResult | null;
  status: "idle" | "compressing" | "done" | "error";
  error?: string;
  previewUrl: string; // for before state
  compressedUrl: string | null; // for after state
}

export const useImageCompression = () => {
  const [images, setImages] = useState<CompressedImageObj[]>([]);
  const [globalSettings, setGlobalSettings] = useState<CompressionSettings>(defaultSettings);
  const [isProcessing, setIsProcessing] = useState(false);

  // Core processing function
  const processImage = useCallback(async (id: string, file: File, settings: CompressionSettings) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, status: "compressing" } : img))
    );

    try {
      const result = await CompressionService.compress(file, settings);
      const compressedUrl = CompressionService.createDownloadLink(result.compressedFile);

      setImages((prev) =>
        prev.map((img) =>
          img.id === id
            ? {
                ...img,
                compressedResult: result,
                compressedUrl,
                status: "done",
              }
            : img
        )
      );
    } catch (error) {
       console.error(error);
      setImages((prev) =>
        prev.map((img) =>
          img.id === id ? { ...img, status: "error", error: "Compression failed" } : img
        )
      );
    }
  }, []);

  // Add files to the list and start initial compression
  const addFiles = useCallback(async (newFiles: File[]) => {
    setIsProcessing(true);
    
    const newImageObjs: CompressedImageObj[] = newFiles.map((file) => ({
      id: crypto.randomUUID(),
      originalFile: file,
      compressedResult: null,
      status: "idle",
      previewUrl: URL.createObjectURL(file),
      compressedUrl: null,
    }));

    setImages((prev) => [...prev, ...newImageObjs]);

    // Process each new file with current global settings
    for (const imgObj of newImageObjs) {
      await processImage(imgObj.id, imgObj.originalFile, globalSettings);
    }

    setIsProcessing(false);
  }, [globalSettings, processImage]);

  // Re-compress a specific image or all images when settings change
  const updateSettings = useCallback(async (newSettings: Partial<CompressionSettings>) => {
    const updatedGlobal = { ...globalSettings, ...newSettings };
    setGlobalSettings(updatedGlobal);
    // Note: This function doesn't automatically trigger recompression in this implementation
    // You must call recompressAll manually or we can add logic here if needed.
  }, [globalSettings]);
  
  // Real implementation of re-process triggers
  const recompressAll = useCallback(async (settings: CompressionSettings, currentImages: CompressedImageObj[]) => {
      setIsProcessing(true);
      for (const img of currentImages) {
          await processImage(img.id, img.originalFile, settings);
      }
      setIsProcessing(false);
  }, [processImage]);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
        const target = prev.find(i => i.id === id);
        if (target) {
            URL.revokeObjectURL(target.previewUrl);
            if (target.compressedUrl) URL.revokeObjectURL(target.compressedUrl);
        }
        return prev.filter((img) => img.id !== id);
    });
  }, []);

  return {
    images,
    addFiles,
    removeImage,
    globalSettings,
    setGlobalSettings, // Calling this won't trigger re-compression automatically in this simple hook version
    recompressAll, // Manual trigger
    updateSettings,
    isProcessing,
  };
};
