import { Navbar } from "@/components/layout/navbar";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">
        <DashboardClient />
      </main>
    </>
  );
}
