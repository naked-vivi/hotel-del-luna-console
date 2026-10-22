import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import { arrivalNote, pluralize } from "@/lib/helpers";
import BookingDataItem from "@/components/bookings/booking-data-item";
import StayDate from "@/components/bookings/stay-date";
import useSettings from "@/hooks/settings/use-settings";

export function BookingDataBox({ booking }: BookingDataBoxProps) {
  const { settings } = useSettings();
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

  return (
    <section className="border border-border bg-card text-card-foreground">
      <header className="grid gap-8 border-b border-border p-6 sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
        <div className="min-w-0 space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-gold">Cabin</p>
          <p className="text-5xl leading-none font-extralight">
            <span className="mr-2 align-middle text-xs font-semibold tracking-[0.14em] text-muted-foreground">N°</span>
            {cabinName}
          </p>
          <p className="text-[13px] text-muted-foreground">
            {pluralize(numNights, "night")} · {pluralize(numGuests, "guest")}
          </p>
        </div>
        <StayDate label="Arrival" date={startDate} time={settings && `from ${settings.checkInTime}`} note={arrivalNote(startDate)} />
        <StayDate label="Departure" date={endDate} time={settings && `by ${settings.checkOutTime}`} />
      </header>

      <div className="space-y-5 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          {countryFlag && (
            <img src={countryFlag} alt={`Flag of ${nationality}`} className="h-4 w-6 border border-border object-cover" />
          )}
          <p className="text-2xl font-light">
            {guestName}
            {numGuests > 1 && <span className="ml-2 text-base text-muted-foreground">+ {pluralize(numGuests - 1, "guest")}</span>}
          </p>
        </div>

        <dl className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          <BookingDataItem label="Email">{email ?? "—"}</BookingDataItem>
          <BookingDataItem label="Nationality">{nationality ?? "—"}</BookingDataItem>
          <BookingDataItem label="National ID">{nationalID ?? "—"}</BookingDataItem>
          <BookingDataItem label="Breakfast">{hasBreakfast ? "Included" : "Not included"}</BookingDataItem>
        </dl>

        {observations && (
          <div className="space-y-2 border-t border-border pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">Guest notes</p>
            <p className="max-w-[70ch] text-lg leading-relaxed font-light italic text-foreground">“{observations}”</p>
          </div>
        )}
      </div>

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
