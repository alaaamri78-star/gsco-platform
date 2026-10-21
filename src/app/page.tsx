import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/landing/hero";
import { IntelligenceMapBand } from "@/components/landing/intelligence-map-band";
import { BusinessContext } from "@/components/landing/business-context";
import { IntelligenceCoverage } from "@/components/landing/intelligence-coverage";
import { Approach } from "@/components/landing/approach";
import { ConsolePreview } from "@/components/landing/console-preview";
import { Research } from "@/components/landing/research";
import { WhyItMatters } from "@/components/landing/why-it-matters";
import { Mission } from "@/components/landing/mission";
import { WhoWeServe } from "@/components/landing/who-we-serve";
import { FinalCta } from "@/components/landing/final-cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <IntelligenceMapBand />
        <BusinessContext />
        <IntelligenceCoverage />
        <Approach />
        <ConsolePreview />
        <Research />
        <WhyItMatters />
        <Mission />
        <WhoWeServe />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
