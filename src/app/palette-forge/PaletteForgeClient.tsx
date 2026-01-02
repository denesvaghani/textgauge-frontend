'use client';

import { useState, useCallback } from 'react';
import {
  Upload,
  Palette,
  Copy,
  Check,
  Download,
  Sun,
  Moon,
  Sparkles,
  AlertCircle,
  FileCode,
  Droplets,
} from 'lucide-react';
import { flowerThemes } from '@/config/flowerThemes';
import {
  extractColorsFromImage,
  isValidImageFile,
  isValidFileSize,
  MAX_FILE_SIZE,
  type ExtractedColor,
} from '@/lib/palette-forge/colorExtractor';
import { generateTokens, generateColorScales, type TokenLayers, type ColorWithScale } from '@/lib/palette-forge/tokenGenerator';
import {
  exportTokens,
  downloadTokens,
  type ExportFormat,
} from '@/lib/palette-forge/exportFormats';
import {
  calculateContrast,
  getWCAGRating,
  detectColorHarmony,
  getTextColorForBackground,
  type WCAGRating,
} from '@/lib/palette-forge/colorUtils';

const theme = flowerThemes.orchid;

type TabType = 'primitive' | 'semantic' | 'component';

export function PaletteForgeClient() {
  // State
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedColors, setExtractedColors] = useState<ExtractedColor[]>([]);
  const [colorsWithScales, setColorsWithScales] = useState<ColorWithScale[]>([]);
  const [tokens, setTokens] = useState<TokenLayers | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedExport, setCopiedExport] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('semantic');
  const [activeExportFormat, setActiveExportFormat] = useState<ExportFormat>('css');
  const [darkModePreview, setDarkModePreview] = useState(false);

  // Handle file drop/upload
  const handleFile = useCallback(async (file: File) => {
    setError(null);

    if (!isValidImageFile(file)) {
      setError('Please upload a valid image file (PNG, JPG, SVG, or WebP)');
      return;
    }

    if (!isValidFileSize(file)) {
      setError(`File too large. Please use a file under ${MAX_FILE_SIZE / 1024 / 1024}MB`);
      return;
    }

    setIsProcessing(true);

    try {
      // Show image preview
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);

      // Extract colors
      const colors = await extractColorsFromImage(file, 8);
      setExtractedColors(colors);

      // Generate scales and tokens
      const withScales = generateColorScales(colors);
      setColorsWithScales(withScales);
      
      const generatedTokens = generateTokens(colors);
      setTokens(generatedTokens);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to extract colors');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  // Copy handlers
  const copyToClipboard = useCallback(async (text: string, hex?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (hex) {
        setCopiedHex(hex);
        setTimeout(() => setCopiedHex(null), 2000);
      } else {
        setCopiedExport(true);
        setTimeout(() => setCopiedExport(false), 2000);
      }
    } catch {
      // Clipboard API not available
    }
  }, []);

  // Export content
  const getExportContent = useCallback(() => {
    if (!tokens || !extractedColors.length) return '';
    return exportTokens(activeExportFormat, extractedColors, tokens);
  }, [tokens, extractedColors, activeExportFormat]);

  // Harmony analysis
  const harmony = extractedColors.length > 0 
    ? detectColorHarmony(extractedColors.map(c => c.hex))
    : null;

  // Render export tabs
  const exportFormats: { id: ExportFormat; label: string }[] = [
    { id: 'css', label: 'CSS' },
    { id: 'tailwind', label: 'Tailwind' },
    { id: 'scss', label: 'SCSS' },
    { id: 'json', label: 'JSON' },
    { id: 'figma', label: 'Figma' },
    { id: 'tokens-studio', label: 'Tokens Studio' },
  ];

  // Token layer tabs
  const tokenTabs: { id: TabType; label: string }[] = [
    { id: 'primitive', label: 'Primitive' },
    { id: 'semantic', label: 'Semantic' },
    { id: 'component', label: 'Component' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Title Section */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          <span className="bg-gradient-to-r from-stone-600 to-slate-600 dark:from-stone-400 dark:to-slate-400 bg-clip-text text-transparent">
            PaletteForge
          </span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Upload any design mockup. Get production-ready color tokens for Tailwind, CSS, SCSS, or Figma.
        </p>
      </section>

      <main className="flex-1">
        {/* Upload Section */}
        <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4">

          {/* Upload Zone */}
          <div
            className={`relative max-w-2xl mx-auto border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer
              ${isDragOver
                ? 'border-stone-500 bg-stone-50 dark:bg-stone-900/20 scale-[1.02]'
                : 'border-slate-300 dark:border-slate-700 hover:border-stone-400 hover:bg-stone-50/50 dark:hover:bg-stone-900/10'
              }
              ${isProcessing ? 'pointer-events-none opacity-60' : ''}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
              className="hidden"
              onChange={handleFileInput}
            />

            {isProcessing ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-stone-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                  Analyzing your design...
                </p>
              </div>
            ) : uploadedImage ? (
              <div className="flex flex-col items-center gap-4">
                <img
                  src={uploadedImage}
                  alt="Uploaded design"
                  className="max-h-40 rounded-lg shadow-lg"
                />
                <p className="text-sm text-slate-500">
                  Click or drop to replace
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-900/30 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-stone-600 dark:text-stone-400" />
                </div>
                <div>
                  <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                    Drag & Drop Design Mockup
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    or click to browse • PNG, JPG, SVG, WebP
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-2xl mx-auto mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}
        </section>

        {/* Results Section */}
        {extractedColors.length > 0 && (
          <>
            {/* Extracted Colors */}
            <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Palette className="w-6 h-6 text-stone-500" />
                    Extracted Colors
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    {extractedColors.length} colors found
                    {harmony && ` • ${harmony.type} (${harmony.score}% harmony)`}
                  </p>
                </div>
              </div>

              {/* Color Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {extractedColors.map((color, index) => {
                  const textColor = getTextColorForBackground(color.hex);
                  const contrastRatio = calculateContrast(color.hex, '#FFFFFF');
                  const rating = getWCAGRating(contrastRatio);

                  return (
                    <div
                      key={index}
                      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      {/* Color Swatch */}
                      <div
                        className="h-24 relative flex items-end justify-between p-2"
                        style={{ backgroundColor: color.hex }}
                      >
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full bg-black/20 backdrop-blur-sm"
                          style={{ color: textColor }}
                        >
                          {color.role || 'accent'}
                        </span>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            rating === 'AAA'
                              ? 'bg-green-500/90'
                              : rating === 'AA'
                              ? 'bg-yellow-500/90'
                              : 'bg-red-500/90'
                          } text-white`}
                        >
                          {rating}
                        </span>
                      </div>

                      {/* Color Info */}
                      <div className="p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm font-medium text-slate-800 dark:text-slate-200">
                            {color.hex.toUpperCase()}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(color.hex, color.hex);
                            }}
                            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                          >
                            {copiedHex === color.hex ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4 text-slate-400" />
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {color.name}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                          rgb({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Color Scales */}
            <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                <Droplets className="w-6 h-6 text-stone-500" />
                Color Scales
              </h2>

              <div className="space-y-4">
                {colorsWithScales.slice(0, 6).map((color, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"
                  >
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      {color.name}
                    </p>
                    <div className="flex rounded-lg overflow-hidden">
                      {(['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const).map(
                        (shade) => (
                          <div
                            key={shade}
                            className="flex-1 h-10 relative group cursor-pointer"
                            style={{ backgroundColor: color.scale[shade] }}
                            onClick={() => copyToClipboard(color.scale[shade], color.scale[shade])}
                          >
                            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 text-white">
                              {shade}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Component Preview */}
            <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-stone-500" />
                  Preview in Action
                </h2>
                <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <button
                    onClick={() => setDarkModePreview(false)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      !darkModePreview
                        ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white'
                        : 'text-slate-500'
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                    Light
                  </button>
                  <button
                    onClick={() => setDarkModePreview(true)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      darkModePreview
                        ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white'
                        : 'text-slate-500'
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                    Dark
                  </button>
                </div>
              </div>

              <div
                className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-2xl border ${
                  darkModePreview
                    ? 'bg-slate-900 border-slate-700'
                    : 'bg-white border-slate-200'
                }`}
              >
                {/* Button Preview */}
                <div className="space-y-3">
                  <p
                    className={`text-sm font-medium ${
                      darkModePreview ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Buttons
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
                      style={{ backgroundColor: extractedColors[0]?.hex }}
                    >
                      Primary
                    </button>
                    <button
                      className="px-4 py-2 rounded-lg font-medium transition-all"
                      style={{
                        backgroundColor: extractedColors[1]?.hex || '#E5E7EB',
                        color: getTextColorForBackground(extractedColors[1]?.hex || '#E5E7EB'),
                      }}
                    >
                      Secondary
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg font-medium border-2 transition-all ${
                        darkModePreview
                          ? 'text-white border-slate-600'
                          : 'text-slate-700 border-slate-300'
                      }`}
                    >
                      Outline
                    </button>
                  </div>
                </div>

                {/* Input Preview */}
                <div className="space-y-3">
                  <p
                    className={`text-sm font-medium ${
                      darkModePreview ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Input
                  </p>
                  <input
                    type="text"
                    placeholder="Enter text..."
                    className={`w-full px-4 py-2 rounded-lg border-2 outline-none transition-colors ${
                      darkModePreview
                        ? 'bg-slate-800 border-slate-600 text-white placeholder:text-slate-500'
                        : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                    }`}
                    style={{
                      '--tw-ring-color': extractedColors[0]?.hex,
                    } as React.CSSProperties}
                    onFocus={(e) => {
                      e.target.style.borderColor = extractedColors[0]?.hex || '#8B5CF6';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = darkModePreview
                        ? '#475569'
                        : '#D1D5DB';
                    }}
                  />
                </div>

                {/* Badge Preview */}
                <div className="space-y-3">
                  <p
                    className={`text-sm font-medium ${
                      darkModePreview ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Badges
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {extractedColors.slice(0, 4).map((color, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: `${color.hex}20`,
                          color: color.hex,
                        }}
                      >
                        {color.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Preview */}
                <div className="md:col-span-2 lg:col-span-3 space-y-3">
                  <p
                    className={`text-sm font-medium ${
                      darkModePreview ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Card
                  </p>
                  <div
                    className={`p-6 rounded-xl border ${
                      darkModePreview
                        ? 'bg-slate-800 border-slate-700'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <h3
                      className={`text-lg font-semibold mb-2 ${
                        darkModePreview ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      Sample Card Title
                    </h3>
                    <p
                      className={`mb-4 ${
                        darkModePreview ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      This is how your palette looks in a typical card component with
                      heading, body text, and a call-to-action button.
                    </p>
                    <button
                      className="px-4 py-2 rounded-lg font-medium text-white"
                      style={{ backgroundColor: extractedColors[0]?.hex }}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Contrast Matrix */}
            <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Accessibility Check
              </h2>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left p-2 text-slate-500 dark:text-slate-400">
                        Text on →
                      </th>
                      {extractedColors.slice(0, 6).map((c, i) => (
                        <th key={i} className="p-2">
                          <div
                            className="w-8 h-8 rounded-full mx-auto"
                            style={{ backgroundColor: c.hex }}
                          />
                        </th>
                      ))}
                      <th className="p-2">
                        <div className="w-8 h-8 rounded-full mx-auto bg-white border border-slate-300" />
                      </th>
                      <th className="p-2">
                        <div className="w-8 h-8 rounded-full mx-auto bg-slate-900" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {extractedColors.slice(0, 6).map((fg, i) => (
                      <tr key={i}>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-6 h-6 rounded-full"
                              style={{ backgroundColor: fg.hex }}
                            />
                            <span className="text-slate-700 dark:text-slate-300 font-mono text-xs">
                              {fg.hex}
                            </span>
                          </div>
                        </td>
                        {extractedColors.slice(0, 6).map((bg, j) => {
                          const contrast = calculateContrast(fg.hex, bg.hex);
                          const rating = getWCAGRating(contrast);
                          return (
                            <td key={j} className="p-2 text-center">
                              <span
                                className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                                  rating === 'AAA'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    : rating === 'AA'
                                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                }`}
                              >
                                {contrast.toFixed(1)}
                              </span>
                            </td>
                          );
                        })}
                        {/* White background */}
                        <td className="p-2 text-center">
                          {(() => {
                            const contrast = calculateContrast(fg.hex, '#FFFFFF');
                            const rating = getWCAGRating(contrast);
                            return (
                              <span
                                className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                                  rating === 'AAA'
                                    ? 'bg-green-100 text-green-700'
                                    : rating === 'AA'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {contrast.toFixed(1)}
                              </span>
                            );
                          })()}
                        </td>
                        {/* Black background */}
                        <td className="p-2 text-center">
                          {(() => {
                            const contrast = calculateContrast(fg.hex, '#000000');
                            const rating = getWCAGRating(contrast);
                            return (
                              <span
                                className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                                  rating === 'AAA'
                                    ? 'bg-green-100 text-green-700'
                                    : rating === 'AA'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {contrast.toFixed(1)}
                              </span>
                            );
                          })()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Token Generation */}
            {tokens && (
              <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Generated Tokens
                </h2>

                {/* Token Layer Tabs */}
                <div className="flex gap-2 mb-4">
                  {tokenTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-stone-100 text-stone-700 dark:bg-stone-900/30 dark:text-stone-300'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Token List */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700 max-h-64 overflow-y-auto">
                  <div className="grid gap-2">
                    {Object.entries(tokens[activeTab]).map(([name, value]) => (
                      <div
                        key={name}
                        className="flex items-center justify-between py-2 px-3 bg-white dark:bg-slate-800 rounded-lg"
                      >
                        <code className="text-sm text-stone-600 dark:text-stone-400">
                          {name}
                        </code>
                        <div className="flex items-center gap-2">
                          {value.startsWith('#') && (
                            <div
                              className="w-5 h-5 rounded border border-slate-300 dark:border-slate-600"
                              style={{ backgroundColor: value }}
                            />
                          )}
                          <code className="text-sm text-slate-500 dark:text-slate-400">
                            {value}
                          </code>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Export Panel */}
            <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                <FileCode className="w-6 h-6 text-stone-500" />
                Export
              </h2>

              {/* Export Format Tabs */}
              <div className="flex flex-wrap gap-2 mb-4">
                {exportFormats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setActiveExportFormat(format.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeExportFormat === format.id
                        ? 'bg-stone-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {format.label}
                  </button>
                ))}
              </div>

              {/* Code Block */}
              <div className="relative bg-slate-900 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                  <span className="text-sm text-slate-400">
                    {activeExportFormat.toUpperCase()}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(getExportContent())}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
                    >
                      {copiedExport ? (
                        <>
                          <Check className="w-4 h-4 text-green-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                    <button
                      onClick={() =>
                        downloadTokens(activeExportFormat, getExportContent())
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-stone-600 text-white hover:bg-stone-500 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
                <pre className="p-4 text-sm text-slate-300 overflow-x-auto max-h-96">
                  <code>{getExportContent()}</code>
                </pre>
              </div>
            </section>
          </>
        )}

        {/* Empty State - Features */}
        {extractedColors.length === 0 && !isProcessing && (
          <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-12">
              What You'll Get
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: '3-Layer Token System',
                  description:
                    'Primitive, semantic, and component tokens - exactly what professional design systems need.',
                  icon: <Palette className="w-8 h-8" />,
                },
                {
                  title: 'Live Component Preview',
                  description:
                    'See your palette in action with buttons, inputs, cards - all rendered live.',
                  icon: <Sparkles className="w-8 h-8" />,
                },
                {
                  title: 'WCAG Accessibility',
                  description:
                    'Every color pair tested automatically. Know which combinations are accessible.',
                  icon: <AlertCircle className="w-8 h-8" />,
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-stone-100 dark:bg-stone-900/30 flex items-center justify-center text-stone-600 dark:text-stone-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* FAQ Section */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 w-full">
          <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-stone-200/50 dark:border-stone-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-stone-50/50 dark:hover:bg-stone-900/20 transition-colors">
              What exactly is PaletteForge?
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-stone-100/50 dark:border-stone-800/30 pt-4">
              PaletteForge is a <strong>free color extraction tool</strong> that turns any image into <strong>production-ready code</strong>. Upload a screenshot, mockup, or photo — get back organized color tokens for <strong>CSS, Tailwind, SCSS, Figma</strong>, and more. Think of it as Shazam, but for colors.
            </div>
          </details>

          <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-stone-200/50 dark:border-stone-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-stone-50/50 dark:hover:bg-stone-900/20 transition-colors">
              What are design tokens?
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-stone-100/50 dark:border-stone-800/30 pt-4">
              Design tokens are <strong>named variables</strong> that store design decisions. Instead of writing <code className="bg-stone-100 dark:bg-stone-800 px-1 rounded">#3B82F6</code> everywhere, you use <code className="bg-stone-100 dark:bg-stone-800 px-1 rounded">--color-primary</code>. <strong>Change it once, update everywhere.</strong> This follows the DRY (Don&apos;t Repeat Yourself) principle and makes your codebase maintainable.
            </div>
          </details>

          <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-stone-200/50 dark:border-stone-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-stone-50/50 dark:hover:bg-stone-900/20 transition-colors">
              What do AAA, AA, and Fail badges mean?
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-stone-100/50 dark:border-stone-800/30 pt-4">
              These are <strong>WCAG accessibility ratings</strong> for text readability. <strong>AAA</strong> = Excellent contrast (≥7:1), readable by everyone. <strong>AA</strong> = Good contrast (≥4.5:1), suitable for most users. <strong>Fail</strong> = Poor contrast, text may be difficult to read. Always aim for AA or higher to ensure your website is accessible.
            </div>
          </details>

          <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-stone-200/50 dark:border-stone-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-stone-50/50 dark:hover:bg-stone-900/20 transition-colors">
              Why are there three token layers?
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-stone-100/50 dark:border-stone-800/30 pt-4">
              The three layers create a <strong>scalable design system</strong>: <strong>Primitive</strong> = raw color values (blue-500, gray-200). <strong>Semantic</strong> = purpose-based names (primary, error, success). <strong>Component</strong> = UI-specific tokens (button-bg, input-border). This structure lets you <strong>change themes</strong> by updating just the semantic layer.
            </div>
          </details>

          <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-stone-200/50 dark:border-stone-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-stone-50/50 dark:hover:bg-stone-900/20 transition-colors">
              What do the numbers 50, 100... 950 mean?
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-stone-100/50 dark:border-stone-800/30 pt-4">
              These are <strong>Tailwind-style color scales</strong>. <strong>50</strong> = lightest shade (almost white), <strong>500</strong> = base color, <strong>950</strong> = darkest shade (almost black). Use <strong>50-200 for backgrounds</strong>, <strong>500-600 for interactive elements</strong>, and <strong>700-950 for text</strong>. This system ensures consistent color usage across your project.
            </div>
          </details>

          <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-stone-200/50 dark:border-stone-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-stone-50/50 dark:hover:bg-stone-900/20 transition-colors">
              What is color harmony?
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-stone-100/50 dark:border-stone-800/30 pt-4">
              Color harmony measures how well colors <strong>work together visually</strong>. Types include: <strong>Complementary</strong> (opposites like blue + orange), <strong>Analogous</strong> (neighbors like green, teal, blue), and <strong>Triadic</strong> (evenly spaced). Higher harmony scores mean your palette follows <strong>proven color theory principles</strong>.
            </div>
          </details>

          <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-stone-200/50 dark:border-stone-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-stone-50/50 dark:hover:bg-stone-900/20 transition-colors">
              Is my uploaded image private?
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-stone-100/50 dark:border-stone-800/30 pt-4">
              <strong>100% private.</strong> All processing happens <strong>entirely in your browser</strong> using the Canvas API. Your images are <strong>never uploaded</strong> to any server. We cannot see, store, or access your files. This is called client-side processing — your data stays on your device.
            </div>
          </details>

          <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-stone-200/50 dark:border-stone-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-stone-50/50 dark:hover:bg-stone-900/20 transition-colors">
              Which export format should I use?
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-stone-100/50 dark:border-stone-800/30 pt-4">
              Choose based on your stack: <strong>CSS Variables</strong> for vanilla projects, <strong>Tailwind</strong> for Tailwind CSS, <strong>SCSS</strong> for Sass projects, <strong>JSON</strong> for Style Dictionary, <strong>Figma</strong> for design handoff, and <strong>Tokens Studio</strong> for design token management. Beginners should start with CSS Variables.
            </div>
          </details>

          <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-stone-200/50 dark:border-stone-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-stone-50/50 dark:hover:bg-stone-900/20 transition-colors">
              What images work best?
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-stone-100/50 dark:border-stone-800/30 pt-4">
              Supports <strong>PNG, JPG, SVG, and WebP</strong> up to <strong>10MB</strong>. Best results come from images with <strong>distinct, solid colors</strong> — website screenshots, logos, and UI mockups work great. Avoid images with heavy gradients or too many similar shades.
            </div>
          </details>

          <details className="w-full group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-stone-200/50 dark:border-stone-800/30 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
            <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-slate-800 dark:text-white hover:bg-stone-50/50 dark:hover:bg-stone-900/20 transition-colors">
              Any tips for better results?
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-stone-100/50 dark:border-stone-800/30 pt-4">
              Pro tips: <strong>1)</strong> Use high-contrast images with distinct colors. <strong>2)</strong> Crop out busy backgrounds before uploading. <strong>3)</strong> Check the <strong>WCAG badges</strong> before using a color for text. <strong>4)</strong> The tool extracts up to 8 colors — choose images where those colors matter most.
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
