import { ICON_ACCENT } from "@/lib/constants";

function Icon({ children, ...props }: IconShellProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
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

export function CloseIcon(props: IconProps) {
  return <Icon {...props}><path d="M6 6L18 18M18 6L6 18" /></Icon>;
}

export function PlusIcon(props: IconProps) {
  return <Icon {...props}><path d="M12 5V19M5 12H19" /></Icon>;
}

export function MinusIcon(props: IconProps) {
  return <Icon {...props}><path d="M5 12H19" /></Icon>;
}

export function CheckIcon(props: IconProps) {
  return <Icon {...props}><path d="M5 12.5L10 17.5L19 7" /></Icon>;
}

export function ChevronDownIcon(props: IconProps) {
  return <Icon {...props}><path d="M6 9.5L12 15.5L18 9.5" /></Icon>;
}

export function ChevronUpIcon(props: IconProps) {
  return <Icon {...props}><path d="M6 14.5L12 8.5L18 14.5" /></Icon>;
}

export function ChevronLeftIcon(props: IconProps) {
  return <Icon {...props}><path d="M14.5 6L8.5 12L14.5 18" /></Icon>;
}

export function ChevronRightIcon(props: IconProps) {
  return <Icon {...props}><path d="M9.5 6L15.5 12L9.5 18" /></Icon>;
}

export function ArrowRightIcon(props: IconProps) {
  return <Icon {...props}><path d="M4 12H19M14 7L19 12L14 17" /></Icon>;
}

export function MoreIcon(props: IconProps) {
  return (
    <Icon {...props} stroke="none">
      <rect x="4" y="11" width="2.5" height="2.5" fill="currentColor" />
      <rect x="10.75" y="11" width="2.5" height="2.5" fill="currentColor" />
      <rect x="17.5" y="11" width="2.5" height="2.5" fill="currentColor" />
    </Icon>
  );
}

export function ViewIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2.5 12C5 7.75 8.4 5.75 12 5.75S19 7.75 21.5 12C19 16.25 15.6 18.25 12 18.25S5 16.25 2.5 12Z" />
      <circle cx="12" cy="12" r="3" stroke={ICON_ACCENT} />
      <path d="M12 9A3 3 0 0 1 12 15Z" fill={ICON_ACCENT} stroke="none" />
    </Icon>
  );
}

export function EyeClosedIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 10.5C5.5 14 8.5 15.75 12 15.75S18.5 14 21 10.5" />
      <path d="M6 14.25L4.5 16.5M10 15.6L9.5 18.25M14 15.6L14.5 18.25M18 14.25L19.5 16.5" stroke={ICON_ACCENT} />
    </Icon>
  );
}

export function KeyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="7" cy="12" r="3.5" stroke={ICON_ACCENT} />
      <path d="M7 8.5A3.5 3.5 0 0 1 7 15.5Z" fill={ICON_ACCENT} stroke="none" />
      <path d="M10.5 12H21M17 12V15M20 12V14.5" />
    </Icon>
  );
}

export function DoorOutIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M10 4H4V20H10" />
      <path d="M14 8L18 12L14 16M18 12H8.5" stroke={ICON_ACCENT} />
    </Icon>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7H20M9 7V4H15V7" stroke={ICON_ACCENT} />
      <path d="M6.5 7L7.5 20H16.5L17.5 7M10 11V16M14 11V16" />
    </Icon>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M15.5 8.5V4H4V15.5H8.5" stroke={ICON_ACCENT} />
      <rect x="8.5" y="8.5" width="11.5" height="11.5" />
    </Icon>
  );
}

export function EditIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M15 4.5L19.5 9L9 19.5H4.5V15ZM12.5 7L17 11.5" />
      <path d="M4.5 19.5V15.75L8.25 19.5Z" fill={ICON_ACCENT} stroke={ICON_ACCENT} strokeWidth={1} />
    </Icon>
  );
}

export function RefreshIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M19.5 12A7.5 7.5 0 1 1 16.8 6.25" />
      <path d="M17.5 2.5V6.75H13.25" stroke={ICON_ACCENT} />
    </Icon>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4" stroke={ICON_ACCENT} />
      <circle cx="12" cy="12" r="2" fill={ICON_ACCENT} stroke="none" />
      <path d="M12 2.5V5M12 19V21.5M2.5 12H5M19 12H21.5M5.3 5.3L7 7M17 17L18.7 18.7M5.3 18.7L7 17M17 7L18.7 5.3" />
    </Icon>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 4.5A7.5 7.5 0 0 1 12 19.5Z" fill={ICON_ACCENT} stroke="none" />
    </Icon>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="8" r="3.75" />
      <path d="M4.5 20.5V18.5C4.5 15.75 7.5 14 12 14S19.5 15.75 19.5 18.5V20.5" />
      <rect x="13.5" y="16.5" width="3.5" height="2" fill={ICON_ACCENT} stroke="none" />
    </Icon>
  );
}

