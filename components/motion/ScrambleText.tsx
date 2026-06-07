"use client";

import { createElement, useRef, type ElementType } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrambleTextPlugin);
}

/**
 * Decode-in text reveal. Renders the final string for SSR / no-JS, then on mount
 * scrambles it in place and resolves to the final characters — the "decoding"
 * effect. `onScroll` gates it to a scroll trigger; default fires on load (hero).
 * Reduced motion shows the final text immediately.
 */
type ScrambleTextProps = {
  as?: ElementType;
  text: string;
  duration?: number;
  delay?: number;
  /** ScrambleText character pool (preset name or custom string). */
  chars?: string;
  onScroll?: boolean;
  start?: string;
  className?: string;
};

export function ScrambleText({
  as = "span",
  text,
  duration = 1.2,
  delay = 0,
  chars = "upperCase",
  onScroll = false,
  start = "top 85%",
  className,
}: ScrambleTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      // Hidden pre-paint (useGSAP runs before paint); base text stays in the DOM
      // for SSR / crawlers.
      gsap.set(el, { autoAlpha: 0 });

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        el.textContent = text;
        gsap.set(el, { autoAlpha: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(el, { autoAlpha: 1 });
        gsap.to(el, {
          duration,
          delay,
          ease: "none",
          scrambleText: {
            text,
            chars,
            revealDelay: duration * 0.25,
            speed: 0.5,
          },
          ...(onScroll
            ? { scrollTrigger: { trigger: el, start, once: true } }
            : {}),
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return createElement(as, { ref, className }, text);
}
