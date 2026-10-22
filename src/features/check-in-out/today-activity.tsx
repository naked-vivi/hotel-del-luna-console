import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useTodayActivity from "./use-today-activity";
import TodayItem from "./today-item";
import KeyRack from "./key-rack";
import ErrorNote from "@/shared/error-note";
import CardSkeleton from "@/shared/card-skeleton";
import { TODAY_CARD } from "../dashboard/card-sizes";

/** Empty state: every key is still on the rack, so nobody is coming or going. */
function QuietNight() {
  return (
    <div className="my-auto flex flex-col items-center gap-7 py-6 text-center">
      <KeyRack className="w-full max-w-72" />
      <div className="space-y-2">
        <p className="text-xl font-extralight text-foreground">All keys are on their hooks</p>
        <p className="text-sm text-muted-foreground">No arrivals or departures today.</p>
      </div>
    </div>
  );
}

/** `isLoading` lets the dashboard keep this card as a skeleton until every card is ready. */
function TodayActivity({ isLoading = false }: { isLoading?: boolean }) {
  const { isPending, activities, error } = useTodayActivity();

  if (isPending || isLoading) return <CardSkeleton className={TODAY_CARD} label="Loading tonight's arrivals and departures" />;

  return (
    <Card className={`flex flex-col ${TODAY_CARD}`}>
      <CardHeader className="border-b border-border">
        <CardTitle>Tonight</CardTitle>
        <CardDescription>Arrivals and departures for {format(new Date(), "EEEE d MMMM")}</CardDescription>
      </CardHeader>
      <CardContent className="custom-scrollbar @container/activity flex min-h-0 flex-1 flex-col overflow-y-auto">
        {error ? (
          <ErrorNote message="Arrivals and departures could not be loaded." />
        ) : activities.length > 0 ? (
          <ul className="min-w-0">
            {activities.map((activity) => (
              <TodayItem activity={activity} key={activity.id} />
            ))}
          </ul>
        ) : (
          <QuietNight />
        )}
      </CardContent>
    </Card>
  );
}

export default TodayActivity;
