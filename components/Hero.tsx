import HeroField from "@/components/assets/HeroField";
import { LogoScroll } from "@/components/LogoScroll";
import { ScrollCue } from "@/components/ScrollCue";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";

export function Hero() {
  return (
    <section className="grain vignette relative flex min-h-[100svh] flex-col justify-center overflow-hidden">
      {/* backdrop: ASCII flow-field + a legibility scrim so cream type always
          holds contrast (Emil: guarantee readability, keep the texture). */}
      <div aria-hidden className="absolute inset-0">
        <HeroField className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(8,8,10,0.92)_0%,rgba(8,8,10,0.7)_42%,rgba(8,8,10,0.25)_72%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-void to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-page -translate-y-[6vh] px-6 md:-translate-y-[8vh] md:px-10">
        <SplitLines
          as="h1"
          stagger={0.09}
          duration={1.1}
          className="font-serif-display leading-[1.1] text-cream [font-size:clamp(46px,9vw,118px)]"
        >
          Making companies
          <br />
          <span className="italic text-accentBright">AI native</span>.
        </SplitLines>

        <Reveal
          stagger={0.1}
          delay={0.55}
          className="mt-10 flex flex-col gap-8"
        >
          <p className="max-w-2xl text-balance text-lg leading-relaxed text-cream/65 md:text-xl">
            We reverse-engineer the SaaS you rent, build the internal tools you
            can&apos;t buy, and modernize the legacy systems you can&apos;t
            touch, then deploy all of it on infrastructure you own, run by
            self-evolving AI agents. AI transformation you actually keep.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* TODO: replace placeholder cal.com link before launch */}
            <a
              href="https://cal.com/42nights"
              className="btn-press inline-flex items-center justify-center rounded-lg bg-accent px-7 py-3.5 text-sm font-medium text-white hover:bg-accentBright"
            >
              Book a call
            </a>
            <a
              href="#demo"
              className="btn-press inline-flex items-center justify-center rounded-lg border border-cream/15 bg-cream/[0.02] px-7 py-3.5 text-sm font-medium text-cream/85 backdrop-blur-sm hover:border-cream/35 hover:bg-cream/[0.06]"
            >
              See the demo
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-cream/40">
              For pre-seed to Series A teams, plus private equity and finance
              firms.
            </p>
            <div className="flex flex-col gap-3">
              <span className="font-mono-label text-[10px] text-cream/35">
                Clients backed by
              </span>
              <LogoScroll />
            </div>
          </div>
        </Reveal>
      </div>

      {/* scroll cue: down chevron, GSAP yoyo bob */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <ScrollCue />
      </div>
    </section>
  );
}
