import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ResilienceClient } from "@/components/resilience/resilience-client";

export default function ResiliencePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">
        <ResilienceClient />
      </main>
      <Footer />
    </>
  );
}
