import type { CSSProperties } from "react";
import type { ChartConfig } from "@/components/ui/chart";
import type { ToastClassnames } from "sonner";

export const APP_NAME = "Hotel del Luna";
export const APP_TITLE = `${APP_NAME} - Staff Console`;

export const THEME_STORAGE_KEY = "vite-ui-theme";
export const DEFAULT_THEME: Theme = "dark";
export const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";
export const SIGNUP_STORAGE_KEY = "del-luna-signup";
export const QUERY_STALE_TIME = 0;

export const MOBILE_BREAKPOINT = 768;

export const LOADING_DOT_DELAYS = [0, 160, 320];
export const TOAST_DURATION = 4500;
export const TOAST_CLASS_NAMES: ToastClassnames = {
  toast: "group flex w-(--width) items-center gap-3.5 border border-border bg-card py-3.5 pr-3 pl-4.5 font-sans text-foreground dark:border-primary-800 dark:bg-primary-975 data-[expanded=false]:data-[front=false]:*:opacity-0",
  icon: "flex size-4 shrink-0 items-center justify-center [&>svg]:size-4",
  content: "flex min-w-0 flex-1 flex-col gap-0.5 pt-0.5",
  title: "text-[14px] leading-snug text-foreground",
  description: "text-[12.5px] leading-snug text-muted-foreground",
  closeButton: "order-last -my-1 flex size-8 shrink-0 items-center justify-center border-0! bg-transparent! text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-1 focus-visible:outline-gold [&>svg]:size-3.5",
  success: "[&_[data-icon]]:text-gold",
  error: "[&_[data-icon]]:text-destructive",
  warning: "[&_[data-icon]]:text-status-warning",
  info: "[&_[data-icon]]:text-status-info",
  loading: "[&_[data-icon]]:text-gold",
};

export const ICON_ACCENT = "var(--icon-accent, currentColor)";

export const MS_PER_MINUTE = 60_000;
export const MS_PER_DAY = 86_400_000;
export const MINUTES_PER_HOUR = 60;
export const MINUTES_PER_DAY = 1440;
export const MORNING_ENDS_AT = 12;
export const AFTERNOON_ENDS_AT = 18;

export const SYNODIC_MONTH = 29.530588853;
export const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);
export const LUNAR_PHASE_NAMES = [
  "New moon",
  "Waxing crescent",
  "First quarter",
  "Waxing gibbous",
  "Full moon",
  "Waning gibbous",
  "Last quarter",
  "Waning crescent",
];
export const FULL_MOON_FRACTION = 0.99;
export const NEW_MOON_FRACTION = 0.01;

export const BOOKINGS_PAGE_SIZE = 10;
export const USERS_PAGE_SIZE = 10;

export const BOOKING_SKELETON_ROWS = 8;
export const CABIN_SKELETON_ROWS = 6;
export const CABIN_SKELETON_CARDS = 6;
export const STAFF_SKELETON_ROWS = 6;
export const GUEST_SKELETON_ROWS = 8;
export const GUESTS_PAGE_SIZE = 10;

export const DEFAULT_BOOKING_SORT = "startDate-desc";
export const DEFAULT_CABIN_SORT = "name-asc";

export const ROOM_CHART_DAYS = 14;
export const ROOM_CHART_STEP = 7;
export const ROOM_CHART_GRID: CSSProperties = {
  gridTemplateColumns: `9rem repeat(${ROOM_CHART_DAYS}, minmax(3.5rem, 1fr))`,
};
export const ROOM_CHART_SKELETON_SPANS = [[1, 4], [6, 3], [0, 2], [3, 6], [9, 4], [2, 3]];
export const TOOLTIP_DELAY = 120;
export const CAROUSEL_INTERVAL_MS = 5000;
export const STAY_CALENDAR_CLASS_NAMES = {
  unconfirmed: "bg-status-pending-bg text-status-pending",
  checkedIn: "bg-status-success-bg text-status-success",
  checkedOut: "bg-status-neutral-bg text-status-neutral",
  active: "ring-1 ring-gold ring-inset",
};
export const SEARCH_DEBOUNCE_MS = 300;
export const SEARCH_RESULT_LIMIT = 5;
export const SEARCH_MIN_LENGTH = 1;
export const SEARCH_PROMPTS: Record<SearchType | "all", SearchPrompt> = {
  all: { title: "Search the whole house", message: "Type a guest's name, a booking number or a cabin." },
  page: { title: "Search the pages", message: "Type a page name, such as settings or guests." },
  booking: { title: "Search bookings", message: "Type a booking number, such as 42, or the guest's name." },
  cabin: { title: "Search cabins", message: "Type a cabin number, such as 004." },
  guest: { title: "Search guests", message: "Type a guest's name or email address." },
  staff: { title: "Search staff", message: "Type a name or an email address." },
};
export const SEARCH_STALE_TIME = 30_000;
export const BOOKED_NIGHTS_LIMIT = 8;

