import DashboardLayout from "@/components/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-foreground/60">Welcome to your OutreachIQ dashboard. Start generating high-converting DMs.</p>
      </div>
    </DashboardLayout>
  );
}
