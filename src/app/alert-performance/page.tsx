import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AlertPerformanceClient } from "@/components/alert-performance/alert-performance-client";

export default function AlertPerformancePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">
        <AlertPerformanceClient />
      </main>
      <Footer />
    </>
  );
}
