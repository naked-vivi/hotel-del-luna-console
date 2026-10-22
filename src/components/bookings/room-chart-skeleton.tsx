import { Skeleton } from "@/components/ui/skeleton";
import RoomChartRowBackground from "@/components/bookings/room-chart-row-background";
import { ROOM_CHART_GRID, ROOM_CHART_SKELETON_SPANS } from "@/lib/constants";

function RoomChartSkeleton({ start, today }: ChartWindowProps) {
  return (
    <div aria-busy="true" aria-label="Loading the room chart">
      {ROOM_CHART_SKELETON_SPANS.map(([s, len], row) => (
        <div key={row} className="grid h-16 border-b border-border last:border-b-0" style={ROOM_CHART_GRID}>
          <div className="flex items-center px-4" style={{ gridColumn: 1, gridRow: 1 }}><Skeleton className="h-7 w-16" /></div>
          <RoomChartRowBackground start={start} today={today} />
          <Skeleton className="z-10 my-3" style={{ gridColumn: `${s + 2} / span ${len}`, gridRow: 1 }} />
        </div>
      ))}
    </div>
  );
}

export default RoomChartSkeleton;
