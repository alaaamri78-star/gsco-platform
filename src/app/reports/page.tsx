import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ReportsClient } from "@/components/reports/reports-client";

export default function ReportsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">
        <ReportsClient />
      </main>
      <Footer />
    </>
  );
}
