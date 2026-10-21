import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProcurementClient } from "@/components/procurement/procurement-client";

export default function ProcurementPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">
        <ProcurementClient />
      </main>
      <Footer />
    </>
  );
}
