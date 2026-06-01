import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";

const steps = [
  {
    n: "01",
    title: "Embed.",
    body: "We forward-deploy engineers into your team for 1 to 2 weeks, mapping the SaaS, data, and legacy systems you run on.",
    // alternating drift so the numerals don't move as one rigid block
    drift: 0.07,
  },
  {
    n: "02",
    title: "Rebuild.",
    body: "We reverse-engineer those systems and rebuild them as software that runs on your own infrastructure, source you own.",
    drift: -0.05,
  },
  {
    n: "03",
    title: "Deploy.",
    body: "It goes live inside your walls, run by self-evolving agents on a closed loop that maintains and improves it in place.",
    drift: 0.07,
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-page px-6 md:px-10">
        <Reveal
          as="p"
          y={14}
          duration={0.8}
          className="font-mono-label text-[11px] text-cream/65"
        >
          How it works
        </Reveal>

        <Reveal
          as="div"
          y={32}
          duration={0.9}
          stagger={0.1}
          className="mt-12 grid gap-x-12 gap-y-16 md:mt-16 md:grid-cols-3"
        >
          {steps.map((s) => (
            <div key={s.n} className="relative">
              {/* oversized ghost Fraunces numeral, drifting against the scroll */}
              <Parallax speed={s.drift} className="pointer-events-none">
                <span
                  aria-hidden
                  className="block select-none font-serif-display leading-[0.8] text-cream/10 [font-size:clamp(96px,12vw,176px)]"
                >
                  {s.n}
                </span>
              </Parallax>

              <h3 className="-mt-6 font-serif-display leading-[1.0] tracking-[-0.025em] text-cream [font-size:clamp(28px,3.4vw,40px)] md:-mt-8">
                {s.title}
              </h3>

              <p className="mt-4 max-w-[36ch] text-base leading-relaxed text-cream/70">
                {s.body}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
