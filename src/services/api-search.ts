import supabase from "./supabase";
import { formatBookingDate } from "@/lib/utils";
import { parseBookingNumber, searchSafeTerm } from "@/lib/helpers";
import { SEARCH_RESULT_LIMIT, USERS_PAGE_SIZE } from "@/lib/constants";

const BOOKING_FIELDS = "id, startDate, endDate, guests!inner(fullName, countryFlag), cabins(name)";

function toBookingResult(booking: SearchBookingRow): SearchResult {
  return {
    id: `booking-${booking.id}`,
    type: "booking",
    title: `Booking #${booking.id} · ${booking.guests?.fullName ?? "Guest"}`,
    subtitle: `N° ${booking.cabins?.name ?? "—"} · ${formatBookingDate(booking.startDate)} – ${formatBookingDate(booking.endDate)}`,
    to: `/bookings/${booking.id}`,
    flag: booking.guests?.countryFlag,
  };
}

async function searchBookings(term: string) {
  const bookingId = parseBookingNumber(term);
  const byGuest = supabase.from("bookings").select(BOOKING_FIELDS).ilike("guests.fullName", `%${term}%`).order("startDate", { ascending: false }).limit(SEARCH_RESULT_LIMIT);
  const byId = bookingId && bookingId > 0 ? supabase.from("bookings").select(BOOKING_FIELDS).eq("id", bookingId).limit(1) : null;
  const [guestMatches, idMatches] = await Promise.all([byGuest, byId]);
  const rows = [...((idMatches?.data ?? []) as unknown as SearchBookingRow[]), ...((guestMatches.data ?? []) as unknown as SearchBookingRow[])];
  return [...new Map(rows.map((row) => [row.id, row])).values()].map(toBookingResult);
}

async function searchCabins(term: string): Promise<SearchResult[]> {
  const { data } = await supabase.from("cabins").select("id, name, maxCapacity").ilike("name", `%${term.replace(/^no?\.?\s+/i, "")}%`).order("name").limit(SEARCH_RESULT_LIMIT);
  return (data ?? []).map((cabin) => ({
    id: `cabin-${cabin.id}`,
    type: "cabin",
    title: `Cabin N° ${cabin.name}`,
    subtitle: `Sleeps ${cabin.maxCapacity}`,
    to: `/cabins/${cabin.id}`,
  }));
}

async function searchGuests(term: string): Promise<SearchResult[]> {
  const { data } = await supabase
    .from("guests")
    .select("id, fullName, email, countryFlag")
    .or(`fullName.ilike.*${term}*,email.ilike.*${term}*`)
    .order("fullName")
    .limit(SEARCH_RESULT_LIMIT);
  return (data ?? []).map((guest) => ({
    id: `guest-${guest.id}`,
    type: "guest",
    title: guest.fullName,
    subtitle: guest.email,
    to: `/guests?search=${encodeURIComponent(guest.fullName)}&guest=${guest.id}`,
    flag: guest.countryFlag,
  }));
}

async function searchStaff(term: string): Promise<SearchResult[]> {
  const { data } = await supabase.rpc("list_user_accounts", { p_page: 1, p_page_size: Math.min(SEARCH_RESULT_LIMIT, USERS_PAGE_SIZE), p_search: term });
  return ((data?.users ?? []) as UserAccount[]).map((account) => ({
    id: `staff-${account.id}`,
    type: "staff",
    title: account.fullName || account.email,
    subtitle: `${account.role === "admin" ? "Admin" : "Staff"} · ${account.email}`,
    to: `/users?search=${encodeURIComponent(account.fullName || account.email)}`,
  }));
}

export async function searchEverything(query: string, includeStaff: boolean): Promise<SearchResult[]> {
  const term = searchSafeTerm(query);
  if (!term) return [];

  const groups = await Promise.all([
    searchBookings(term),
    searchCabins(term),
    searchGuests(term),
    includeStaff ? searchStaff(term) : Promise.resolve([]),
  ]);
  return groups.flat();
}
