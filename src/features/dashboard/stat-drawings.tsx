// Small thin-line drawings for the metric cards, in the same style as the empty states.
// Each one is drawn in the muted ink with a single bronze detail.

const ink = "stroke-muted-foreground/70";

/** Bookings: the bell on the front desk. The button on top is bronze. */
export function DeskBell({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className} fill="none" strokeWidth="1.1" strokeLinecap="round">
      <path d="M6 29A14 14 0 0 1 34 29" className={ink} />
      <path d="M12 24.5A9 9 0 0 1 17.5 18.4" className="stroke-muted-foreground/40" />
      <path d="M3 29.5H37M6 33.5H34" className={ink} />
      <path d="M20 15V12.5" className={ink} />
      <rect x="16.75" y="8.5" width="6.5" height="4" className="fill-gold stroke-gold" />
    </svg>
  );
}

/** Revenue: a hotel bill with a torn edge. The total is underlined twice in bronze. */
export function Folio({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className} fill="none" strokeWidth="1.1" strokeLinecap="square">
      <path d="M8 3H32V35L29 33L26 35L23 33L20 35L17 33L14 35L11 33L8 35Z" className={ink} strokeLinejoin="miter" />
      <path d="M12.5 9H22" className={ink} />
      <path d="M12.5 15H19M24 15H27.5M12.5 19.5H18M24 19.5H27.5" className="stroke-muted-foreground/45" />
      <path d="M12.5 26H17.5" className={ink} />
      <path d="M22.5 25.5H27.5M22.5 28H27.5" className="stroke-gold" />
    </svg>
  );
}

/** Check-ins: the bellhop's luggage trolley, bags aboard, its brass rail in bronze. */
export function LuggageTrolley({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className} fill="none" strokeWidth="1.1" strokeLinecap="square">
      <path d="M8 7H32" className="stroke-gold" strokeWidth="1.5" />
      <path d="M9 7V31M31 7V31M5 31H35" className={ink} />
      <rect x="12" y="18" width="10" height="13" className={ink} />
      <rect x="23" y="22" width="6" height="9" className={ink} />
      <path d="M15 18V15.5H19V18" className={ink} />
      <rect x="9" y="33" width="3" height="3" className={ink} />
      <rect x="28" y="33" width="3" height="3" className={ink} />
    </svg>
  );
}
