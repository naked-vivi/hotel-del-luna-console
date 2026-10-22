import type { CSSProperties } from "react";
import type { ChartConfig } from "@/components/ui/chart";

export const APP_NAME = "Hotel del Luna";
export const APP_TITLE = `${APP_NAME} - Staff Console`;

export const THEME_STORAGE_KEY = "vite-ui-theme";
export const DEFAULT_THEME: Theme = "dark";
export const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";
export const SIGNUP_STORAGE_KEY = "del-luna-signup";
export const QUERY_STALE_TIME = 0;

export const MOBILE_BREAKPOINT = 768;

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

export const DEFAULT_BOOKING_SORT = "startDate-desc";
export const DEFAULT_CABIN_SORT = "name-asc";

export const ROOM_CHART_DAYS = 14;
export const ROOM_CHART_STEP = 7;
export const ROOM_CHART_GRID: CSSProperties = {
  gridTemplateColumns: `9rem repeat(${ROOM_CHART_DAYS}, minmax(3.5rem, 1fr))`,
};
export const ROOM_CHART_SKELETON_SPANS = [[1, 4], [6, 3], [0, 2], [3, 6], [9, 4], [2, 3]];
export const TOOLTIP_DELAY = 120;

export const DASHBOARD_PERIOD_PARAM = "last";
export const DASHBOARD_PERIODS = [7, 30, 90];
export const DEFAULT_DASHBOARD_PERIOD = 7;

export const TODAY_CARD = "col-span-full h-120 min-w-0 @min-[64rem]:col-span-2";
export const DURATION_CARD = "col-span-full h-120 min-w-0 @min-[64rem]:col-span-2";
export const SALES_CARD = "col-span-full h-112 min-w-0 @min-[36rem]:h-128";
export const CABIN_GALLERY_GRID = "grid grid-cols-1 gap-6 @min-[40rem]:grid-cols-2 @min-[68rem]:grid-cols-3";
export const DRAWING_INK = "stroke-muted-foreground/70";

export const WEEKDAY_INITIALS = ["M", "T", "W", "T", "F", "S", "S"];
export const LEDGER_LINE_ROWS = [40, 52, 64, 76, 88];
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
export const SALES_CHART_CONFIG = {
  totalSales: { label: "Total sales", theme: { light: "#B78343", dark: "#D2AF84" } },
  extrasSales: { label: "Extras sales", theme: { light: "#5E82A6", dark: "#7C99B6" } },
} satisfies ChartConfig;

export const PASSWORD_MIN_LENGTH = 8;
export const STAFF_NAME_MAX_LENGTH = 120;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const DEFAULT_AVATAR = "default-user.jpg";
export const DEMO_LOGIN: LoginValues = { email: "admin@gmail.com", password: "Admin1234$" };

export const EMPTY_CABIN_FORM: CabinFormValues = {
  name: "",
  maxCapacity: 1,
  regularPrice: 0,
  discount: 0,
  description: "",
  image: "",
};

export const SETTINGS_FIELDS = [
  { name: "minBookingLength", label: "Minimum stay (nights)", hint: "The shortest stay guests can book.", min: 1, step: 1 },
  { name: "maxBookingLength", label: "Maximum stay (nights)", hint: "Must be at least as long as the minimum stay.", min: 1, step: 1 },
  { name: "maxGuestsPerBooking", label: "Maximum guests per booking", hint: "Enter a whole number of guests.", min: 1, step: 1 },
  { name: "breakfastPrice", label: "Breakfast price (USD)", hint: "Price per guest, per night. Enter 0 for free breakfast.", min: 0, step: 0.01 },
] as const;
export const SETTINGS_ROW_ID = 1;

export const SAMPLE_BREAKFAST_PRICE = 15;

export const CABIN_IMAGE_BUCKET = "cabin-images";
export const AVATAR_BUCKET = "avatars";

export const SUPABASE_ERROR_CODES = {
  missingFunction: ["PGRST202", "42883"],
  forbidden: "42501",
  readable: ["22023", "P0002"],
  foreignKey: "23503",
};
