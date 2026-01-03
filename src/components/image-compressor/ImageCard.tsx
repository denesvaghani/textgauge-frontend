import { CompressedImageObj } from "@/hooks/useImageCompression";
import { Download, Trash2, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { PreviewComparison } from "./PreviewComparison";

function formatSize(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

interface ImageCardProps {
  image: CompressedImageObj;
  onRemove: (id: string) => void;
}

export function ImageCard({ image, onRemove }: ImageCardProps) {
  const isDone = image.status === "done";
  
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start">
        <div className="flex-1 min-w-0 pr-4">
           <h4 className="font-medium text-slate-900 dark:text-white truncate" title={image.originalFile.name}>
             {image.originalFile.name}
           </h4>
           <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
              <span className="uppercase">{image.originalFile.name.split('.').pop()}</span>
              <span>•</span>
              <span>{formatSize(image.originalFile.size)}</span>
           </div>
        </div>
        <button 
           onClick={() => onRemove(image.id)}
           className="text-slate-400 hover:text-red-500 transition-colors p-1"
        >
           <Trash2 size={16} />
        </button>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-900/50">
         {image.status === 'done' && image.compressedResult ? (
             <div className="flex justify-between items-end mb-4">
                 <div>
                     <div className="text-xs text-slate-500 mb-1">New Size</div>
                     <div className="font-bold text-slate-900 dark:text-white">
                         {formatSize(image.compressedResult.compressedSize)}
                     </div>
                 </div>
                 <div className="text-right">
                    <div className="text-xs text-slate-500 mb-1">Saved</div>
                    <div className="font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">
                        -{image.compressedResult.compressionRatio.toFixed(1)}%
                    </div>
                 </div>
             </div>
         ) : image.status === 'error' ? (
             <div className="text-red-500 text-sm flex items-center gap-2 mb-4">
                 <AlertCircle size={16} />
                 <span>Compression Failed</span>
             </div>
         ) : null}

         {/* Preview Area */}
        <div className="mb-4">
            {image.status === 'idle' || image.status === 'compressing' ? (
                <div className="h-[200px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg flex flex-col items-center justify-center text-slate-400 animate-pulse">
                     <Loader2 size={24} className="animate-spin mb-2" />
                     <span className="text-xs">Processing...</span>
                </div>
            ) : (
                <PreviewComparison image={image} />
            )}
        </div>

        {/* Action Button */}
        {isDone && image.compressedResult && (
           <a
             href={image.compressedUrl!}
             download={`compressed_${image.originalFile.name}`}
             className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-sm shadow-blue-500/20"
           >
              <Download size={16} />
              Download
           </a>
        )}
      </div>
    </div>
  );
}
