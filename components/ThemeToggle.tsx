"use client";

import { useEffect, useState } from "react";

// Toggles the `dark` class on <html> and persists the choice. Default is light;
// the no-flash script in layout.tsx applies a saved "dark" before first paint.
// Renders a fixed-size button immediately and only resolves the icon after
// mount, so the server/client markup matches (no hydration mismatch).
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);

    // Follow the OS live, but only while the user hasn't made an explicit choice.
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystem = () => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem("theme");
      } catch {
        // ignore
      }
      if (stored) return;
      document.documentElement.classList.toggle("dark", mq.matches);
      setIsDark(mq.matches);
    };
    mq.addEventListener("change", onSystem);
    return () => mq.removeEventListener("change", onSystem);
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // ignore (private mode / disabled storage)
    }
    setIsDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="btn-press inline-grid h-9 w-9 place-items-center rounded-2xl text-fg/60 transition-colors hover:text-fg"
    >
      {/* Until mounted, render nothing inside so SSR and first client render
          agree; the box keeps its size so layout doesn't shift. */}
      {mounted &&
        (isDark ? (
          // Sun — click to go light
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
          </svg>
        ) : (
          // Moon — click to go dark
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        ))}
    </button>
  );
}
