import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import UnlitNights from "@/components/dashboard/unlit-nights";
import ErrorNote from "@/components/shared/error-note";
import CardEmptyState from "@/components/shared/card-empty-state";
import { DURATION_CARD, DURATION_CHART_CONFIG } from "@/lib/constants";
import { groupStaysByDuration, pluralize } from "@/lib/helpers";

function DurationChart({ confirmedStays, error }: DurationChartProps) {
  const { chartData, legend, totalStays } = groupStaysByDuration(confirmedStays);

  return (
    <Card className={`flex flex-col ${DURATION_CARD}`}>
      <CardHeader className="border-b border-border">
        <CardTitle>Length of stay</CardTitle>
        <CardDescription>Checked-in and checked-out stays in the selected period.</CardDescription>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col">
        {error ? (
          <ErrorNote title="The nights are clouded over" message="Stays could not be loaded. Try again shortly." drawing={<UnlitNights clouded className="w-full max-w-72" />} />
        ) : totalStays === 0 ? (
          <CardEmptyState drawing={<UnlitNights className="w-full max-w-72" />} title="No nights to count yet" message="No stays in this period." />
        ) : (
          <>
            <ChartContainer config={DURATION_CHART_CONFIG} className="aspect-auto min-h-0 w-full min-w-0 flex-1">
              <PieChart accessibilityLayer>
                <ChartTooltip content={<ChartTooltipContent nameKey="duration" hideLabel />} />
                <Pie data={chartData} dataKey="stays" nameKey="duration" innerRadius="50%" outerRadius="80%" stroke="var(--background)" strokeWidth={2} />
              </PieChart>
            </ChartContainer>
            <ul aria-label="Stay duration legend" className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs">
              {legend.map(({ key, label, color }) => (
                <li key={key} className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-2 shrink-0" style={{ backgroundColor: color }} />
                  {label}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {pluralize(totalStays, "stay")} in total
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default DurationChart;
