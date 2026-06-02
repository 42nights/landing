import type { Config } from "tailwindcss";

const config: Config = {
  // Theme is driven by a `dark` class on <html> (default = light). Most colors
  // resolve through CSS variables (see globals.css) so existing token classes
  // (bg-void, text-cream, bg-surface, …) flip automatically between themes; the
  // `dark:` variant is reserved for the few spots that can't be expressed as a
  // single variable (e.g. force-inverted logo filters, the Moat radial wash).
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic tokens — prefer these in new/rewritten code. Channels live in
        // globals.css; the <alpha-value> placeholder lets /opacity modifiers work.
        bg: "rgb(var(--bg) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        elev: "rgb(var(--bg-elev) / <alpha-value>)",
        elev2: "rgb(var(--bg-elev2) / <alpha-value>)",
        line: "var(--line)",
        lineSoft: "var(--line-soft)",
        onAccent: "rgb(var(--on-accent) / <alpha-value>)",
        // Legacy tokens, remapped onto the same variables so the existing
        // dark-cinematic markup keeps working and now flips with the theme.
        void: "rgb(var(--bg) / <alpha-value>)",
        ink: "rgb(var(--fg) / <alpha-value>)",
        surface: "rgb(var(--bg-elev) / <alpha-value>)",
        surface2: "rgb(var(--bg-elev2) / <alpha-value>)",
        cream: "rgb(var(--fg) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        accentBright: "rgb(var(--accent-bright) / <alpha-value>)",
        muted: "rgb(var(--fg-muted) / <alpha-value>)",
        mutedSoft: "rgb(var(--fg-soft) / <alpha-value>)",
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
