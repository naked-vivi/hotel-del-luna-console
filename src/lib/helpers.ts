import type { MouseEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { isRouteErrorResponse } from "react-router-dom";
import {
  addDays,
  differenceInCalendarDays,
  eachDayOfInterval,
  format,
  formatDistanceToNow,
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
  DEMO_LOCKED_PERMISSIONS,
  DEFAULT_DASHBOARD_PERIOD,
  DURATION_GROUPS,
  MINUTES_PER_DAY,
  MINUTES_PER_HOUR,
  MORNING_ENDS_AT,
  PERMISSIONS,
  ROOM_CHART_DAYS,
  STAFF_NAME_MAX_LENGTH,
  CABIN_PHOTO_LIMIT,
  CABIN_PHOTO_MAX_MB,
  CABIN_PHOTO_TYPES,
  MAP_LEVEL_FILLS,
  MAP_TOOLTIP_GAP,
  MAP_TOOLTIP_TOP_ROOM,
} from "@/lib/constants";
import { AMENITY_OPTIONS, SEARCH_PAGES } from "@/lib/options";
import { COUNTRIES, FLAG_BASE_URL, FLAG_URL_PATTERN } from "@/lib/countries";
import { MAP_COUNTRY_CODES } from "@/lib/country-codes";

export function greeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < MORNING_ENDS_AT) return "Good morning";
  if (hour < AFTERNOON_ENDS_AT) return "Good afternoon";
  return "Good evening";
}

export function isRecordId(id: number) {
  return Number.isSafeInteger(id) && id > 0;
}

export function routeErrorMessage(error: unknown) {
  if (isRouteErrorResponse(error)) return `${error.status} · ${error.statusText || "The page could not be loaded."}`;
  if (error instanceof Error && error.message) return error.message;
  return "Something unexpected happened. Try again, or head back to the dashboard.";
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
  return `$${new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value)}`;
}

