import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field";
import PasswordInput from "@/components/shared/password-input";
import { useSignup } from "@/hooks/authentication/use-signup";
import { signupSchema } from "@/lib/schemas";
import { errorId } from "@/lib/helpers";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

function SignupForm({ onDone }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", password: "", passwordConfirm: "" },
  });
  const { signup, isPending } = useSignup();

  function onSubmit({ fullName, email, password }: SignupFormValues) {
    if (isPending) return;
    signup(
      { fullName, email, password },
      { onSuccess: handleDone },
    );
  }

  function handleDone() {
    reset();
    onDone?.();
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} aria-busy={isPending} className="flex flex-col gap-6">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full name</Label>
        <Input {...register("fullName")} id="fullName" autoComplete="name" placeholder="e.g. Alex Morgan" required disabled={isPending}
          aria-invalid={Boolean(errors.fullName)} aria-describedby={errorId("fullName", Boolean(errors.fullName))} className="h-11" />
        {errors.fullName && <FieldError id="fullName-error" errors={[errors.fullName]} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input {...register("email")} id="email" type="email" autoComplete="email" placeholder="name@example.com" required disabled={isPending}
          aria-invalid={Boolean(errors.email)} aria-describedby={errorId("email", Boolean(errors.email))} className="h-11" />
        {errors.email && <FieldError id="email-error" errors={[errors.email]} />}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput {...register("password")} id="password" autoComplete="new-password" required disabled={isPending}
            aria-invalid={Boolean(errors.password)} aria-describedby={errorId("password", Boolean(errors.password)) ?? "password-hint"} className="h-11" />
          {errors.password
            ? <FieldError id="password-error" errors={[errors.password]} />
            : <p id="password-hint" className="text-xs text-muted-foreground">At least {PASSWORD_MIN_LENGTH} characters.</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="passwordConfirm">Repeat password</Label>
          <PasswordInput {...register("passwordConfirm")} id="passwordConfirm" autoComplete="new-password" required disabled={isPending}
            aria-invalid={Boolean(errors.passwordConfirm)} aria-describedby={errorId("passwordConfirm", Boolean(errors.passwordConfirm))} className="h-11" />
          {errors.passwordConfirm && <FieldError id="passwordConfirm-error" errors={[errors.passwordConfirm]} />}
        </div>
      </div>

      <div className="-mx-8 -mb-8 flex flex-wrap justify-end gap-3 border-t border-border px-8 py-6">
        <Button variant="outline" type="button" disabled={isPending} onClick={handleDone}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating account..." : "Create account"}
        </Button>
      </div>
    </form>
  );
}

export default SignupForm;
