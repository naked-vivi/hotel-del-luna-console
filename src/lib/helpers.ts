import type { MouseEvent } from "react";
import type { User } from "@supabase/supabase-js";
import {
  differenceInCalendarDays,
  eachDayOfInterval,
  format,
  isFuture,
  isPast,
  isSameDay,
  isToday,
  isValid,
  parseISO,
  startOfDay,
  subDays,
} from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "@/lib/utils";
import {
  AFTERNOON_ENDS_AT,
  DARK_MODE_QUERY,
  DASHBOARD_PERIODS,
  DEFAULT_DASHBOARD_PERIOD,
  DURATION_GROUPS,
  MINUTES_PER_DAY,
  MINUTES_PER_HOUR,
  MORNING_ENDS_AT,
  ROOM_CHART_DAYS,
  STAFF_NAME_MAX_LENGTH,
} from "@/lib/constants";

export function greeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < MORNING_ENDS_AT) return "Good morning";
  if (hour < AFTERNOON_ENDS_AT) return "Good afternoon";
  return "Good evening";
}

export function pluralize(count: number, singular: string, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function toPercent(fraction: number) {
  return Math.round(fraction * 100);
}

export function dayFraction(date: Date) {
  return (date.getHours() * MINUTES_PER_HOUR + date.getMinutes()) / MINUTES_PER_DAY;
}

export function formatTimestamp(value: string | null | undefined, pattern: string, emptyText = "Never") {
  if (!value) return emptyText;
  const date = parseISO(value);
  return isValid(date) ? format(date, pattern) : "Unavailable";
}

export function formatCompactCurrency(value: number) {
  return `$${new Intl.NumberFormat("en-US", { notation: "compact" }).format(value)}`;
}

export function arrivalNote(startDate: string) {
  return isToday(new Date(startDate)) ? "Today" : formatDistanceFromNow(startDate);
}

export function getInitials(name: string | null | undefined, fallback: string | null | undefined) {
  const trimmed = name?.trim();
  if (trimmed) return trimmed.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  return (fallback?.[0] ?? "?").toUpperCase();
}

export function getUserProfile(user: User | null | undefined): UserProfile {
  const metadata = user?.user_metadata ?? {};
  const fullName = typeof metadata.fullName === "string" ? metadata.fullName.trim() : "";
  const avatar = typeof metadata.avatar === "string" ? metadata.avatar : "";
  const email = user?.email ?? "";
  const displayName = fullName || email || "User";

  return {
    fullName,
    avatar,
    email,
    displayName,
    initials: getInitials(fullName, displayName),
    isAdmin: user?.app_metadata?.role === "admin",
    isConfirmed: Boolean(user?.email_confirmed_at),
  };
}

export function validateStaffName(value: string) {
  const name = value.trim();
  if (!name) return "Full name is required";
  if (name.length > STAFF_NAME_MAX_LENGTH) return `Use ${STAFF_NAME_MAX_LENGTH} characters or fewer`;
  return true;
}

export function errorId(name: string, hasError: boolean) {
  return hasError ? `${name}-error` : undefined;
}

export function hintAndErrorIds(name: string, hasError: boolean) {
  return `${name}-hint${hasError ? ` ${name}-error` : ""}`;
}

export function isPlainLeftClick(event: MouseEvent<HTMLAnchorElement>) {
  return !(event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey);
}

export function navLinkClassName({ isActive }: { isActive: boolean }) {
  return `flex items-center gap-4 px-4 pt-3.5 pb-3 text-[11px] font-semibold uppercase tracking-[0.26em] transition-colors duration-200 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-sidebar-ring [&>svg]:size-5.5 [&>svg]:-my-1 [&>svg]:shrink-0 ${isActive
    ? "bg-sidebar-accent text-accent-50"
    : "text-primary-300 hover:bg-sidebar-accent/50 hover:text-accent-100"
  }`;
}

export function prefersDark() {
  return window.matchMedia(DARK_MODE_QUERY).matches;
}

export function isDarkTheme(theme: Theme) {
  return theme === "dark" || (theme === "system" && prefersDark());
}

export function applyTheme(theme: Theme) {
  const resolved = isDarkTheme(theme) ? "dark" : "light";
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
}

export function parsePage(value: string | null) {
  const page = Number(value || 1);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

export function parseSort(value: string): { field: string; direction: string } {
  const [field, direction] = value.split("-");
  return { field, direction };
}

export function parseBookingsFilter(value: string | null): BookingsFilter | null {
  return !value || value === "all" ? null : { field: "status", value };
}

export function parseDashboardPeriod(value: string | null) {
  const days = Number(value ?? DEFAULT_DASHBOARD_PERIOD);
  return DASHBOARD_PERIODS.includes(days) ? days : DEFAULT_DASHBOARD_PERIOD;
}

export function pageNumbers(page: number, pageCount: number) {
  return [...new Set([1, page - 1, page, page + 1, pageCount])]
    .filter((value) => value >= 1 && value <= pageCount)
    .sort((a, b) => a - b);
}

export function withParam(searchParams: URLSearchParams, key: string, value: string) {
  const params = new URLSearchParams(searchParams);
  params.set(key, value);
  return params;
}

export function isConfirmedStay({ status }: { status: string }) {
  return status === "checked-in" || status === "checked-out";
}

export function sumBy<T>(items: readonly T[], pick: (item: T) => number | null | undefined) {
  return items.reduce((total, item) => total + (pick(item) ?? 0), 0);
}

export function occupancyRate(occupiedNights: number, numDays: number, cabinCount: number) {
  const availableNights = numDays * cabinCount;
  return availableNights > 0 ? Math.min(1, occupiedNights / availableNights) : 0;
}

export function activityCounts(activities: readonly { status: string }[]) {
  return {
    arriving: activities.filter(({ status }) => status === "unconfirmed").length,
    leaving: activities.filter(({ status }) => status === "checked-in").length,
  };
}

export function groupStaysByDuration(stays: DurationChartProps["confirmedStays"]) {
  const groups = DURATION_GROUPS.map(({ key }) => ({ duration: key, stays: 0, fill: `var(--color-${key})` }));

  for (const { numNights } of stays) {
    if (numNights == null || !Number.isInteger(numNights) || numNights < 1) continue;
    const index = DURATION_GROUPS.findIndex(({ max }) => numNights <= max);
    groups[index].stays += 1;
  }

  const chartData = groups.filter(({ stays: count }) => count > 0);
  const legend = DURATION_GROUPS.filter(({ key }) => chartData.some((group) => group.duration === key));
  return { chartData, legend, totalStays: sumBy(chartData, (group) => group.stays) };
}

export function salesByDay(bookings: SalesChartProps["bookings"], numDays: number, today = new Date()) {
  const days = eachDayOfInterval({ start: subDays(today, numDays), end: today });
  const chartData = days.map((date) => {
    const daily = bookings.filter((booking) => isSameDay(date, new Date(booking.created_at)));
    return {
      date: format(date, "yyyy-MM-dd"),
      label: format(date, "MMM d"),
      totalSales: sumBy(daily, (booking) => booking.totalPrice),
      extrasSales: sumBy(daily, (booking) => booking.extrasPrice),
    };
  });
  return { chartData, firstDay: days[0] };
}

export function toISODate(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function toCalendarDay(value: string) {
  return startOfDay(parseISO(value.slice(0, 10)));
}

export function windowPosition(start: Date, today: Date): WindowPosition {
  const offset = differenceInCalendarDays(start, today);
  if (offset === 0) return "today";
  return offset < 0 ? "earlier" : "later";
}

export function staySpan(booking: ChartBooking, start: Date) {
  const from = toCalendarDay(booking.startDate);
  const to = toCalendarDay(booking.endDate);
  const first = Math.max(0, differenceInCalendarDays(from, start));
  const last = Math.min(ROOM_CHART_DAYS, differenceInCalendarDays(to, start));

  return {
    from,
    to,
    first,
    last,
    isVisible: last > first,
    startsBefore: from < start,
    endsAfter: differenceInCalendarDays(to, start) > ROOM_CHART_DAYS,
  };
}

export function sortCabinsByName(cabins: readonly Cabin[]) {
  return [...cabins].sort((a, b) => String(a.name).localeCompare(String(b.name)));
}

export function filterCabins(cabins: Cabin[], discount: string) {
  if (discount === "no-discount") return cabins.filter((cabin) => cabin.discount === 0);
  if (discount === "with-discount") return cabins.filter((cabin) => cabin.discount > 0);
  return cabins;
}

export function sortCabins(cabins: Cabin[], sortBy: string) {
  const { field, direction } = parseSort(sortBy);
  const modifier = direction === "asc" ? 1 : -1;

  return [...cabins].sort((a, b) => {
    const aValue = a[field as keyof Cabin];
    const bValue = b[field as keyof Cabin];
    if (typeof aValue === "string" && typeof bValue === "string") return aValue.localeCompare(bValue) * modifier;
    return ((aValue as number) - (bValue as number)) * modifier;
  });
}

export function nightlyRate({ regularPrice, discount }: Pick<Cabin, "regularPrice" | "discount">) {
  return Math.max(0, regularPrice - (discount || 0));
}

export function cabinCopy({ name, maxCapacity, regularPrice, discount, image, description }: Cabin): CabinFormValues {
  return { name: `${name} (Copy)`, maxCapacity, regularPrice, discount, image, description };
}

export function cabinFormValues(cabin: Partial<CabinFormValues>): CabinFormValues {
  return {
    name: cabin.name ?? "",
    maxCapacity: cabin.maxCapacity ?? 1,
    regularPrice: cabin.regularPrice ?? 0,
    discount: cabin.discount ?? 0,
    description: cabin.description ?? "",
    image: cabin.image ?? "",
  };
}

export function settingsFormValues(settings: SettingsFormValues): SettingsFormValues {
  const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = settings;
  return { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice };
}

export function breakfastCost(pricePerNight: number, numNights: number, numGuests: number) {
  return pricePerNight * numNights * numGuests;
}

export function checkinArgs(booking: BookingDetails, addBreakfast: boolean, breakfastPrice: number): CheckinArgs {
  const { id, hasBreakfast, extrasPrice, totalPrice } = booking;
  if (!addBreakfast || hasBreakfast) return { bookingId: id };

  return {
    bookingId: id,
    breakfast: {
      hasBreakfast: true,
      extrasPrice: (extrasPrice ?? 0) + breakfastPrice,
      totalPrice: totalPrice + breakfastPrice,
    },
  };
}

export function paymentSummary(totalPrice: number, breakfastPrice: number, addBreakfast: boolean) {
  if (!addBreakfast) return formatCurrency(totalPrice);
  return `${formatCurrency(totalPrice + breakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(breakfastPrice)})`;
}

export function sampleBookingStatus(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let status: string;

  if (isPast(end) && !isToday(end)) status = "checked-out";
  if (isFuture(start) || isToday(start)) status = "unconfirmed";
  if ((isFuture(end) || isToday(end)) && isPast(start) && !isToday(start)) status = "checked-in";

  return status;
}
