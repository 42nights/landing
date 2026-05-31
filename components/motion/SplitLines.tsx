"use client";

import { createElement, useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

/**
 * Per-line clip-mask reveal via SplitText.
 *
 * CONTRACT NOTE: this extends the §7 spec contract with one optional prop,
 * `onScroll` (default false). §4 Hero requires the headline to fire ON LOAD,
 * not on scroll, so the default behavior fires immediately and `start` only
 * gates the trigger when `onScroll` is true. All §7 contract props
 * (as, stagger, duration, start, className) are preserved with the same
 * export name; this is purely additive. A caller expecting `start` alone to
 * drive scroll behavior should instead set `onScroll={true}`.
 */
type SplitLinesProps = {
  as?: ElementType;
  /** Per-line stagger amount. */
  stagger?: number;
  duration?: number;
  /** ScrollTrigger start. Only applied when `onScroll` is true. */
  start?: string;
  /**
   * Extends the §7 contract: fire on scroll into view (at `start`, once)
   * instead of on load. Default false so the Hero fires immediately. Set
   * true for a scroll-triggered variant.
   */
  onScroll?: boolean;
  className?: string;
  children?: ReactNode;
};

export function SplitLines({
  as = "h1",
  stagger = 0.08,
  duration = 1,
  start = "top 85%",
  onScroll = false,
  className,
  children,
}: SplitLinesProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      // Hide client-side here (useGSAP runs in a pre-paint layout effect, so no
      // flash) rather than via inline CSS — that keeps the text visible for
      // SSR / no-JS / crawlers, which a permanent inline visibility:hidden broke.
      gsap.set(el, { autoAlpha: 0 });

      const mm = gsap.matchMedia();

      // Reduced motion: show instantly, no split, no transform.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { autoAlpha: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Ensure the element is visible before SplitText measures lines.
        gsap.set(el, { autoAlpha: 1 });

        let split: SplitText | null = null;
        let revert: (() => void) | null = null;

        const animate = (lines: Element[]) => {
          gsap.from(lines, {
            yPercent: 135,
            duration,
            ease: "expo.out",
            stagger,
            ...(onScroll
              ? { scrollTrigger: { trigger: el, start, once: true } }
              : {}),
          });
        };

        try {
          split = new SplitText(el, {
            type: "lines",
            linesClass: "split-line",
          });
          // Each line sits inside a clip mask so the translate reads as a wipe.
          const lines = split.lines as HTMLElement[];
          lines.forEach((line) => {
            const wrap = document.createElement("span");
            wrap.style.display = "block";
            // Clip vertically for the wipe, but pad horizontally (with a
            // compensating negative margin) so italic glyph overhang on the
            // first/last letters is never cut at the edges. Alignment is
            // unchanged; only the clip box grows sideways.
            wrap.style.overflow = "hidden";
            // Pad the clip box on every side (with compensating negative margins
            // so layout/alignment is unchanged) — horizontal room for italic
            // overhang, vertical room so ascenders/descenders are never cut. The
            // reveal starts at yPercent 135 so the line still hides past the
            // enlarged bottom padding.
            wrap.style.paddingLeft = "0.3em";
            wrap.style.paddingRight = "0.3em";
            wrap.style.paddingTop = "0.14em";
            wrap.style.paddingBottom = "0.22em";
            wrap.style.marginLeft = "-0.3em";
            wrap.style.marginRight = "-0.3em";
            wrap.style.marginTop = "-0.14em";
            wrap.style.marginBottom = "-0.22em";
            line.parentNode?.insertBefore(wrap, line);
            wrap.appendChild(line);
          });
          revert = () => split?.revert();
          animate(lines);
        } catch {
          // Fallback: whole-element reveal keeps the same export + behavior.
          animate([el]);
        }

        return () => revert?.();
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  // Render visible by default: with JS, useGSAP hides it pre-paint then reveals
  // it (no flash); without JS, the headline stays visible for SSR / crawlers.
  return createElement(as, { ref, className }, children);
}
