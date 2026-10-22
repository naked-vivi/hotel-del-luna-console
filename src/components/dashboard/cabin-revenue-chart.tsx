import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ReferenceLine, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import CabinTick from "@/components/dashboard/cabin-tick";
import CabinRevenueTooltip from "@/components/dashboard/cabin-revenue-tooltip";
import { formatCompactCurrency, formatWholeCurrency, toPercent } from "@/lib/helpers";
import { CABIN_BAR_MAX_SIZE, CABIN_REVENUE_CHART_CONFIG } from "@/lib/constants";

function CabinRevenueChart({ bars, average }: CabinRevenueChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const activeName = bars[hoverIndex ?? 0]?.name ?? "";

  return (
    <div className="@container flex min-h-0 flex-1 flex-col">
      <ChartContainer config={CABIN_REVENUE_CHART_CONFIG} className="aspect-auto min-h-0 w-full min-w-0 flex-1">
        <BarChart
          accessibilityLayer
          data={bars}
          margin={{ top: 28, right: 4, left: 0, bottom: 4 }}
          onMouseMove={(state) => setHoverIndex(state.activeTooltipIndex == null ? null : Number(state.activeTooltipIndex))}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 4" />
          <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={6} interval={0} tick={(props) => <CabinTick {...props} activeName={activeName} />} />
          <YAxis tickLine={false} axisLine={false} width={52} tickFormatter={(value) => formatCompactCurrency(Number(value))} />
          <ChartTooltip cursor={false} content={<CabinRevenueTooltip average={average} />} />
          <ReferenceLine
            y={average}
            stroke="var(--color-spotlight)"
            strokeOpacity={0.7}
            label={{ value: `Average ${formatCompactCurrency(Math.round(average))}`, position: "insideTopRight", offset: 8, className: "fill-gold text-[11px] tracking-[0.08em]" }}
          />
          <Bar dataKey="revenue" maxBarSize={CABIN_BAR_MAX_SIZE}>
            {bars.map((bar) => (
              <Cell key={bar.name} className="transition-[fill] duration-200" fill={bar.name === activeName ? "var(--color-spotlight)" : "var(--color-revenue)"} />
            ))}
            <LabelList dataKey="revenue" position="top" offset={10} formatter={(value) => formatCompactCurrency(Number(value))} className="fill-muted-foreground text-xs tabular-nums @max-[40rem]:hidden" />
          </Bar>
        </BarChart>
      </ChartContainer>
      <ol className="sr-only">
        {bars.map((bar) => (
          <li key={bar.name}>{`${bar.label}: ${formatWholeCurrency(bar.revenue)}, ${toPercent(bar.share)}% of revenue`}</li>
        ))}
      </ol>
    </div>
  );
}

export default CabinRevenueChart;
