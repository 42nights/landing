const row1 = [
  "YC",
  "a16z",
  "Lightspeed",
  "HF0",
  "Susa",
  "Afore Capital",
  "OpenAI for Startups program member",
  "Reflex (HF0/Susa)",
  "Eragon (a16z/Lightspeed)",
  "Pocket (YC W26)",
  "Orca (HF0 Lightyear 001)",
  "Kamco Invest",
  "BeFreed",
  "Eaglecraft",
];

function Pill({ label }: { label: string }) {
  return (
    <span className="mx-2 inline-flex shrink-0 items-center whitespace-nowrap rounded-md border border-ink bg-white px-4 py-2 text-[12pt] leading-none text-ink">
      {label}
    </span>
  );
}

function Row({
  items,
  direction,
}: {
  items: string[];
  direction: "left" | "right";
}) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-mask marquee-track overflow-hidden">
      <div
        className={`marquee-row flex w-max ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {doubled.map((label, i) => (
          <Pill key={`${label}-${i}`} label={label} />
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <section className="border-t border-black/5">
      <div className="mx-auto max-w-page px-6 py-24 md:px-10 md:py-32">
        <div>
          <div className="mb-4 text-[9pt] uppercase tracking-[0.15em] text-mutedSoft">
            Silicon Valley startups · pre-seed → Series A
          </div>
          <Row items={row1} direction="left" />
        </div>
      </div>
    </section>
  );
}
