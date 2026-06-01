import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";

// Capabilities (DESIGN-SPEC §"Per-section briefs"): the three build modes
// (re-implement SaaS, build proprietary, modernize legacy) plus the ownership
// props. An editorial, asymmetric 12-col layout: a Fraunces section header + a
// mono index rail on the left, flat hairline-divided rows on the right. NOT
// identical cards. Negative space and hairlines do the dividing. Reveal stagger
// walks the rows in. The single accent moment lives on "~10%" in the cost row.

type Capability = {
  index: string;
  title: string;
  detail: string;
};

const CAPABILITIES: Capability[] = [
  {
    index: "01",
    title: "Re-implement the SaaS you rent",
    detail:
      "Rebuild the third-party tools you depend on as software that runs on your own infra. No seats, no renewals, no lock-in.",
  },
  {
    index: "02",
    title: "Build the software you can't buy",
    detail:
      "Proprietary internal tools, purpose-built for your workflows and owned outright by you.",
  },
  {
    index: "03",
    title: "Modernize what you can't touch",
    detail:
      "Reverse-engineer undocumented legacy systems and rebuild them clean, without the big-bang rewrite risk.",
  },
  {
    index: "04",
    title: "Runs on your infrastructure",
    detail:
      "Everything ships inside your walls: your cloud, your VPC, your hardware. Your data never leaves.",
  },
  {
    index: "05",
    title: "Source you own",
    detail:
      "You get the code, not a login. No vendor who can raise the price or take it back.",
  },
];

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative mx-auto w-full max-w-page px-6 py-20 md:px-10 md:py-28"
    >
      <div className="grid grid-cols-1 gap-y-14 md:grid-cols-12 md:gap-x-10">
        {/* Left rail: eyebrow + Fraunces header. Sticks while the rows scroll. */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <Reveal as="div" y={14} duration={0.8}>
              <div className="flex items-center gap-3">
                <span className="font-mono-label text-[10px] text-cream/65">
                  What we deliver
                </span>
                <span className="h-px w-8 bg-cream/15" />
                <span className="font-mono-label text-[10px] text-accentBright/80">
                  in-house
                </span>
              </div>
            </Reveal>

            <SplitLines
              as="h2"
              onScroll
              stagger={0.09}
              duration={1}
              className="mt-6 font-serif-display leading-[1.0] text-cream [font-size:clamp(34px,5vw,68px)]"
            >
              Your stack,
              <br />
              rebuilt to
              <br />
              <span className="italic text-cream/70">run in-house</span>.
            </SplitLines>

            <Reveal as="p" y={14} duration={0.8} delay={0.15}>
              <span className="mt-7 block max-w-sm text-base leading-relaxed text-cream/70">
                Not another SaaS subscription. The software you depend on,
                reverse-engineered and rebuilt to run on infrastructure you own.
              </span>
            </Reveal>
          </div>
        </div>

        {/* Right column: flat hairline-divided rows, mono index + title + detail. */}
        <div className="md:col-span-7">
          <Reveal stagger={0.1} y={18} duration={0.7}>
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.index}
                className="group grid grid-cols-[2.5rem_1fr] gap-x-5 border-b border-cream/[0.08] py-7 first:border-t first:border-cream/[0.08] md:gap-x-8 md:py-8"
              >
                <span className="font-mono-label pt-1 text-[11px] text-cream/50 transition-colors duration-200 group-hover:text-accentBright/70">
                  {cap.index}
                </span>
                <div>
                  <h3 className="text-lg font-medium leading-snug text-cream md:text-xl">
                    {cap.title}
                  </h3>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-cream/70 md:text-base">
                    {cap.detail}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>

          {/* The cost line: the one accent moment. Flat, no red block, glow on
              the figure only. */}
          <Reveal as="div" y={18} duration={0.8} delay={0.1}>
            <div className="mt-12 flex flex-col gap-2">
              <span className="font-mono-label text-[10px] text-cream/65">
                And the math
              </span>
              <p className="text-balance font-serif-display text-2xl leading-snug text-cream/85 md:text-3xl">
                All of it for{" "}
                <span className="italic text-accentBright">~10%</span> of the
                SaaS licenses and full-time engineers it replaces, and you own
                the result.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
