import FogCloud from "@/components/shared/fog-cloud";

function EmptyRegister({ className, clouded = false }: DrawingProps) {
  return (
    <svg viewBox="0 0 260 120" aria-hidden="true" className={className} fill="none">
      <rect x="70" y="30" width="120" height="66" transform="rotate(-7 130 63)" className="stroke-muted-foreground/35" strokeWidth="1.1" />
      <rect x="70" y="30" width="120" height="66" transform="rotate(4 130 63)" className="stroke-muted-foreground/50" strokeWidth="1.1" />
      <rect x="70" y="30" width="120" height="66" className="fill-card stroke-muted-foreground/70" strokeWidth="1.1" />
      <path d="M84 46H136" className="stroke-muted-foreground/70" strokeWidth="1.1" />
      <path d="M84 62H176M84 74H158" className="stroke-border" strokeWidth="1.1" strokeDasharray="3 3" />
      <rect x="160" y="38" width="18" height="14" className="fill-gold/15 stroke-gold" strokeWidth="1.1" />
      <path d="M40 108H220" className="stroke-border" strokeWidth="1.1" />
      {clouded && <FogCloud x={128} y={14} scale={0.85} />}
    </svg>
  );
}

export default EmptyRegister;
