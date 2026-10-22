import { DRAWING_INK } from "@/lib/constants";

function Folio({ className }: ClassNameProps) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className} fill="none" strokeWidth="1.1" strokeLinecap="square">
      <path d="M8 3H32V35L29 33L26 35L23 33L20 35L17 33L14 35L11 33L8 35Z" className={DRAWING_INK} strokeLinejoin="miter" />
      <path d="M12.5 9H22" className={DRAWING_INK} />
      <path d="M12.5 15H19M24 15H27.5M12.5 19.5H18M24 19.5H27.5" className="stroke-muted-foreground/45" />
      <path d="M12.5 26H17.5" className={DRAWING_INK} />
      <path d="M22.5 25.5H27.5M22.5 28H27.5" className="stroke-gold" />
    </svg>
  );
}

export default Folio;
