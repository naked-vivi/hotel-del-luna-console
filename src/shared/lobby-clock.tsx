import { format } from "date-fns";
import { useNow } from "@/hooks/use-now";

/** Front-desk clock: the time set large and thin, the day and date stacked beside it. */
function LobbyClock() {
  const now = useNow();

  return (
    <div className="flex items-center gap-4">
      <time dateTime={now.toISOString()} className="text-[2rem] leading-none font-extralight tabular-nums text-foreground">
        {format(now, "HH:mm")}
      </time>
      <div className="flex flex-col gap-1.5 pt-1 text-[10px] leading-none font-semibold uppercase tracking-[0.28em] text-muted-foreground">
        <span>{format(now, "EEEE")}</span>
        <span>{format(now, "d MMMM yyyy")}</span>
      </div>
    </div>
  );
}

export default LobbyClock;
