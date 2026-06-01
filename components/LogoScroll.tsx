/**
 * LogoScroll — the consolidated credibility band, lifted into the hero.
 * Real sourced logo marks (monochrome cream) for the backers we have art for,
 * plus cream wordmarks for the rest, separated by a quiet middot rhythm.
 * Edge-masked CSS marquee; pauses for reduced motion.
 */

type Item =
  | { kind: "logo"; src: string; alt: string; h: number; filter?: boolean }
  | { kind: "text"; label: string };

const ITEMS: Item[] = [
  {
    kind: "logo",
    src: "/logos/yc.svg",
    alt: "Y Combinator",
    h: 34,
    filter: true,
  },
  { kind: "logo", src: "/logos/a16z.png", alt: "a16z", h: 42 },
  { kind: "logo", src: "/logos/hf0.png", alt: "HF0", h: 44 },
  { kind: "logo", src: "/logos/lightyear.svg", alt: "HF0 Lightyear", h: 26 },
  { kind: "logo", src: "/logos/susa.png", alt: "Susa Ventures", h: 40 },
  {
    kind: "logo",
    src: "/logos/openai.svg",
    alt: "OpenAI",
    h: 34,
    filter: true,
  },
  {
    kind: "logo",
    src: "/logos/anthropic.svg",
    alt: "Anthropic",
    h: 22,
    filter: true,
  },
  { kind: "logo", src: "/logos/afore.webp", alt: "Afore Capital", h: 40 },
];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((it, i) => (
        <span key={`${it.kind}-${i}`} className="flex items-center">
          <span aria-hidden className="select-none px-7 text-cream/20">
            &middot;
          </span>
          {it.kind === "logo" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={it.src}
              alt={it.alt}
              style={{ height: it.h }}
              className={`w-auto select-none opacity-75 ${
                it.filter ? "logo-img" : ""
              }`}
              draggable={false}
            />
          ) : (
            <span className="whitespace-nowrap text-xl font-medium leading-none text-cream/55 md:text-2xl">
              {it.label}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

export function LogoScroll() {
  return (
    <div className="marquee-mask overflow-hidden">
      <div className="flex w-max animate-marquee-left motion-reduce:animate-none">
        <Row />
        <Row />
      </div>
    </div>
  );
}
