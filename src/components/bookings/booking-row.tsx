import { TableCell, TableRow } from "@/components/ui/table";
import StatusTag from "@/components/shared/status-tag";
import CabinNumber from "@/components/cabins/cabin-number";
import BookingActions from "@/components/bookings/booking-actions";
import { formatBookingDate, formatCurrency } from "@/lib/utils";
import { pluralize } from "@/lib/helpers";

function BookingRow({ booking, ...actions }: BookingRowProps) {
  return (
    <TableRow>
      <TableCell><CabinNumber name={booking.cabins?.name || booking.cabinName} className="text-2xl" /></TableCell>
      <TableCell><div className="flex flex-col"><span className="text-[15px]">{booking.guests?.fullName || booking.guestName}</span><span className="text-xs text-muted-foreground">{booking.guests?.email || booking.guestEmail}</span></div></TableCell>
      <TableCell><div className="text-[15px]">{formatBookingDate(booking.startDate)} &ndash; {formatBookingDate(booking.endDate)}</div><span className="text-xs text-muted-foreground">{pluralize(booking.numNights, "night")}</span></TableCell>
      <TableCell><StatusTag status={booking.status} /></TableCell>
      <TableCell className="text-right text-lg font-light tabular-nums">{formatCurrency(booking.totalPrice)}</TableCell>
      <TableCell className="text-right"><BookingActions id={booking.id} status={booking.status} {...actions} /></TableCell>
    </TableRow>
  );
}

export default BookingRow;
