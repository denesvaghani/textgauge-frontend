import imageCompression from "browser-image-compression";

export type ImageFormat = "image/jpeg" | "image/png" | "image/webp" | "image/avif";

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

// Utility to get all supported formats
export const SUPPORTED_FORMATS = {
  input: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif", "image/svg+xml"],
  output: ["image/jpeg", "image/png", "image/webp", "image/avif"] as ImageFormat[],
};

export const FORMAT_LABELS: Record<string, string> = {
  "image/jpeg": "JPG",
  "image/png": "PNG", 
  "image/webp": "WebP",
  "image/avif": "AVIF",
  "image/heic": "HEIC",
  "image/heif": "HEIF",
  "image/svg+xml": "SVG",
};

export const FORMAT_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

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

    // Intercept HEIC/HEIF files and convert them to JPG first
    let fileToProcess = file;
    const isHeic = file.name.toLowerCase().endsWith(".heic") || 
                   file.name.toLowerCase().endsWith(".heif") || 
                   file.type === "image/heic" || 
                   file.type === "image/heif";

    const isSVG = file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg");

    if (isHeic) {
      try {
        // Dynamic import heic2any only when needed (client-side) to fix SSR build errors

        const heic2any = (await import("heic2any")).default;

        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: finalSettings.initialQuality,
        });
        
        // heic2any can return an array of blobs if it's an animation, but we expect a single blob
        const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
        fileToProcess = new File([blob], file.name.replace(/\.(heic|heif)$/i, ".jpg"), {
          type: "image/jpeg",
          lastModified: file.lastModified,
        });
      } catch (error) {
        console.error("HEIC conversion failed:", error);
        throw new Error("Failed to convert HEIC image. Please try a different format.");
      }
    } else if (isSVG) {
      try {
        const blob = await this.convertSvgToBlob(file, finalSettings.fileType || "image/png");
        fileToProcess = new File([blob], file.name.replace(/\.svg$/i, finalSettings.fileType === "image/jpeg" ? ".jpg" : ".png"), {
          type: finalSettings.fileType || "image/png",
          lastModified: file.lastModified,
        });
      } catch (error) {
        console.error("SVG conversion failed:", error);
        throw new Error("Failed to convert SVG image.");
      }
    }

    const options = {
      maxSizeMB: finalSettings.maxSizeMB,
      maxWidthOrHeight: finalSettings.maxWidthOrHeight,
      useWebWorker: finalSettings.useWebWorker,
      initialQuality: finalSettings.initialQuality,
      fileType: finalSettings.fileType,
    };

    try {
      const compressedFile = await imageCompression(fileToProcess, options);
      
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
   * Helper to convert SVG to Blob using Canvas
   */
  private static convertSvgToBlob(file: File, type: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          // Scale up for better quality if it's a small SVG
          const scale = 2;
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject("Canvas context not available");
          
          if (type === "image/jpeg") {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject("SVG to Blob conversion failed");
          }, type, 1.0);
        };
        img.onerror = () => reject("Failed to load SVG into Image object");
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject("Failed to read SVG file");
      reader.readAsDataURL(file);
    });
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

  /**
   * Generate downloadable URL
   */
  static createDownloadLink(file: File) {
    return URL.createObjectURL(file);
  }
}
