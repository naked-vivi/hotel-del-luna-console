import { format } from "date-fns";
import StatusTag from "@/components/shared/status-tag";
import StayDetailRow from "@/components/bookings/stay-detail-row";
import { formatCurrency } from "@/lib/utils";
import { pluralize } from "@/lib/helpers";

function StayDetails({ booking, from, to }: StayDetailsProps) {
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
        <StayDetailRow label="Arrive" value={format(from, "EEE d MMM")} />
        <StayDetailRow label="Depart" value={format(to, "EEE d MMM")} />
        <StayDetailRow label="Stay" value={`${pluralize(booking.numNights, "night")} · ${pluralize(booking.numGuests, "guest")}`} />
        <StayDetailRow label="Total" value={`${formatCurrency(booking.totalPrice)} · ${booking.isPaid ? "Paid" : "Pay at property"}`} />
      </dl>
      <p className="border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">Booking #{booking.id} · select to open</p>
    </div>
  );
}

export default StayDetails;
