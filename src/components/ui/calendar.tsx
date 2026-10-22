import { DayPicker, type DayPickerProps } from "react-day-picker"

import { cn } from "@/lib/utils"
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons/icons"

function Calendar({ className, classNames, components, showOutsideDays = false, ...props }: DayPickerProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("relative p-5", className)}
      classNames={{
        months: "flex flex-col gap-8 sm:flex-row",
        month: "flex flex-col gap-4",
        month_caption: "flex h-8 items-center justify-center",
        caption_label: "pt-0.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground",
        nav: "absolute inset-x-5 top-5 z-10 flex items-center justify-between",
        button_previous: "flex size-8 items-center justify-center border border-border text-foreground/70 transition-colors hover:text-foreground disabled:opacity-30",
        button_next: "flex size-8 items-center justify-center border border-border text-foreground/70 transition-colors hover:text-foreground disabled:opacity-30",
        month_grid: "border-collapse",
        weekdays: "flex",
        weekday: "w-10 pb-2 text-center text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground",
        week: "mt-1 flex",
        day: "relative size-10 p-0 text-center text-sm",
        day_button: "flex size-10 items-center justify-center pt-0.5 tabular-nums transition-colors hover:bg-muted focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:hover:bg-transparent",
        selected: "bg-gold/15 [&>button]:hover:bg-transparent",
        range_start: "bg-primary! text-primary-foreground",
        range_end: "bg-primary! text-primary-foreground",
        range_middle: "bg-gold/15 text-foreground",
        today: "font-semibold text-gold",
        outside: "text-muted-foreground/40",
        disabled: "text-muted-foreground/40",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chevronClassName }) =>
          orientation === "left" ? <ChevronLeftIcon className={cn("size-3.5", chevronClassName)} /> : <ChevronRightIcon className={cn("size-3.5", chevronClassName)} />,
        ...components,
      }}
      {...props}
    />
  )
}

export { Calendar }
