import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      colors: {
        background: "#09090B",
        surface: "#0F1117",
        card: "#111827",
        "card-secondary": "#161D2E",
        border: "rgba(255,255,255,0.07)",
        "border-hover": "rgba(255,255,255,0.12)",
        primary: {
          DEFAULT: "#6366F1",
          hover: "#5558E8",
          glow: "rgba(99,102,241,0.25)",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#8B5CF6",
          foreground: "#ffffff",
        },
        success: {
          DEFAULT: "#10B981",
          glow: "rgba(16,185,129,0.2)",
          foreground: "#ffffff",
        },
        danger: {
          DEFAULT: "#EF4444",
          foreground: "#ffffff",
        },
        amber: {
          DEFAULT: "#F59E0B",
        },
        text: {
          primary: "#F9FAFB",
          secondary: "#9CA3AF",
          muted: "#6B7280",
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #6366F1, #8B5CF6)",
        "gradient-card":
          "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))",
      },
      boxShadow: {
        primary: "0 4px 15px rgba(99,102,241,0.3)",
        "primary-lg": "0 8px 30px rgba(99,102,241,0.4)",
        card: "0 1px 3px rgba(0,0,0,0.4)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
