import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Top50Organizations } from "@/components/rankings/top50-organizations";

export default function Top50OrganizationsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">
        <Top50Organizations />
      </main>
      <Footer />
    </>
  );
}
