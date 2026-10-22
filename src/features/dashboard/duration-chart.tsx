import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { DURATION_CARD } from "./card-sizes";
import { UnlitNights } from "./empty-drawings";
import ErrorNote from "@/shared/error-note";

const durationGroups = [
  { key: "one", label: "1 night", max: 1, color: "#DDC2A2" },
  { key: "two", label: "2 nights", max: 2, color: "#C69963" },
  { key: "three", label: "3 nights", max: 3, color: "#B78343" },
  { key: "fourFive", label: "4–5 nights", max: 5, color: "#926835" },
  { key: "sixSeven", label: "6–7 nights", max: 7, color: "#99B0C7" },
  { key: "eightFourteen", label: "8–14 nights", max: 14, color: "#7C99B6" },
  { key: "fifteenTwentyOne", label: "15–21 nights", max: 21, color: "#5E82A6" },
  { key: "twentyTwoPlus", label: "22+ nights", max: Infinity, color: "#4C6B8A" },
];

const chartConfig = Object.fromEntries(
  durationGroups.map(({ key, label, color }) => [key, { label, color }])
) satisfies ChartConfig;

type DurationChartProps = {
  confirmedStays: readonly { numNights: number | null }[];
  /** Set when the stays could not be loaded. */
  error?: Error | null;
};

function DurationChart({ confirmedStays, error }: DurationChartProps) {
  const groups = durationGroups.map(({ key }) => ({
    duration: key,
    stays: 0,
    fill: `var(--color-${key})`,
  }));

  for (const { numNights } of confirmedStays) {
    if (numNights == null || !Number.isInteger(numNights) || numNights < 1) continue;
    const index = durationGroups.findIndex(({ max }) => numNights <= max);
    groups[index].stays += 1;
  }

  const chartData = groups.filter(({ stays }) => stays > 0);
  const totalStays = chartData.reduce((total, group) => total + group.stays, 0);

  return (
    <Card className={`flex flex-col ${DURATION_CARD}`}>
      <CardHeader className="border-b border-border">
        <CardTitle>Length of stay</CardTitle>
        <CardDescription>Checked-in and checked-out stays in the selected period.</CardDescription>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col">
        {error ? (
          <ErrorNote message="Stays could not be loaded. Try again shortly." />
        ) : totalStays === 0 ? (
          <div className="my-auto flex flex-col items-center gap-7 py-6 text-center">
            <UnlitNights className="w-full max-w-72" />
            <div className="space-y-2">
              <p className="text-xl font-extralight text-foreground">No nights to count yet</p>
              <p className="text-sm text-muted-foreground">No stays in this period.</p>
            </div>
          </div>
        ) : (
          <>
            <ChartContainer config={chartConfig} className="aspect-auto min-h-0 w-full min-w-0 flex-1">
              <PieChart accessibilityLayer>
                <ChartTooltip content={<ChartTooltipContent nameKey="duration" hideLabel />} />
                <Pie data={chartData} dataKey="stays" nameKey="duration" innerRadius="50%" outerRadius="80%" stroke="var(--background)" strokeWidth={2} />
              </PieChart>
            </ChartContainer>
            <ul aria-label="Stay duration legend" className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs">
              {durationGroups.filter(({ key }) => chartData.some((group) => group.duration === key)).map(({ key, label, color }) => (
                <li key={key} className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-2 shrink-0" style={{ backgroundColor: color }} />
                  {label}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {totalStays} {totalStays === 1 ? "stay" : "stays"} in total
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default DurationChart;
