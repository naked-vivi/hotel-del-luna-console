import { ICON_ACCENT } from "@/lib/constants";

function AmenityIcon({ children, ...props }: IconShellProps) {
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

export function WifiIcon(props: IconProps) {
  return (
    <AmenityIcon {...props}>
      <path d="M3.5 9.5A12 12 0 0 1 20.5 9.5" />
      <path d="M6.5 12.75A7.5 7.5 0 0 1 17.5 12.75" />
      <path d="M9.5 16A3.4 3.4 0 0 1 14.5 16" />
      <rect x="11" y="18.5" width="2" height="2" fill={ICON_ACCENT} stroke="none" />
    </AmenityIcon>
  );
}

export function FireplaceIcon(props: IconProps) {
  return (
    <AmenityIcon {...props}>
      <path d="M3 5.5H21" />
      <path d="M5 5.5V20.5H19V5.5" />
      <path d="M8.5 20.5V11H15.5V20.5" />
      <path d="M12 19.5C10.6 19 10.4 17.2 12 15.5C12.2 16.8 13.6 17.2 13.4 18.4C13.3 19.1 12.7 19.5 12 19.5Z" stroke={ICON_ACCENT} />
    </AmenityIcon>
  );
}

export function KitchenIcon(props: IconProps) {
  return (
    <AmenityIcon {...props}>
      <path d="M4 11H20" />
      <path d="M5.5 11V17.5A3 3 0 0 0 8.5 20.5H15.5A3 3 0 0 0 18.5 17.5V11" />
      <path d="M10.5 8.5H13.5" />
      <path d="M9 5.5V3.5M12 6V3.5M15 5.5V3.5" stroke={ICON_ACCENT} />
    </AmenityIcon>
  );
}

export function HotTubIcon(props: IconProps) {
  return (
    <AmenityIcon {...props}>
      <path d="M3.5 12.5H20.5V19.5H3.5Z" />
      <path d="M3.5 15.5H20.5" />
      <path d="M8 9.5V6.5M12 9.5V5M16 9.5V6.5" stroke={ICON_ACCENT} />
    </AmenityIcon>
  );
}

export function PrivateDeckIcon(props: IconProps) {
  return (
    <AmenityIcon {...props}>
      <path d="M3 13H21" stroke={ICON_ACCENT} />
      <path d="M5 13V20.5M19 13V20.5" />
      <path d="M3 17H21M3 20.5H21" />
      <path d="M9 13V17M15 13V17" />
    </AmenityIcon>
  );
}

export function SpaBathIcon(props: IconProps) {
  return (
    <AmenityIcon {...props}>
      <path d="M3 11.5H21V13.5A5 5 0 0 1 16 18.5H8A5 5 0 0 1 3 13.5Z" />
      <path d="M6 11.5V6.5A2 2 0 0 1 10 6.5" />
      <path d="M7.5 18.5L6.5 20.5M16.5 18.5L17.5 20.5" />
      <path d="M10 9V9.25" stroke={ICON_ACCENT} strokeWidth={1.75} />
    </AmenityIcon>
  );
}

export function ForestViewIcon(props: IconProps) {
  return (
    <AmenityIcon {...props}>
      <path d="M8 3.5L4 11H6.25L3.5 16.5H12.5L9.75 11H12Z" />
      <path d="M8 16.5V20.5" />
      <path d="M16.5 8L14 13H15.5L13.5 17H19.5L17.5 13H19Z" stroke={ICON_ACCENT} />
      <path d="M16.5 17V20.5" stroke={ICON_ACCENT} />
      <path d="M2.5 20.5H21.5" />
    </AmenityIcon>
  );
}

export function MountainViewIcon(props: IconProps) {
  return (
    <AmenityIcon {...props}>
      <path d="M2.5 19.5L9 8.5L13 15L15.5 11.5L21.5 19.5Z" />
      <circle cx="17.5" cy="5" r="1.5" stroke={ICON_ACCENT} />
    </AmenityIcon>
  );
}

export function DiningRoomIcon(props: IconProps) {
  return (
    <AmenityIcon {...props}>
      <path d="M5 15A7 7 0 0 1 19 15" />
      <path d="M3.5 15H20.5" />
      <path d="M5 18H19" />
      <path d="M12 6.5V8" stroke={ICON_ACCENT} />
    </AmenityIcon>
  );
}

export function SaunaIcon(props: IconProps) {
  return (
    <AmenityIcon {...props}>
      <path d="M5 11.5H16L14.75 20.5H6.25Z" />
      <path d="M5.6 16H15.4" />
      <path d="M12 11.5L18.5 5" />
      <path d="M7.5 9.5C6.5 8.5 8.5 7.5 7.5 6.5M10.5 9.5C9.5 8.5 11.5 7.5 10.5 6.5" stroke={ICON_ACCENT} />
    </AmenityIcon>
  );
}

export function FirePitIcon(props: IconProps) {
  return (
    <AmenityIcon {...props}>
      <path d="M3.5 14H20.5L18.5 18H5.5Z" />
      <path d="M7.5 18L6.5 20.5M16.5 18L17.5 20.5" />
      <path d="M12 12.5C9.55 11.6 9.2 8.5 12 5.5C12.35 7.75 14.8 8.5 14.45 10.6C14.3 11.8 13.2 12.5 12 12.5Z" stroke={ICON_ACCENT} />
    </AmenityIcon>
  );
}

export function CoffeeMachineIcon(props: IconProps) {
  return (
    <AmenityIcon {...props}>
      <path d="M5.5 3.5H18.5V20.5H5.5Z" />
      <path d="M5.5 7.5H18.5M5.5 17.5H18.5" />
      <path d="M10.5 7.5V10H13.5V7.5" />
      <path d="M10 12.5H14L13.25 17.5H10.75Z" stroke={ICON_ACCENT} />
    </AmenityIcon>
  );
}

export function BbqGrillIcon(props: IconProps) {
  return (
    <AmenityIcon {...props}>
      <circle cx="12" cy="10.5" r="6.5" />
      <path d="M4.5 10.5H19.5" />
      <path d="M9 16.25L7 20.5M15 16.25L17 20.5M12 17V20.5" />
      <path d="M10.5 2.5H13.5M12 2.5V4" stroke={ICON_ACCENT} />
    </AmenityIcon>
  );
}

export function SmartTvIcon(props: IconProps) {
  return (
    <AmenityIcon {...props}>
      <path d="M3 4.5H21V16.5H3Z" />
      <path d="M12 16.5V20.5M8.5 20.5H15.5" />
      <path d="M10.5 8L14.75 10.5L10.5 13Z" stroke={ICON_ACCENT} />
    </AmenityIcon>
  );
}

export function AirConditioningIcon(props: IconProps) {
  return (
    <AmenityIcon {...props}>
      <path d="M3 5H21V12.5H3Z" />
      <path d="M6 10H18" />
      <path d="M8 15.5L7 19M12 15.5V19.5M16 15.5L17 19" stroke={ICON_ACCENT} />
    </AmenityIcon>
  );
}

export function WorkspaceIcon(props: IconProps) {
  return (
    <AmenityIcon {...props}>
      <path d="M2.5 15.5H21.5" />
      <path d="M4.5 15.5V20.5M19.5 15.5V20.5" />
      <path d="M7 7.5H17V13.5H7Z" />
      <path d="M7 13.5L5.5 15.5M17 13.5L18.5 15.5" />
      <path d="M10 10.5H14" stroke={ICON_ACCENT} />
    </AmenityIcon>
  );
}

export function PetFriendlyIcon(props: IconProps) {
  return (
    <AmenityIcon {...props}>
      <path d="M12 13C9 13 6.5 16.5 7.5 18.5C8.5 20.5 10.5 19.5 12 19.5C13.5 19.5 15.5 20.5 16.5 18.5C17.5 16.5 15 13 12 13Z" />
      <path d="M4.5 11A1.5 1.5 0 1 0 7.5 11A1.5 1.5 0 1 0 4.5 11ZM8 7.25A1.5 1.5 0 1 0 11 7.25A1.5 1.5 0 1 0 8 7.25ZM13 7.25A1.5 1.5 0 1 0 16 7.25A1.5 1.5 0 1 0 13 7.25ZM16.5 11A1.5 1.5 0 1 0 19.5 11A1.5 1.5 0 1 0 16.5 11Z" stroke={ICON_ACCENT} />
    </AmenityIcon>
  );
}

export function EvChargingIcon(props: IconProps) {
  return (
    <AmenityIcon {...props}>
      <path d="M5 20.5V4H13V20.5" />
      <path d="M3.5 20.5H14.5" />
      <path d="M13 10H15.5V16.5A1.5 1.5 0 0 0 18.5 16.5V7.5" />
      <path d="M17.25 4.5H19.75V7.5H17.25Z" />
      <path d="M9.75 7L7.5 11.5H10.5L8.25 16" stroke={ICON_ACCENT} />
    </AmenityIcon>
  );
}
