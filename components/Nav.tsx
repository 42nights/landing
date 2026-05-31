"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { Wordmark } from "./Wordmark";

// Nav: full-width + flat at rest. Past ~24px it morphs (GSAP) into a floating
// island — narrower, dropped from the top, , blurred, bordered, lifted —
// and expands back to full-width at the very top AND as the page end nears.
// Hovering the floating bar lengthens it. Center holds one number per section;
// the active number lights up (color + scale) and animates as you scroll, and
// clicking a number navigates to that section. No highlight box — just numbers.
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
    gsap.to(bar, {
      maxWidth: !f ? 1280 : hovering.current ? 1260 : 1200,
      marginTop: f ? 12 : 0,
      paddingTop: f ? 16 : 20,
      paddingBottom: f ? 16 : 20,
      backgroundColor: f ? "rgba(14,14,18,0.72)" : "rgba(14,14,18,0)",
      backdropFilter: f ? "blur(12px)" : "blur(0px)",
      borderColor: f ? "rgba(247,245,241,0.1)" : "rgba(247,245,241,0)",
      boxShadow: f
        ? "0 16px 34px -16px rgba(0,0,0,0.65)"
        : "0 0 0 0 rgba(0,0,0,0)",
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

      const mm = gsap.matchMedia();

      // Reduced motion: park in the floating state, no scroll-linked morph.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        floating.current = true;
        gsap.set(barRef.current, {
          maxWidth: 1200,
          marginTop: 12,
          paddingTop: 16,
          paddingBottom: 16,
          backgroundColor: "rgba(14,14,18,0.72)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(247,245,241,0.1)",
          boxShadow: "0 16px 34px -16px rgba(0,0,0,0.65)",
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
        className="mx-auto flex max-w-page items-center justify-between  border border-transparent px-6 py-5 md:px-10"
      >
        <Link href="/" className="text-xl tracking-tight">
          <Wordmark />
        </Link>

        {/* Center: one number per section; the active one lights up + scales. */}
        <div className="hidden items-center gap-2 md:flex">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-current={active === i ? "true" : undefined}
              aria-label={`Go to section ${i}`}
              className={`grid h-7 w-6 place-items-center font-mono-label text-[12px] transition-all duration-300 ${
                active === i
                  ? "scale-110 text-accentBright"
                  : "text-cream/35 hover:text-cream/70"
              }`}
            >
              {i}
            </button>
          ))}
        </div>

        {/* TODO: replace placeholder cal.com link before launch */}
        <a
          href="https://cal.com/42nights"
          className="btn-press  border border-cream/15 bg-cream/[0.04] px-4 py-2 text-sm text-cream/90 backdrop-blur-sm transition-colors hover:border-accent/60 hover:bg-accent hover:text-white"
        >
          Book a call
        </a>
      </div>
    </nav>
  );
}
