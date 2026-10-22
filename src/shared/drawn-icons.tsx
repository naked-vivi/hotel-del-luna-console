import type { ReactNode, SVGProps } from "react";

// Drawn icons: small hotel scenes in the same thin-line style as the dashboard's
// empty and error states. 32px grid, fine strokes, square ends, one bronze detail each.
// The ink follows the text colour; the bronze uses --icon-accent.

type IconProps = SVGProps<SVGSVGElement>;

const A = "var(--icon-accent, currentColor)";

function Drawn({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ---------- Sample data ---------- */

/** Everything: three ledgers stacked flat, the top one banded in bronze. */
export function LedgerStackIcon(props: IconProps) {
  return (
    <Drawn {...props}>
      <rect x="4" y="21" width="24" height="6" />
      <rect x="6" y="15" width="21" height="6" />
      <rect x="5" y="9" width="21" height="6" />
      <path d="M10 21V27M22 15V21" />
      <path d="M9.5 9V15" stroke={A} strokeWidth={2} />
    </Drawn>
  );
}

/** Bookings only: a calendar card with one day marked in bronze. */
export function CalendarCardIcon(props: IconProps) {
  return (
    <Drawn {...props}>
      <rect x="4.5" y="7" width="23" height="21" />
      <path d="M4.5 12H27.5M10.5 4.5V9M21.5 4.5V9" />
      <path d="M9 16.5H10.5M14 16.5H15.5M19 16.5H20.5M24 16.5H24.5M9 21.5H10.5M14 21.5H15.5M24 21.5H24.5" />
      <rect x="18.5" y="20" width="3" height="3" fill={A} stroke={A} />
    </Drawn>
  );
}

/* ---------- Row actions ---------- */

/** View details: a reservation card with a folded corner and a bronze half-moon seal. */
export function ReservationCardIcon(props: IconProps) {
  return (
    <Drawn {...props}>
      <path d="M7 3.5H20.5L25.5 8.5V28.5H7Z" />
      <path d="M20.5 3.5V8.5H25.5" />
      <path d="M10.5 12H19M10.5 15.5H22M10.5 19H16.5" />
      <circle cx="21" cy="23.5" r="2.5" stroke={A} />
      <path d="M21 21A2.5 2.5 0 0 1 21 26Z" fill={A} stroke="none" />
    </Drawn>
  );
}

/** Check in: a room key hanging from its bronze tag, like the keys on the rack. */
export function KeyOnTagIcon(props: IconProps) {
  return (
    <Drawn {...props}>
      <rect x="11" y="2.5" width="10" height="11" fill={A} fillOpacity={0.2} stroke={A} />
      <path d="M13.5 6.5H18.5" stroke={A} />
      <path d="M16 13.5V15" />
      <circle cx="16" cy="17.5" r="2.5" />
      <path d="M16 20V29.5M16 25H19M16 28H18.5" />
    </Drawn>
  );
}

/** Check out: the room door left ajar, warm bronze light inside. */
export function DoorAjarIcon(props: IconProps) {
  return (
    <Drawn {...props}>
      <rect x="7.5" y="4.5" width="13" height="23.5" fill={A} fillOpacity={0.18} stroke="none" />
      <path d="M7.5 28V4.5H20.5V28M3 28H29" />
      <path d="M20.5 4.5L26.5 7V25.5L20.5 28" />
      <path d="M23.5 16V18" />
    </Drawn>
  );
}

/** Delete: a woven wastebasket with a bronze rim. */
export function WastebasketIcon(props: IconProps) {
  return (
    <Drawn {...props}>
      <path d="M5 8H27" stroke={A} />
      <path d="M7.5 8L9.5 28.5H22.5L24.5 8" />
      <path d="M12 11.5L12.75 25.5M16 11.5V25.5M20 11.5L19.25 25.5" />
    </Drawn>
  );
}

/** Edit: a fountain pen with a bronze nib. */
export function FountainPenIcon(props: IconProps) {
  return (
    <Drawn {...props}>
      <path d="M22.5 3.5L28.5 9.5L13 25L7 19Z" />
      <path d="M19.75 6.25L25.75 12.25" />
      <path d="M7 19L13 25L3.5 28.5Z" fill={A} fillOpacity={0.2} stroke={A} />
      <path d="M3.5 28.5L8.25 23.75" stroke={A} />
    </Drawn>
  );
}

/** Duplicate: two room key cards, the front one with a bronze stripe. */
export function KeyCardsIcon(props: IconProps) {
  return (
    <Drawn {...props}>
      <path d="M8 19H3.5V5.5H22.5V10" />
      <rect x="8" y="10" width="20.5" height="14.5" />
      <rect x="8" y="13.5" width="20.5" height="2.5" fill={A} stroke={A} strokeWidth={0.75} />
      <path d="M11.5 20.5H17" />
    </Drawn>
  );
}
