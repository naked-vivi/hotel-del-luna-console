import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

function StaffTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Staff member</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Joined</TableHead>
        <TableHead><span className="sr-only">Actions</span></TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default StaffTableHeader;
