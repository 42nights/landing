"use client";

import { createElement, useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

/**
 * Scrub-linked word reveal. Splits the element into words, sets them to a dim
 * baseline, then scrubs each up to full opacity sequentially as the section
 * scrolls through — the cinematic "text lights up word by word" effect. Nested
 * inline color (e.g. an accent <span>) is preserved by SplitText. Reduced
 * motion shows the text statically at full opacity.
 */
type ScrubWordsProps = {
  as?: ElementType;
  /** Baseline opacity each word starts (and sits at, out of view) from. */
  dim?: number;
  /** ScrollTrigger start / end for the scrub window. */
  start?: string;
  end?: string;
  className?: string;
  children?: ReactNode;
};

export function ScrubWords({
  as = "h2",
  dim = 0.14,
  start = "top 78%",
  end = "top 32%",
  className,
  children,
}: ScrubWordsProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      // Hidden pre-paint (useGSAP runs before paint, no flash); base state stays
      // visible for SSR / no-JS / crawlers.
      gsap.set(el, { autoAlpha: 0 });

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { autoAlpha: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(el, { autoAlpha: 1 });

        let split: SplitText | null = null;
        try {
          split = new SplitText(el, {
            type: "words",
            wordsClass: "scrub-word",
          });
          gsap.fromTo(
            split.words,
            { opacity: dim },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: { trigger: el, start, end, scrub: true },
            },
          );
        } catch {
          gsap.set(el, { autoAlpha: 1 });
        }

        return () => split?.revert();
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return createElement(as, { ref, className }, children);
}
