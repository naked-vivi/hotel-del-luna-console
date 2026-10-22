import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

function CabinTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Photo</TableHead>
        <TableHead>Cabin</TableHead>
        <TableHead className="text-center">Capacity</TableHead>
        <TableHead className="text-end">Price</TableHead>
        <TableHead className="text-end">Discount</TableHead>
        <TableHead className="text-end"><span className="sr-only">Actions</span></TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default CabinTableHeader;
