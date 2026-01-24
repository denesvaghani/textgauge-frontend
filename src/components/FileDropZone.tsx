import { Upload, FileText, FileJson, FileSpreadsheet, FileCode, X } from 'lucide-react';
import { useState, useRef } from 'react';

interface FileDropZoneProps {
  value: string;
  onChange: (value: string) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  isDragging: boolean;
  label: string;
  theme: 'violet' | 'indigo';
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  itemCount?: number;
}

export function FileDropZone({
  value,
  onChange,
  onFileUpload,
  onDragOver,
  onDragLeave,
  onDrop,
  isDragging,
  label,
  theme,
  fileInputRef,
  itemCount,
}: FileDropZoneProps) {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const isEmpty = !value || value.trim().length === 0;
  
  // Theme colors
  const colors = {
    violet: {
      primary: 'violet',
      gradient: 'from-violet-500 to-purple-500',
      bg: 'bg-violet-50 dark:bg-violet-900/20',
      border: 'border-violet-200 dark:border-violet-800',
      hoverBorder: 'hover:border-violet-300 dark:hover:border-violet-700',
      dragBorder: 'border-violet-400 dark:border-violet-500',
      dragBg: 'bg-violet-100/80 dark:bg-violet-900/80',
      text: 'text-violet-700 dark:text-violet-300',
      iconBg: 'bg-violet-100 dark:bg-violet-900/50',
    },
    indigo: {
      primary: 'indigo',
      gradient: 'from-indigo-500 to-blue-500',
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
      border: 'border-indigo-200 dark:border-indigo-800',
      hoverBorder: 'hover:border-indigo-300 dark:hover:border-indigo-700',
      dragBorder: 'border-indigo-400 dark:border-indigo-500',
      dragBg: 'bg-indigo-100/80 dark:bg-indigo-900/80',
      text: 'text-indigo-700 dark:text-indigo-300',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/50',
    },
  };
  
  const themeColors = colors[theme];
  
  const supportedFormats = [
    { icon: FileText, label: 'TXT', ext: '.txt' },
    { icon: FileText, label: 'CSV', ext: '.csv' },
    { icon: FileJson, label: 'JSON', ext: '.json' },
    { icon: FileSpreadsheet, label: 'Excel', ext: '.xlsx' },
    { icon: FileCode, label: 'MD', ext: '.md' },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* Label and Upload Button */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <span className="text-lg">📝</span>
          <span className={`font-bold bg-gradient-to-r ${themeColors.gradient} bg-clip-text text-transparent`}>
            {label}
          </span>
        </label>
        <div className="flex items-center gap-2">
          {itemCount !== undefined && itemCount > 0 && (
            <span className="text-sm text-slate-400">{itemCount} items</span>
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            className={`text-xs px-3 py-1.5 ${themeColors.text} border ${themeColors.border} ${themeColors.bg} hover:opacity-80 flex items-center gap-1.5 rounded-lg transition-all font-medium`}
          >
            <Upload size={14} /> Browse Files
          </button>
        </div>
      </div>

      {/* Main Drop Zone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => textareaRef.current?.focus()}
        className={`
          relative rounded-xl border-2 transition-all duration-300 cursor-text min-h-[320px]
          ${isDragging 
            ? `${themeColors.dragBorder} ${themeColors.dragBg} scale-[1.02]` 
            : isFocused
              ? `${themeColors.dragBorder} bg-white dark:bg-slate-900`
              : `${themeColors.border} ${themeColors.hoverBorder} bg-white dark:bg-slate-900`
          }
        `}
      >
        {/* Empty State - Show when no content */}
        {isEmpty && !isFocused && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 pointer-events-none">
            <div className={`
              w-20 h-20 rounded-2xl ${themeColors.iconBg} flex items-center justify-center mb-4
              ${isDragging ? 'scale-110' : 'scale-100'}
              transition-transform duration-300
            `}>
              <Upload className={`w-10 h-10 ${themeColors.text}`} />
            </div>
            
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {isDragging ? 'Drop your file here' : 'Drop file or paste text'}
            </h3>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">
              Paste text directly or drag & drop a file
            </p>

            {/* Supported Formats */}
            <div className="flex flex-wrap gap-2 justify-center mb-3">
              {supportedFormats.map((format) => (
                <div
                  key={format.ext}
                  className={`
                    flex items-center gap-1.5 px-2.5 py-1 rounded-lg 
                    bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700
                    transition-all duration-200
                    ${isDragging ? 'scale-105' : 'scale-100'}
                  `}
                >
                  <format.icon size={14} className="text-slate-600 dark:text-slate-400" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    {format.label}
                  </span>
                </div>
              ))}
            </div>

            {/* File Size Limit */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
              <span>Maximum file size: 5MB</span>
            </div>
          </div>
        )}

        {/* Textarea - Always rendered but hidden when empty and not focused */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isEmpty && isFocused ? "Start typing or paste your list here..." : ""}
          className={`
            w-full h-full min-h-[320px] p-6 bg-transparent resize-none outline-none
            font-mono text-sm leading-6 text-slate-800 dark:text-slate-100
            placeholder:text-slate-400
            ${isEmpty && !isFocused ? 'opacity-0' : 'opacity-100'}
            transition-opacity duration-200
          `}
        />

        {/* Clear Button - Show when has content */}
        {!isEmpty && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange('');
            }}
            className={`
              absolute top-3 right-3 p-2 rounded-lg
              bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700
              text-slate-600 dark:text-slate-400
              transition-all duration-200 hover:scale-110
            `}
            title="Clear content"
          >
            <X size={16} />
          </button>
        )}

        {/* Drag Overlay */}
        {isDragging && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/90 to-white/80 dark:from-slate-900/90 dark:to-slate-900/80 backdrop-blur-sm rounded-xl pointer-events-none">
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl ${themeColors.iconBg} flex items-center justify-center animate-bounce`}>
                <Upload className={`w-8 h-8 ${themeColors.text}`} />
              </div>
              <p className={`text-lg font-semibold ${themeColors.text}`}>
                Drop your file here
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Info Bar */}
      {!isEmpty && (
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span>{value.split('\n').filter(line => line.trim()).length} lines</span>
            <span className="w-1 h-1 rounded-full bg-slate-400"></span>
            <span>{value.length} characters</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono">
              Cmd+V
            </kbd>
            <span>to paste</span>
          </div>
        </div>
      )}
    </div>
  );
}
