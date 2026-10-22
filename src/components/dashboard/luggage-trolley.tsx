import { DRAWING_INK } from "@/lib/constants";

function LuggageTrolley({ className }: ClassNameProps) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className} fill="none" strokeWidth="1.1" strokeLinecap="square">
      <path d="M8 7H32" className="stroke-gold" strokeWidth="1.5" />
      <path d="M9 7V31M31 7V31M5 31H35" className={DRAWING_INK} />
      <rect x="12" y="18" width="10" height="13" className={DRAWING_INK} />
      <rect x="23" y="22" width="6" height="9" className={DRAWING_INK} />
      <path d="M15 18V15.5H19V18" className={DRAWING_INK} />
      <rect x="9" y="33" width="3" height="3" className={DRAWING_INK} />
      <rect x="28" y="33" width="3" height="3" className={DRAWING_INK} />
    </svg>
  );
}

export default LuggageTrolley;
