import { format, parseISO } from "date-fns";
import { BOOKED_NIGHTS_LIMIT } from "@/lib/constants";

function BookedNights({ ranges, isLoading }: BookedNightsProps) {
  if (isLoading) return <p className="text-xs text-muted-foreground">Checking booked nights…</p>;
  if (ranges.length === 0) return <p className="text-xs text-muted-foreground">No other bookings in the next year. Every night is free.</p>;

  const shown = ranges.slice(0, BOOKED_NIGHTS_LIMIT);

  return (
    <div className="space-y-2">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Already booked</p>
      <ul className="flex flex-wrap gap-2">
        {shown.map((range) => (
          <li key={`${range.start_date}-${range.end_date}`} className="border border-status-pending/30 bg-status-pending-bg px-2.5 pt-1 pb-0.5 text-xs text-status-pending tabular-nums">
            {format(parseISO(range.start_date), "d MMM")} – {format(parseISO(range.end_date), "d MMM")}
          </li>
        ))}
        {ranges.length > shown.length && <li className="pt-1 text-xs text-muted-foreground">+{ranges.length - shown.length} more</li>}
      </ul>
    </div>
  );
}

export default BookedNights;
