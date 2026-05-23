import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Wordmark } from "@/components/Wordmark";

export const metadata: Metadata = {
  title: "Deposit — 42nights",
  description: "Secure your engagement with 42nights.",
  robots: { index: false, follow: false },
};

const STRIPE_LINK = "https://buy.stripe.com/fZuaEX3cMc2d6aadDadZ601";

const tiers = [
  { amount: "1,000", label: "Starter" },
  { amount: "3,000", label: "Growth" },
  { amount: "5,000", label: "Scale" },
  { amount: "7,000", label: "Pro" },
  { amount: "10,000", label: "Business" },
  { amount: "25,000", label: "Enterprise" },
  { amount: "50,000", label: "Premium" },
  { amount: "75,000", label: "Elite" },
  { amount: "100,000", label: "Flagship" },
];

export default function DepositPage() {
  return (
    <main>
      <Nav />
      <section className="relative mx-auto max-w-page px-6 pb-24 pt-20 md:px-10 md:pb-32 md:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="fade-up inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-3 py-1.5 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink/80">
              Secure checkout via Stripe
            </span>
          </div>

          <h1 className="fade-up mt-6 font-serif-display text-[44px] leading-[1.02] tracking-tight md:text-[72px]">
            Deposit
          </h1>

          <p className="fade-up mt-6 text-lg leading-relaxed text-ink/80">
            Select a monthly retainer to begin your engagement with 42nights.
            You&rsquo;ll be redirected to Stripe to complete payment securely.
          </p>

          <div className="stagger mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tiers.map((tier) => (
              <a
                key={tier.amount}
                href={STRIPE_LINK}
                className="btn-press group relative flex flex-col items-center rounded-lg border border-ink/10 bg-white px-6 py-6 text-center transition-[border-color,box-shadow] duration-200 hover:border-ink/30 hover:shadow-sm"
              >
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-ink/50">
                  {tier.label}
                </span>
                <span className="mt-2 font-serif-display text-[32px] leading-none tracking-tight">
                  ${tier.amount}
                </span>
                <span className="mt-1 text-sm text-mutedSoft">per month</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-ink/60 transition-colors duration-200 group-hover:text-ink">
                  Select
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    <path
                      d="M4.5 2.5L8 6L4.5 9.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            ))}
          </div>

          <p className="mt-10 text-sm text-mutedSoft">
            Questions? Email{" "}
            <a
              href="mailto:hello@42nights.dev"
              className="underline decoration-ink/30 underline-offset-4 transition-[color] duration-200 hover:text-ink"
            >
              hello@42nights.dev
            </a>
            .
          </p>
        </div>
      </section>

      <footer className="border-t border-black/10">
        <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-mutedSoft md:flex-row md:px-10">
          <Wordmark className="text-base" />
          <a
            href="mailto:hello@42nights.dev"
            className="text-mutedSoft transition-[color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-ink"
          >
            hello@42nights.dev
          </a>
          <span>© 2026</span>
        </div>
      </footer>
    </main>
  );
}
