import FogCloud from "@/components/shared/fog-cloud";
import { VACANT_CABIN_POSITIONS } from "@/lib/constants";

function VacantCabins({ className, clouded = false }: DrawingProps) {
  return (
    <svg viewBox="0 0 260 120" aria-hidden="true" className={className} fill="none">
      <path d="M26 96H234" className="stroke-border" strokeWidth="1.1" />
      {VACANT_CABIN_POSITIONS.map((x, i) => {
        const isLit = i === 1;
        return (
          <g key={x}>
            <path
              d={`M${x - 30} 96L${x} 40L${x + 30} 96`}
              className={isLit ? "stroke-gold" : "stroke-muted-foreground/50"}
              strokeWidth="1.1"
              strokeDasharray={isLit ? undefined : "3 3"}
            />
            <rect x={x - 7} y="76" width="14" height="20" className={isLit ? "fill-gold/10 stroke-gold" : "stroke-muted-foreground/50"} strokeWidth="1.1" />
          </g>
        );
      })}
      <g className="text-gold">
        <circle cx="130" cy="18" r="7" stroke="currentColor" strokeWidth="1.1" />
        <path d="M130 11A7 7 0 0 1 130 25Z" fill="currentColor" />
      </g>
      {clouded && <FogCloud x={118} y={28} scale={0.85} />}
    </svg>
  );
}

export default VacantCabins;
