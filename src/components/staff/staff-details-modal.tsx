import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StaffAvatar from "@/components/staff/staff-avatar";
import RoleTag from "@/components/staff/role-tag";
import EmailStatusTag from "@/components/staff/email-status-tag";
import StaffDetail from "@/components/staff/staff-detail";
import { formatTimestamp } from "@/lib/helpers";

function StaffDetailsModal({ account, isSelf, onClose, onEdit }: StaffDetailsModalProps) {
  return (
    <Dialog open={Boolean(account)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl">
        {account && (
          <>
            <DialogHeader className="flex-row items-center gap-5 pr-8">
              <StaffAvatar account={account} isSelf={isSelf} className="size-16 text-base" />
              <div className="min-w-0 space-y-1.5">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-gold">Staff profile</p>
                <DialogTitle className="wrap-break-word">{account.fullName || "Name not set"}</DialogTitle>
                <DialogDescription className="wrap-break-word">{account.email || "No email"}</DialogDescription>
              </div>
            </DialogHeader>

            <dl className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2">
              <StaffDetail label="Role"><RoleTag role={account.role} /></StaffDetail>
              <StaffDetail label="Email"><EmailStatusTag confirmed={account.emailConfirmed} /></StaffDetail>
              <StaffDetail label="Joined">{formatTimestamp(account.createdAt, "d MMMM yyyy, HH:mm")}</StaffDetail>
              <StaffDetail label="Last signed in">{formatTimestamp(account.lastSignInAt, "d MMMM yyyy, HH:mm")}</StaffDetail>
              <div className="sm:col-span-2"><StaffDetail label="Account ID"><span className="text-sm text-muted-foreground">{account.id}</span></StaffDetail></div>
            </dl>

            <div className="-mx-8 -mb-8 flex justify-end gap-3 border-t border-border px-8 py-6">
              <Button variant="outline" onClick={onClose}>Close</Button>
              <Button onClick={() => onEdit(account)}>Edit</Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default StaffDetailsModal;
