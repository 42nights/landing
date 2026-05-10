const steps = [
  {
    n: "01",
    title: "Embed.",
    body:
      "We work alongside your team for 1–2 weeks as forward-deployed engineers, observing every workflow we'll automate.",
  },
  {
    n: "02",
    title: "Train.",
    body:
      "Every workflow, decision, and message becomes training context for an agent purpose-built for your company.",
  },
  {
    n: "03",
    title: "Ship.",
    body:
      "The agent goes live with permission to act — Slack, email, voice, spend — at ~10% the cost of the equivalent hire.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-t border-black/5">
      <div className="mx-auto max-w-page px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-ink pt-6">
              <div className="text-sm font-medium tracking-wider text-mutedSoft">
                {s.n}
              </div>
              <h3 className="mt-3 font-serif-display text-2xl tracking-tight md:text-3xl">
                {s.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink/75">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
