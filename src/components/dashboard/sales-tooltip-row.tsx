import { formatCurrency } from "@/lib/utils";
import { SALES_CHART_CONFIG } from "@/lib/constants";

function SalesTooltipRow({ value, name }: SalesTooltipRowProps) {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <span className="text-muted-foreground">{SALES_CHART_CONFIG[name as keyof typeof SALES_CHART_CONFIG]?.label ?? String(name)}</span>
      <span className="font-mono font-medium tabular-nums">{formatCurrency(Number(value))}</span>
    </div>
  );
}

export default SalesTooltipRow;
