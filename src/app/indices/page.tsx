import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { IndicesClient } from "@/components/indices/indices-client";

export default function IndicesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">
        <IndicesClient />
      </main>
      <Footer />
    </>
  );
}
