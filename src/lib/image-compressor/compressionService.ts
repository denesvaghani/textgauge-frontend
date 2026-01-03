import imageCompression from "browser-image-compression";

export type ImageFormat = "image/jpeg" | "image/png" | "image/webp";

export interface CompressionSettings {
  maxSizeMB: number;
  maxWidthOrHeight?: number;
  useWebWorker: boolean;
  initialQuality: number; // 0 to 1
  fileType?: ImageFormat;
}

export interface CompressionResult {
  compressedFile: File;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  dimensions: { width: number; height: number };
}

export const defaultSettings: CompressionSettings = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  initialQuality: 0.8,
};

export class CompressionService {
  /**
   * Compress an image file using browser-image-compression
   */
  static async compress(
    file: File,
    settings: Partial<CompressionSettings> = {}
  ): Promise<CompressionResult> {
    const finalSettings = { ...defaultSettings, ...settings };

    // Convert setting 1-100 to 0-1 if necessary, though lib usually takes 0-1
    // We assume settings.initialQuality is 0-1 from the hook
    
    // Explicitly set fileType if requesting conversion (e.g. PNG -> WebP)
    // Note: browser-image-compression handles type conversion via 'fileType' option
    const options = {
      maxSizeMB: finalSettings.maxSizeMB,
      maxWidthOrHeight: finalSettings.maxWidthOrHeight,
      useWebWorker: finalSettings.useWebWorker,
      initialQuality: finalSettings.initialQuality,
      fileType: finalSettings.fileType,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      
      // Get dimensions for the stats
      const dimensions = await this.getImageDimensions(compressedFile);

      const originalSize = file.size;
      const compressedSize = compressedFile.size;
      const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;

      return {
        compressedFile,
        originalSize,
        compressedSize,
        compressionRatio,
        dimensions,
      };
    } catch (error) {
      console.error("Compression failed:", error);
      throw error;
    }
  }

  /**
   * Helper to get image dimensions
   */
  private static getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
        URL.revokeObjectURL(img.src);
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }

  /* 
   * Generate downloadable URL
   */
  static createDownloadLink(file: File) {
    return URL.createObjectURL(file);
  }
}
