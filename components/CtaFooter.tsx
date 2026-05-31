import { Reveal } from "@/components/motion/Reveal";
import { Wordmark } from "./Wordmark";

export function CtaFooter() {
  return (
    <section className="grain vignette relative overflow-hidden">
      {/* The shared ASCII field (rendered once by <AsciiBackground/>) shows
          through here; the grain + vignette keep the headline clean. */}
      <div className="relative z-10 mx-auto max-w-page px-6 py-28 md:px-10 md:py-40">
        <Reveal
          stagger={0.1}
          y={24}
          duration={0.9}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <span className="font-mono-label text-[10px] text-cream/45">
            Ready when you are
          </span>
          <h2 className="mt-6 max-w-[20ch] text-balance font-serif-display leading-[1.06] text-cream [font-size:clamp(34px,5.5vw,68px)]">
            Ready to bring your software in-house?
          </h2>
          <div className="mt-12">
            {/* TODO: replace placeholder cal.com link before launch */}
            <a
              href="https://cal.com/42nights"
              className="btn-press inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3.5 text-sm font-medium text-white hover:bg-accentBright"
            >
              Book a call
            </a>
          </div>
        </Reveal>
      </div>

      <footer className="relative z-10 mx-auto max-w-page px-6 md:px-10">
        <Reveal
          y={12}
          duration={0.9}
          className="flex flex-col items-center justify-between gap-4 border-t border-cream/10 py-10 text-sm text-cream/45 md:flex-row"
        >
          <Wordmark className="text-base text-cream" />
          {/* TODO: replace placeholder hello@ email before launch */}
          <a
            href="mailto:hello@42nights.dev"
            className="group relative text-cream/45 transition-[color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-cream"
          >
            hello@42nights.dev
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
            />
          </a>
          <span className="text-cream/30">© 2026</span>
        </Reveal>
      </footer>
    </section>
  );
}
