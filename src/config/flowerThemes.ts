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
    image: "/images/tools/palette-forge.webp",
    significance: "Represents strength, stability, and solid foundations — essential for building robust design systems.",
    colors: {
      primary: "#6B7280",
      secondary: "#78716C",
      accent: "#E7E5E4",
      glow: "rgba(120, 113, 108, 0.25)",
      text: "text-stone-600",
      textDark: "dark:text-stone-400",
    },
    gradient: {
      light: "from-stone-500 to-slate-500",
      dark: "from-stone-600 to-slate-600",
    },
    bgGradient: {
      light: "bg-gradient-to-br from-stone-50 via-slate-50/50 to-white",
      dark: "dark:bg-gradient-to-br dark:from-stone-950/30 dark:via-slate-950/20 dark:to-slate-950",
    },
  },
  hydrangea: {
    name: "Feather",
    slug: "feather",
    image: "/images/flowers/compression-icon.jpg",
    significance: "Represents lightweight efficiency and crystal-clear quality — ensuring your images remain pristine.",
    colors: {
      primary: "#3b82f6",
      secondary: "#60a5fa",
      accent: "#eff6ff",
      glow: "rgba(59, 130, 246, 0.25)",
      text: "text-blue-600",
      textDark: "dark:text-blue-400",
    },
    gradient: {
      light: "from-blue-500 to-indigo-500",
      dark: "from-blue-600 to-indigo-600",
    },
    bgGradient: {
      light: "bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white",
      dark: "dark:bg-gradient-to-br dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-slate-950",
    },
  },
  dahlia: {
    name: "Dahlia",
    slug: "dahlia",
    image: "/images/flowers/dahlia.jpg",
    significance: "Represents elegance, inner strength, and the intricate complexity of unique patterns.",
    colors: {
      primary: "#be123c",
      secondary: "#e11d48",
      accent: "#ffe4e6",
      glow: "rgba(190, 18, 60, 0.25)",
      text: "text-rose-700",
      textDark: "dark:text-rose-400",
    },
    gradient: {
      light: "from-rose-600 to-pink-600",
      dark: "from-rose-700 to-pink-700",
    },
    bgGradient: {
      light: "bg-gradient-to-br from-rose-50 via-pink-50/50 to-white",
      dark: "dark:bg-gradient-to-br dark:from-rose-950/30 dark:via-pink-950/20 dark:to-slate-950",
    },
  },
  morningGlory: {
    name: "Morning Glory",
    slug: "morning-glory",
    image: "/images/flowers/morning-glory.jpg",
    significance: "Symbolizes the precise cycle of time, routine, and the promise of a new start.",
    colors: {
      primary: "#4f46e5",
      secondary: "#6366f1",
      accent: "#eef2ff",
      glow: "rgba(79, 70, 229, 0.25)",
      text: "text-indigo-700",
      textDark: "dark:text-indigo-400",
    },
    gradient: {
      light: "from-indigo-600 to-blue-600",
      dark: "from-indigo-700 to-blue-700",
    },
    bgGradient: {
      light: "bg-gradient-to-br from-indigo-50 via-blue-50/50 to-white",
      dark: "dark:bg-gradient-to-br dark:from-indigo-950/30 dark:via-blue-950/20 dark:to-slate-950",
    },
  },
  blueIris: {
    name: "Blue Iris",
    slug: "blue-iris",
    image: "/images/flowers/blue-iris.jpg",
    significance: "Represents wisdom, communication, and the faithful transmission of messages.",
    colors: {
      primary: "#2563eb",
      secondary: "#3b82f6",
      accent: "#eff6ff",
      glow: "rgba(37, 99, 235, 0.25)",
      text: "text-blue-700",
      textDark: "dark:text-blue-400",
    },
    gradient: {
      light: "from-blue-600 to-indigo-600",
      dark: "from-blue-700 to-indigo-700",
    },
    bgGradient: {
      light: "bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white",
      dark: "dark:bg-gradient-to-br dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-slate-950",
    },
  },
  magnolia: {
    name: "Magnolia",
    slug: "magnolia",
    image: "/images/flowers/magnolia.webp",
    significance: "Represents endurance, nobility, and perseverance — robust and reliable for the long haul.",
    colors: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#ecfdf5",
      glow: "rgba(5, 150, 105, 0.25)",
      text: "text-emerald-700",
      textDark: "dark:text-emerald-400",
    },
    gradient: {
      light: "from-emerald-600 to-teal-600",
      dark: "from-emerald-700 to-teal-700",
    },
    bgGradient: {
      light: "bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white",
      dark: "dark:bg-gradient-to-br dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-slate-950",
    },
  },
  gardenia: {
    name: "Gardenia",
    slug: "gardenia",
    image: "/images/flowers/gardenia.webp",
    significance: "Embodies purity, refinement, and clarity — producing crystal clear results without clutter.",
    colors: {
      primary: "#0d9488",
      secondary: "#14b8a6",
      accent: "#f0fdfa",
      glow: "rgba(13, 148, 136, 0.25)",
      text: "text-teal-700",
      textDark: "dark:text-teal-400",
    },
    gradient: {
      light: "from-teal-600 to-cyan-600",
      dark: "from-teal-700 to-cyan-700",
    },
    bgGradient: {
      light: "bg-gradient-to-br from-teal-50 via-cyan-50/50 to-white",
      dark: "dark:bg-gradient-to-br dark:from-teal-950/30 dark:via-cyan-950/20 dark:to-slate-950",
    },
  },
  lilac: {
    name: "Lilac",
    slug: "lilac",
    image: "/images/flowers/lilac.webp",
    significance: "Symbolizes renewal, confidence, and fresh innovation — perfect for modernizing workflows.",
    colors: {
      primary: "#7c3aed",
      secondary: "#8b5cf6",
      accent: "#f5f3ff",
      glow: "rgba(124, 58, 237, 0.25)",
      text: "text-violet-700",
      textDark: "dark:text-violet-400",
    },
    gradient: {
      light: "from-violet-600 to-purple-600",
      dark: "from-violet-700 to-purple-700",
    },
    bgGradient: {
      light: "bg-gradient-to-br from-violet-50 via-purple-50/50 to-white",
      dark: "dark:bg-gradient-to-br dark:from-violet-950/30 dark:via-purple-950/20 dark:to-slate-950",
    },
  },
  jasmine: {
    name: "Jasmine",
    slug: "jasmine",
    image: "/images/flowers/jasmine.webp",
    significance: "Represents love, beauty, and amiability — friendly, inviting, and pleasant to use.",
    colors: {
      primary: "#ca8a04",
      secondary: "#eab308",
      accent: "#fefce8",
      glow: "rgba(202, 138, 4, 0.25)",
      text: "text-yellow-700",
      textDark: "dark:text-yellow-400",
    },
    gradient: {
      light: "from-yellow-600 to-lime-600",
      dark: "from-yellow-700 to-lime-700",
    },
    bgGradient: {
      light: "bg-gradient-to-br from-yellow-50 via-lime-50/50 to-white",
      dark: "dark:bg-gradient-to-br dark:from-yellow-950/30 dark:via-lime-950/20 dark:to-slate-950",
    },
  },
  protea: {
    name: "Protea",
    slug: "protea",
    image: "/images/flowers/protea.webp",
    significance: "Symbolizes diversity and transformation — the art of combining distinct elements into a beautiful whole.",
    colors: {
      primary: "#db2777",
      secondary: "#ec4899",
      accent: "#fdf2f8",
      glow: "rgba(219, 39, 119, 0.25)",
      text: "text-pink-700",
      textDark: "dark:text-pink-400",
    },
    gradient: {
      light: "from-pink-600 to-rose-600",
      dark: "from-pink-700 to-rose-700",
    },
    bgGradient: {
      light: "bg-gradient-to-br from-pink-50 via-rose-50/50 to-white",
      dark: "dark:bg-gradient-to-br dark:from-pink-950/30 dark:via-rose-950/20 dark:to-slate-950",
    },
  },
  peony: {
    name: "Peony",
    slug: "peony",
    image: "/images/flowers/peony.webp",
    significance: "Represents leadership and prosperity — mirroring the flourishing collaboration of expert minds.",
    colors: {
      primary: "#991b1b",
      secondary: "#dc2626",
      accent: "#fef2f2",
      glow: "rgba(153, 27, 27, 0.25)",
      text: "text-red-800",
      textDark: "dark:text-red-400",
    },
    gradient: {
      light: "from-red-700 to-rose-700",
      dark: "from-red-800 to-rose-800",
    },
    bgGradient: {
      light: "bg-gradient-to-br from-red-50 via-rose-50/50 to-white",
      dark: "dark:bg-gradient-to-br dark:from-red-950/30 dark:via-rose-950/20 dark:to-slate-950",
    },
  },
  gerbera: {
    name: "Gerbera",
    slug: "gerbera",
    image: "/images/flowers/gerbera.webp",
    significance: "Embodies energy and cheerfulness — reflecting the vibrant transition of data into organized structures.",
    colors: {
      primary: "#ea580c",
      secondary: "#f97316",
      accent: "#fff7ed",
      glow: "rgba(234, 88, 12, 0.25)",
      text: "text-orange-700",
      textDark: "dark:text-orange-400",
    },
    gradient: {
      light: "from-orange-600 to-amber-600",
      dark: "from-orange-700 to-amber-700",
    },
    bgGradient: {
      light: "bg-gradient-to-br from-orange-50 via-amber-50/50 to-white",
      dark: "dark:bg-gradient-to-br dark:from-orange-950/30 dark:via-amber-950/20 dark:to-slate-950",
    },
  },
} as const;

export type FlowerThemeKey = keyof typeof flowerThemes;
