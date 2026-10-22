import type { ReactNode } from "react";
import { format, isToday } from "date-fns";

import { formatDistanceFromNow, formatCurrency } from "../../lib/utils";

/** One label/value pair in the guest grid. */
function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0 space-y-2 bg-card p-5">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">{label}</dt>
      <dd className="wrap-break-word text-[15px] text-foreground">{children}</dd>
    </div>
  );
}

/** Arrival or departure date, set large. */
function StayDate({ label, date, note }: { label: string; date: string; note?: string }) {
  const d = new Date(date);
  return (
    <div className="min-w-0 space-y-2">
      <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">{label}</p>
      <p className="flex items-baseline gap-3">
        <span className="text-5xl leading-none font-extralight tabular-nums">{format(d, "dd")}</span>
        <span className="text-sm uppercase tracking-[0.18em] text-foreground">{format(d, "MMM yyyy")}</span>
      </p>
      <p className="text-[13px] text-muted-foreground">
        {format(d, "EEEE")}
        {note ? ` · ${note}` : ""}
      </p>
    </div>
  );
}

interface BookingDataBoxProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  booking: any; // Replace with your Booking interface if available
}

/** The booking laid out like a printed reservation: suite and dates, guest, then the bill. */
export function BookingDataBox({ booking }: BookingDataBoxProps) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests,
    cabins,
  } = booking;
  const { fullName: guestName, email, nationality, countryFlag, nationalID } = guests ?? {};
  const cabinName = cabins?.name ?? "Unknown";
  const arrivalNote = isToday(new Date(startDate)) ? "Today" : formatDistanceFromNow(startDate);

  return (
    <section className="border border-border bg-card text-card-foreground">
      {/* Suite and dates */}
      <header className="grid gap-8 border-b border-border p-6 sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
        <div className="min-w-0 space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-gold">Cabin</p>
          <p className="text-5xl leading-none font-extralight">
            <span className="mr-2 align-middle text-xs font-semibold tracking-[0.14em] text-muted-foreground">N°</span>
            {cabinName}
          </p>
          <p className="text-[13px] text-muted-foreground">
            {numNights} {numNights === 1 ? "night" : "nights"} · {numGuests} {numGuests === 1 ? "guest" : "guests"}
          </p>
        </div>
        <StayDate label="Arrival" date={startDate} note={arrivalNote} />
        <StayDate label="Departure" date={endDate} />
      </header>

      {/* Guest */}
      <div className="space-y-5 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          {countryFlag && (
            <img src={countryFlag} alt={`Flag of ${nationality}`} className="h-4 w-6 border border-border object-cover" />
          )}
          <p className="text-2xl font-light">
            {guestName}
            {numGuests > 1 && <span className="ml-2 text-base text-muted-foreground">+ {numGuests - 1} {numGuests - 1 === 1 ? "guest" : "guests"}</span>}
          </p>
        </div>

        <dl className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          <Detail label="Email">{email ?? "—"}</Detail>
          <Detail label="Nationality">{nationality ?? "—"}</Detail>
          <Detail label="National ID">{nationalID ?? "—"}</Detail>
          <Detail label="Breakfast">{hasBreakfast ? "Included" : "Not included"}</Detail>
        </dl>

        {observations && (
          <div className="space-y-2 border-t border-border pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">Guest notes</p>
            <p className="max-w-[70ch] text-lg leading-relaxed font-light italic text-foreground">“{observations}”</p>
          </div>
        )}
      </div>

      {/* The bill */}
      <div className="flex flex-col gap-6 border-t border-border p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">Total</p>
          <p className="text-5xl leading-none font-extralight tabular-nums">{formatCurrency(totalPrice)}</p>
          {hasBreakfast && (
            <p className="text-[13px] text-muted-foreground">
              {formatCurrency(cabinPrice)} cabin + {formatCurrency(extrasPrice)} breakfast
            </p>
          )}
        </div>
        <span
          className={`self-start border border-current/25 px-3 pt-1.5 pb-1 text-[10px] font-semibold uppercase tracking-[0.22em] sm:self-auto ${
            isPaid ? "bg-status-success-bg text-status-success" : "bg-status-warning-bg text-status-warning"
          }`}
        >
          {isPaid ? "Paid" : "Will pay at property"}
        </span>
      </div>

      <footer className="border-t border-border px-6 py-4 text-right text-xs text-muted-foreground sm:px-8">
        Booked {format(new Date(created_at), "EEEE d MMMM yyyy, HH:mm")}
      </footer>
    </section>
  );
}

export default BookingDataBox;
