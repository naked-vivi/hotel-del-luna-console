import type { CSSProperties } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { addDays, differenceInCalendarDays, format, isSameDay, isValid, parseISO, startOfDay } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getBookingsInRange, type ChartBooking } from "@/services/api-bookings";
import { ChevronLeftIcon, ChevronRightIcon } from "@/shared/icons";
import EmptyState from "@/shared/empty-state";
import ErrorNote from "@/shared/error-note";
import StatusTag from "@/shared/status-tag";
import { cn, formatCurrency } from "@/lib/utils";
import useCabins from "../cabins/use-cabins";

// The room chart (a hotel "tape chart"): one row per cabin, one column per night,
// and each stay drawn as a bar across the nights it covers.

const DAYS = 14;
const STEP = 7;
const grid: CSSProperties = { gridTemplateColumns: `9rem repeat(${DAYS}, minmax(3.5rem, 1fr))` };

const barStyles: Record<string, string> = {
  unconfirmed: "bg-status-pending-bg text-status-pending",
  "checked-in": "bg-status-success-bg text-status-success",
  "checked-out": "bg-status-neutral-bg text-status-neutral",
};

const iso = (date: Date) => format(date, "yyyy-MM-dd");

// Week navigation is drawn exactly like the status filter (same border, size, type and dividers),
// with the filled style on the button for where you are. They stay buttons so "Earlier" can be pressed again.
const navGroup = "inline-flex h-10 w-fit items-center border border-input bg-transparent";
const navButton =
  "inline-flex h-full items-center justify-center gap-1.5 border-l border-input px-4 pt-0.5 text-[10.5px] font-semibold whitespace-nowrap uppercase tracking-[0.2em] text-foreground/60 transition-all first:border-l-0 hover:text-foreground focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring dark:text-muted-foreground dark:hover:text-foreground data-active:bg-primary data-active:text-primary-foreground dark:data-active:text-primary-foreground [&_svg]:-mt-0.5 [&_svg]:size-3.5";
const day = (value: string) => startOfDay(parseISO(value.slice(0, 10)));

function useWindowStart() {
  const [searchParams, setSearchParams] = useSearchParams();
  const today = startOfDay(new Date());
  const param = searchParams.get("from");
  const parsed = param ? parseISO(param) : null;
  const start = parsed && isValid(parsed) ? startOfDay(parsed) : today;

  function goTo(date: Date) {
    const next = new URLSearchParams(searchParams);
    if (isSameDay(date, today)) next.delete("from");
    else next.set("from", iso(date));
    setSearchParams(next);
  }

  return { start, today, goTo, status: searchParams.get("status") };
}

