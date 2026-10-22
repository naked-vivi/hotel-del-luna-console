import { mapTooltipStyle, pluralize } from "@/lib/helpers";

function MapTooltip({ hover, pointer }: MapTooltipProps) {
  return (
    <div
      role="tooltip"
      className="pointer-events-none absolute z-10 flex items-center gap-3 border border-border bg-popover px-3 pt-2 pb-1.5 whitespace-nowrap text-popover-foreground"
      style={mapTooltipStyle(pointer)}
    >
      {hover.flag && <img src={hover.flag} alt="" className="h-3 w-4.5 shrink-0 object-cover" />}
      <span className="text-[13px]">{hover.name}</span>
      <span className="text-xs text-muted-foreground tabular-nums">{hover.count ? pluralize(hover.count, "stay") : "No stays"}</span>
    </div>
  );
}

export default MapTooltip;
