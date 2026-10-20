import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { About } from "@/components/about/about";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">
        <About />
      </main>
      <Footer />
    </>
  );
}
