import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/shared/password-input";
import { Label } from "@/components/ui/label";
import RequiredMark from "@/components/shared/required-mark";
import { FieldError } from "@/components/ui/field";
import { useUpdateUser } from "@/hooks/authentication/use-update-user";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import AccessTag from "@/components/shared/access-tag";
import { usePermissions } from "@/hooks/authentication/use-permissions";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm<PasswordFormValues>({
    defaultValues: { password: "", passwordConfirm: "" },
  });
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();
  const lock = usePermissions().lockFor("account.credentials");

  function onSubmit({ password }: PasswordFormValues) {
    if (isUpdating) return;
    updateUser({ password }, { onSuccess: () => reset() });
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
      aria-busy={isUpdating}
      className="flex flex-1 flex-col gap-6"
    >
      {lock && (
        <div className="flex flex-wrap items-center justify-between gap-3 border border-border px-4 py-3">
          <p className="text-sm text-muted-foreground">Demo accounts keep the same password for every visitor.</p>
          <AccessTag reason={lock} />
        </div>
      )}
      <fieldset disabled={Boolean(lock)} className="flex min-w-0 flex-1 flex-col gap-6">
      <div className="space-y-2">
        <Label htmlFor="password">New password<RequiredMark /></Label>
        <PasswordInput
          id="password"
          autoComplete="new-password"
          className="h-11"
          required
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "password-error" : "password-hint"}
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: { value: PASSWORD_MIN_LENGTH, message: `Password needs a minimum of ${PASSWORD_MIN_LENGTH} characters` },
          })}
        />
        {errors.password
          ? <FieldError id="password-error" errors={[errors.password]} />
          : <p id="password-hint" className="text-xs text-muted-foreground">At least {PASSWORD_MIN_LENGTH} characters.</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="passwordConfirm">Repeat new password<RequiredMark /></Label>
        <PasswordInput
          id="passwordConfirm"
          autoComplete="new-password"
          className="h-11"
          required
          aria-invalid={Boolean(errors.passwordConfirm)}
          aria-describedby={errors.passwordConfirm ? "passwordConfirm-error" : undefined}
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) => getValues().password === value || "Passwords need to match",
          })}
        />
        {errors.passwordConfirm && <FieldError id="passwordConfirm-error" errors={[errors.passwordConfirm]} />}
      </div>

      <div className="mt-auto flex flex-wrap justify-end gap-3 border-t border-border pt-6">
        <Button type="reset" variant="outline" disabled={isUpdating}>Cancel</Button>
        <Button type="submit" disabled={isUpdating}>{isUpdating ? "Updating..." : "Update password"}</Button>
      </div>
      </fieldset>
    </form>
  );
}

export default UpdatePasswordForm;