export function PanelLeftIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="4.5" width="18" height="15" />
      <path d="M9.5 4.5V19.5" />
      <rect x="5" y="7" width="2.5" height="2.5" fill={ICON_ACCENT} stroke="none" />
    </Icon>
  );
}

export function DashboardIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="3.5" width="7" height="7" />
      <rect x="13.5" y="3.5" width="7" height="7" stroke={ICON_ACCENT} />
      <rect x="15.5" y="5.5" width="3" height="3" fill={ICON_ACCENT} stroke="none" />
      <rect x="3.5" y="13.5" width="7" height="7" />
      <rect x="13.5" y="13.5" width="7" height="7" />
    </Icon>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="5.5" width="17" height="15" />
      <path d="M3.5 10H20.5M8 3V7.5M16 3V7.5" />
      <rect x="13.5" y="13.5" width="3" height="3" fill={ICON_ACCENT} stroke="none" />
    </Icon>
  );
}

export function BedIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 5.5V19.5M3 15H21V19.5M21 15V12.5C21 11.4 20.1 10.5 19 10.5H10.5V15" />
      <path d="M5.25 11.5H8.25V14H5.25Z" fill={ICON_ACCENT} stroke={ICON_ACCENT} strokeWidth={1} />
    </Icon>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="8" r="3.25" />
      <path d="M2.5 20V18.5C2.5 16 5 14.25 9 14.25S15.5 16 15.5 18.5V20" />
      <path d="M15.5 4.9A3.25 3.25 0 0 1 15.5 11.1M18 14.6C20.1 15.2 21.5 16.6 21.5 18.5V20" stroke={ICON_ACCENT} />
    </Icon>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3.5 7.5H13M17 7.5H20.5M3.5 16.5H7M11 16.5H20.5" />
      <rect x="13" y="5.5" width="4" height="4" fill={ICON_ACCENT} stroke={ICON_ACCENT} />
      <rect x="7" y="14.5" width="4" height="4" fill={ICON_ACCENT} stroke={ICON_ACCENT} />
    </Icon>
  );
}

export function DatabaseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 6C5 4.6 8.1 3.5 12 3.5S19 4.6 19 6 15.9 8.5 12 8.5 5 7.4 5 6Z" stroke={ICON_ACCENT} />
      <path d="M5 6V18C5 19.4 8.1 20.5 12 20.5S19 19.4 19 18V6M5 12C5 13.4 8.1 14.5 12 14.5S19 13.4 19 12" />
    </Icon>
  );
}

export function GalleryViewIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="4" y="4" width="7" height="7" fill={ICON_ACCENT} stroke={ICON_ACCENT} />
      <rect x="13" y="4" width="7" height="7" />
      <rect x="4" y="13" width="7" height="7" />
      <rect x="13" y="13" width="7" height="7" />
    </Icon>
  );
}

export function ListViewIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="4" y="5" width="3.5" height="3.5" fill={ICON_ACCENT} stroke={ICON_ACCENT} />
      <rect x="4" y="10.25" width="3.5" height="3.5" />
      <rect x="4" y="15.5" width="3.5" height="3.5" />
      <path d="M11 6.75H20M11 12H20M11 17.25H20" />
    </Icon>
  );
}

export function RoomChartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3.5 4V20" />
      <rect x="6" y="5" width="8" height="3" />
      <rect x="9.5" y="10.5" width="11" height="3" fill={ICON_ACCENT} stroke={ICON_ACCENT} />
      <rect x="6" y="16" width="6" height="3" />
    </Icon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="10.5" cy="10.5" r="6.25" />
      <path d="M15.25 15.25L20.5 20.5" />
    </Icon>
  );
}

export function ImagePlusIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M13.5 4.5H3.5V19.5H20.5V11.5" />
      <path d="M3.5 16L8.5 11L13 15.5L15.5 13L20.5 18" />
      <path d="M18 3V9M15 6H21" stroke={ICON_ACCENT} />
    </Icon>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="5" y="10.5" width="14" height="10" />
      <path d="M8 10.5V7.5A4 4 0 0 1 16 7.5V10.5" />
      <path d="M12 14V17" stroke={ICON_ACCENT} />
    </Icon>
  );
}

export function SuccessIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" />
      <path d="M7.5 12.5L10.5 15.5L16.5 9" />
    </Icon>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" />
      <path d="M12 11V16.5M12 7.5V8.5" />
    </Icon>
  );
}

export function WarningIcon(props: IconProps) {
  return <Icon {...props}><path d="M12 3.5L21 19.5H3ZM12 9.5V14M12 16.5V17.5" /></Icon>;
}

export function ErrorIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" />
      <path d="M8.5 8.5L15.5 15.5M15.5 8.5L8.5 15.5" />
    </Icon>
  );
}

export function LoaderIcon(props: IconProps) {
  return <Icon {...props}><path d="M12 3.5A8.5 8.5 0 1 1 3.5 12" /></Icon>;
}
