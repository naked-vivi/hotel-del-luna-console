import { Link } from "react-router-dom";
import useTodayActivity from "@/hooks/check-in-out/use-today-activity";
import FrontDeskFigure from "@/components/shared/front-desk-figure";
import { activityCounts } from "@/lib/helpers";

function FrontDeskCount() {
  const { activities, isPending, error } = useTodayActivity();

  if (error) return null;

  const { arriving, leaving } = activityCounts(activities);

  return (
    <Link
      to="/dashboard"
      className="flex items-center gap-6 transition-opacity hover:opacity-80 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ring"
      aria-label={isPending ? "Loading today's arrivals and departures" : `${arriving} arriving and ${leaving} leaving today`}
    >
      <FrontDeskFigure value={arriving} label="Arriving" isLoading={isPending} />
      <FrontDeskFigure value={leaving} label="Leaving" isLoading={isPending} />
    </Link>
  );
}

export default FrontDeskCount;
