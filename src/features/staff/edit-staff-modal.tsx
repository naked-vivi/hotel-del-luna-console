import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { StaffRole, UserAccount } from "@/services/api-users";
import { useUpdateStaff } from "./use-update-staff";

type Values = { fullName: string; role: StaffRole };

const roles: { value: StaffRole; label: string; note: string }[] = [
  { value: "staff", label: "Staff", note: "Bookings, cabins and check-ins" },
  { value: "admin", label: "Admin", note: "Everything, plus managing staff" },
];

function EditStaffForm({ account, isSelf, onClose }: { account: UserAccount; isSelf: boolean; onClose: () => void }) {
  const { updateStaff, isUpdating } = useUpdateStaff();
  const { register, handleSubmit, control, setValue, formState: { errors, isDirty } } = useForm<Values>({
    defaultValues: { fullName: account.fullName, role: account.role ?? "staff" },
  });
  const role = useWatch({ control, name: "role" });

  function onSubmit(values: Values) {
    if (isUpdating) return;
    updateStaff({ id: account.id, fullName: values.fullName.trim(), role: values.role }, { onSuccess: onClose });
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} aria-busy={isUpdating} className="flex flex-col gap-6">
      <div className="space-y-2">
        <Label htmlFor="edit-fullName">Full name</Label>
        <Input {...register("fullName", {
          validate: (value) => {
            const name = value.trim();
            if (!name) return "Full name is required";
            if (name.length > 120) return "Use 120 characters or fewer";
            return true;
          },
        })} id="edit-fullName" autoComplete="off" className="h-11" disabled={isUpdating}
          aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "edit-fullName-error" : undefined} />
        {errors.fullName && <FieldError id="edit-fullName-error" errors={[errors.fullName]} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-email">Email address</Label>
        <Input id="edit-email" value={account.email} readOnly disabled className="h-11" aria-describedby="edit-email-note" />
        <p id="edit-email-note" className="text-xs text-muted-foreground">Email addresses can't be changed here.</p>
      </div>

      <fieldset className="space-y-2" disabled={isUpdating || isSelf}>
        <legend className="mb-2 pt-0.5 text-[10.5px] font-semibold uppercase tracking-[0.24em] text-foreground/80">Role</legend>
        <div role="radiogroup" aria-label="Role" className="grid grid-cols-2 gap-px border border-input bg-input">
          {roles.map((option) => {
            const selected = role === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setValue("role", option.value, { shouldDirty: true })}
                className={cn(
                  "flex flex-col items-start gap-1 px-4 pt-3.5 pb-3 text-left transition-colors focus-visible:outline-1 focus-visible:-outline-offset-2 focus-visible:outline-ring disabled:opacity-60",
                  selected ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-muted/50",
                )}
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em]">{option.label}</span>
                <span className={cn("text-xs", selected ? "text-primary-foreground/80" : "text-muted-foreground")}>{option.note}</span>
              </button>
            );
          })}
        </div>
        {isSelf && <p className="text-xs text-muted-foreground">You can't change your own role.</p>}
      </fieldset>

      <div className="-mx-8 -mb-8 flex flex-wrap justify-end gap-3 border-t border-border px-8 py-6">
        <Button type="button" variant="outline" onClick={onClose} disabled={isUpdating}>Cancel</Button>
        <Button type="submit" disabled={isUpdating || !isDirty}>{isUpdating ? "Saving..." : "Save changes"}</Button>
      </div>
    </form>
  );
}

/** Edit a member of staff's name and role. */
function EditStaffModal({ account, isSelf, onClose }: { account: UserAccount | null; isSelf: boolean; onClose: () => void }) {
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
