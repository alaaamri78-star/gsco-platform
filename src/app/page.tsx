import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/landing/hero";
import { Mission } from "@/components/landing/mission";
import { ConsolePreview } from "@/components/landing/console-preview";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <ConsolePreview />
      </main>
      <Footer />
    </>
  );
}
