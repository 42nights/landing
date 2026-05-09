export function Moat() {
  return (
    <section className="bg-ink text-cream">
      <div className="mx-auto max-w-page px-6 py-24 md:px-10 md:py-32">
        <h2 className="font-serif-display text-4xl leading-tight tracking-tight md:text-6xl">
          The data lives{" "}
          <span className="italic text-accent">in the weights</span>.
        </h2>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-cream/85 md:text-xl">
          Most AI products store your data in retrievable records. We don't.
          Every embed folds your workflows, decisions, and internal context
          into the model itself. Switching vendors doesn't cost a migration —
          it costs the model. Each deployment teaches the platform.
        </p>
      </div>
    </section>
  );
}
