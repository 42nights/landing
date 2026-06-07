"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { SplitLines } from "@/components/motion/SplitLines";

// The cost contrast, kept simple but scroll-driven: the "~10%" pins on the
// right while the nine roles it replaces reveal one by one on the left as you
// scroll through the section.
const ROLES = [
  "Growth",
  "Outbound sales",
  "Reception & support",
  "Founder brand",
  "Browser copilot",
  "Security",
  "Recruiting",
  "Executive assistant",
  "Engineering",
];

export function VersusHire() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = el.querySelectorAll<HTMLElement>("[data-role]");

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(items, { autoAlpha: 1, x: 0 });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // One-shot stagger on enter (not scrub): a scrubbed reveal left the
        // tail roles stuck dim until the very end of the scroll range, which
        // sat past where the list rests in view. Play once so the whole list
        // reliably loads in when the section arrives.
        gsap.set(items, { autoAlpha: 0, x: -16 });
        gsap.to(items, {
          autoAlpha: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section className="relative mx-auto w-full max-w-page px-6 py-28 md:px-10 md:py-40">
      <p className="font-mono-label text-[11px] text-cream/45">The math</p>
      <SplitLines
        as="h2"
        onScroll
        stagger={0.09}
        className="mt-6 max-w-3xl font-serif-display text-[clamp(34px,5vw,68px)] leading-[1.0] text-cream"
      >
        Nine hires, or{" "}
        <span className="italic text-accentBright">one company brain</span>.
      </SplitLines>

      <div
        ref={ref}
        className="mt-16 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-16"
      >
        {/* What it replaces — roles reveal as you scroll */}
        <div>
          <p className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-cream/45">
            What it replaces
          </p>
          <ul className="mt-5">
            {ROLES.map((role) => (
              <li key={role} data-role className="py-3 text-base text-cream/75">
                {role}
              </li>
            ))}
          </ul>
        </div>

        {/* What it costs — pins while the roles scroll past */}
        <div className="md:sticky md:top-28 md:self-start">
          <p className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-accentBright/80">
            What it costs
          </p>
          <p className="mt-5 font-serif-display leading-none text-cream [font-size:clamp(72px,12vw,150px)]">
            ~<span className="text-accent">10%</span>
          </p>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-cream/60">
            of the cost of the team it replaces.
          </p>
        </div>
      </div>
    </section>
  );
}
