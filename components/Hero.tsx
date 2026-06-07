// Local light hero, single column. The headline decodes in on load via
// ScrambleText over the cursor-reactive ASCII field; copy + CTAs stagger in
// under it. The 9-in-1 capability stack lives in its own section below.
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { ScrambleText } from "@/components/motion/ScrambleText";

export function Hero() {
  return (
    <section className="relative mx-auto max-w-page px-6 pb-24 pt-20 md:px-10 md:pb-32 md:pt-28">
      <Parallax speed={0.07}>
        {/* The scramble decode reflows the headline width as it resolves; an
            invisible spacer locks the final height so nothing below shifts on
            load. The visible h1 overlays it and clips any wider mid-decode
            wrapping. */}
        <div className="relative">
          <span
            aria-hidden
            className="invisible block pb-[0.18em] font-serif-display text-[44px] leading-[1.02] tracking-tight md:text-[92px]"
          >
            Making companies AI native.
          </span>
          <h1 className="absolute inset-0 overflow-hidden font-serif-display text-[44px] leading-[1.02] tracking-tight md:text-[92px]">
            {/* Narrow char pool: the decoding text never gets wider than the
                final, so the headline never starts wrapped while resolving. */}
            <ScrambleText
              as="span"
              text="Making companies"
              duration={1.1}
              chars="iltfjr1."
            />{" "}
            <em className="not-italic">
              <ScrambleText
                as="span"
                className="italic text-accent"
                text="AI native"
                duration={1.1}
                delay={0.3}
                chars="iltfjr1."
              />
            </em>
            .
          </h1>
        </div>
      </Parallax>

      <Reveal
        as="div"
        y={20}
        duration={0.8}
        stagger={0.12}
        delay={0.35}
        className="mt-8"
      >
        <p className="max-w-2xl text-lg leading-relaxed text-fg/80 md:text-xl">
          A proprietary AI platform that rebuilds the SaaS you rent, the
          internal tools you can&apos;t buy, and the legacy systems you
          can&apos;t touch into software that runs in your own environment,
          maintained by self-evolving agents. AI transformation you actually
          keep.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          {/* TODO: replace placeholder cal.com link before launch */}
          <a
            href="https://cal.com/42nights"
            className="btn-press inline-flex items-center justify-center rounded-2xl border border-fg bg-fg px-6 py-3 text-sm font-medium text-bg hover:bg-bg hover:text-fg"
          >
            Book a call
          </a>
          <a
            href="#demo"
            className="btn-press inline-flex items-center justify-center rounded-2xl border border-fg bg-bg px-6 py-3 text-sm font-medium text-fg hover:bg-fg hover:text-bg"
          >
            See the demo
          </a>
        </div>

        <p className="mt-6 max-w-xl text-sm text-mutedSoft">
          For pre-seed to Series A teams, plus private equity and finance firms.
        </p>
      </Reveal>
    </section>
  );
}
