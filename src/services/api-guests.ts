import supabase from "./supabase";

export async function getGuests(): Promise<GuestOption[]> {
  const { data, error } = await supabase
    .from("guests")
    .select("id, fullName, email, nationality, countryFlag")
    .order("fullName");

  if (error) {
    console.error(error);
    throw new Error("Guests could not be loaded");
  }
  return data ?? [];
}

export async function getGuestSummaries(): Promise<GuestSummary[]> {
  const { data, error } = await supabase
    .from("guests")
    .select("id, fullName, email, nationality, countryFlag, nationalID, userId, created_at, bookings(id, startDate, endDate, numNights, totalPrice, status, cabins(name))")
    .order("fullName")
    .order("startDate", { referencedTable: "bookings", ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Guests could not be loaded");
  }
  return (data ?? []) as unknown as GuestSummary[];
}
