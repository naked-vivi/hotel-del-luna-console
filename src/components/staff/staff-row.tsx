import { TableCell, TableRow } from "@/components/ui/table";
import StaffAvatar from "@/components/staff/staff-avatar";
import RoleTag from "@/components/staff/role-tag";
import EmailStatusTag from "@/components/staff/email-status-tag";
import StaffActions from "@/components/staff/staff-actions";
import { formatTimestamp } from "@/lib/helpers";

function StaffRow({ account, isSelf, onView, onEdit, onDelete }: StaffRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-4">
          <StaffAvatar account={account} isSelf={isSelf} />
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-[15px]">{account.fullName || "Name not set"}</span>
            <span className="text-xs text-muted-foreground">{account.email || "No email"}</span>
          </div>
        </div>
      </TableCell>
      <TableCell><RoleTag role={account.role} /></TableCell>
      <TableCell><EmailStatusTag confirmed={account.emailConfirmed} /></TableCell>
      <TableCell className="text-muted-foreground">{formatTimestamp(account.createdAt, "d MMM yyyy", "Unavailable")}</TableCell>
      <TableCell className="text-right">
        <StaffActions
          account={account}
          isSelf={isSelf}
          onView={() => onView(account)}
          onEdit={() => onEdit(account)}
          onDelete={() => onDelete(account)}
        />
      </TableCell>
    </TableRow>
  );
}

export default StaffRow;
