import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import BookingTableHeader from "@/components/bookings/booking-table-header";
import { BOOKING_SKELETON_ROWS } from "@/lib/constants";

function BookingTableSkeleton({ rows = BOOKING_SKELETON_ROWS }: BookingTableSkeletonProps) {
  return (
    <div className="min-w-0 border border-border bg-card" aria-busy="true" aria-label="Loading bookings">
      <Table>
        <BookingTableHeader />
        <TableBody>{Array.from({ length: rows }, (_, i) => (
          <TableRow key={i} className="hover:bg-transparent">
            <TableCell><Skeleton className="h-10 w-16" /></TableCell>
            <TableCell><Skeleton className="h-10 w-44" /></TableCell>
            <TableCell><Skeleton className="h-10 w-36" /></TableCell>
            <TableCell><Skeleton className="h-10 w-24" /></TableCell>
            <TableCell><Skeleton className="ml-auto h-10 w-20" /></TableCell>
            <TableCell><Skeleton className="ml-auto size-10" /></TableCell>
          </TableRow>
        ))}</TableBody>
      </Table>
    </div>
  );
}

export default BookingTableSkeleton;
