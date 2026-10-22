import { Table, TableBody } from "@/components/ui/table";
import CabinTableHeader from "@/components/cabins/cabin-table-header";
import CabinRow from "@/components/cabins/cabin-row";

function CabinList({ cabins, actions }: CabinCollectionProps) {
  return (
    <div className="min-w-0 max-w-full border border-border bg-card">
      <Table className="min-w-140" aria-label="Cabins">
        <CabinTableHeader />
        <TableBody>
          {cabins.map((cabin) => (
            <CabinRow key={cabin.id} cabin={cabin} actions={actions} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CabinList;
