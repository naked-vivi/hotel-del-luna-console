import FogCloud from "@/components/shared/fog-cloud";
import { KEY_RACK_HOOKS } from "@/lib/constants";

function KeyRack({ className, clouded = false }: DrawingProps) {
  return (
    <svg viewBox="0 0 260 132" aria-hidden="true" className={className} fill="none">
      <path d="M18 18H242" className="stroke-border" strokeWidth="1.2" />
      <path d="M24 12V24M236 12V24" className="stroke-border" strokeWidth="1.2" />

      {KEY_RACK_HOOKS.map(({ x, label }) => {
        const isMoon = label === null;
        const stroke = isMoon ? "stroke-gold" : "stroke-muted-foreground/60";
        return (
          <g key={x}>
            <path d={`M${x} 18V26a4 4 0 0 1-4 4`} className="stroke-border" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx={x} cy="35" r="5" className={stroke} strokeWidth="1.1" />
            <path d={`M${x} 40V46`} className={stroke} strokeWidth="1.1" />
            <rect x={x - 13} y="46" width="26" height="40" className={isMoon ? "fill-gold/10 stroke-gold" : "stroke-muted-foreground/60"} strokeWidth="1.1" />
            {isMoon ? (
              <g className="text-gold">
                <circle cx={x} cy="62" r="6.5" stroke="currentColor" strokeWidth="1.1" />
                <path d={`M${x} 55.5A6.5 6.5 0 0 1 ${x} 68.5Z`} fill="currentColor" />
                <path d={`M${x - 6} 77H${x + 6}`} stroke="currentColor" strokeWidth="1" />
              </g>
            ) : (
              <text
                x={x}
                y="70"
                textAnchor="middle"
                className="fill-muted-foreground"
                style={{ fontSize: 7.5, letterSpacing: "0.12em", fontWeight: 600 }}
              >
                {label}
              </text>
            )}
            <path
              d={`M${x} 86V112M${x} 104H${x + 5}M${x} 109H${x + 4}`}
              className={stroke}
              strokeWidth="1.1"
              strokeLinecap="square"
            />
          </g>
        );
      })}
      {clouded && <FogCloud x={124} y={56} scale={0.85} />}
    </svg>
  );
}

export default KeyRack;
