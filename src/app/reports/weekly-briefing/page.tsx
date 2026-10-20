import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WeeklyBriefingClient } from "@/components/reports/weekly-briefing-client";

export default function WeeklyBriefingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">
        <WeeklyBriefingClient />
      </main>
      <Footer />
    </>
  );
}
