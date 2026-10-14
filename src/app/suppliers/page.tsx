import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SuppliersClient } from "@/components/suppliers/suppliers-client";

export default function SuppliersPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">
        <SuppliersClient />
      </main>
      <Footer />
    </>
  );
}
