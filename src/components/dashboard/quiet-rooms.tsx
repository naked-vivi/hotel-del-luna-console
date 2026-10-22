import FogCloud from "@/components/shared/fog-cloud";
import { QUIET_ROOM_POSITIONS } from "@/lib/constants";

function QuietRooms({ className, clouded = false }: DrawingProps) {
  return (
    <svg viewBox="0 0 260 112" aria-hidden="true" className={className} fill="none">
      <path d="M22 96H238" className="stroke-border" strokeWidth="1.1" />
      {QUIET_ROOM_POSITIONS.map((x, i) => (
        <g key={x}>
          <rect x={x - 14} y="40" width="28" height="56" className={i === 2 ? "fill-gold/10 stroke-gold" : "stroke-muted-foreground/50"} strokeWidth="1.1" />
          <path d={`M${x + 7} 70V72`} className={i === 2 ? "stroke-gold" : "stroke-muted-foreground/50"} strokeWidth="1.5" />
        </g>
      ))}
      <g className="text-gold">
        <circle cx="124" cy="20" r="7" stroke="currentColor" strokeWidth="1.1" />
        <path d="M124 13A7 7 0 0 1 124 27Z" fill="currentColor" />
      </g>
      {clouded && <FogCloud x={120} y={40} scale={0.85} />}
    </svg>
  );
}

export default QuietRooms;
