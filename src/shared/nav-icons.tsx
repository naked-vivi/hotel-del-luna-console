import type { ReactNode, SVGProps } from "react";

// Sidebar icons: simple single-line drawings of hotel things, each with one bronze detail.
// 24px grid, thin lines, sharp corners. The bronze uses --icon-accent (the sidebar's own bronze).

type IconProps = SVGProps<SVGSVGElement>;

const A = "var(--icon-accent, currentColor)";

function NavIcon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
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

/** Dashboard: the moon rising over the horizon. */
export function MoonriseIcon(props: IconProps) {
  return (
    <NavIcon {...props}>
      <path d="M7 15.5A5 5 0 0 1 17 15.5Z" fill={A} stroke={A} />
      <path d="M3 15.5H21" />
      <path d="M8 19H16" strokeOpacity={0.55} />
    </NavIcon>
  );
}

/** Bookings: a calendar with a bronze tick for a confirmed stay. */
export function CalendarTickIcon(props: IconProps) {
  return (
    <NavIcon {...props}>
      <rect x="4" y="5.5" width="16" height="15" />
      <path d="M4 9.5H20M8.5 3.5V7M15.5 3.5V7" />
      <path d="M8.5 14.5L11 17L15.75 12.25" stroke={A} />
    </NavIcon>
  );
}

/** Cabins: a small A-frame cabin with a bronze window. */
export function AFrameCabinIcon(props: IconProps) {
  return (
    <NavIcon {...props}>
      <path d="M12 3L21 20.5H3Z" />
      <path d="M10 20.5V15H14V20.5" />
      <rect x="11" y="9.5" width="2" height="2" fill={A} stroke={A} />
    </NavIcon>
  );
}

/** Staff: a member of the team in a bronze bow tie. */
export function StaffIcon(props: IconProps) {
  return (
    <NavIcon {...props}>
      <circle cx="12" cy="7.5" r="3.25" />
      <path d="M5 21V18.75C5 15.9 8 14.25 12 14.25S19 15.9 19 18.75V21" />
      <path d="M9.5 13.25L12 14.75L9.5 16.25ZM14.5 13.25L12 14.75L14.5 16.25Z" fill={A} stroke={A} strokeWidth={0.75} />
    </NavIcon>
  );
}

/** Settings: a cog with square teeth and a bronze hub. */
export function CogIcon(props: IconProps) {
  const teeth = Array.from({ length: 8 }, (_, k) => {
    const a = (k * Math.PI) / 4;
    const p = (r: number) => `${(12 + Math.cos(a) * r).toFixed(2)} ${(12 + Math.sin(a) * r).toFixed(2)}`;
    return `M${p(6.75)}L${p(9.5)}`;
  }).join("");

  return (
    <NavIcon {...props}>
      <circle cx="12" cy="12" r="6.25" />
      <path d={teeth} strokeWidth={2.5} strokeLinecap="butt" />
      <circle cx="12" cy="12" r="2.25" fill={A} stroke={A} />
    </NavIcon>
  );
}
