import { Reveal } from "@/components/motion/Reveal";
import { ScrubWords } from "@/components/motion/ScrubWords";

// The cinematic dark moment. The shared ASCII field (rendered once by
// <AsciiBackground/>) shows through behind this section; a radial wash seats the
// glyphs into the void and keeps the left-anchored type clean and
// high-contrast. No section borders: the air between this and its neighbors is
// the divider.
export function Moat() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      {/* Radial wash: seats the shared ASCII glyphs into the void and keeps the
          left column legible. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_18%_42%,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.45)_45%,transparent_75%)] dark:bg-[radial-gradient(120%_90%_at_18%_42%,rgba(8,8,10,0.92)_0%,rgba(8,8,10,0.45)_45%,transparent_75%)]"
      />

      <div className="relative z-10 mx-auto max-w-page px-6 md:px-10">
        <div className="max-w-2xl">
          <Reveal
            as="p"
            y={20}
            duration={0.9}
            className="font-mono-label text-[10px] text-cream/45"
          >
            The moat
          </Reveal>
          <ScrubWords
            as="h2"
            className="mt-7 font-serif-display leading-[1.0] text-cream [font-size:clamp(34px,5vw,68px)]"
          >
            The software{" "}
            <span className="italic text-accentBright">maintains itself</span>.
          </ScrubWords>
          <Reveal
            as="p"
            y={24}
            duration={0.9}
            delay={0.1}
            className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-cream/70 md:text-xl"
          >
            Every deploy runs under a self-evolving harness: AI agents that
            monitor, test, patch, and improve your software in place. A closed
            loop on your own infrastructure, with no vendor in it.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
