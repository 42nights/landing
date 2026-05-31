"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { Wordmark } from "./Wordmark";

// Nav (DESIGN-SPEC §2 + §4): no resting border, flat at rest. Separation from
// the Hero is whitespace. A subtle elevation (translucent backdrop blur + a low
// shadow) fades in only after the page scrolls past ~24px, driven by a
// ScrollTrigger boolean that toggles paint-only properties (background /
// box-shadow). Sticky so the bar stays in view to earn the scroll state.
export function Nav() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      // Reduced motion: skip the scroll-linked fade, show the elevated state
      // immediately so the bar is always legible over content.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, {
          backgroundColor: "rgba(8,8,10,0.72)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 1px 0 rgba(247,245,241,0.08)",
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const elevate = gsap.to(el, {
          backgroundColor: "rgba(8,8,10,0.72)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 1px 0 rgba(247,245,241,0.08)",
          duration: 0.3,
          ease: "power3.out",
          paused: true,
        });

        ScrollTrigger.create({
          start: "24px top",
          onToggle: (self) =>
            self.isActive ? elevate.play() : elevate.reverse(),
        });
      });
    },
    { scope: ref },
  );

  return (
    <nav
      ref={ref}
      className="sticky top-0 z-50 w-full bg-transparent"
      style={{ backdropFilter: "blur(0px)" }}
    >
      <div className="mx-auto flex max-w-page items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="text-xl tracking-tight">
          <Wordmark />
        </Link>
        {/* TODO: replace placeholder cal.com link before launch */}
        <a
          href="https://cal.com/42nights"
          className="btn-press rounded-lg border border-cream/15 bg-cream/[0.04] px-4 py-2 text-sm text-cream/90 backdrop-blur-sm transition-colors hover:border-accent/60 hover:bg-accent hover:text-white"
        >
          Book a call
        </a>
      </div>
    </nav>
  );
}
