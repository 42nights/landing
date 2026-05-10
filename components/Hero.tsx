export function Hero() {
  return (
    <section className="relative mx-auto max-w-page px-6 pb-24 pt-20 md:px-10 md:pb-32 md:pt-28">
      <div className="pointer-events-none absolute right-6 top-24 hidden h-[340px] w-[1px] bg-gradient-to-b from-accent/0 via-accent/40 to-accent/0 md:block md:right-10" />

      <div className="fade-up inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-3 py-1.5 backdrop-blur">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink/80">
          Live with 6 companies
        </span>
      </div>

      <h1 className="fade-up mt-6 font-serif-display text-[44px] leading-[1.02] tracking-tight md:text-[92px]">
        Making companies{" "}
        <em className="not-italic">
          <span className="italic text-accent">AI native</span>
        </em>
        .
      </h1>

      <div className="mt-8 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
        <div>
          <p className="max-w-2xl text-lg leading-relaxed text-ink/80 md:text-xl">
            An agent that runs inside your company — wired into Slack,
            iMessage, and WhatsApp — purpose-built for your industry. It takes
            action, finds inefficiencies, and ships automations. At a tenth
            the cost of a hire. No excuses. Just does.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            {/* TODO: replace placeholder cal.com link before launch */}
            <a
              href="https://cal.com/42nights"
              className="btn-press inline-flex items-center justify-center rounded-md border border-ink bg-ink px-6 py-3 text-sm font-medium text-white hover:bg-white hover:text-ink"
            >
              Book a call
            </a>
            <a
              href="#demo"
              className="btn-press inline-flex items-center justify-center rounded-md border border-ink bg-white px-6 py-3 text-sm font-medium text-ink hover:bg-ink hover:text-white"
            >
              See the demo
            </a>
          </div>

          <p className="mt-6 max-w-xl text-sm text-mutedSoft">
            For pre-seed, seed, and Series A teams. Built by founders shipping
            at HF0, a16z, Lightspeed, and YC-backed portfolio companies.
          </p>
        </div>

        <div className="rounded-lg border border-ink/15 bg-white/70 p-5 backdrop-blur md:mt-2">
          <div className="flex items-baseline justify-between">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-mutedSoft">
              The capability stack
            </div>
            <div className="text-[10px] uppercase tracking-[0.15em] text-mutedSoft">
              9 in 1
            </div>
          </div>
          <ul className="stagger mt-4 divide-y divide-black/5 text-sm">
            <li className="flex items-start gap-3 py-2.5">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="text-ink/85">
                Operates in Slack, WhatsApp, iMessage like a teammate
              </span>
            </li>
            <li className="flex items-start gap-3 py-2.5">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="text-ink/85">
                Makes outbound voice calls — vendor negotiation, scheduling
              </span>
            </li>
            <li className="flex items-start gap-3 py-2.5">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="text-ink/85">
                Reads PRs, contracts, invoices — flags waste and stalls
              </span>
            </li>
            <li className="flex items-start gap-3 py-2.5">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="text-ink/85">
                Spends within your bounds via a permissioned card
              </span>
            </li>
            <li className="flex items-start gap-3 py-2.5">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="text-ink/85">
                Every action: auto-execute, queued, or approval-gated
              </span>
            </li>
          </ul>
          <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
            <span className="text-xs text-mutedSoft">vs. equivalent hire</span>
            <span className="font-serif-display text-xl text-ink">
              ~<span className="text-accent">10%</span>{" "}
              <span className="text-sm text-mutedSoft">cost</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
