import FogCloud from "@/components/shared/fog-cloud";
import { ROSTER_BADGE_POSITIONS } from "@/lib/constants";

function EmptyRoster({ className, clouded = false }: DrawingProps) {
  return (
    <svg viewBox="0 0 260 120" aria-hidden="true" className={className} fill="none">
      <path d="M40 12H220" className="stroke-border" strokeWidth="1.1" />
      {ROSTER_BADGE_POSITIONS.map((x, i) => {
        const tone = i === 1 ? "stroke-gold" : "stroke-muted-foreground/55";
        return (
          <g key={x}>
            <path d={`M${x} 12V32`} className="stroke-border" strokeWidth="1.1" />
            <rect x={x - 19} y="32" width="38" height="50" className={i === 1 ? `fill-gold/10 ${tone}` : tone} strokeWidth="1.1" />
            <circle cx={x} cy="50" r="7" className={tone} strokeWidth="1.1" strokeDasharray={i === 1 ? undefined : "2 3"} />
            <path d={`M${x - 10} 70H${x + 10}`} className={tone} strokeWidth="1.1" />
          </g>
        );
      })}
      <path d="M40 104H220" className="stroke-border" strokeWidth="1.1" />
      {clouded && <FogCloud x={132} y={56} scale={0.8} />}
    </svg>
  );
}

export default EmptyRoster;
