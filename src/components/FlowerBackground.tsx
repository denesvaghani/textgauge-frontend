'use client';

import { FlowerTheme } from '@/config/flowerThemes';
import Image from 'next/image';

interface FlowerBackgroundProps {
  theme: FlowerTheme;
  children: React.ReactNode;
  showFlowerBadge?: boolean;
  badgeText?: string;
}

export function FlowerBackground({ 
  theme, 
  children, 
  showFlowerBadge = true,
  badgeText = "Dev Tool"
}: FlowerBackgroundProps) {
  return (
    <div className={`relative min-h-screen ${theme.bgGradient.light} ${theme.bgGradient.dark} transition-colors duration-300`}>
      {/* Radial glow effect */}
      <div 
        className="pointer-events-none fixed inset-0 opacity-60 dark:opacity-40"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% -20%, ${theme.colors.glow}, transparent)`,
        }}
      />
      
      {/* Secondary glow at bottom */}
      <div 
        className="pointer-events-none fixed inset-0 opacity-30 dark:opacity-20"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 80% 100%, ${theme.colors.glow}, transparent)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {showFlowerBadge && (
          <div className="pt-8 pb-4 text-center">
            <div className="inline-flex flex-col items-center gap-2">
              {/* Badge with flower icon */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
                <div 
                  className="w-8 h-8 rounded-full overflow-hidden shadow-md"
                  style={{ boxShadow: `0 0 0 2px white, 0 0 0 4px ${theme.colors.primary}` }}>
                  <Image
                    src={theme.image}
                    alt={theme.name}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className={`text-xs font-bold uppercase tracking-wider ${theme.colors.text} ${theme.colors.textDark}`}>
                  {badgeText}
                </span>
              </div>
              {/* Flower significance text */}
              <p className="text-sm italic text-slate-500 dark:text-slate-400 max-w-md px-4">
                <span className={`${theme.colors.text} ${theme.colors.textDark} font-medium`}>{theme.name}</span>
                {" — "}
                {theme.significance}
              </p>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
