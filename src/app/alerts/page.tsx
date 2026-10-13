import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AlertsClient } from "@/components/alerts/alerts-client";

export default function AlertsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">
        <AlertsClient />
      </main>
      <Footer />
    </>
  );
}
