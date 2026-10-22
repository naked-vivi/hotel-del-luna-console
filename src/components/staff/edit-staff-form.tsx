import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StaffRolePicker from "@/components/staff/staff-role-picker";
import { useUpdateStaff } from "@/hooks/staff/use-update-staff";
import { errorId, validateStaffName } from "@/lib/helpers";

function EditStaffForm({ account, isSelf, onClose }: EditStaffFormProps) {
  const { updateStaff, isUpdating } = useUpdateStaff();
  const { register, handleSubmit, control, setValue, formState: { errors, isDirty } } = useForm<EditStaffValues>({
    defaultValues: { fullName: account.fullName, role: account.role ?? "staff" },
  });
  const role = useWatch({ control, name: "role" });

  function onSubmit(values: EditStaffValues) {
    if (isUpdating) return;
    updateStaff({ id: account.id, fullName: values.fullName.trim(), role: values.role }, { onSuccess: onClose });
  }

  function handleRoleChange(next: StaffRole) {
    setValue("role", next, { shouldDirty: true });
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} aria-busy={isUpdating} className="flex flex-col gap-6">
      <div className="space-y-2">
        <Label htmlFor="edit-fullName">Full name</Label>
        <Input {...register("fullName", { validate: validateStaffName })} id="edit-fullName" autoComplete="off" className="h-11" disabled={isUpdating}
          aria-invalid={Boolean(errors.fullName)} aria-describedby={errorId("edit-fullName", Boolean(errors.fullName))} />
        {errors.fullName && <FieldError id="edit-fullName-error" errors={[errors.fullName]} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-email">Email address</Label>
        <Input id="edit-email" value={account.email} readOnly disabled className="h-11" aria-describedby="edit-email-note" />
        <p id="edit-email-note" className="text-xs text-muted-foreground">Email addresses can't be changed here.</p>
      </div>

      <fieldset className="space-y-2" disabled={isUpdating || isSelf}>
        <legend className="mb-2 pt-0.5 text-[10.5px] font-semibold uppercase tracking-[0.24em] text-foreground/80">Role</legend>
        <StaffRolePicker value={role} onChange={handleRoleChange} />
        {isSelf && <p className="text-xs text-muted-foreground">You can't change your own role.</p>}
      </fieldset>

      <div className="-mx-8 -mb-8 flex flex-wrap justify-end gap-3 border-t border-border px-8 py-6">
        <Button type="button" variant="outline" onClick={onClose} disabled={isUpdating}>Cancel</Button>
        <Button type="submit" disabled={isUpdating || !isDirty}>{isUpdating ? "Saving..." : "Save changes"}</Button>
      </div>
    </form>
  );
}

export default EditStaffForm;
