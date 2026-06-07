import Link from "next/link";
import { Wordmark } from "./Wordmark";

// Closing CTA gets its own full-viewport panel — centered eyebrow + headline +
// button, isolated as its own "page" before the flat footer underneath.
export function CtaFooter() {
  return (
    <>
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center md:px-10">
        <span className="font-mono-label text-[10px] text-mutedSoft">
          Ready when you are
        </span>
        <h2 className="mx-auto mt-6 max-w-3xl font-serif-display text-3xl leading-tight tracking-tight md:text-5xl">
          Ready to bring your software in-house?
        </h2>
        <div className="mt-10">
          {/* TODO: replace placeholder cal.com link before launch */}
          <a
            href="https://cal.com/42nights"
            className="btn-press inline-flex items-center justify-center rounded-2xl border border-fg bg-fg px-8 py-3 text-sm font-medium text-bg hover:bg-bg hover:text-fg"
          >
            Book a call
          </a>
        </div>
      </section>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-mutedSoft md:flex-row md:px-10">
          <Wordmark className="text-base" />
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a
              href="mailto:jerry@42nights.dev"
              className="transition-[color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-fg"
            >
              jerry@42nights.dev
            </a>
            <Link
              href="/privacy"
              className="transition-[color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-fg"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-[color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-fg"
            >
              Terms
            </Link>
          </nav>
          <span>© 2026</span>
        </div>
      </footer>
    </>
  );
}
