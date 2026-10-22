import Filter from "@/components/shared/filter";
import { DASHBOARD_PERIOD_PARAM } from "@/lib/constants";
import { DASHBOARD_PERIOD_OPTIONS } from "@/lib/options";

function DashboardFilter() {
  return <Filter filterField={DASHBOARD_PERIOD_PARAM} options={DASHBOARD_PERIOD_OPTIONS} />;
}

export default DashboardFilter;
