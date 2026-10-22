import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import StaffTableHeader from "@/components/staff/staff-table-header";
import { STAFF_SKELETON_ROWS } from "@/lib/constants";

function StaffTableSkeleton({ rows = STAFF_SKELETON_ROWS }: StaffTableSkeletonProps) {
  return (
    <div className="min-w-0 border border-border bg-card" aria-busy="true" aria-label="Loading staff">
      <Table className="min-w-160">
        <StaffTableHeader />
        <TableBody>
          {Array.from({ length: rows }, (_, i) => (
            <TableRow key={i} className="hover:bg-transparent">
              <TableCell><div className="flex items-center gap-4"><Skeleton className="size-10 rounded-full" /><Skeleton className="h-10 w-44" /></div></TableCell>
              <TableCell><Skeleton className="h-10 w-20" /></TableCell>
              <TableCell><Skeleton className="h-10 w-24" /></TableCell>
              <TableCell><Skeleton className="h-10 w-24" /></TableCell>
              <TableCell><Skeleton className="ml-auto size-10" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default StaffTableSkeleton;
