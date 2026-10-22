import { DRAWING_INK } from "@/lib/constants";

function DeskBell({ className }: ClassNameProps) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className} fill="none" strokeWidth="1.1" strokeLinecap="round">
      <path d="M6 29A14 14 0 0 1 34 29" className={DRAWING_INK} />
      <path d="M12 24.5A9 9 0 0 1 17.5 18.4" className="stroke-muted-foreground/40" />
      <path d="M3 29.5H37M6 33.5H34" className={DRAWING_INK} />
      <path d="M20 15V12.5" className={DRAWING_INK} />
      <rect x="16.75" y="8.5" width="6.5" height="4" className="fill-gold stroke-gold" />
    </svg>
  );
}

export default DeskBell;
