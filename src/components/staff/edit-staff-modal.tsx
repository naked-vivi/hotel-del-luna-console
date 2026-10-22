import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EditStaffForm from "@/components/staff/edit-staff-form";

function EditStaffModal({ account, isSelf, onClose }: EditStaffModalProps) {
  return (
    <Dialog open={Boolean(account)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="pr-8">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-gold">Edit staff</p>
          <DialogTitle>{account?.fullName || "Edit account"}</DialogTitle>
          <DialogDescription>Change the name staff see on bookings, and what this person can manage.</DialogDescription>
        </DialogHeader>
        {account && <EditStaffForm key={account.id} account={account} isSelf={isSelf} onClose={onClose} />}
      </DialogContent>
    </Dialog>
  );
}

export default EditStaffModal;
