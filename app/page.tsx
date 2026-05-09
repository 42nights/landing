import { CtaFooter } from "@/components/CtaFooter";
import { Demo } from "@/components/Demo";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Marquee } from "@/components/Marquee";
import { Moat } from "@/components/Moat";
import { Nav } from "@/components/Nav";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <HowItWorks />
      <Demo />
      <Marquee />
      <Moat />
      <CtaFooter />
    </main>
  );
}
