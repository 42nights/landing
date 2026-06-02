// Local light hero layout: badge + headline, then a two-column split — copy +
// CTAs on the left, the capability-stack card on the right. Copy is carried
// from main; the capability card has no main equivalent, so its list stays.
export function Hero() {
  return (
    <section className="relative mx-auto max-w-page px-6 pb-24 pt-20 md:px-10 md:pb-32 md:pt-28">
      <div className="pointer-events-none absolute right-6 top-24 hidden h-[340px] w-[1px] bg-gradient-to-b from-accent/0 via-accent/40 to-accent/0 md:block md:right-10" />

      <div className="fade-up inline-flex items-center gap-2 rounded-full border border-fg/15 bg-bg/60 px-3 py-1.5 backdrop-blur">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-fg/80">
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
              className="btn-press inline-flex items-center justify-center rounded-md border border-fg bg-fg px-6 py-3 text-sm font-medium text-bg hover:bg-bg hover:text-fg"
            >
              Book a call
            </a>
            <a
              href="#demo"
              className="btn-press inline-flex items-center justify-center rounded-md border border-fg bg-bg px-6 py-3 text-sm font-medium text-fg hover:bg-fg hover:text-bg"
            >
              See the demo
            </a>
          </div>

          <p className="mt-6 max-w-xl text-sm text-mutedSoft">
            For pre-seed to Series A teams, plus private equity and finance
            firms.
          </p>
        </div>

        <div className="rounded-lg border border-fg/15 bg-bg/70 p-5 backdrop-blur md:mt-2">
          <div className="flex items-baseline justify-between">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-mutedSoft">
              The capability stack
            </div>
            <div className="text-[10px] uppercase tracking-[0.15em] text-mutedSoft">
              9 in 1
            </div>
          </div>
          <ul className="stagger mt-4 divide-y divide-fg/10 text-sm">
            <li className="flex items-start gap-3 py-2.5">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="text-fg/85">
                Operates in Slack, WhatsApp, iMessage like a teammate
              </span>
            </li>
            <li className="flex items-start gap-3 py-2.5">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="text-fg/85">
                Makes outbound voice calls — vendor negotiation, scheduling
              </span>
            </li>
            <li className="flex items-start gap-3 py-2.5">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="text-fg/85">
                Reads PRs, contracts, invoices — flags waste and stalls
              </span>
            </li>
            <li className="flex items-start gap-3 py-2.5">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="text-fg/85">
                Spends within your bounds via a permissioned card
              </span>
            </li>
            <li className="flex items-start gap-3 py-2.5">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="text-fg/85">
                Every action: auto-execute, queued, or approval-gated
              </span>
            </li>
          </ul>
          <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
            <span className="text-xs text-mutedSoft">vs. equivalent hire</span>
            <span className="font-serif-display text-xl text-fg">
              ~<span className="text-accent">10%</span>{" "}
              <span className="text-sm text-mutedSoft">cost</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
