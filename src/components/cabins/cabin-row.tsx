import { Link } from "react-router-dom";
import { TableCell, TableRow } from "@/components/ui/table";
import CabinNumber from "@/components/cabins/cabin-number";
import CabinActions from "@/components/cabins/cabin-actions";
import CabinPhotoPlaceholder from "@/components/cabins/cabin-photo-placeholder";
import { cabinPhotos } from "@/lib/helpers";

function CabinRow({ cabin, actions }: CabinRowProps) {
  const [cover] = cabinPhotos(cabin);

  return (
    <TableRow>
      <TableCell className="py-5">
        <div className="aspect-3/2 h-14 min-w-21 overflow-hidden">
          {cover ? <img src={cover} alt={cabin.name} className="size-full object-cover" /> : <CabinPhotoPlaceholder className="[&_span]:hidden [&_svg]:size-5" />}
        </div>
      </TableCell>
      <TableCell>
        <Link to={`/cabins/${cabin.id}`} className="transition-opacity hover:opacity-80 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ring">
          <CabinNumber name={cabin.name} className="text-2xl" />
        </Link>
      </TableCell>
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
