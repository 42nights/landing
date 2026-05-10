export function Hero() {
  return (
    <section className="mx-auto max-w-page px-6 pb-24 pt-24 md:px-10 md:pb-32 md:pt-32">
      <h1 className="font-serif-display text-[44px] leading-[1.05] tracking-tight md:text-[88px]">
        Making companies{" "}
        <em className="not-italic">
          <span className="italic text-accent">AI native</span>
        </em>
        .
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/80 md:text-xl">
        An agent that runs inside your company — wired into Slack, iMessage,
        and WhatsApp — purpose-built for your industry. It takes action, finds
        inefficiencies, and ships automations. At a tenth the cost of a hire.
        No excuses. Just does.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        {/* TODO: replace placeholder cal.com link before launch */}
        <a
          href="https://cal.com/42nights"
          className="inline-flex items-center justify-center rounded-md border border-ink bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-ink"
        >
          Book a call
        </a>
        <a
          href="#demo"
          className="inline-flex items-center justify-center rounded-md border border-ink bg-white px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-white"
        >
          See the demo
        </a>
      </div>
      <p className="mt-6 text-sm text-mutedSoft">
        Built by founders shipping at HF0, a16z, Lightspeed, and YC-backed
        portfolio companies.
      </p>
    </section>
  );
}
