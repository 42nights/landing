"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";

// A plain down-chevron that bobs up and down. GSAP yoyo loop replaces the old
// CSS bob; reduced motion holds it still.
export function ScrollCue() {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to(el, {
          y: 8,
          duration: 0.9,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        return () => tween.kill();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { y: 0 });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-cream/40"
      aria-hidden
    >
      <path d="M5 8.5 L12 15.5 L19 8.5" />
    </svg>
  );
}
