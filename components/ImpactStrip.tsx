"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { LogoScroll } from "./LogoScroll";

// A proof band right under the hero: four figures that count up as they scroll
// into view, with the client logos below. Cost lives in the "vs a team"
// section, so these are breadth / activity figures, not price.
type Stat = {
  to: number;
  format?: (n: number) => string;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { to: 9, suffix: " in 1", label: "functions, one company brain" },
  { to: 30, suffix: "+", label: "companies served" },
  { to: 0, label: "vendors in the loop" },
];

export function ImpactStrip() {
  return (
    <div className="relative">
      <div className="mx-auto max-w-page px-6 py-10 md:px-10">
        <p className="mb-7 text-center font-mono-label text-[10px] text-mutedSoft">
          Clients backed by
        </p>
        <LogoScroll />
      </div>

      <div className="mx-auto grid max-w-page grid-cols-1 gap-x-8 gap-y-10 px-6 py-14 sm:grid-cols-3 md:px-10 md:py-16">
        {STATS.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </div>
  );
}

function Stat({ to, format, suffix, label }: Stat) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const fmt = (v: number) => (format ? format(v) : String(Math.round(v)));
      const obj = { v: 0 };

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        el.textContent = fmt(to);
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        el.textContent = fmt(0); // seat at 0 pre-paint (no flash of the final)
        gsap.to(obj, {
          v: to,
          duration: 1.6,
          ease: "power2.out",
          snap: { v: 1 },
          onUpdate: () => {
            el.textContent = fmt(obj.v);
          },
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-baseline justify-center whitespace-nowrap font-serif-display leading-none tracking-tight text-cream [font-size:clamp(40px,5vw,72px)]">
        <span ref={ref}>{format ? format(to) : String(to)}</span>
        {suffix && (
          <span className="ml-1 text-[0.4em] text-accent">{suffix}</span>
        )}
      </div>
      <span className="mt-3 max-w-[18ch] text-sm leading-snug text-cream/55">
        {label}
      </span>
    </div>
  );
}