export const DASHBOARD_PERIOD_PARAM = "last";
export const DASHBOARD_PERIODS = [7, 30, 90];
export const DEFAULT_DASHBOARD_PERIOD = 7;

export const TODAY_CARD = "col-span-full h-120 min-w-0 @min-[64rem]:col-span-2";
export const DURATION_CARD = "col-span-full h-120 min-w-0 @min-[64rem]:col-span-2";
export const SALES_CARD = "col-span-full h-112 min-w-0 @min-[36rem]:h-128";
export const COUNTRIES_CARD = "col-span-full min-w-0";
export const COUNTRIES_SKELETON = "col-span-full h-120 min-w-0";
export const CABIN_REVENUE_CARD = "col-span-full h-132 min-w-0";

export const WORLD_MAP_SIZE = { width: 960, height: 470 };
export const ANTARCTICA_ID = "010";
export const MAP_LEVEL_FILLS = [
  "fill-muted-foreground/15",
  "fill-gold/25",
  "fill-gold/40",
  "fill-gold/60",
  "fill-gold/80",
  "fill-gold",
];
export const COUNTRY_LIST_LIMIT = 8;
export const CABIN_BAR_MAX_SIZE = 56;
export const MAP_TOOLTIP_GAP = 14;
export const MAP_TOOLTIP_TOP_ROOM = 56;
export const CABIN_GALLERY_GRID = "grid grid-cols-1 gap-6 @min-[40rem]:grid-cols-2 @min-[68rem]:grid-cols-3";
export const DRAWING_INK = "stroke-muted-foreground/70";

export const WEEKDAY_INITIALS = ["M", "T", "W", "T", "F", "S", "S"];
export const LEDGER_LINE_ROWS = [40, 52, 64, 76, 88];
export const QUIET_ROOM_POSITIONS = [40, 82, 124, 166, 208];
export const VACANT_CABIN_POSITIONS = [70, 130, 190];
export const ROSTER_BADGE_POSITIONS = [80, 130, 180];
export const KEY_RACK_HOOKS = [
  { x: 46, label: "001" },
  { x: 88, label: "002" },
  { x: 130, label: null },
  { x: 172, label: "004" },
  { x: 214, label: "005" },
];
export const NIGHT_DIAL = {
  center: 200,
  moonRadius: 58,
  ticks: 48,
  tickRadii: { long: 177, short: 183, outer: 190 },
};

export const TAG_CLASS =
  "inline-flex items-center border border-current/25 px-2.5 pt-1 pb-0.5 text-[10px] font-semibold whitespace-nowrap uppercase tracking-[0.22em]";
export const STATUS_STYLES: Record<string, string> = {
  unconfirmed: "bg-status-pending-bg text-status-pending",
  "checked-in": "bg-status-success-bg text-status-success",
  "checked-out": "bg-status-neutral-bg text-status-neutral",
};
export const STATUS_FALLBACK_STYLE = "bg-muted text-muted-foreground";

export const LOGO_SIZES = {
  sm: "text-[12px]",
  md: "text-[15px]",
  lg: "text-[24px]",
};
export const LOGO_TONES = {
  auto: { word: "text-foreground", sub: "text-muted-foreground", moon: "text-gold" },
  night: { word: "text-accent-50", sub: "text-accent-300", moon: "text-accent-400" },
};

export const DURATION_GROUPS: DurationGroup[] = [
  { key: "one", label: "1 night", max: 1, color: "#DDC2A2" },
  { key: "two", label: "2 nights", max: 2, color: "#C69963" },
  { key: "three", label: "3 nights", max: 3, color: "#B78343" },
  { key: "fourFive", label: "4–5 nights", max: 5, color: "#926835" },
  { key: "sixSeven", label: "6–7 nights", max: 7, color: "#99B0C7" },
  { key: "eightFourteen", label: "8–14 nights", max: 14, color: "#7C99B6" },
  { key: "fifteenTwentyOne", label: "15–21 nights", max: 21, color: "#5E82A6" },
  { key: "twentyTwoPlus", label: "22+ nights", max: Infinity, color: "#4C6B8A" },
];
export const DURATION_CHART_CONFIG = Object.fromEntries(
  DURATION_GROUPS.map(({ key, label, color }) => [key, { label, color }]),
) satisfies ChartConfig;
export const CABIN_REVENUE_CHART_CONFIG = {
  revenue: { label: "Revenue", theme: { light: "#B7C7D7", dark: "#3C546C" } },
  spotlight: { label: "Spotlight", theme: { light: "#B78343", dark: "#D2AF84" } },
} satisfies ChartConfig;
export const SALES_CHART_CONFIG = {
  totalSales: { label: "Total sales", theme: { light: "#B78343", dark: "#D2AF84" } },
  extrasSales: { label: "Extras sales", theme: { light: "#5E82A6", dark: "#7C99B6" } },
} satisfies ChartConfig;

