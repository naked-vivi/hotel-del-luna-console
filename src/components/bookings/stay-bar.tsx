import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons/icons";
import StayDetails from "@/components/bookings/stay-details";
import { cn } from "@/lib/utils";
import { staySpan } from "@/lib/helpers";
import { STATUS_FALLBACK_STYLE, STATUS_STYLES } from "@/lib/constants";

function StayBar({ booking, start }: StayBarProps) {
  const { from, to, first, last, isVisible, startsBefore, endsAfter } = staySpan(booking, start);
  if (!isVisible) return null;

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
              STATUS_STYLES[booking.status] ?? STATUS_FALLBACK_STYLE,
            )}
            style={{ gridColumn: `${first + 2} / span ${last - first}`, gridRow: 1 }}
          />
        }
      >
        {startsBefore && <ChevronLeftIcon className="-ml-1 size-3 shrink-0" />}
        <span className="truncate pt-0.5">{guest}</span>
        {endsAfter && <ChevronRightIcon className="-mr-1 ml-auto size-3 shrink-0" />}
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

export default StayBar;
