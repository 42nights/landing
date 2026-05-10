import { Wordmark } from "./Wordmark";

export function CtaFooter() {
  return (
    <section className="border-t border-black/10">
      <div className="mx-auto max-w-page px-6 py-24 text-center md:px-10 md:py-32">
        <h2 className="mx-auto max-w-3xl font-serif-display text-3xl leading-tight tracking-tight md:text-5xl">
          Ready to replace a hire with a model trained on your team?
        </h2>
        <div className="mt-10">
          {/* TODO: replace placeholder cal.com link before launch */}
          <a
            href="https://cal.com/42nights"
            className="btn-press inline-flex items-center justify-center rounded-md border border-ink bg-ink px-8 py-3 text-sm font-medium text-white hover:bg-white hover:text-ink"
          >
            Book a call
          </a>
        </div>
      </div>
      <footer className="border-t border-black/10">
        <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-mutedSoft md:flex-row md:px-10">
          <Wordmark className="text-base" />
          {/* TODO: replace placeholder hello@ email before launch */}
          <a
            href="mailto:hello@42nights.ai"
            className="text-mutedSoft transition-[color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-ink"
          >
            hello@42nights.ai
          </a>
          <span>© 2026</span>
        </div>
      </footer>
    </section>
  );
}
