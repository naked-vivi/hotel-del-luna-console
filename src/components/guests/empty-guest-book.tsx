import FogCloud from "@/components/shared/fog-cloud";

function EmptyGuestBook({ className, clouded = false }: DrawingProps) {
  return (
    <svg viewBox="0 0 260 120" aria-hidden="true" className={className} fill="none">
      <path d="M44 92Q87 78 130 92V34Q87 20 44 34Z" className="stroke-muted-foreground/70" strokeWidth="1.1" />
      <path d="M130 92Q173 78 216 92V34Q173 20 130 34Z" className="stroke-muted-foreground/70" strokeWidth="1.1" />
      <path d="M58 48Q87 40 116 48M58 62Q87 54 116 62M58 76Q87 68 116 76" className="stroke-border" strokeWidth="1.1" strokeDasharray="3 3" />
      <path d="M200 14C186 22 168 44 156 66L160 68C174 48 192 28 200 14Z" className="fill-gold/15 stroke-gold" strokeWidth="1.1" />
      <path d="M156 66L150 78" className="stroke-gold" strokeWidth="1.1" />
      <path d="M30 106H230" className="stroke-border" strokeWidth="1.1" />
      {clouded && <FogCloud x={40} y={30} scale={0.85} />}
    </svg>
  );
}

export default EmptyGuestBook;
