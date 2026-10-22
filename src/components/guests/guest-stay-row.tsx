import { Link } from "react-router-dom";
import StatusTag from "@/components/shared/status-tag";
import { formatBookingDate, formatCurrency } from "@/lib/utils";
import { pluralize } from "@/lib/helpers";

function GuestStayRow({ stay }: GuestStayRowProps) {
  return (
    <li>
      <Link
        to={`/bookings/${stay.id}`}
        className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-2 px-6 py-4 transition-colors hover:bg-muted/40 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring sm:grid-cols-[6rem_minmax(0,1fr)_auto_auto]"
      >
        <span className="text-xl font-extralight">
          <span className="mr-1.5 align-middle text-[10px] font-semibold tracking-[0.14em] text-muted-foreground">N°</span>
          {stay.cabins?.name ?? "—"}
        </span>
        <span className="hidden text-sm text-muted-foreground sm:block">
          {formatBookingDate(stay.startDate)} – {formatBookingDate(stay.endDate)} · {pluralize(stay.numNights, "night")}
        </span>
        <span className="hidden text-right tabular-nums sm:block">{formatCurrency(stay.totalPrice)}</span>
        <StatusTag status={stay.status} />
      </Link>
    </li>
  );
}

export default GuestStayRow;
