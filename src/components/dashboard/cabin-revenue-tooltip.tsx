import { averageGapLabel, formatWholeCurrency, toPercent } from "@/lib/helpers";

function CabinRevenueTooltip({ active, payload, average }: CabinRevenueTooltipProps) {
  const bar = payload?.[0]?.payload;
  if (!active || !bar) return null;

  return (
    <div className="grid min-w-48 gap-2 border border-border bg-popover px-3.5 py-3 text-xs text-popover-foreground">
      <p className="text-sm font-light">{bar.label}</p>
      <dl className="grid gap-1">
        <div className="flex justify-between gap-6">
          <dt className="text-muted-foreground">Revenue</dt>
          <dd className="tabular-nums">{formatWholeCurrency(bar.revenue)}</dd>
        </div>
        <div className="flex justify-between gap-6">
          <dt className="text-muted-foreground">Share</dt>
          <dd className="tabular-nums">{toPercent(bar.share)}%</dd>
        </div>
      </dl>
      <p className="border-t border-border pt-2 text-muted-foreground">{averageGapLabel(bar.revenue, average)}</p>
    </div>
  );
}

export default CabinRevenueTooltip;
