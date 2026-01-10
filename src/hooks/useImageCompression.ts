import { useState, useCallback } from "react";
import { 
  CompressionService, 
  CompressionSettings, 
  CompressionResult, 
  defaultSettings,
  ImageFormat 
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
  }, [globalSettings]);

  // Core processing function
  const processImage = async (id: string, file: File, settings: CompressionSettings) => {
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
  };

  // Re-compress a specific image or all images when settings change
  const updateSettings = useCallback(async (newSettings: Partial<CompressionSettings>) => {
    const updatedGlobal = { ...globalSettings, ...newSettings };
    setGlobalSettings(updatedGlobal);

    // Re-process all images with new settings
    // Note: In a real app, might want to debounce this or only do it on "Apply"
    setIsProcessing(true);
    
    // We need to use the functional update to get the latest 'images' state if we weren't depending on it,
    // but here we can just iterate. However, accessing state inside async loop needs care.
    // Simplest approach: Trigger re-process for all 'done' or 'error' images.
    
    setImages(currentImages => {
        // We can't run async effects inside setImages.
        // So we just return state (maybe mark as stale?) or loop outside.
        return currentImages;
    });

    // Actually trigger the Async work
    // We define a helper to read current state
    
    // Better strategy: Just iterate the IDs we know about from the previous render cycle, 
    // or pass the list explicitly. 
    // For simplicity, we will assume 'images' dependency is fine for this handler.
  }, [globalSettings]);
  
  // Real implementation of re-process triggers
  const recompressAll = async (settings: CompressionSettings, currentImages: CompressedImageObj[]) => {
      setIsProcessing(true);
      for (const img of currentImages) {
          await processImage(img.id, img.originalFile, settings);
      }
      setIsProcessing(false);
  };

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
    isProcessing,
  };
};
