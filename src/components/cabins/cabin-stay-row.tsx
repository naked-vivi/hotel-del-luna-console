import { Link } from "react-router-dom";
import StatusTag from "@/components/shared/status-tag";
import { cn, formatBookingDate } from "@/lib/utils";
import { pluralize } from "@/lib/helpers";

function CabinStayRow({ stay, isActive, onActivate }: CabinStayRowProps) {
  return (
    <li>
      <Link
        to={`/bookings/${stay.id}`}
        onMouseEnter={() => onActivate(stay.id)}
        onMouseLeave={() => onActivate(null)}
        onFocus={() => onActivate(stay.id)}
        onBlur={() => onActivate(null)}
        className={cn(
          "flex flex-col gap-2 px-5 py-3.5 transition-colors focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring",
          isActive ? "bg-muted/60" : "hover:bg-muted/40",
        )}
      >
        <span className="flex items-center justify-between gap-3">
          <span className="flex min-w-0 items-center gap-3">
            <span className="flex h-4 w-6 shrink-0 items-center">
              {stay.guests?.countryFlag && <img src={stay.guests.countryFlag} alt="" className="h-4 w-6 object-cover" />}
            </span>
            <span className="truncate text-[15px]">{stay.guests?.fullName ?? "Guest"}</span>
          </span>
          <StatusTag status={stay.status} />
        </span>
        <span className="pl-9 text-xs text-muted-foreground">
          {formatBookingDate(stay.startDate)} – {formatBookingDate(stay.endDate)} · {pluralize(stay.numNights, "night")} · {pluralize(stay.numGuests, "guest")}
        </span>
      </Link>
    </li>
  );
}

export default CabinStayRow;
