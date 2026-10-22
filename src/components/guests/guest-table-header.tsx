import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

function GuestTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Guest</TableHead>
        <TableHead>Country</TableHead>
        <TableHead className="text-center">Stays</TableHead>
        <TableHead>Last stay</TableHead>
        <TableHead className="text-right">Total spent</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default GuestTableHeader;