export const PASSWORD_MIN_LENGTH = 8;
export const STAFF_NAME_MAX_LENGTH = 120;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const DEFAULT_AVATAR = "default-user.jpg";

export const PERMISSIONS: Record<Permission, StaffRole[]> = {
  "cabins.manage": ["admin"],
  "bookings.delete": ["admin"],
  "guests.delete": ["admin"],
  "settings.update": ["admin"],
  "settings.website": ["admin"],
  "staff.view": ["admin"],
  "staff.manage": ["admin"],
  "sampleData.replace": ["admin"],
  "account.credentials": ["admin", "staff"],
};
export const DEMO_LOCKED_PERMISSIONS: Permission[] = ["staff.manage", "account.credentials", "settings.website"];
export const ACCESS_LOCK_LABELS = { admin: "Admins only", demo: "Off in demo" };

export const DEMO_ACCOUNTS: DemoAccount[] = [
  { role: "admin", email: "admin@hoteldelluna.com", password: "Demo1234$", name: "Viviana", title: "Owner" },
  { role: "staff", email: "staff@hoteldelluna.com", password: "Demo1234$", name: "Bubu", title: "Front desk" },
];

export const CABIN_PHOTO_LIMIT = 8;
export const CABIN_PHOTO_MAX_MB = 5;
export const CABIN_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
export const CABIN_STAYS_LIMIT = 40;
export const CARD_AMENITY_LIMIT = 5;

export const EMPTY_BOOKING_FORM: BookingFormValues = {
  guestMode: "existing",
  guestId: undefined,
  guestName: "",
  guestEmail: "",
  guestCountry: "",
  guestNationalId: "",
  cabinId: undefined,
  startDate: "",
  endDate: "",
  numGuests: 2,
  hasBreakfast: false,
  isPaid: false,
  observations: "",
};

export const GUEST_MODE_OPTIONS: { value: GuestMode; label: string }[] = [
  { value: "existing", label: "Returning guest" },
  { value: "new", label: "New guest" },
];

export const EMPTY_CABIN_FORM: CabinFormValues = {
  name: "",
  maxCapacity: 2,
  regularPrice: undefined,
  discount: 0,
  bedType: "",
  size: undefined,
  amenities: [],
  photos: [],
  description: "",
};

export const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;
export const DEFAULT_HOUSE_RULES = { checkInTime: "15:00", checkOutTime: "11:00", acceptOnlineBookings: true, bookingWindowDays: 365 };
export const CHECK_IN_TIMES = ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"];
export const CHECK_OUT_TIMES = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00"];
export const BOOKING_WINDOW_LIMITS = { min: 30, max: 730, step: 30 };
export const STAY_SETTING_FIELDS = [
  { name: "minBookingLength", label: "Minimum stay", hint: "The shortest stay guests can book.", unit: "night", min: 1 },
  { name: "maxBookingLength", label: "Maximum stay", hint: "Must be at least as long as the minimum stay.", unit: "night", min: 1 },
  { name: "maxGuestsPerBooking", label: "Guests per booking", hint: "The most guests on one booking. Each cabin's own limit still applies.", unit: "guest", min: 1 },
] as const;
export const STEPPER_BUTTON =
  "flex w-11 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-muted-foreground";
export const SETTINGS_SKELETON_SECTIONS = [3, 2, 1, 2];
export const HOUSE_RULES_SCRIPT = "supabase/migrations/202610230001_more_house_rules.sql";
export const SETTINGS_ROW_ID = 1;

export const SAMPLE_BREAKFAST_PRICE = 15;

export const CABIN_IMAGE_BUCKET = "cabin-images";
export const AVATAR_BUCKET = "avatars";

export const SUPABASE_ERROR_CODES = {
  missingFunction: ["PGRST202", "42883"],
  missingColumn: "PGRST204",
  forbidden: "42501",
  readable: ["22023", "P0002", "DL403", "DL409"],
  foreignKey: "23503",
};
