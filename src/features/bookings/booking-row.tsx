import { format, isToday } from "date-fns";

import { TableRow, TableCell } from "@/components/ui/table";
import StatusTag from "@/shared/status-tag";

import { formatCurrency, formatDistanceFromNow } from "../../lib/utils";

function BookingRow({
  booking: {
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  return (
    <TableRow>
      <TableCell className="font-semibold text-foreground">{cabinName}</TableCell>

      <TableCell>
        <div className="flex flex-col gap-0.5 [&>span:first-child]:font-medium [&>span:last-child]:text-xs [&>span:last-child]:text-muted-foreground">
          <span>{guestName}</span>
          <span>{email}</span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex flex-col gap-0.5 [&>span:first-child]:font-medium [&>span:last-child]:text-xs [&>span:last-child]:text-muted-foreground">
          <span>
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}{" "}
            &rarr; {numNights} night stay
          </span>
          <span>
            {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
            {format(new Date(endDate), "MMM dd yyyy")}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <StatusTag status={status} />
      </TableCell>

      <TableCell className="text-right font-medium">{formatCurrency(totalPrice)}</TableCell>
    </TableRow>
  );
}

export default BookingRow;
