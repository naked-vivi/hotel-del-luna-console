import { useState } from "react";
import { ArrowRightIcon } from "@/shared/icons";
import { CalendarCardIcon, LedgerStackIcon } from "@/shared/drawn-icons";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";

import { subtractDates } from "../lib/utils";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

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
      ? numNights * 15 * booking.numGuests
      : 0;
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "checked-in";

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status,
    };
  });

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  // The sidebar stays navy in both modes, so this panel uses the sidebar colours only.
  const rowClass =
    "group flex w-full items-center justify-between gap-3 px-4 pt-3.5 pb-3 text-left text-[10.5px] font-semibold uppercase tracking-[0.2em] text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-accent-50 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-sidebar-ring disabled:pointer-events-none disabled:opacity-40";

  return (
    <section aria-label="Sample data" aria-busy={isLoading} className="border border-sidebar-border">
      <div className="space-y-2 px-4 pt-4 pb-3.5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="pt-0.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-300">Sample data</h3>
          <span className="border border-sage-300/40 bg-sage-300/10 px-1.5 pt-0.5 text-[8.5px] font-semibold uppercase tracking-[0.2em] text-sage-300">
            Dev
          </span>
        </div>
        <p className="truncate text-[11px] leading-snug text-primary-300">
          {isLoading ? "Replacing data, one moment…" : "Replaces what is in the database."}
        </p>
      </div>

      <div className="divide-y divide-sidebar-border border-t border-sidebar-border">
        <button type="button" onClick={uploadAll} disabled={isLoading} className={rowClass}>
          <span className="flex items-center gap-3">
            <LedgerStackIcon aria-hidden="true" className="-my-1 size-5.5" />
            Everything
          </span>
          <ArrowRightIcon aria-hidden="true" className="-mt-0.5 size-3.5 stroke-[1.5] text-primary-400 transition-colors group-hover:text-sidebar-primary" />
        </button>
        <button type="button" onClick={uploadBookings} disabled={isLoading} className={rowClass}>
          <span className="flex items-center gap-3">
            <CalendarCardIcon aria-hidden="true" className="-my-1 size-5.5" />
            Bookings only
          </span>
          <ArrowRightIcon aria-hidden="true" className="-mt-0.5 size-3.5 stroke-[1.5] text-primary-400 transition-colors group-hover:text-sidebar-primary" />
        </button>
      </div>
    </section>
  );
}

export default Uploader;