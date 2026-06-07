"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { ThemeToggle } from "./ThemeToggle";
import { Wordmark } from "./Wordmark";

// Floating-island colors per theme. The morph is driven by GSAP (inline styles),
// so it can't ride the CSS variables — read the active theme and pick a set.
const ISLAND = {
  dark: {
    bg: "rgba(14,14,18,0.72)",
    bgFlat: "rgba(14,14,18,0)",
    border: "rgba(247,245,241,0.1)",
    borderFlat: "rgba(247,245,241,0)",
    shadow: "0 16px 34px -16px rgba(0,0,0,0.65)",
  },
  light: {
    bg: "rgba(255,255,255,0.78)",
    bgFlat: "rgba(255,255,255,0)",
    border: "rgba(10,10,10,0.1)",
    borderFlat: "rgba(10,10,10,0)",
    shadow: "0 16px 34px -16px rgba(0,0,0,0.18)",
  },
};
const island = () =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("dark")
    ? ISLAND.dark
    : ISLAND.light;

// Nav: full-width + flat at rest. Past ~24px it morphs (GSAP) into a floating
// island — narrower, dropped from the top, blurred, bordered, lifted — and
// expands back to full-width at the very top AND as the page end nears.
// Hovering the floating bar lengthens it. Center holds one number per section;
// the active number lights up (color + scale) and animates as you scroll, and
// clicking a number navigates to that section.
export function Nav() {
  const barRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const floating = useRef(false);
  const hovering = useRef(false);
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(0);

  // Morph the bar to its target shape from the combined scroll + hover state.
  // maxWidth/marginTop/padding are layout, but this is a one-shot 0.4s toggle,
  // not a per-frame scrub, so it stays cheap.
  function shape() {
    const bar = barRef.current;
    if (!bar) return;
    const f = floating.current;
    const p = island();
    gsap.to(bar, {
      // Rest: fill the full viewport width, flush to the top edge, square. On
      // scroll: shrink horizontally to a centered bar that still hangs flush
      // from the top (no top gap) with only its bottom corners rounded. Animate
      // `width` (not max-width — gsap can't tween max-width from its "none"
      // default, so it silently no-ops).
      width: !f ? window.innerWidth : hovering.current ? 1260 : 1200,
      marginTop: 0,
      paddingTop: f ? 16 : 20,
      paddingBottom: f ? 16 : 20,
      backgroundColor: f ? p.bg : p.bgFlat,
      backdropFilter: f ? "blur(12px)" : "blur(0px)",
      borderColor: f ? p.border : p.borderFlat,
      borderBottomLeftRadius: f ? 16 : 0,
      borderBottomRightRadius: f ? 16 : 0,
      boxShadow: f ? p.shadow : "0 0 0 0 rgba(0,0,0,0)",
      duration: 0.4,
      ease: "power3.out",
    });
  }

  useGSAP(
    () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main > section"),
      );
      sectionsRef.current = sections;
      setCount(sections.length);

      // Seat a numeric max-width baseline up front: the bar carries no
      // max-width class, so without this the first shrink tween would have a
      // "none" start value and gsap would silently skip animating max-width.
      gsap.set(barRef.current, { width: window.innerWidth });

      const mm = gsap.matchMedia();

      // Reduced motion: park in the floating state, no scroll-linked morph.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        floating.current = true;
        const p = island();
        gsap.set(barRef.current, {
          width: 1200,
          marginTop: 0,
          paddingTop: 16,
          paddingBottom: 16,
          backgroundColor: p.bg,
          backdropFilter: "blur(12px)",
          borderColor: p.border,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          boxShadow: p.shadow,
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const triggers: ScrollTrigger[] = [];

        // Float only in the body of the page: collapse at the top and as the
        // end nears (~half a viewport before the bottom).
        triggers.push(
          ScrollTrigger.create({
            start: "24px top",
            end: () =>
              "+=" +
              Math.max(
                1,
                ScrollTrigger.maxScroll(window) - window.innerHeight * 0.5 - 24,
              ),
            invalidateOnRefresh: true,
            onToggle: (self) => {
              floating.current = self.isActive;
              shape();
            },
          }),
        );

        // Active section -> the lit number.
        sections.forEach((sec, i) => {
          triggers.push(
            ScrollTrigger.create({
              trigger: sec,
              start: "top center",
              end: "bottom center",
              onToggle: (self) => self.isActive && setActive(i),
            }),
          );
        });

        return () => triggers.forEach((t) => t.kill());
      });

      return () => mm.revert();
    },
    { scope: barRef },
  );

  // Re-apply island colors when the theme toggles (the morph is inline-styled).
  useEffect(() => {
    const obs = new MutationObserver(() => shape());
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  // The section numbers double as keybinds: press 0–9 to jump to that section.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      )
        return;
      if (e.key >= "0" && e.key <= "9") {
        const i = Number(e.key);
        if (i < sectionsRef.current.length) {
          e.preventDefault();
          go(i);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function go(i: number) {
    sectionsRef.current[i]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <nav className="sticky top-0 z-50 w-full">
      <div
        ref={barRef}
        onPointerEnter={() => {
          hovering.current = true;
          shape();
        }}
        onPointerLeave={() => {
          hovering.current = false;
          shape();
        }}
        className="relative mx-auto flex items-center justify-between border border-transparent px-6 py-5 md:px-10"
      >
        <Link href="/" className="text-xl tracking-tight">
          <Wordmark />
        </Link>

        {/* Center: one number per section; the active one lights up + scales.
            Absolutely centered so the cluster sits dead-center on the page
            regardless of the differing left (wordmark) and right (toggle + CTA)
            widths. */}
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 md:flex">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-current={active === i ? "true" : undefined}
              aria-label={`Go to section ${i} (press ${i})`}
              title={`Press ${i}`}
              className={`grid h-7 w-6 place-items-center font-mono-label text-[12px] transition-all duration-300 ${
                active === i
                  ? "scale-110 text-accentBright"
                  : "text-fg/35 hover:text-fg/70"
              }`}
            >
              {i}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {/* TODO: replace placeholder cal.com link before launch */}
          <a
            href="https://cal.com/42nights"
            className="btn-press rounded-2xl border border-fg/15 bg-fg/[0.04] px-4 py-2 text-sm text-fg/90 backdrop-blur-sm transition-colors hover:border-accent/60 hover:bg-accent hover:text-white"
          >
            Book a call
          </a>
        </div>
      </div>
    </nav>
  );
}
