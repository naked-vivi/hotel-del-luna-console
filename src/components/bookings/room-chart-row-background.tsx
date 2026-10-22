import { addDays, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { ROOM_CHART_DAYS } from "@/lib/constants";

function RoomChartRowBackground({ start, today }: ChartWindowProps) {
  return (
    <>
      {Array.from({ length: ROOM_CHART_DAYS }, (_, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={cn("border-l border-border", isSameDay(addDays(start, i), today) && "bg-gold/8")}
          style={{ gridColumn: i + 2, gridRow: 1 }}
        />
      ))}
    </>
  );
}

export default RoomChartRowBackground;
