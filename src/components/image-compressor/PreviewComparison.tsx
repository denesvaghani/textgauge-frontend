import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { CompressedImageObj } from "@/hooks/useImageCompression";

interface PreviewComparisonProps {
  image: CompressedImageObj;
}

export function PreviewComparison({ image }: PreviewComparisonProps) {
  if (!image.compressedUrl) {
      return (
          <div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
              <span className="text-slate-400 text-sm">Processing Preview...</span>
          </div>
      );
  }

  return (
    <div className="relative w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm group">
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src={image.previewUrl} alt="Original Image" />}
        itemTwo={<ReactCompareSliderImage src={image.compressedUrl} alt="Compressed Image" />}
        className="w-full h-full object-contain bg-[url('/images/transparent-bg.png')] bg-repeat" // Optional checkerboard for transparency
        style={{ height: '300px' }} // Fixed height for consistency
      />
      
      {/* Labels */}
      <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm pointer-events-none">
        Original
      </div>
      <div className="absolute bottom-2 right-2 bg-blue-600/80 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm pointer-events-none">
        Compressed
      </div>
    </div>
  );
}
