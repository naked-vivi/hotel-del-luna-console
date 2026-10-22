import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import GuestTableHeader from "@/components/guests/guest-table-header";
import { GUEST_SKELETON_ROWS } from "@/lib/constants";

function GuestTableSkeleton({ rows = GUEST_SKELETON_ROWS }: GuestTableSkeletonProps) {
  return (
    <div className="min-w-0 border border-border bg-card" aria-busy="true" aria-label="Loading guests">
      <Table className="min-w-160">
        <GuestTableHeader />
        <TableBody>
          {Array.from({ length: rows }, (_, i) => (
            <TableRow key={i} className="hover:bg-transparent">
              <TableCell><Skeleton className="h-10 w-52" /></TableCell>
              <TableCell><Skeleton className="h-10 w-32" /></TableCell>
              <TableCell><Skeleton className="mx-auto h-10 w-10" /></TableCell>
              <TableCell><Skeleton className="h-10 w-28" /></TableCell>
              <TableCell><Skeleton className="ml-auto h-10 w-24" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default GuestTableSkeleton;
