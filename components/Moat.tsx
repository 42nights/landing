export function Moat() {
  return (
    <section className="bg-ink text-cream">
      <div className="mx-auto max-w-page px-6 py-24 md:px-10 md:py-32">
        <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-cream/50">
          The moat
        </div>
        <h2 className="mt-3 font-serif-display text-4xl leading-tight tracking-tight md:text-6xl">
          The data lives{" "}
          <span className="italic text-accent">in the weights</span>.
        </h2>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-cream/85 md:text-xl">
          Every engagement folds your workflows, decisions, and voice into the
          agent's training. There's no retrievable memory to export — your
          context lives inside a model purpose-built for your company.
        </p>

        <div className="stagger mt-12 grid gap-8 border-t border-cream/15 pt-12 md:grid-cols-3 md:gap-10">
          <div>
            <div className="font-serif-display text-2xl tracking-tight text-cream md:text-3xl">
              <span className="text-accent">01</span> Trained, not stored.
            </div>
            <p className="mt-3 text-base leading-relaxed text-cream/75">
              Workflows, decisions, and institutional context fold into the
              model itself — not a database a vendor can hand back to you.
            </p>
          </div>
          <div>
            <div className="font-serif-display text-2xl tracking-tight text-cream md:text-3xl">
              <span className="text-accent">02</span> It sharpens in place.
            </div>
            <p className="mt-3 text-base leading-relaxed text-cream/75">
              The agent gets better every day — on your workflows, your data,
              your decisions. As frontier models advance, yours inherits the
              gains. No re-implementation. No drift.
            </p>
          </div>
          <div>
            <div className="font-serif-display text-2xl tracking-tight text-cream md:text-3xl">
              <span className="text-accent">03</span> Each deploy compounds.
            </div>
            <p className="mt-3 text-base leading-relaxed text-cream/75">
              Workflows that recur across customers — eng ops, procurement,
              vendor management — become reusable templates that compress the
              next install.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
