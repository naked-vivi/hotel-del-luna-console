import { getToday } from "@/lib/utils";
import { BOOKINGS_PAGE_SIZE } from "@/lib/constants";
import { COUNTRIES } from "@/lib/countries";
import { bookingPrice, bookingRowFrom, flagUrl } from "@/lib/helpers";
import supabase from "./supabase";

export async function getBookings({ filter, sortBy, page, bookingId }: GetBookingsArgs) {
  // Explicitly type query to prevent Supabase's recursive generic explosion
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName, email)", { count: "exact" });

  // 1. Server-side Filter
  if (filter) {
    query = query.eq(filter.field, filter.value);
  }

  if (bookingId !== null) {
    query = query.eq("id", bookingId);
  }

  // 2. Server-side Sort
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  // Break sorting ties so records stay on consistent pages.
  query = query.order("id");
  const from = (page - 1) * BOOKINGS_PAGE_SIZE;
  const { data, error, count } = await query.range(from, from + BOOKINGS_PAGE_SIZE - 1);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { bookings: data ?? [], count: count ?? 0 };
}

export async function getBookingsInRange({ from, to, status }: BookingsInRangeArgs): Promise<ChartBooking[]> {
  let query = supabase
    .from("bookings")
    .select("id, startDate, endDate, numNights, status, cabinId, numGuests, totalPrice, isPaid, guests(fullName, email)")
    .lt("startDate", to)
    .gt("endDate", from)
    .order("startDate");

  if (status && status !== "all") query = query.eq("status", status);

  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("The room chart could not be loaded");
  }
  return (data ?? []) as unknown as ChartBooking[];
}

export async function getBooking(id: number): Promise<BookingDetails | null> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error("This booking could not be loaded. Try again shortly.");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string): Promise<RecentBooking[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice, cabins(name)")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return (data ?? []) as unknown as RecentBooking[];
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName, nationality, countryFlag)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id: number, obj: BookingUpdate) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

export async function getCabinAvailability(cabinId: number, excludeBookingId?: number): Promise<BookedRange[]> {
  const { data, error } = await supabase.rpc("get_cabin_availability", {
    p_cabin_id: cabinId,
    p_exclude_booking_id: excludeBookingId ?? null,
  });

  if (error) {
    console.error(error);
    throw new Error("Booked nights could not be loaded");
  }
  return data ?? [];
}

async function createGuestFrom(values: BookingFormValues) {
  const country = COUNTRIES.find((entry) => entry.code === values.guestCountry);
  const { data, error } = await supabase
    .from("guests")
    .insert({
      fullName: values.guestName.trim(),
      email: values.guestEmail.trim(),
      nationality: country?.name ?? null,
      countryFlag: country ? flagUrl(country.code) : null,
      nationalID: values.guestNationalId?.trim() || null,
    })
    .select("id")
    .single();

  if (error) {
    console.error(error);
    throw new Error("The guest could not be saved");
  }
  return data.id as number;
}

export async function saveBooking({ values, id, cabin, breakfastPrice }: SaveBookingArgs): Promise<{ id: number }> {
  const guestId = values.guestMode === "new" ? await createGuestFrom(values) : values.guestId;
  const row = bookingRowFrom(values, guestId, bookingPrice(cabin, values, breakfastPrice));

  const query = id
    ? supabase.from("bookings").update(row).eq("id", id)
    : supabase.from("bookings").insert({ ...row, status: "unconfirmed", source: "front-desk" });
  const { data, error } = await query.select("id").maybeSingle();

  if (error) {
    console.error(error);
    throw new Error(id ? "The booking could not be updated" : "The booking could not be created");
  }
  if (!data) throw new Error("You don't have permission to change this booking.");
  return data;
}
