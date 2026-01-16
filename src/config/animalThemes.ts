// Animal theme configuration for Media Tools
export interface AnimalTheme {
  name: string;
  slug: string;
  image: string;
  significance: string;
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
}

export const animalThemes = {
  gorilla: {
    name: "Gorilla",
    slug: "gorilla",
    image: "/images/animals/gorilla.jpg",
    significance: "Represents strength, power, and efficient compression — making your files smaller.",
    colors: {
      primary: "#374151",
      secondary: "#4B5563",
      accent: "#E5E7EB",
      glow: "rgba(75, 85, 99, 0.3)",
      text: "#1F2937",
      textDark: "#F3F4F6",
    },
    gradient: {
      light: "from-slate-400 to-gray-600",
      dark: "from-slate-600 to-gray-800",
    },
    bgGradient: {
      light: "from-slate-50 via-gray-50 to-slate-100",
      dark: "from-slate-950 via-gray-950 to-slate-900",
    },
  },
  lion: {
    name: "Lion",
    slug: "lion",
    image: "/images/animals/lion.jpg",
    significance: "Represents strength, stability, and solid foundations — essential for format conversion.",
    colors: {
      primary: "#B45309",
      secondary: "#D97706",
      accent: "#FEF3C7",
      glow: "rgba(217, 119, 6, 0.3)",
      text: "#78350F",
      textDark: "#FEF3C7",
    },
    gradient: {
      light: "from-amber-400 to-orange-600",
      dark: "from-amber-600 to-orange-800",
    },
    bgGradient: {
      light: "from-amber-50 via-orange-50 to-yellow-50",
      dark: "from-amber-950 via-orange-950 to-yellow-950",
    },
  },
  giraffe: {
    name: "Giraffe",
    slug: "giraffe",
    image: "/images/animals/giraffe.jpg",
    significance: "Represents elegance, inner strength, and the intricate complexity of resizing with precision.",
    colors: {
      primary: "#92400E",
      secondary: "#B45309",
      accent: "#FEF3C7",
      glow: "rgba(146, 64, 14, 0.3)",
      text: "#78350F",
      textDark: "#FDE68A",
    },
    gradient: {
      light: "from-orange-400 to-amber-600",
      dark: "from-orange-600 to-amber-800",
    },
    bgGradient: {
      light: "from-orange-50 via-amber-50 to-yellow-50",
      dark: "from-orange-950 via-amber-950 to-yellow-950",
    },
  },
  wolf: {
    name: "Wolf",
    slug: "wolf",
    image: "/images/animals/wolf.jpg",
    significance: "Symbolizes diversity and transformation — the art of combining distinct elements into a beautiful whole.",
    colors: {
      primary: "#475569",
      secondary: "#64748B",
      accent: "#E2E8F0",
      glow: "rgba(100, 116, 139, 0.3)",
      text: "#334155",
      textDark: "#E2E8F0",
    },
    gradient: {
      light: "from-slate-400 to-gray-600",
      dark: "from-slate-600 to-gray-800",
    },
    bgGradient: {
      light: "from-slate-50 via-gray-50 to-slate-100",
      dark: "from-slate-950 via-gray-950 to-slate-900",
    },
  },
  horse: {
    name: "Horse",
    slug: "horse",
    image: "/images/animals/horse.jpg",
    significance: "Represents speed, freedom, and graceful power — swift processing for your images.",
    colors: {
      primary: "#78350F",
      secondary: "#92400E",
      accent: "#FDE68A",
      glow: "rgba(120, 53, 15, 0.3)",
      text: "#451A03",
      textDark: "#FEF3C7",
    },
    gradient: {
      light: "from-amber-600 to-orange-700",
      dark: "from-amber-800 to-orange-900",
    },
    bgGradient: {
      light: "from-amber-50 via-orange-50 to-yellow-50",
      dark: "from-amber-950 via-orange-950 to-yellow-950",
    },
  },
} as const;

export type AnimalThemeKey = keyof typeof animalThemes;
