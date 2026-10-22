import DashboardFilter from "@/features/dashboard/dashboard-filter";
import DashboardLayout from "@/features/dashboard/dashboard-layout";
import PageHeader from "@/shared/page-header";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function Dashboard() {
  return (
    <div className="@container min-w-0">
      <PageHeader
        eyebrow={greeting()}
        title="Dashboard"
        description="How the house is doing: bookings, revenue, tonight's arrivals and how long guests stay."
        actions={<DashboardFilter />}
      />

      <DashboardLayout />
    </div>
  );
}

export default Dashboard;
