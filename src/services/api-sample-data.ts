import supabase from "./supabase";
import { subtractDates } from "@/lib/utils";
import { sampleBookingStatus } from "@/lib/helpers";
import { SAMPLE_BREAKFAST_PRICE } from "@/lib/constants";
import { bookings } from "@/data/data-bookings";
import { cabins } from "@/data/data-cabins";
import { guests } from "@/data/data-guests";

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().neq("source", "website");
  if (error) throw new Error(error.message);
}

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().is("userId", null).gt("id", 0);
  if (error) throw new Error(error.message);
}

async function deleteCabins() {
  const { data: websiteBookings, error: lookupError } = await supabase.from("bookings").select("cabinId").eq("source", "website");
  if (lookupError) throw new Error(lookupError.message);

  const keep = [...new Set((websiteBookings ?? []).map((booking) => booking.cabinId))];
  const query = supabase.from("cabins").delete().gt("id", 0);
  const { error } = await (keep.length ? query.not("id", "in", `(${keep.join(",")})`) : query);
  if (error) throw new Error(error.message);
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) throw new Error(error.message);
}

async function createCabins() {
  const { data: existing, error: lookupError } = await supabase.from("cabins").select("name");
  if (lookupError) throw new Error(lookupError.message);

  const names = new Set((existing ?? []).map((cabin) => cabin.name));
  const missing = cabins.filter((cabin) => !names.has(cabin.name));
  if (missing.length === 0) return;

  const { error } = await supabase.from("cabins").insert(missing);
  if (error) throw new Error(error.message);
}

async function createBookings() {
  const { data: guestRows, error: guestError } = await supabase.from("guests").select("id").is("userId", null).order("id");
  if (guestError) throw new Error(guestError.message);
  const guestIds = (guestRows ?? []).map((guest) => guest.id);

  const { data: cabinRows, error: cabinError } = await supabase.from("cabins").select("id, name");
  if (cabinError) throw new Error(cabinError.message);
  const cabinIdByName = new Map((cabinRows ?? []).map((cabin) => [cabin.name, cabin.id]));

  const finalBookings = bookings.map((booking) => {
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * SAMPLE_BREAKFAST_PRICE * booking.numGuests
      : 0;

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice: cabinPrice + extrasPrice,
      guestId: guestIds.at(booking.guestId - 1),
      cabinId: cabinIdByName.get(cabin.name),
      status: sampleBookingStatus(booking.startDate, booking.endDate),
    };
  });

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) throw new Error(error.message);
}

export async function uploadAllSampleData() {
  await deleteBookings();
  await deleteGuests();
  await deleteCabins();

  await createGuests();
  await createCabins();
  await createBookings();
}

export async function uploadSampleBookings() {
  await deleteBookings();
  await createBookings();
}
