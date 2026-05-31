"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";

type ParallaxProps = {
  /**
   * Drift amount as a fraction of the element height. Positive => moves slower
   * than scroll (drifts up relative to content). yPercent travels ~ speed*100
   * across the scrub window.
   */
  speed?: number;
  className?: string;
  children?: ReactNode;
};

export function Parallax({ speed = 0.15, className, children }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      // Reduced motion: no transform at all.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { clearProps: "all", yPercent: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const travel = speed * 100;
        gsap.fromTo(
          el,
          { yPercent: -travel / 2 },
          {
            yPercent: travel / 2,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
