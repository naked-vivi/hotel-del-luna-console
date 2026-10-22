import { useState } from "react";
import type { MouseEvent } from "react";
import MapTooltip from "@/components/dashboard/map-tooltip";
import { cn } from "@/lib/utils";
import { mapLevel, mapShapeFlag } from "@/lib/helpers";
import { WORLD_SHAPES } from "@/lib/world-map";
import { MAP_LEVEL_FILLS, WORLD_MAP_SIZE } from "@/lib/constants";

function WorldMap({ countries }: WorldMapProps) {
  const [hover, setHover] = useState<MapHover | null>(null);
  const [pointer, setPointer] = useState<MapPointer | null>(null);
  const byNumeric = new Map(countries.filter((entry) => entry.numeric).map((entry) => [entry.numeric, entry]));
  const max = Math.max(0, ...countries.map((entry) => entry.count));

  function handlePointer(event: MouseEvent<HTMLDivElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    setPointer({ x: event.clientX - box.left, y: event.clientY - box.top, width: box.width, height: box.height });
  }

  function handleEnter(shape: WorldShape) {
    const entry = byNumeric.get(shape.id);
    setHover({ name: entry?.name ?? shape.name, flag: entry?.flag ?? mapShapeFlag(shape.id), count: entry?.count ?? 0 });
  }

  return (
    <div className="relative" onMouseMove={handlePointer} onMouseLeave={() => setHover(null)}>
      <svg viewBox={`0 0 ${WORLD_MAP_SIZE.width} ${WORLD_MAP_SIZE.height}`} role="img" aria-label="World map shaded by where guests come from" className="h-auto w-full">
        {WORLD_SHAPES.map((shape) => {
          const entry = byNumeric.get(shape.id);
          return (
            <path
              key={shape.id}
              d={shape.d}
              strokeWidth={0.5}
              onMouseEnter={() => handleEnter(shape)}
              onMouseLeave={() => setHover(null)}
              className={cn(
                "stroke-card transition-opacity",
                MAP_LEVEL_FILLS[entry ? mapLevel(entry.count, max) : 0],
                hover?.name === (entry?.name ?? shape.name) && "opacity-75",
              )}
            />
          );
        })}
      </svg>
      {hover && pointer && <MapTooltip hover={hover} pointer={pointer} />}
    </div>
  );
}

export default WorldMap;
