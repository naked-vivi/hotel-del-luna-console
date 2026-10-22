import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ErrorNote from "@/components/shared/error-note";
import CardEmptyState from "@/components/shared/card-empty-state";
import QuietRooms from "@/components/dashboard/quiet-rooms";
import CabinRevenueChart from "@/components/dashboard/cabin-revenue-chart";
import { cabinRevenueChart, formatWholeCurrency } from "@/lib/helpers";
import { CABIN_REVENUE_CARD } from "@/lib/constants";

function RevenueByCabin({ bookings, cabins, error }: RevenueByCabinProps) {
  const { bars, total, average } = cabinRevenueChart(bookings, cabins);
  const hasRevenue = !error && total > 0;

  return (
    <Card className={`flex flex-col ${CABIN_REVENUE_CARD}`}>
      <CardHeader className="border-b border-border">
        <CardTitle>Revenue by cabin</CardTitle>
        <CardDescription>Cabins from best to quietest. The gold line marks the average room. Hover a column to compare.</CardDescription>
        {hasRevenue && (
          <CardAction className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">This period</span>
            <span className="text-2xl leading-none font-extralight tabular-nums">{formatWholeCurrency(total)}</span>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col">
        {error ? (
          <ErrorNote title="The rooms are in the fog" message="Cabin revenue could not be loaded. Try again shortly." drawing={<QuietRooms clouded className="w-full max-w-72" />} />
        ) : hasRevenue ? (
          <CabinRevenueChart bars={bars} average={average} />
        ) : (
          <CardEmptyState drawing={<QuietRooms className="w-full max-w-72" />} title="Every room is quiet" message="No bookings in this period." />
        )}
      </CardContent>
    </Card>
  );
}

export default RevenueByCabin;
