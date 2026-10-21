import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LogisticsClient } from "@/components/logistics/logistics-client";

export default function LogisticsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">
        <LogisticsClient />
      </main>
      <Footer />
    </>
  );
}
