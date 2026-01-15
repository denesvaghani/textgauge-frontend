import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, Image as ImageIcon } from "lucide-react";

interface UploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  isProcessing: boolean;
}

export function UploadZone({ onFilesSelected, isProcessing }: UploadZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFilesSelected(acceptedFiles);
      }
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/heic": [".heic"],
      "image/heif": [".heif"],
      "image/svg+xml": [".svg"],
    },
    disabled: isProcessing,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative w-full border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 cursor-pointer overflow-hidden ${
        isDragActive
          ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 scale-[1.01]"
          : "border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"
      }`}
    >
      <input {...getInputProps()} />
      
      <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
        <div className={`p-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-2 transition-transform duration-300 ${isDragActive ? 'scale-110' : ''}`}>
          {isDragActive ? <UploadCloud size={40} /> : <ImageIcon size={40} />}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
            {isDragActive ? "Drop images here" : "Drag & Drop images here"}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            or click to browse from your computer. Supports HEIC, JPG, PNG, WebP, and SVG.
          </p>
        </div>

        <div className="pt-2">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
            Client-side only • No server upload
          </span>
        </div>
      </div>
    </div>
  );
}
