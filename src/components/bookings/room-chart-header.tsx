import { addDays, format, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { ROOM_CHART_DAYS, ROOM_CHART_GRID } from "@/lib/constants";

function RoomChartHeader({ start, today }: ChartWindowProps) {
  return (
    <div className="grid border-b border-border" style={ROOM_CHART_GRID}>
      <div className="flex items-end px-4 pb-3 text-[10px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">Cabin</div>
      {Array.from({ length: ROOM_CHART_DAYS }, (_, i) => {
        const date = addDays(start, i);
        const isToday = isSameDay(date, today);
        return (
          <div key={i} className={cn("flex flex-col items-center gap-1 border-l border-border pt-3 pb-2.5", isToday && "bg-gold/8")}>
            <span className={cn("text-[9.5px] font-semibold tracking-[0.2em] uppercase", isToday ? "text-gold" : "text-muted-foreground")}>
              {format(date, "EEE")}
            </span>
            <span className={cn("text-lg leading-none font-extralight tabular-nums", isToday ? "text-gold" : "text-foreground")}>
              {format(date, "d")}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default RoomChartHeader;
