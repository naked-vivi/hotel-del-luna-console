import FogCloud from "@/components/shared/fog-cloud";
import { LEDGER_LINE_ROWS } from "@/lib/constants";

function BlankLedger({ className, clouded = false }: DrawingProps) {
  return (
    <svg viewBox="0 0 260 124" aria-hidden="true" className={className} fill="none">
      <rect x="44" y="14" width="86" height="96" className="stroke-muted-foreground/60" strokeWidth="1.1" />
      <rect x="130" y="14" width="86" height="96" className="stroke-muted-foreground/60" strokeWidth="1.1" />
      <path d="M56 26H96M142 26H170" className="stroke-muted-foreground/60" strokeWidth="1.1" />
      <path d="M190 34V98" className="stroke-border" strokeWidth="1" />
      {LEDGER_LINE_ROWS.map((y) => (
        <path key={y} d={`M56 ${y}H118M142 ${y}H204`} className="stroke-border" strokeWidth="1" />
      ))}
      <path d="M207 14V120L210.5 115L214 120V14" className="fill-gold/15 stroke-gold" strokeWidth="1.1" strokeLinejoin="miter" />
      {clouded && <FogCloud x={120} y={48} scale={0.85} />}
    </svg>
  );
}

export default BlankLedger;
