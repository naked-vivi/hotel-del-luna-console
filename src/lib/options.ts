import { GalleryViewIcon, ListViewIcon, RoomChartIcon, UserIcon } from "@/components/icons/icons";
import { AFrameCabinIcon, CalendarTickIcon, CogIcon, GuestsIcon, MoonriseIcon, StaffIcon } from "@/components/icons/nav-icons";
import {
  AirConditioningIcon,
  BbqGrillIcon,
  CoffeeMachineIcon,
  DiningRoomIcon,
  EvChargingIcon,
  FirePitIcon,
  FireplaceIcon,
  ForestViewIcon,
  HotTubIcon,
  KitchenIcon,
  MountainViewIcon,
  PetFriendlyIcon,
  PrivateDeckIcon,
  SaunaIcon,
  SmartTvIcon,
  SpaBathIcon,
  WifiIcon,
  WorkspaceIcon,
} from "@/components/icons/amenity-icons";

export const NAV_LINKS: NavLinkItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: MoonriseIcon },
  { to: "/bookings", label: "Bookings", icon: CalendarTickIcon },
  { to: "/cabins", label: "Cabins", icon: AFrameCabinIcon },
  { to: "/guests", label: "Guests", icon: GuestsIcon },
  { to: "/users", label: "Staff", icon: StaffIcon, permission: "staff.view" },
  { to: "/settings", label: "Settings", icon: CogIcon },
];

export const SEARCH_TYPES: SearchTypeMeta[] = [
  { value: "page", label: "Pages", icon: MoonriseIcon },
  { value: "booking", label: "Bookings", icon: CalendarTickIcon },
  { value: "cabin", label: "Cabins", icon: AFrameCabinIcon },
  { value: "guest", label: "Guests", icon: GuestsIcon },
  { value: "staff", label: "Staff", icon: StaffIcon, permission: "staff.view" },
];

export const SEARCH_PAGES: SearchPage[] = [
  { label: "Dashboard", to: "/dashboard", keywords: "home overview revenue occupancy countries", icon: MoonriseIcon },
  { label: "Bookings", to: "/bookings", keywords: "reservations stays room chart", icon: CalendarTickIcon },
  { label: "New booking", to: "/bookings/new", keywords: "create reserve add", icon: CalendarTickIcon },
  { label: "Cabins", to: "/cabins", keywords: "rooms accommodation gallery", icon: AFrameCabinIcon },
  { label: "New cabin", to: "/cabins/new", keywords: "create add room", icon: AFrameCabinIcon, permission: "cabins.manage" },
  { label: "Guests", to: "/guests", keywords: "guest book customers travellers", icon: GuestsIcon },
  { label: "Staff", to: "/users", keywords: "team users accounts roles", icon: StaffIcon, permission: "staff.view" },
  { label: "Settings", to: "/settings", keywords: "house rules breakfast limits", icon: CogIcon },
  { label: "Your account", to: "/account", keywords: "profile password photo", icon: UserIcon },
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

export const AMENITY_OPTIONS: AmenityOption[] = [
  { value: "wifi", label: "Wi-Fi", icon: WifiIcon },
  { value: "fireplace", label: "Fireplace", icon: FireplaceIcon },
  { value: "kitchen", label: "Kitchen", icon: KitchenIcon },
  { value: "hot-tub", label: "Hot tub", icon: HotTubIcon },
  { value: "private-deck", label: "Private deck", icon: PrivateDeckIcon },
  { value: "spa-bath", label: "Spa bathroom", icon: SpaBathIcon },
  { value: "forest-view", label: "Forest view", icon: ForestViewIcon },
  { value: "mountain-view", label: "Mountain view", icon: MountainViewIcon },
  { value: "dining-room", label: "Dining room", icon: DiningRoomIcon },
  { value: "sauna", label: "Sauna", icon: SaunaIcon },
  { value: "fire-pit", label: "Fire pit", icon: FirePitIcon },
  { value: "coffee-machine", label: "Coffee machine", icon: CoffeeMachineIcon },
  { value: "bbq-grill", label: "BBQ grill", icon: BbqGrillIcon },
  { value: "smart-tv", label: "Smart TV", icon: SmartTvIcon },
  { value: "air-conditioning", label: "Air conditioning", icon: AirConditioningIcon },
  { value: "workspace", label: "Workspace", icon: WorkspaceIcon },
  { value: "pet-friendly", label: "Pet friendly", icon: PetFriendlyIcon },
  { value: "ev-charging", label: "EV charging", icon: EvChargingIcon },
];

export const BED_TYPE_OPTIONS: SortSelectOption[] = [
  { value: "King", label: "King" },
  { value: "Queen", label: "Queen" },
  { value: "Twin beds", label: "Twin beds" },
  { value: "King + twin beds", label: "King + twin beds" },
  { value: "Multiple bedrooms", label: "Multiple bedrooms" },
];

export const STAFF_ROLE_FILTER_OPTIONS: FilterTabOption[] = [
  { value: "all", label: "All" },
  { value: "admin", label: "Admins" },
  { value: "staff", label: "Staff" },
];

export const STAFF_ROLE_OPTIONS: StaffRoleOption[] = [
  { value: "staff", label: "Staff", note: "Bookings, cabins and check-ins" },
  { value: "admin", label: "Admin", note: "Everything, plus managing staff" },
];
