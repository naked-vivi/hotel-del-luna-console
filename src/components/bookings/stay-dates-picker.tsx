import { useState } from "react";
import { parseISO, startOfDay } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@/components/icons/icons";
import { bookedDayMatchers, stayDatesLabel, toISODate } from "@/lib/helpers";

function StayDatesPicker({ startDate, endDate, booked, minNights, maxNights, allowPast, invalid, describedBy, onChange }: StayDatesPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selected: DateRange | undefined = startDate ? { from: parseISO(startDate), to: endDate ? parseISO(endDate) : undefined } : undefined;
  const bookedDays = bookedDayMatchers(booked);
  const label = stayDatesLabel(startDate, endDate);

  function handleSelect(range: DateRange | undefined) {
    const from = range?.from ? toISODate(range.from) : "";
    const to = range?.to && range.from && range.to > range.from ? toISODate(range.to) : "";
    onChange(from, to);
    if (from && to) setIsOpen(false);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        id="stayDates"
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className="flex h-10 w-full items-center gap-3 border border-input bg-transparent px-3.5 text-left text-sm transition-colors outline-none hover:border-foreground/40 focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring aria-invalid:border-destructive"
      >
        <CalendarIcon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
        <span className={label ? "truncate pt-0.5" : "truncate pt-0.5 text-muted-foreground"}>{label ?? "Choose arrival and departure"}</span>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          numberOfMonths={2}
          selected={selected}
          onSelect={handleSelect}
          defaultMonth={selected?.from ?? new Date()}
          min={minNights}
          max={maxNights}
          excludeDisabled
          disabled={[...(allowPast ? [] : [{ before: startOfDay(new Date()) }]), ...bookedDays]}
          modifiers={{ booked: bookedDays }}
          modifiersClassNames={{ booked: "bg-status-pending-bg text-status-pending! line-through" }}
        />
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-2"><span className="size-3 bg-status-pending-bg ring-1 ring-status-pending/40" /> Already booked</span>
          <span>Pick the arrival, then the departure.</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default StayDatesPicker;
