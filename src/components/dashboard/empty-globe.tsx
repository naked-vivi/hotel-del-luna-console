import FogCloud from "@/components/shared/fog-cloud";

function EmptyGlobe({ className, clouded = false }: DrawingProps) {
  return (
    <svg viewBox="0 0 260 120" aria-hidden="true" className={className} fill="none">
      <circle cx="130" cy="60" r="44" className="stroke-muted-foreground/60" strokeWidth="1.1" />
      <ellipse cx="130" cy="60" rx="18" ry="44" className="stroke-muted-foreground/40" strokeWidth="1" strokeDasharray="2 3" />
      <path d="M86 60H174M92 38H168M92 82H168" className="stroke-muted-foreground/40" strokeWidth="1" strokeDasharray="2 3" />
      <g className="text-gold">
        <circle cx="196" cy="24" r="8" stroke="currentColor" strokeWidth="1.1" />
        <path d="M196 16A8 8 0 0 1 196 32Z" fill="currentColor" />
      </g>
      <path d="M30 108H230" className="stroke-border" strokeWidth="1.1" />
      {clouded && <FogCloud x={120} y={40} scale={0.85} />}
    </svg>
  );
}

export default EmptyGlobe;
