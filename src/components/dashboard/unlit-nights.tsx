import { WEEKDAY_INITIALS } from "@/lib/constants";

function UnlitNights({ className }: ClassNameProps) {
  return (
    <svg viewBox="0 0 260 64" aria-hidden="true" className={className} fill="none">
      {WEEKDAY_INITIALS.map((day, i) => {
        const x = 28 + i * 34;
        const isMoon = i === 3;
        return (
          <g key={i}>
            {isMoon ? (
              <g className="text-gold">
                <circle cx={x} cy="24" r="10" stroke="currentColor" strokeWidth="1.1" />
                <path d={`M${x} 14A10 10 0 0 1 ${x} 34Z`} fill="currentColor" />
              </g>
            ) : (
              <circle cx={x} cy="24" r="10" className="stroke-muted-foreground/50" strokeWidth="1.1" strokeDasharray="2 3" />
            )}
            <text
              x={x}
              y="56"
              textAnchor="middle"
              className={isMoon ? "fill-gold" : "fill-muted-foreground"}
              style={{ fontSize: 8, letterSpacing: "0.14em", fontWeight: 600 }}
            >
              {day}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default UnlitNights;
