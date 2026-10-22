import { cn } from "@/lib/utils";
import { MAP_LEVEL_FILLS } from "@/lib/constants";

function MapLegend() {
  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      <span>Fewer</span>
      <svg viewBox={`0 0 ${(MAP_LEVEL_FILLS.length - 1) * 22} 10`} aria-hidden="true" className="h-2.5 w-28">
        {MAP_LEVEL_FILLS.slice(1).map((fill, i) => (
          <rect key={fill} x={i * 22} y="0" width="18" height="10" className={cn(fill)} />
        ))}
      </svg>
      <span>More</span>
    </div>
  );
}

export default MapLegend;
