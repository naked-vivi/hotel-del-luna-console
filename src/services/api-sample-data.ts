import supabase from "./supabase";
import { subtractDates } from "@/lib/utils";
import { sampleBookingStatus } from "@/lib/helpers";
import { SAMPLE_BREAKFAST_PRICE } from "@/lib/constants";
import { bookings } from "@/data/data-bookings";
import { cabins } from "@/data/data-cabins";
import { guests } from "@/data/data-guests";

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const allGuestIds = guestsIds.map((cabin) => cabin.id);

  const { data: cabinsIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id");
  const allCabinIds = cabinsIds.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) => {
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * SAMPLE_BREAKFAST_PRICE * booking.numGuests
      : 0;
    const totalPrice = cabinPrice + extrasPrice;

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status: sampleBookingStatus(booking.startDate, booking.endDate),
    };
  });

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
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
