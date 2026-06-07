"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    n: "01",
    title: "Connect.",
    body: "Our platform maps the SaaS, data, and legacy systems you run on, learning how your stack actually works.",
    drift: 0.07,
  },
  {
    n: "02",
    title: "Rebuild.",
    body: "Our agents reverse-engineer those systems and regenerate them as software that runs in your own environment, fully under your control.",
    drift: -0.05,
  },
  {
    n: "03",
    title: "Deploy.",
    body: "It goes live inside your walls, run by self-evolving agents on a closed loop that maintains and improves it in place.",
    drift: 0.07,
  },
];

export function HowItWorks() {
  const pipeRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // Scrubbed pipeline: the accent connector draws left to right (scaleX) as the
  // section passes, and each node's core pops in as the line reaches it. (A
  // scaleX line is the robust equivalent of DrawSVG for a straight connector —
  // no stretched-viewBox dash-length issues.)
  useGSAP(
    () => {
      const pipe = pipeRef.current;
      const line = lineRef.current;
      if (!pipe || !line) return;
      const dots = pipe.querySelectorAll<HTMLElement>("[data-node]");

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(line, { scaleX: 1 });
        gsap.set(dots, { scale: 1, autoAlpha: 1 });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(dots, { scale: 0, autoAlpha: 0, transformOrigin: "center" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pipe,
            start: "top 75%",
            end: "top 40%",
            scrub: 0.5,
          },
        });
        tl.to(line, { scaleX: 1, duration: 3, ease: "none" }, 0);
        dots.forEach((d, i) => {
          tl.to(
            d,
            { scale: 1, autoAlpha: 1, duration: 0.4, ease: "back.out(2)" },
            0.2 + i * 1.2,
          );
        });
      });
      return () => mm.revert();
    },
    { scope: pipeRef },
  );

  return (
    <section className="py-28 md:py-40">
      <div className="mx-auto max-w-page px-6 md:px-10">
        <Reveal
          as="p"
          y={14}
          duration={0.8}
          className="font-mono-label text-[11px] text-cream/45"
        >
          How it works
        </Reveal>

        <div ref={pipeRef} className="mt-16 md:mt-24">
          {/* Connector: nodes + drawn line (md+ only). */}
          <div className="relative mb-12 hidden md:block">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-cream/[0.12]" />
            <div
              ref={lineRef}
              className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-accent"
            />
            <div className="relative flex justify-between">
              {steps.map((s) => (
                <span
                  key={s.n}
                  className="grid h-4 w-4 place-items-center rounded-full bg-bg ring-1 ring-cream/20"
                >
                  <span
                    data-node
                    className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_-1px_rgba(215,38,56,0.9)]"
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Step text. */}
          <Reveal
            as="div"
            y={32}
            duration={0.9}
            stagger={0.1}
            className="grid gap-x-12 gap-y-16 md:grid-cols-3"
          >
            {steps.map((s) => (
              <div key={s.n} className="relative pt-16 md:pt-8">
                <Parallax
                  speed={s.drift}
                  className="pointer-events-none absolute left-0 top-0 md:-top-2"
                >
                  <span
                    aria-hidden
                    className="block select-none font-serif-display leading-[0.8] text-cream/[0.06] [font-size:clamp(96px,12vw,176px)]"
                  >
                    {s.n}
                  </span>
                </Parallax>

                <h3 className="relative font-serif-display leading-[1.0] tracking-[-0.025em] text-cream [font-size:clamp(28px,3.4vw,40px)]">
                  {s.title}
                </h3>

                <p className="relative mt-4 max-w-[36ch] text-base leading-relaxed text-cream/70">
                  {s.body}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
