// Flower theme configuration for each tool
export type FlowerTheme = {
  name: string;
  slug: string;
  image: string;
  significance: string; // One-line meaning of the flower
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    glow: string;
    text: string;
    textDark: string;
  };
  gradient: {
    light: string;
    dark: string;
  };
  bgGradient: {
    light: string;
    dark: string;
  };
};

export const flowerThemes = {
  cherryBlossom: {
    name: "Cherry Blossom",
    slug: "cherry-blossom",
    image: "/images/flowers/cherry-blossom.webp",
    significance: "Symbolizes renewal, the fleeting nature of life, and the beauty of new beginnings.",
    colors: {
      primary: "#ec4899",
      secondary: "#f472b6",
      accent: "#fce7f3",
      glow: "rgba(236, 72, 153, 0.2)",
      text: "text-pink-600",
      textDark: "dark:text-pink-400",
    },
    gradient: {
      light: "from-pink-500 to-rose-500",
      dark: "from-pink-600 to-rose-600",
    },
    bgGradient: {
      light: "bg-gradient-to-br from-pink-50 via-rose-50/50 to-white",
      dark: "dark:bg-gradient-to-br dark:from-pink-950/30 dark:via-rose-950/20 dark:to-slate-950",
    },
  },
  whiteLily: {
    name: "White Lily",
    slug: "white-lily",
    image: "/images/flowers/white-lily.webp",
    significance: "Represents purity, clarity, and the commitment to honest expression.",
    colors: {
      primary: "#10b981",
      secondary: "#34d399",
      accent: "#d1fae5",
      glow: "rgba(16, 185, 129, 0.2)",
      text: "text-emerald-600",
      textDark: "dark:text-emerald-400",
    },
    gradient: {
      light: "from-emerald-500 to-green-500",
      dark: "from-emerald-600 to-green-600",
    },
    bgGradient: {
      light: "bg-gradient-to-br from-emerald-50 via-green-50/50 to-white",
      dark: "dark:bg-gradient-to-br dark:from-emerald-950/30 dark:via-green-950/20 dark:to-slate-950",
    },
  },
  frangipani: {
    name: "Frangipani",
    slug: "frangipani",
    image: "/images/flowers/frangipani.webp",
    significance: "Embodies warmth, creativity, and the welcoming spirit of tropical paradise.",
    colors: {
      primary: "#f97316",
      secondary: "#fb923c",
      accent: "#ffedd5",
      glow: "rgba(249, 115, 22, 0.2)",
      text: "text-orange-600",
      textDark: "dark:text-orange-400",
    },
    gradient: {
      light: "from-orange-500 to-amber-500",
      dark: "from-orange-600 to-amber-600",
    },
    bgGradient: {
      light: "bg-gradient-to-br from-orange-50 via-amber-50/50 to-white",
      dark: "dark:bg-gradient-to-br dark:from-orange-950/30 dark:via-amber-950/20 dark:to-slate-950",
    },
  },
  sunflower: {
    name: "Sunflower",
    slug: "sunflower",
    image: "/images/logo/sunflower-logo.webp",
    significance: "Symbolizes loyalty, adoration, and always seeking the light of knowledge.",
    colors: {
      primary: "#eab308",
      secondary: "#facc15",
      accent: "#fef9c3",
      glow: "rgba(234, 179, 8, 0.2)",
      text: "text-yellow-600",
      textDark: "dark:text-yellow-400",
    },
    gradient: {
      light: "from-yellow-500 to-amber-500",
      dark: "from-yellow-600 to-amber-600",
    },
    bgGradient: {
      light: "bg-gradient-to-br from-yellow-50 via-amber-50/50 to-white",
      dark: "dark:bg-gradient-to-br dark:from-yellow-950/30 dark:via-amber-950/20 dark:to-slate-950",
    },
  },
  lavender: {
    name: "Lavender",
    slug: "lavender",
    image: "/images/flowers/lavender.webp",
    significance: "Represents calm, serenity, and the elegance of sophisticated simplicity.",
    colors: {
      primary: "#8b5cf6",
      secondary: "#a78bfa",
      accent: "#ede9fe",
      glow: "rgba(139, 92, 246, 0.2)",
      text: "text-violet-600",
      textDark: "dark:text-violet-400",
    },
    gradient: {
      light: "from-violet-500 to-purple-500",
      dark: "from-violet-600 to-purple-600",
    },
    bgGradient: {
      light: "bg-gradient-to-br from-violet-50 via-purple-50/50 to-white",
      dark: "dark:bg-gradient-to-br dark:from-violet-950/30 dark:via-purple-950/20 dark:to-slate-950",
    },
  },
  redRose: {
    name: "Red Rose",
    slug: "red-rose",
    image: "/images/flowers/red-rose.webp",
    significance: "Symbolizes passion, courage, and the dedication to finding differences that matter.",
    colors: {
      primary: "#e11d48",
      secondary: "#f43f5e",
      accent: "#ffe4e6",
      glow: "rgba(225, 29, 72, 0.2)",
      text: "text-rose-600",
      textDark: "dark:text-rose-400",
    },
    gradient: {
      light: "from-rose-500 to-red-500",
      dark: "from-rose-600 to-red-600",
    },
    bgGradient: {
      light: "bg-gradient-to-br from-rose-50 via-red-50/50 to-white",
      dark: "dark:bg-gradient-to-br dark:from-rose-950/30 dark:via-red-950/20 dark:to-slate-950",
    },
  },
  orchid: {
    name: "Rhinoceros",
    slug: "rhinoceros",
    image: "/images/tools/palette-forge.jpg",
    significance: "Represents strength, stability, and solid foundations — essential for building robust design systems.",
    colors: {
      primary: "#8B5CF6",
      secondary: "#6366F1",
      accent: "#E0E7FF",
      glow: "rgba(139, 92, 246, 0.25)",
      text: "text-violet-600",
      textDark: "dark:text-violet-400",
    },
    gradient: {
      light: "from-violet-500 to-indigo-500",
      dark: "from-violet-600 to-indigo-600",
    },
    bgGradient: {
      light: "bg-gradient-to-br from-violet-50 via-indigo-50/50 to-white",
      dark: "dark:bg-gradient-to-br dark:from-violet-950/30 dark:via-indigo-950/20 dark:to-slate-950",
    },
  },
} as const;

export type FlowerThemeKey = keyof typeof flowerThemes;
