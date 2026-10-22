import DashboardFilter from "@/components/dashboard/dashboard-filter";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import PageHeader from "@/components/shared/page-header";
import useTitle from "@/hooks/shared/use-title";
import { greeting } from "@/lib/helpers";

function Dashboard() {
  useTitle("Dashboard");

  return (
    <div className="@container min-w-0">
      <PageHeader
        eyebrow={greeting()}
        title="Dashboard"
        description="How the house is doing: bookings, revenue, tonight's arrivals and how long guests stay."
        toolbar={<DashboardFilter />}
      />

      <DashboardLayout />
    </div>
  );
}

export default Dashboard;
