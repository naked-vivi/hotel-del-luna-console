import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SignupForm from "@/components/authentication/signup-form";

function AddStaffModal({ isOpen, onClose }: AddStaffModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-xl">
        <DialogHeader className="pr-8">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-gold">New staff</p>
          <DialogTitle>Add a member of staff</DialogTitle>
          <DialogDescription>They can log in once they confirm their email address.</DialogDescription>
        </DialogHeader>
        <SignupForm onDone={onClose} />
      </DialogContent>
    </Dialog>
  );
}

export default AddStaffModal;
