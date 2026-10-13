import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Top50Csco } from "@/components/rankings/top50-csco";

export default function Top50CscoPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">
        <Top50Csco />
      </main>
      <Footer />
    </>
  );
}
