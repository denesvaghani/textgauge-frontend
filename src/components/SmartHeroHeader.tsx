import Image from "next/image";
import { type FlowerTheme } from "@/config/flowerThemes";
import { GoogleAdsense } from "./GoogleAdsense";

interface SmartHeroHeaderProps {
    title: string;
    theme: FlowerTheme | { name: string; image: string; colors: { primary: string; glow?: string }; significance: string };
    adSlot?: string;
    description?: string;
    className?: string;
    showIcon?: boolean;
}

export function SmartHeroHeader({ title, theme, adSlot, description, className = "", showIcon = true }: SmartHeroHeaderProps) {
    return (
        <div className={`flex flex-col items-center justify-center pt-8 pb-6 px-4 sm:px-6 lg:px-8 space-y-5 shrink-0 animate-in fade-in zoom-in duration-500 ${className}`}>
            {/* Logo & Title Stack */}
            <div className="flex flex-col items-center gap-4">
                {/* Glowing Logo Container */}
                {showIcon && (
                    <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 group transition-transform hover:scale-105 duration-300">
                        <div className="absolute inset-0 rounded-full blur-2xl opacity-30 animate-pulse group-hover:opacity-50 transition-opacity duration-700"
                            style={{ backgroundColor: theme.colors.primary }}
                        ></div>
                        <div className="relative w-full h-full rounded-full ring-4 ring-white dark:ring-slate-900 shadow-xl overflow-hidden bg-white dark:bg-slate-900 z-10">
                            <Image
                                src={theme.image}
                                alt={title}
                                fill
                                sizes="80px"
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                )}

                {/* Title - Responsive sizing to prevent truncation on mobile */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-700 to-slate-800 dark:from-white dark:via-slate-200 dark:to-slate-400 drop-shadow-sm pb-1 max-w-4xl leading-tight px-2">
                    {title}
                </h1>
            </div>

            {/* Significance (Personal Line) - Hero Subtitle */}
            <p className="text-center text-slate-600 dark:text-slate-500 text-sm md:text-base italic font-medium tracking-wide max-w-lg leading-relaxed">
                {theme.significance}
            </p>

            {/* Optional Description - More detailed info */}
            {description && (
                <p className="text-center text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
                    {description}
                </p>
            )}

            {/* Optional Ad Slot - Integrated into layout but unobtrusive */}
            {adSlot && (
                <div className="w-full flex justify-center mt-4">
                    <div className="w-full max-w-[728px] h-[90px] rounded-lg overflow-hidden bg-slate-100/50 dark:bg-slate-800/50">
                        <GoogleAdsense
                            adSlot={adSlot}
                            style={{ display: 'block', width: '100%', height: '100%' }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

// Reusable Footer Description Component
export function HeroDescription({ text }: { text: string }) {
    if (!text) return null;
    return (
        <p className="text-center text-slate-400 dark:text-slate-500 text-xs md:text-sm max-w-2xl mx-auto opacity-70 hover:opacity-100 transition-opacity pt-8 pb-4">
            <strong className="text-slate-600 dark:text-slate-300 font-semibold">{text.split('.')[0]}.</strong> {text.substring(text.indexOf('.') + 1)}
        </p>
    );
}
