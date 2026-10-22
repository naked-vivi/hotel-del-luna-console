import { addDays, format } from "date-fns";
import { TooltipProvider } from "@/components/ui/tooltip";
import EmptyState from "@/components/shared/empty-state";
import ErrorNote from "@/components/shared/error-note";
import RoomChartHeader from "@/components/bookings/room-chart-header";
import RoomChartNav from "@/components/bookings/room-chart-nav";
import RoomChartRow from "@/components/bookings/room-chart-row";
import RoomChartSkeleton from "@/components/bookings/room-chart-skeleton";
import RoomChartLegend from "@/components/bookings/room-chart-legend";
import useCabins from "@/hooks/cabins/use-cabins";
import { useChartWindow } from "@/hooks/bookings/use-chart-window";
import { useChartBookings } from "@/hooks/bookings/use-chart-bookings";
import { sortCabinsByName } from "@/lib/helpers";
import { ROOM_CHART_DAYS, TOOLTIP_DELAY } from "@/lib/constants";

export default function RoomChart() {
  const { start, today, goTo, status } = useChartWindow();
  const end = addDays(start, ROOM_CHART_DAYS);
  const { cabins = [], isPending: cabinsPending, error: cabinsError } = useCabins();
  const { bookings, isPending, error } = useChartBookings(start, end, status);

  const rows = sortCabinsByName(cabins);
  const isLoading = isPending || cabinsPending;
  const failure = error || cabinsError;

  return (
    <TooltipProvider delay={TOOLTIP_DELAY}>
    <section aria-label="Room chart" className="border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-5 py-4">
        <div className="space-y-1">
          <p className="text-[10px] font-semibold tracking-[0.26em] text-muted-foreground uppercase">Room chart</p>
          <p className="text-xl font-extralight">
            {format(start, "d MMM")} &ndash; {format(addDays(end, -1), "d MMM yyyy")}
          </p>
        </div>
        <RoomChartNav start={start} today={today} onGoTo={goTo} />
      </div>

      {failure ? (
        <div className="flex min-h-96 flex-col px-6"><ErrorNote message={failure.message} /></div>
      ) : !isLoading && rows.length === 0 ? (
        <div className="p-6"><EmptyState title="No cabins yet">Add cabins to see their stays on the chart.</EmptyState></div>
      ) : (
        <div className="custom-scrollbar overflow-x-auto">
          <div className="min-w-232">
            <RoomChartHeader start={start} today={today} />
            {isLoading ? (
              <RoomChartSkeleton start={start} today={today} />
            ) : (
              rows.map((cabin) => (
                <RoomChartRow
                  key={cabin.id}
                  cabin={cabin}
                  bookings={bookings.filter((booking) => booking.cabinId === cabin.id)}
                  start={start}
                  today={today}
                />
              ))
            )}
          </div>
        </div>
      )}

      <RoomChartLegend />
    </section>
    </TooltipProvider>
  );
}
