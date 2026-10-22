import type { ReactNode } from "react";
import { format, isValid, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { UserAccount } from "@/services/api-users";
import { EmailStatusTag, RoleTag, StaffAvatar } from "./staff-bits";

function when(value?: string | null) {
  if (!value) return "Never";
  const date = parseISO(value);
  return isValid(date) ? format(date, "d MMMM yyyy, HH:mm") : "Unavailable";
}

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0 space-y-2 bg-card p-4">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">{label}</dt>
      <dd className="wrap-break-word text-[15px] text-foreground">{children}</dd>
    </div>
  );
}

type Props = {
  account: UserAccount | null;
  isSelf: boolean;
  onClose: () => void;
  onEdit: (account: UserAccount) => void;
};

/** Read-only profile of one member of staff. */
function StaffDetailsModal({ account, isSelf, onClose, onEdit }: Props) {
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
              <Detail label="Role"><RoleTag role={account.role} /></Detail>
              <Detail label="Email"><EmailStatusTag confirmed={account.emailConfirmed} /></Detail>
              <Detail label="Joined">{when(account.createdAt)}</Detail>
              <Detail label="Last signed in">{when(account.lastSignInAt)}</Detail>
              <div className="sm:col-span-2"><Detail label="Account ID"><span className="text-sm text-muted-foreground">{account.id}</span></Detail></div>
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
