/** Seven nights as seven unlit moons, one per weekday. The middle one is bronze, like the logo. */
export function UnlitNights({ className }: { className?: string }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <svg viewBox="0 0 260 64" aria-hidden="true" className={className} fill="none">
      {days.map((day, i) => {
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

/** An open guest ledger with ruled, empty lines and a bronze ribbon marking the page. */
export function BlankLedger({ className }: { className?: string }) {
  const rows = [40, 52, 64, 76, 88];

  return (
    <svg viewBox="0 0 260 124" aria-hidden="true" className={className} fill="none">
      {/* Pages and spine */}
      <rect x="44" y="14" width="86" height="96" className="stroke-muted-foreground/60" strokeWidth="1.1" />
      <rect x="130" y="14" width="86" height="96" className="stroke-muted-foreground/60" strokeWidth="1.1" />
      {/* Page headings */}
      <path d="M56 26H96M142 26H170" className="stroke-muted-foreground/60" strokeWidth="1.1" />
      {/* Amount column on the right page */}
      <path d="M190 34V98" className="stroke-border" strokeWidth="1" />
      {/* Ruled lines, all empty */}
      {rows.map((y) => (
        <path key={y} d={`M56 ${y}H118M142 ${y}H204`} className="stroke-border" strokeWidth="1" />
      ))}
      {/* Ribbon bookmark */}
      <path d="M207 14V120L210.5 115L214 120V14" className="fill-gold/15 stroke-gold" strokeWidth="1.1" strokeLinejoin="miter" />
    </svg>
  );
}
