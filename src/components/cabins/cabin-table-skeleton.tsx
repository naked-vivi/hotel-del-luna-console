import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import CabinTableHeader from "@/components/cabins/cabin-table-header";
import { CABIN_SKELETON_ROWS } from "@/lib/constants";

function CabinTableSkeleton({ rows = CABIN_SKELETON_ROWS }: CabinTableSkeletonProps) {
  return (
    <div className="min-w-0 max-w-full border border-border bg-card" aria-busy="true" aria-label="Loading cabins">
      <Table className="min-w-140">
        <CabinTableHeader />
        <TableBody>
          {Array.from({ length: rows }, (_, i) => (
            <TableRow key={i} className="hover:bg-transparent">
              <TableCell className="py-5"><Skeleton className="h-14 w-21" /></TableCell>
              <TableCell><Skeleton className="h-14 w-16" /></TableCell>
              <TableCell><Skeleton className="mx-auto h-14 w-28" /></TableCell>
              <TableCell><Skeleton className="ml-auto h-14 w-24" /></TableCell>
              <TableCell><Skeleton className="ml-auto h-14 w-12" /></TableCell>
              <TableCell><Skeleton className="ml-auto h-14 w-10" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CabinTableSkeleton;
