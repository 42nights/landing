"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";
import { ThemeToggle } from "./ThemeToggle";

// Floating capsule that slides/fades in once the page scrolls past the top
// header (~140px). Hidden + non-interactive at the very top.
export function FloatingNav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 140);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 top-3 z-50 px-4 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] md:top-5 ${
        show ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
      }`}
      aria-hidden={!show}
    >
      <div
        className={`mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-2xl border border-cream/10 bg-[rgb(var(--void-rgb)/0.72)] px-4 py-2.5 shadow-lift backdrop-blur-md md:px-5 ${
          show ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <Link href="/" className="text-xl tracking-tight">
          <Wordmark />
        </Link>
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          {/* TODO: replace placeholder cal.com link before launch */}
          <a
            href="https://cal.com/42nights"
            className="btn-press rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accentBright"
          >
            Book a call
          </a>
        </div>
      </div>
    </div>
  );
}
