import { useState } from "react";
import { format, isValid, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreIcon } from "@/shared/icons";
import { FountainPenIcon, ReservationCardIcon, WastebasketIcon } from "@/shared/drawn-icons";
import ConfirmDelete from "@/shared/confirm-delete";
import EmptyState from "@/shared/empty-state";
import ErrorNote from "@/shared/error-note";
import { PaginationPage } from "@/shared/pagination-page";
import { USERS_PAGE_SIZE, type UserAccount } from "@/services/api-users";
import { EmailStatusTag, RoleTag, StaffAvatar } from "./staff-bits";
import StaffDetailsModal from "./staff-details-modal";
import EditStaffModal from "./edit-staff-modal";
import { useStaffAccounts } from "./use-staff-accounts";
import { useDeleteStaff } from "./use-delete-staff";

function joined(value: string) {
  const date = parseISO(value);
  return isValid(date) ? format(date, "d MMM yyyy") : "Unavailable";
}

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

/** Placeholder rows: one 40px block per cell, the height of the photo and the action button. */
function StaffTableSkeleton({ rows = 6 }: { rows?: number }) {
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

function StaffActions({ account, isSelf, onView, onEdit, onDelete }: {
  account: UserAccount;
  isSelf: boolean;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" aria-label={`Actions for ${account.fullName || account.email}`}>
            <MoreIcon aria-hidden="true" />
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onView}><ReservationCardIcon aria-hidden="true" className="size-5" />View details</DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit}><FountainPenIcon aria-hidden="true" className="size-5" />Edit</DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive [--icon-accent:currentColor] focus:text-destructive"
          disabled={isSelf}
          onClick={onDelete}
        >
          <WastebasketIcon aria-hidden="true" className="size-5" />
          {isSelf ? "Can't delete yourself" : "Delete"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function StaffTable({ onAdd }: { onAdd: () => void }) {
  const { accounts, count, page, error, isPending, currentUserId } = useStaffAccounts();
  const { deleteStaff, isDeleting } = useDeleteStaff();
  const [viewing, setViewing] = useState<UserAccount | null>(null);
  const [editing, setEditing] = useState<UserAccount | null>(null);
  const [deleting, setDeleting] = useState<UserAccount | null>(null);

  if (isPending) return <StaffTableSkeleton />;

  if (error) {
    return (
      <div className="flex min-h-96 flex-col border border-border bg-card px-6">
        <ErrorNote title="The staff list is out of reach" message={error.message} />
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <EmptyState title="No staff yet" action={<Button onClick={onAdd}>Add staff</Button>}>
        Add the first member of staff to give them access to the console.
      </EmptyState>
    );
  }

  return (
    <>
      <div className="min-w-0 border border-border bg-card">
        <Table className="min-w-160" aria-label="Staff accounts">
          <StaffTableHeader />
          <TableBody>
            {accounts.map((account) => {
              const isSelf = account.id === currentUserId;
              return (
                <TableRow key={account.id}>
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
                  <TableCell className="text-muted-foreground">{joined(account.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <StaffActions
                      account={account}
                      isSelf={isSelf}
                      onView={() => setViewing(account)}
                      onEdit={() => setEditing(account)}
                      onDelete={() => setDeleting(account)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {count > USERS_PAGE_SIZE && (
        <div className="mt-8 flex justify-center">
          <PaginationPage count={count} page={page} pageSize={USERS_PAGE_SIZE} />
        </div>
      )}

      <StaffDetailsModal
        account={viewing}
        isSelf={viewing?.id === currentUserId}
        onClose={() => setViewing(null)}
        onEdit={(account) => { setViewing(null); setEditing(account); }}
      />
      <EditStaffModal account={editing} isSelf={editing?.id === currentUserId} onClose={() => setEditing(null)} />
      {deleting && (
        <ConfirmDelete
          resourceName="Account"
          itemName={deleting.fullName || deleting.email}
          isOpen
          isDeleting={isDeleting}
          onClose={() => setDeleting(null)}
          onConfirm={() => deleteStaff(deleting.id, { onSuccess: () => setDeleting(null) })}
        />
      )}
    </>
  );
}
