/**
 * LogoScroll — the consolidated credibility band.
 * Real sourced logo marks for the backers we have art for, plus wordmarks for
 * the rest, separated by a quiet middot rhythm. Edge-masked GSAP marquee:
 * a seamless infinite x-loop, paused on hover and under reduced motion.
 */
"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";

type Item =
  | { kind: "logo"; src: string; alt: string; h: number; filter?: boolean }
  | { kind: "text"; label: string };

const ITEMS: Item[] = [
  {
    kind: "logo",
    src: "/logos/yc.svg",
    alt: "Y Combinator",
    h: 34,
    filter: true,
  },
  { kind: "logo", src: "/logos/a16z.png", alt: "a16z", h: 42 },
  { kind: "logo", src: "/logos/hf0.png", alt: "HF0", h: 44 },
  { kind: "logo", src: "/logos/lightyear.svg", alt: "HF0 Lightyear", h: 26 },
  { kind: "logo", src: "/logos/susa.png", alt: "Susa Ventures", h: 40 },
  {
    kind: "logo",
    src: "/logos/openai.svg",
    alt: "OpenAI",
    h: 34,
    filter: true,
  },
  {
    kind: "logo",
    src: "/logos/anthropic.svg",
    alt: "Anthropic",
    h: 22,
    filter: true,
  },
  { kind: "logo", src: "/logos/afore.webp", alt: "Afore Capital", h: 40 },
];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((it, i) => (
        <span key={`${it.kind}-${i}`} className="flex items-center">
          <span aria-hidden className="select-none px-7 text-cream/20">
            &middot;
          </span>
          {it.kind === "logo" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={it.src}
              alt={it.alt}
              style={{ height: it.h }}
              className={`w-auto select-none opacity-75 ${
                it.filter
                  ? // Black-source marks: black in light, white in dark.
                    "[filter:brightness(0)] dark:[filter:brightness(0)_invert(1)]"
                  : // White-source art (a16z, hf0, lightyear, susa, afore):
                    // invert to dark in light (keeps internal shading), keep the
                    // original white in dark.
                    "[filter:invert(1)] dark:[filter:none]"
              }`}
              draggable={false}
            />
          ) : (
            <span className="whitespace-nowrap text-xl font-medium leading-none text-cream/55 md:text-2xl">
              {it.label}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

export function LogoScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const mm = gsap.matchMedia();

      // Two identical rows; sliding the track by -50% wraps seamlessly.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to(track, {
          xPercent: -50,
          duration: 60,
          ease: "none",
          repeat: -1,
        });
        tweenRef.current = tween;
        return () => tween.kill();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(track, { xPercent: 0 });
      });

      return () => mm.revert();
    },
    { scope: trackRef },
  );

  return (
    <div
      className="marquee-mask overflow-hidden"
      onPointerEnter={() => tweenRef.current?.pause()}
      onPointerLeave={() => tweenRef.current?.resume()}
    >
      <div ref={trackRef} className="flex w-max">
        <Row />
        <Row />
      </div>
    </div>
  );
}
