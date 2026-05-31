"use client";

import { createElement, useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";

type RevealProps = {
  as?: ElementType;
  /** translateY offset (px) the content rises from. */
  y?: number;
  duration?: number;
  delay?: number;
  /** If > 0, stagger the DIRECT children by this amount instead of animating the container as one block. */
  stagger?: number;
  /** ScrollTrigger start position. */
  start?: string;
  /** Only play once (do not replay on scroll-up). */
  once?: boolean;
  className?: string;
  children?: ReactNode;
};

export function Reveal({
  as = "div",
  y = 24,
  duration = 0.9,
  delay = 0,
  stagger = 0,
  start = "top 85%",
  once = true,
  className,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      // Reduced motion: render statically, no transform, no scroll trigger.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const targets = stagger > 0 ? Array.from(el.children) : el;
        gsap.set(targets, { clearProps: "all", opacity: 1, y: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = stagger > 0 ? Array.from(el.children) : el;

        gsap.from(targets, {
          y,
          autoAlpha: 0,
          duration,
          delay,
          ease: "power3.out",
          stagger: stagger > 0 ? stagger : 0,
          scrollTrigger: {
            trigger: el,
            start,
            once,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return createElement(as, { ref, className }, children);
}
