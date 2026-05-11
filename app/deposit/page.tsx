import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Wordmark } from "@/components/Wordmark";

export const metadata: Metadata = {
  title: "Deposit — 42nights",
  description: "Secure your engagement with 42nights.",
  robots: { index: false, follow: false },
};

export default function DepositPage() {
  return (
    <main>
      <Nav />
      <section className="relative mx-auto max-w-page px-6 pb-24 pt-20 md:px-10 md:pb-32 md:pt-28">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-3 py-1.5 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink/80">
              Secure checkout via Stripe
            </span>
          </div>

          <h1 className="mt-6 font-serif-display text-[44px] leading-[1.02] tracking-tight md:text-[72px]">
            Deposit
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-ink/80">
            Confirm your engagement with 42nights. You&rsquo;ll be redirected to
            Stripe to complete payment securely.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="https://buy.stripe.com/9B65kDbJi4zL9mmgPmdZ600"
              className="btn-press inline-flex items-center justify-center rounded-md border border-ink bg-ink px-8 py-3 text-sm font-medium text-white hover:bg-white hover:text-ink"
            >
              Continue to Stripe
            </a>
          </div>

          <p className="mt-6 text-sm text-mutedSoft">
            Questions? Email{" "}
            <a
              href="mailto:hello@42nights.ai"
              className="underline decoration-ink/30 underline-offset-4 transition-[color] duration-200 hover:text-ink"
            >
              hello@42nights.ai
            </a>
            .
          </p>
        </div>
      </section>

      <footer className="border-t border-black/10">
        <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-mutedSoft md:flex-row md:px-10">
          <Wordmark className="text-base" />
          <a
            href="mailto:hello@42nights.ai"
            className="text-mutedSoft transition-[color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-ink"
          >
            hello@42nights.ai
          </a>
          <span>© 2026</span>
        </div>
      </footer>
    </main>
  );
}