export function formatWholeCurrency(value: number) {
  return new Intl.NumberFormat("en", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
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

export function getUserRole(user: User | null | undefined): StaffRole | null {
  const role = user?.app_metadata?.role;
  return role === "admin" || role === "staff" ? role : null;
}

export function isDemoUser(user: User | null | undefined) {
  return user?.app_metadata?.demo === true;
}

export function hasPermission(role: StaffRole | null, permission: Permission) {
  return Boolean(role && PERMISSIONS[permission].includes(role));
}

export function accessLock(role: StaffRole | null, isDemo: boolean, permission: Permission): AccessLock {
  if (!hasPermission(role, permission)) return "admin";
  if (isDemo && DEMO_LOCKED_PERMISSIONS.includes(permission)) return "demo";
  return null;
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

export function parseBookingNumber(value: string | null) {
  const digits = value?.replace(/^#/, "").trim();
  if (!digits) return null;
  const id = Number(digits);
  return Number.isSafeInteger(id) && id > 0 ? id : -1;
}

export function parseRoleFilter(value: string | null): StaffRole | null {
  return value === "admin" || value === "staff" ? value : null;
}

export function searchCabins(cabins: Cabin[], term: string) {
  const query = term.trim().toLowerCase().replace(/^#/, "");
  if (!query) return cabins;
  return cabins.filter((cabin) => cabin.name.toLowerCase().includes(query) || String(cabin.id) === query);
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

export function cabinPhotos({ images, image }: Pick<Cabin, "images" | "image">) {
  if (images?.length) return images;
  return image ? [image] : [];
}

export function cabinToFormValues(cabin: Cabin): CabinFormValues {
  return {
    name: cabin.name,
    maxCapacity: cabin.maxCapacity,
    regularPrice: cabin.regularPrice,
    discount: cabin.discount ?? 0,
    bedType: cabin.bedType ?? "",
    size: cabin.size ?? undefined,
    amenities: cabin.amenities ?? [],
    photos: cabinPhotos(cabin).map((url) => ({ id: url, url })),
    description: cabin.description ?? "",
  };
}

export function cabinCopy(cabin: Cabin): CabinFormValues {
  return { ...cabinToFormValues(cabin), name: `${cabin.name} (Copy)` };
}

export function cabinRowFrom(values: CabinFormValues, images: string[]): CabinRow {
  return {
    name: values.name.trim(),
    maxCapacity: values.maxCapacity,
    regularPrice: values.regularPrice,
    discount: values.discount,
    description: values.description.trim(),
    bedType: values.bedType,
    size: values.size,
    amenities: values.amenities,
    images,
    image: images[0] ?? "",
  };
}

export function cabinPreview(values: Partial<CabinFormValues>): Cabin {
  const images = (values.photos ?? []).map((photo) => photo.url);
  return {
    id: 0,
    name: values.name?.trim() || "New",
    maxCapacity: Number(values.maxCapacity) || 0,
    regularPrice: Number(values.regularPrice) || 0,
    discount: Number(values.discount) || 0,
    description: values.description ?? "",
    bedType: values.bedType ?? null,
    size: Number(values.size) || null,
    amenities: values.amenities ?? [],
    images,
    image: images[0] ?? "",
  };
}

export function photosFromFiles(files: File[], existingCount: number) {
  const photos: CabinPhoto[] = [];
  const rejected: RejectedPhoto[] = [];

  for (const file of files) {
    if (!CABIN_PHOTO_TYPES.includes(file.type)) rejected.push({ name: file.name, reason: "Use a JPG, PNG, WebP or AVIF image." });
    else if (file.size > CABIN_PHOTO_MAX_MB * 1024 * 1024) rejected.push({ name: file.name, reason: `Photos must be ${CABIN_PHOTO_MAX_MB} MB or smaller.` });
    else if (existingCount + photos.length >= CABIN_PHOTO_LIMIT) rejected.push({ name: file.name, reason: `A cabin can have up to ${CABIN_PHOTO_LIMIT} photos.` });
    else photos.push({ id: crypto.randomUUID(), url: URL.createObjectURL(file), file });
  }

  return { photos, rejected };
}

export function moveToFront<T extends { id: string }>(items: T[], id: string) {
  const item = items.find((entry) => entry.id === id);
  return item ? [item, ...items.filter((entry) => entry.id !== id)] : items;
}

export function amenitiesFor(keys: string[] | null | undefined) {
  return AMENITY_OPTIONS.filter((option) => keys?.includes(option.value));
}

export function settingsFormValues(settings: SettingsFormValues): SettingsFormValues {
  const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice, checkInTime, checkOutTime, acceptOnlineBookings, bookingWindowDays } = settings;
  return { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice, checkInTime, checkOutTime, acceptOnlineBookings, bookingWindowDays };
}

export function stayLengthRule(minNights: number, maxNights: number) {
  if (!Number.isFinite(minNights) || !Number.isFinite(maxNights)) return "Not set";
  return minNights === maxNights ? pluralize(minNights, "night") : `${minNights} to ${maxNights} nights`;
}

export function breakfastRule(price: number) {
  if (!Number.isFinite(price)) return "Not set";
  if (price <= 0) return "Included, free of charge";
  return `${Number.isInteger(price) ? formatWholeCurrency(price) : formatCurrency(price)} per guest, per night`;
}

export function websiteBookingRule(isOpen: boolean, windowDays: number) {
  if (!isOpen) return "Paused";
  return Number.isFinite(windowDays) ? `Open, up to ${windowDays} days ahead` : "Open";
}

export function clampNumber(value: number, min: number, max = Infinity) {
  return Math.min(Math.max(value, min), max);
}

export function pluralWord(count: number, singular: string, plural = `${singular}s`) {
  return count === 1 ? singular : plural;
}

export function guestLimitRule(maxGuests: number) {
  return Number.isFinite(maxGuests) ? `Up to ${pluralize(maxGuests, "guest")} per booking` : "Not set";
}

export function lastSavedLabel(updatedAt: string | null | undefined) {
  if (!updatedAt) return "Saved";
  return `Last saved ${formatDistanceToNow(parseISO(updatedAt), { addSuffix: true }).replace("about ", "")}`;
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

export function nightsBetween(startDate: string, endDate: string) {
  if (!startDate || !endDate) return 0;
  return differenceInCalendarDays(parseISO(endDate), parseISO(startDate));
}

export function overlapsBooked(ranges: BookedRange[], startDate: string, endDate: string) {
  return ranges.some((range) => range.start_date < endDate && range.end_date > startDate);
}

export function bookingPrice(cabin: Cabin | undefined, values: Pick<BookingFormValues, "startDate" | "endDate" | "numGuests" | "hasBreakfast">, breakfastPrice: number): BookingPrice {
  const nights = Math.max(0, nightsBetween(values.startDate, values.endDate));
  const rate = cabin ? nightlyRate(cabin) : 0;
  const cabinPrice = nights * rate;
  const extrasPrice = values.hasBreakfast ? nights * breakfastPrice * (Number(values.numGuests) || 0) : 0;
  return { nights, nightlyRate: rate, cabinPrice, extrasPrice, totalPrice: cabinPrice + extrasPrice };
}

export function bookingRules(cabin: Cabin | undefined, settings: Settings | undefined, booked: BookedRange[]): BookingRules {
  return {
    minNights: settings?.minBookingLength ?? 1,
    maxNights: settings?.maxBookingLength ?? 90,
    maxGuests: Math.min(cabin?.maxCapacity ?? Infinity, settings?.maxGuestsPerBooking ?? Infinity),
    booked,
  };
}

export function bookingToFormValues(booking: BookingDetails): BookingFormValues {
  return {
    guestMode: "existing",
    guestId: booking.guestId,
    guestName: "",
    guestEmail: "",
    guestCountry: "",
    guestNationalId: "",
    cabinId: booking.cabinId,
    startDate: booking.startDate.slice(0, 10),
    endDate: booking.endDate.slice(0, 10),
    numGuests: booking.numGuests,
    hasBreakfast: booking.hasBreakfast,
    isPaid: booking.isPaid,
    observations: booking.observations ?? "",
  };
}

export function bookingRowFrom(values: BookingFormValues, guestId: number, price: BookingPrice): BookingRow {
  return {
    cabinId: values.cabinId,
    guestId,
    startDate: values.startDate,
    endDate: values.endDate,
    numNights: price.nights,
    numGuests: values.numGuests,
    cabinPrice: price.cabinPrice,
    extrasPrice: price.extrasPrice,
    totalPrice: price.totalPrice,
    hasBreakfast: values.hasBreakfast,
    isPaid: values.isPaid,
    observations: values.observations?.trim() || null,
  };
}

export function flagUrl(code: string) {
  return `${FLAG_BASE_URL}/${code.toLowerCase()}.svg`;
}

export function countryCodeFromFlag(url: string | null | undefined) {
  return url?.match(FLAG_URL_PATTERN)?.[1] ?? null;
}

export function guestStats(guest: GuestSummary): GuestStats {
  const stays = guest.bookings.filter(isConfirmedStay);
  const lastStay = [...guest.bookings].sort((a, b) => b.startDate.localeCompare(a.startDate))[0]?.startDate ?? null;
  return {
    stays: guest.bookings.length,
    totalSpent: sumBy(guest.bookings, (booking) => booking.totalPrice),
    lastStay,
    isReturning: stays.length > 1 || guest.bookings.length > 1,
  };
}

export function searchGuests(guests: GuestSummary[], term: string) {
  const query = term.trim().toLowerCase();
  if (!query) return guests;
  return guests.filter((guest) => guest.fullName.toLowerCase().includes(query) || guest.email.toLowerCase().includes(query));
}

export function pageSlice<T>(items: T[], page: number, pageSize: number) {
  return items.slice((page - 1) * pageSize, page * pageSize);
}

export function guestCountries(stays: readonly CountryStay[]): CountryCount[] {
  const tally = new Map<string, CountryCount>();

  for (const { guests } of stays) {
    if (!guests) continue;
    const code = countryCodeFromFlag(guests.countryFlag);
    const country = COUNTRIES.find((entry) => entry.code === code);
    const name = country?.name ?? guests.nationality ?? "Unknown";
    const key = code ?? name;
    const current = tally.get(key) ?? { code, numeric: country?.numeric ?? null, name, flag: guests.countryFlag, count: 0, share: 0 };
    tally.set(key, { ...current, count: current.count + 1 });
  }

  const total = sumBy([...tally.values()], (entry) => entry.count);
  return [...tally.values()]
    .map((entry) => ({ ...entry, share: total ? entry.count / total : 0 }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function mapLevel(count: number, max: number) {
  if (!count || !max) return 0;
  return Math.max(1, Math.ceil((count / max) * (MAP_LEVEL_FILLS.length - 1)));
}

export function revenueByCabin(bookings: readonly CabinRevenueBooking[], cabins: readonly Pick<Cabin, "name">[]) {
  const totals = new Map(cabins.map((cabin) => [cabin.name, 0]));
  for (const booking of bookings) {
    const name = booking.cabins?.name;
    if (name) totals.set(name, (totals.get(name) ?? 0) + (booking.totalPrice ?? 0));
  }
  return [...totals.entries()]
    .map(([name, revenue]) => ({ name, label: `N° ${name}`, revenue }))
    .sort((a, b) => b.revenue - a.revenue || a.name.localeCompare(b.name));
}

export function searchPages(query: string, canView: (permission: Permission) => boolean): SearchResult[] {
  const term = query.trim().toLowerCase();
  return SEARCH_PAGES.filter((page) => !page.permission || canView(page.permission))
    .filter((page) => !term || `${page.label} ${page.keywords}`.toLowerCase().includes(term))
    .map((page) => ({ id: `page-${page.to}`, type: "page", title: page.label, subtitle: "Page", to: page.to }));
}

export function searchSafeTerm(query: string) {
  return query.trim().replace(/[^\p{L}\p{N}@.\s'-]/gu, "");
}

export function filterGuestOptions(guests: GuestOption[], query: string) {
  const term = query.trim().toLowerCase();
  return guests
    .filter((guest) => !term || guest.fullName.toLowerCase().includes(term) || guest.email.toLowerCase().includes(term))
    .sort((a, b) => a.fullName.localeCompare(b.fullName));
}

export function bookedDayMatchers(ranges: BookedRange[]) {
  return ranges.map((range) => ({ from: parseISO(range.start_date), to: addDays(parseISO(range.end_date), -1) }));
}

export function stayDatesLabel(startDate: string, endDate: string) {
  if (!startDate) return null;
  const arrival = format(parseISO(startDate), "d MMM yyyy");
  if (!endDate) return `${arrival} → choose departure`;
  return `${arrival} → ${format(parseISO(endDate), "d MMM yyyy")} · ${pluralize(nightsBetween(startDate, endDate), "night")}`;
}

export function mapTooltipStyle({ x, y, width }: MapPointer) {
  const translateX = `clamp(${-x}px, -50%, calc(${width - x}px - 100%))`;
  const translateY = y < MAP_TOOLTIP_TOP_ROOM ? `${MAP_TOOLTIP_GAP}px` : `calc(-100% - ${MAP_TOOLTIP_GAP}px)`;
  return { left: x, top: y, transform: `translate(${translateX}, ${translateY})` };
}

export function mapShapeFlag(shapeId: string) {
  const code = MAP_COUNTRY_CODES[shapeId];
  return code ? flagUrl(code) : null;
}

export function cabinRevenueChart(bookings: readonly CabinRevenueBooking[], cabins: readonly Pick<Cabin, "name">[]) {
  const entries = revenueByCabin(bookings, cabins);
  const total = sumBy(entries, (entry) => entry.revenue);
  const bars: CabinRevenueBar[] = entries.map((entry) => ({ ...entry, share: total ? entry.revenue / total : 0 }));
  return { bars, total, average: bars.length ? total / bars.length : 0 };
}

export function averageGapLabel(revenue: number, average: number) {
  const gap = Math.round(revenue - average);
  if (gap === 0) return "Right on the average";
  return `${formatWholeCurrency(Math.abs(gap))} ${gap > 0 ? "above" : "below"} the average`;
}

export function stayNights({ startDate, endDate }: Pick<CabinStay, "startDate" | "endDate">) {
  return { from: toCalendarDay(startDate), to: addDays(toCalendarDay(endDate), -1) };
}

export function stayCalendarModifiers(stays: CabinStay[], activeStayId: number | null) {
  return {
    unconfirmed: stays.filter((stay) => stay.status === "unconfirmed").map(stayNights),
    checkedIn: stays.filter((stay) => stay.status === "checked-in").map(stayNights),
    checkedOut: stays.filter((stay) => stay.status === "checked-out").map(stayNights),
    active: stays.filter((stay) => stay.id === activeStayId).map(stayNights),
  };
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
