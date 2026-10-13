import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CorridorsClient } from "@/components/corridors/corridors-client";

export default function CorridorsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">
        <CorridorsClient />
      </main>
      <Footer />
    </>
  );
}
