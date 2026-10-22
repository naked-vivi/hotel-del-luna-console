import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

function BookingTableHeader() {
  return (
    <TableHeader><TableRow>
      <TableHead>Cabin</TableHead><TableHead>Guest</TableHead><TableHead>Dates</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Amount</TableHead><TableHead><span className="sr-only">Actions</span></TableHead>
    </TableRow></TableHeader>
  );
}

export default BookingTableHeader;
