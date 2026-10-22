import { GalleryViewIcon, ListViewIcon, RoomChartIcon } from "@/components/icons/icons";
import { AFrameCabinIcon, CalendarTickIcon, CogIcon, MoonriseIcon, StaffIcon } from "@/components/icons/nav-icons";

export const NAV_LINKS: NavLinkItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: MoonriseIcon },
  { to: "/bookings", label: "Bookings", icon: CalendarTickIcon },
  { to: "/cabins", label: "Cabins", icon: AFrameCabinIcon },
  { to: "/users", label: "Staff", icon: StaffIcon },
  { to: "/settings", label: "Settings", icon: CogIcon },
];

export const DASHBOARD_PERIOD_OPTIONS: FilterTabOption[] = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
];

export const BOOKING_VIEW_OPTIONS: FilterTabOption[] = [
  { value: "list", label: "List view", icon: ListViewIcon },
  { value: "chart", label: "Room chart", icon: RoomChartIcon },
];

export const BOOKING_STATUS_OPTIONS: FilterTabOption[] = [
  { value: "all", label: "All" },
  { value: "unconfirmed", label: "Unconfirmed" },
  { value: "checked-in", label: "Checked in" },
  { value: "checked-out", label: "Checked out" },
];

export const BOOKING_SORT_OPTIONS: SortSelectOption[] = [
  { value: "startDate-desc", label: "Sort by date (recent first)" },
  { value: "startDate-asc", label: "Sort by date (earlier first)" },
  { value: "totalPrice-desc", label: "Sort by amount (high first)" },
  { value: "totalPrice-asc", label: "Sort by amount (low first)" },
];

export const CABIN_VIEW_OPTIONS: FilterTabOption[] = [
  { value: "gallery", label: "Gallery view", icon: GalleryViewIcon },
  { value: "list", label: "List view", icon: ListViewIcon },
];

export const CABIN_DISCOUNT_OPTIONS: FilterTabOption[] = [
  { value: "all", label: "All" },
  { value: "with-discount", label: "With discount" },
  { value: "no-discount", label: "No discount" },
];

export const CABIN_SORT_OPTIONS: SortSelectOption[] = [
  { value: "name-asc", label: "Sort by name (A-Z)" },
  { value: "name-desc", label: "Sort by name (Z-A)" },
  { value: "regularPrice-asc", label: "Sort by price (low first)" },
  { value: "regularPrice-desc", label: "Sort by price (high first)" },
  { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
  { value: "maxCapacity-desc", label: "Sort by capacity (high first)" },
];

export const STAFF_ROLE_OPTIONS: StaffRoleOption[] = [
  { value: "staff", label: "Staff", note: "Bookings, cabins and check-ins" },
  { value: "admin", label: "Admin", note: "Everything, plus managing staff" },
];