function ChartHeader({ start, today }: { start: Date; today: Date }) {
  return (
    <div className="grid border-b border-border" style={grid}>
      <div className="flex items-end px-4 pb-3 text-[10px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">Cabin</div>
      {Array.from({ length: DAYS }, (_, i) => {
        const date = addDays(start, i);
        const isToday = isSameDay(date, today);
        return (
          <div key={i} className={cn("flex flex-col items-center gap-1 border-l border-border pt-3 pb-2.5", isToday && "bg-gold/8")}>
            <span className={cn("text-[9.5px] font-semibold tracking-[0.2em] uppercase", isToday ? "text-gold" : "text-muted-foreground")}>
              {format(date, "EEE")}
            </span>
            <span className={cn("text-lg leading-none font-extralight tabular-nums", isToday ? "text-gold" : "text-foreground")}>
              {format(date, "d")}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function StayBar({ booking, start }: { booking: ChartBooking; start: Date }) {
  const from = day(booking.startDate);
  const to = day(booking.endDate);
  const first = Math.max(0, differenceInCalendarDays(from, start));
  const last = Math.min(DAYS, differenceInCalendarDays(to, start));
  if (last <= first) return null;

  const before = from < start;
  const after = differenceInCalendarDays(to, start) > DAYS;
  const guest = booking.guests?.fullName ?? "Guest";

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Link
            to={`/bookings/${booking.id}`}
            aria-label={`Booking #${booking.id}, ${guest}, ${format(from, "d MMM")} to ${format(to, "d MMM")}`}
            className={cn(
              "relative z-10 my-3 flex min-w-0 items-center gap-1.5 border border-current/25 px-2.5 text-xs whitespace-nowrap transition-opacity hover:opacity-80 focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-ring",
              barStyles[booking.status] ?? "bg-muted text-muted-foreground",
            )}
            style={{ gridColumn: `${first + 2} / span ${last - first}`, gridRow: 1 }}
          />
        }
      >
        {before && <ChevronLeftIcon className="-ml-1 size-3 shrink-0" />}
        <span className="truncate pt-0.5">{guest}</span>
        {after && <ChevronRightIcon className="-mr-1 ml-auto size-3 shrink-0" />}
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={8}
        showArrow={false}
        className="w-72 max-w-72 flex-col items-stretch gap-0 border border-border bg-popover p-0 text-popover-foreground"
      >
        <StayDetails booking={booking} from={from} to={to} />
      </TooltipContent>
    </Tooltip>
  );
}

/** What the tooltip shows for one stay. */
function StayDetails({ booking, from, to }: { booking: ChartBooking; from: Date; to: Date }) {
  const row = (label: string, value: string) => (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-[9.5px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">{label}</dt>
      <dd className="text-[13px] tabular-nums">{value}</dd>
    </div>
  );

  return (
    <div className="flex flex-col">
      <div className="space-y-2.5 border-b border-border p-4">
        <StatusTag status={booking.status} />
        <div className="min-w-0 space-y-1">
          <p className="wrap-break-word text-base font-light">{booking.guests?.fullName ?? "Guest"}</p>
          <p className="truncate text-xs text-muted-foreground">{booking.guests?.email ?? `Booking #${booking.id}`}</p>
        </div>
      </div>
      <dl className="space-y-2.5 p-4">
        {row("Arrive", format(from, "EEE d MMM"))}
        {row("Depart", format(to, "EEE d MMM"))}
        {row("Stay", `${booking.numNights} ${booking.numNights === 1 ? "night" : "nights"} · ${booking.numGuests} ${booking.numGuests === 1 ? "guest" : "guests"}`)}
        {row("Total", `${formatCurrency(booking.totalPrice)} · ${booking.isPaid ? "Paid" : "Pay at property"}`)}
      </dl>
      <p className="border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">Booking #{booking.id} · select to open</p>
    </div>
  );
}

function RowBackground({ start, today }: { start: Date; today: Date }) {
  return (
    <>
      {Array.from({ length: DAYS }, (_, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={cn("border-l border-border", isSameDay(addDays(start, i), today) && "bg-gold/8")}
          style={{ gridColumn: i + 2, gridRow: 1 }}
        />
      ))}
    </>
  );
}

function ChartSkeleton({ start, today }: { start: Date; today: Date }) {
  const spans = [[1, 4], [6, 3], [0, 2], [3, 6], [9, 4], [2, 3]];
  return (
    <div aria-busy="true" aria-label="Loading the room chart">
      {spans.map(([s, len], row) => (
        <div key={row} className="grid h-16 border-b border-border last:border-b-0" style={grid}>
          <div className="flex items-center px-4" style={{ gridColumn: 1, gridRow: 1 }}><Skeleton className="h-7 w-16" /></div>
          <RowBackground start={start} today={today} />
          <Skeleton className="z-10 my-3" style={{ gridColumn: `${s + 2} / span ${len}`, gridRow: 1 }} />
        </div>
      ))}
    </div>
  );
}

export default function RoomChart() {
  const { start, today, goTo, status } = useWindowStart();
  const end = addDays(start, DAYS);
  const { cabins = [], isPending: cabinsPending, error: cabinsError } = useCabins();
  const { data: bookings = [], isPending, error } = useQuery({
    queryKey: ["bookings", "chart", iso(start), status ?? "all"],
    queryFn: () => getBookingsInRange({ from: iso(start), to: iso(end), status }),
  });

  const rows = [...cabins].sort((a, b) => String(a.name).localeCompare(String(b.name)));

  // Which way you are looking: before this fortnight, at it, or after it.
  const offset = differenceInCalendarDays(start, today);
  const position = offset === 0 ? "today" : offset < 0 ? "earlier" : "later";
  const isLoading = isPending || cabinsPending;
  const failure = error || cabinsError;

  return (
    <TooltipProvider delay={120}>
    <section aria-label="Room chart" className="border border-border bg-card">
      {/* Toolbar: the dates on show, and moving between weeks */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-5 py-4">
        <div className="space-y-1">
          <p className="text-[10px] font-semibold tracking-[0.26em] text-muted-foreground uppercase">Room chart</p>
          <p className="text-xl font-extralight">
            {format(start, "d MMM")} &ndash; {format(addDays(end, -1), "d MMM yyyy")}
          </p>
        </div>
        <div role="group" aria-label="Move through the weeks" className={navGroup}>
          <button type="button" className={navButton} data-active={position === "earlier" ? "" : undefined} aria-pressed={position === "earlier"} onClick={() => goTo(addDays(start, -STEP))} aria-label="Show an earlier week">
            <ChevronLeftIcon /> Earlier
          </button>
          <button type="button" className={navButton} data-active={position === "today" ? "" : undefined} aria-pressed={position === "today"} onClick={() => goTo(today)}>
            Today
          </button>
          <button type="button" className={navButton} data-active={position === "later" ? "" : undefined} aria-pressed={position === "later"} onClick={() => goTo(addDays(start, STEP))} aria-label="Show a later week">
            Later <ChevronRightIcon />
          </button>
        </div>
      </div>

      {failure ? (
        <div className="flex min-h-96 flex-col px-6"><ErrorNote message={failure.message} /></div>
      ) : !isLoading && rows.length === 0 ? (
        <div className="p-6"><EmptyState title="No cabins yet">Add cabins to see their stays on the chart.</EmptyState></div>
      ) : (
        <div className="custom-scrollbar overflow-x-auto">
          <div className="min-w-232">
            <ChartHeader start={start} today={today} />
            {isLoading ? (
              <ChartSkeleton start={start} today={today} />
            ) : (
              rows.map((cabin) => (
                <div key={cabin.id} className="grid h-16 border-b border-border last:border-b-0 hover:bg-muted/30" style={grid}>
                  <div className="flex items-center px-4" style={{ gridColumn: 1, gridRow: 1 }}>
                    <span className="text-xl font-extralight">
                      <span className="mr-1.5 align-middle text-[10px] font-semibold tracking-[0.14em] text-muted-foreground">N°</span>
                      {cabin.name}
                    </span>
                  </div>
                  <RowBackground start={start} today={today} />
                  {bookings
                    .filter((booking) => booking.cabinId === cabin.id)
                    .map((booking) => <StayBar key={booking.id} booking={booking} start={start} />)}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border px-5 py-4 text-xs text-muted-foreground">
        <StatusTag status="unconfirmed" />
        <StatusTag status="checked-in" />
        <StatusTag status="checked-out" />
        <span className="flex items-center gap-2"><span className="size-3 bg-gold/20 ring-1 ring-gold/40" /> Today</span>
        <span>Hover a stay for details. Select it to open the booking.</span>
      </div>
    </section>
    </TooltipProvider>
  );
}
