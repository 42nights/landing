import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "rgb(var(--void-rgb) / <alpha-value>)",
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        surface2: "rgb(var(--surface-2-rgb) / <alpha-value>)",
        cream: "rgb(var(--cream-rgb) / <alpha-value>)",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        accentBright: "rgb(var(--accent-bright-rgb) / <alpha-value>)",
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
        mutedSoft: "rgb(var(--muted-soft-rgb) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        serif: ["Fraunces", "Georgia", "serif"],
      },
      maxWidth: {
        page: "1280px",
      },
      boxShadow: {
        glow: "0 0 50px -10px rgba(215,38,56,0.65), 0 0 0 1px rgba(255,59,80,0.25)",
        glowSoft: "0 0 70px -20px rgba(215,38,56,0.45)",
        lift: "0 30px 60px -20px rgba(0,0,0,0.6)",
      },
      keyframes: {
        marqueeLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseRing: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(215,38,56,0.5)" },
          "50%": { boxShadow: "0 0 0 10px rgba(215,38,56,0)" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.7" },
          "50%": { transform: "translateY(6px)", opacity: "1" },
        },
      },
      animation: {
        "marquee-left": "marqueeLeft 60s linear infinite",
        "pulse-ring": "pulseRing 2s ease-out infinite",
        bob: "bob 2.4s var(--ease-in-out) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
