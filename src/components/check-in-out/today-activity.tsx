import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useTodayActivity from "@/hooks/check-in-out/use-today-activity";
import TodayItem from "@/components/check-in-out/today-item";
import QuietNight from "@/components/check-in-out/quiet-night";
import ErrorNote from "@/components/shared/error-note";
import CardSkeleton from "@/components/shared/card-skeleton";
import { TODAY_CARD } from "@/lib/constants";

function TodayActivity({ isLoading = false }: TodayActivityProps) {
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
