import AsciiField from "@/components/assets/AsciiField";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";

// The cinematic dark moment. The signature ASCII field lives here as a faint
// backdrop with its red-lit core drifting to the right (focusX 0.7), so the
// left-anchored type stays clean and high-contrast. A radial wash seats the
// glyphs into the void and protects legibility. No section borders: the air
// between this and its neighbors is the divider.
const POINTS = [
  {
    index: "01",
    title: "Self-evolving harness.",
    body: "Agents run a closed loop on your software: observe, test, patch, repeat. It improves itself in production, not on a vendor's roadmap.",
  },
  {
    index: "02",
    title: "It sharpens in place.",
    body: "As frontier models advance, your agents inherit the gains automatically. No re-implementation, no drift, no migration project.",
  },
  {
    index: "03",
    title: "Each deploy compounds.",
    body: "Patterns that recur across builds (auth, billing, reporting) become reusable, compressing the next deployment.",
  },
];

export function Moat() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      {/* Backdrop: the signature ASCII field, faint, red core drifting right.
          Parallax gives it a slow cinematic rise as the section scrolls. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Parallax
          speed={0.12}
          className="absolute -inset-y-[8%] inset-x-0 h-[116%]"
        >
          <AsciiField
            className="absolute inset-0 h-full w-full"
            tint
            focusX={0.7}
            focusY={0.4}
            alpha={0.1}
          />
        </Parallax>
        {/* Seat the glyphs into the void and keep the left column legible. */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_18%_42%,rgba(8,8,10,0.92)_0%,rgba(8,8,10,0.45)_45%,transparent_75%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-page px-6 md:px-10">
        <Reveal stagger={0.1} y={28} duration={1} className="max-w-2xl">
          <p className="font-mono-label text-[10px] text-cream/45">The moat</p>
          <h2 className="mt-7 font-serif-display leading-[1.0] text-cream [font-size:clamp(34px,5vw,68px)]">
            The software{" "}
            <span className="italic text-accentBright">maintains itself</span>.
          </h2>
          <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-cream/70 md:text-xl">
            Every deploy runs under a self-evolving harness: AI agents that
            monitor, test, patch, and improve your software in place. A closed
            loop on your own infrastructure, with no vendor in it.
          </p>
        </Reveal>

        <Reveal
          stagger={0.1}
          y={26}
          duration={0.9}
          className="mt-20 max-w-3xl md:mt-28"
        >
          {POINTS.map((p, i) => (
            <div key={p.index}>
              {/* Hairline between blocks, never a section rule. Air carries the
                  rest of the separation. */}
              {i > 0 && (
                <div aria-hidden className="h-px w-full bg-cream/[0.08]" />
              )}
              <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 py-8 md:grid-cols-[5rem_1fr] md:gap-x-10 md:py-10">
                <span className="font-mono-label pt-1 text-[11px] text-cream/30 md:pt-2.5">
                  {p.index}
                </span>
                <div>
                  <h3 className="font-serif-display text-2xl leading-tight text-cream md:text-[2rem]">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-cream/70">
                    {p.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
