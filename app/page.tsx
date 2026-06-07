import { AsciiBackground } from "@/components/AsciiBackground";
import { Capabilities } from "@/components/Capabilities";
import { CtaFooter } from "@/components/CtaFooter";
import { Demo } from "@/components/Demo";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ImpactStrip } from "@/components/ImpactStrip";
import { Moat } from "@/components/Moat";
import { Nav } from "@/components/Nav";
import { VersusHire } from "@/components/VersusHire";

// Dark/minimal/ASCII direction. Inter-section separation is AIR — each section
// owns its own py-* rhythm, so <main> stacks them flush with no extra margin.
export default function Home() {
  return (
    <main className="flex flex-col">
      <AsciiBackground />
      <Nav />
      <Hero />
      <ImpactStrip />
      <VersusHire />
      <Capabilities />
      <HowItWorks />
      <Demo />
      <Moat />
      <CtaFooter />
    </main>
  );
}
