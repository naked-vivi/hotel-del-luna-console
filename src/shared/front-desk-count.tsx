import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import useTodayActivity from "@/features/check-in-out/use-today-activity";

/** Today's arrivals and departures at a glance. Uses the same data as the Tonight card. */
function FrontDeskCount() {
  const { activities, isPending, error } = useTodayActivity();

  if (error) return null;

  const arriving = activities.filter((a) => a.status === "unconfirmed").length;
  const leaving = activities.filter((a) => a.status === "checked-in").length;

  const figure = (value: number, label: string) => (
    <span className="flex items-baseline gap-2">
      {isPending ? (
        <span className="text-2xl leading-none"><Skeleton className="inline-block h-lh w-5 align-bottom" /></span>
      ) : (
        <span className="text-2xl leading-none font-extralight tabular-nums text-foreground">{value}</span>
      )}
      <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">{label}</span>
    </span>
  );

  return (
    <Link
      to="/dashboard"
      className="flex items-center gap-6 transition-opacity hover:opacity-80 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ring"
      aria-label={isPending ? "Loading today's arrivals and departures" : `${arriving} arriving and ${leaving} leaving today`}
    >
      {figure(arriving, "Arriving")}
      {figure(leaving, "Leaving")}
    </Link>
  );
}

export default FrontDeskCount;
