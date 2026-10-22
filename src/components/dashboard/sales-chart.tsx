import { useId } from "react";
import { format } from "date-fns";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import BlankLedger from "@/components/dashboard/blank-ledger";
import SalesTooltipRow from "@/components/dashboard/sales-tooltip-row";
import ErrorNote from "@/components/shared/error-note";
import CardEmptyState from "@/components/shared/card-empty-state";
import { SALES_CARD, SALES_CHART_CONFIG } from "@/lib/constants";
import { formatCompactCurrency, salesByDay } from "@/lib/helpers";

function SalesChart({ bookings, numDays, error }: SalesChartProps) {
  const id = useId().replace(/:/g, "");
  const today = new Date();
  const { chartData, firstDay } = salesByDay(bookings, numDays, today);

  return (
    <Card className={`flex flex-col ${SALES_CARD}`}>
      <CardHeader className="border-b border-border">
        <CardTitle>Revenue</CardTitle>
        <CardDescription>
          {format(firstDay, "MMM d, yyyy")} – {format(today, "MMM d, yyyy")}. Extras such as breakfast are included in the total.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col">
        {error ? (
          <ErrorNote title="The ledger is out of reach" message="Revenue could not be loaded. Try again shortly." drawing={<BlankLedger clouded className="w-full max-w-72" />} />
        ) : bookings.length === 0 ? (
          <CardEmptyState drawing={<BlankLedger className="w-full max-w-72" />} title="The ledger is still blank" message="No bookings in this period." />
        ) : (
        <ChartContainer config={SALES_CHART_CONFIG} className="aspect-auto min-h-0 w-full min-w-0 flex-1">
          <AreaChart accessibilityLayer data={chartData} margin={{ left: 0, right: 12, top: 12 }}>
            <defs>
              <linearGradient id={`${id}-total`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-totalSales)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-totalSales)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id={`${id}-extras`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-extrasSales)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-extrasSales)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} minTickGap={32} />
            <YAxis tickLine={false} axisLine={false} width={52} tickFormatter={formatCompactCurrency} />
            <ChartTooltip content={<ChartTooltipContent indicator="dot" formatter={(value, name) => <SalesTooltipRow value={value} name={name} />} />} />
            <Area dataKey="totalSales" type="monotone" fill={`url(#${id}-total)`} fillOpacity={1} stroke="var(--color-totalSales)" strokeWidth={1.5} />
            <Area dataKey="extrasSales" type="monotone" fill={`url(#${id}-extras)`} fillOpacity={1} stroke="var(--color-extrasSales)" strokeWidth={1.5} />
            <ChartLegend content={<ChartLegendContent className="flex-wrap gap-x-4 gap-y-2" />} />
          </AreaChart>
        </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

export default SalesChart;
