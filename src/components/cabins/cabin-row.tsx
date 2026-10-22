import { TableCell, TableRow } from "@/components/ui/table";
import CabinNumber from "@/components/cabins/cabin-number";
import CabinActions from "@/components/cabins/cabin-actions";

function CabinRow({ cabin, actions }: CabinCardProps) {
  return (
    <TableRow>
      <TableCell className="py-5">
        <img src={cabin.image} alt={cabin.name} className="aspect-3/2 h-14 min-w-21 object-cover" />
      </TableCell>
      <TableCell><CabinNumber name={cabin.name} className="text-2xl" /></TableCell>
      <TableCell className="text-center text-muted-foreground">Up to {cabin.maxCapacity} guests</TableCell>
      <TableCell className="text-end text-lg font-light tabular-nums">
        ${cabin.regularPrice}
        <span className="ml-1 text-xs text-muted-foreground">/ night</span>
      </TableCell>
      <TableCell className="text-end tabular-nums">
        {cabin.discount ? <span className="text-status-success">&minus;${cabin.discount}</span> : <span className="text-muted-foreground">&mdash;</span>}
      </TableCell>
      <TableCell className="text-end"><CabinActions cabin={cabin} {...actions} /></TableCell>
    </TableRow>
  );
}

export default CabinRow;
