import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody } from "@/components/ui/table";
import ConfirmDelete from "@/components/shared/confirm-delete";
import EmptyState from "@/components/shared/empty-state";
import ErrorNote from "@/components/shared/error-note";
import { PaginationPage } from "@/components/shared/pagination-page";
import StaffTableHeader from "@/components/staff/staff-table-header";
import StaffTableSkeleton from "@/components/staff/staff-table-skeleton";
import StaffRow from "@/components/staff/staff-row";
import StaffDetailsModal from "@/components/staff/staff-details-modal";
import EditStaffModal from "@/components/staff/edit-staff-modal";
import { useStaffAccounts } from "@/hooks/staff/use-staff-accounts";
import { useDeleteStaff } from "@/hooks/staff/use-delete-staff";
import { USERS_PAGE_SIZE } from "@/lib/constants";

export default function StaffTable({ onAdd }: StaffTableProps) {
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

  function handleEditFromDetails(account: UserAccount) {
    setViewing(null);
    setEditing(account);
  }

  function handleConfirmDelete() {
    deleteStaff(deleting.id, { onSuccess: () => setDeleting(null) });
  }

  return (
    <>
      <div className="min-w-0 border border-border bg-card">
        <Table className="min-w-160" aria-label="Staff accounts">
          <StaffTableHeader />
          <TableBody>
            {accounts.map((account) => (
              <StaffRow
                key={account.id}
                account={account}
                isSelf={account.id === currentUserId}
                onView={setViewing}
                onEdit={setEditing}
                onDelete={setDeleting}
              />
            ))}
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
        onEdit={handleEditFromDetails}
      />
      <EditStaffModal account={editing} isSelf={editing?.id === currentUserId} onClose={() => setEditing(null)} />
      {deleting && (
        <ConfirmDelete
          resourceName="Account"
          itemName={deleting.fullName || deleting.email}
          isOpen
          isDeleting={isDeleting}
          onClose={() => setDeleting(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}
