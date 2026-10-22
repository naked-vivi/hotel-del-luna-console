import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/shared/password-input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field";
import { useUpdateUser } from "./use-update-user";

type PasswordFormValues = {
  password: string;
  passwordConfirm: string;
};

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm<PasswordFormValues>({
    defaultValues: { password: "", passwordConfirm: "" },
  });
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

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
      <div className="space-y-2">
        <Label htmlFor="password">New password</Label>
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
            minLength: { value: 8, message: "Password needs a minimum of 8 characters" },
          })}
        />
        {errors.password
          ? <FieldError id="password-error" errors={[errors.password]} />
          : <p id="password-hint" className="text-xs text-muted-foreground">At least 8 characters.</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="passwordConfirm">Repeat new password</Label>
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
    </form>
  );
}

export default UpdatePasswordForm;
