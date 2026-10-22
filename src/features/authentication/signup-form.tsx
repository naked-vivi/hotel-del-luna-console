import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field";
import PasswordInput from "@/shared/password-input";
import { useSignup } from "./use-signup";

const signupSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required"),
  email: z.string().trim().min(1, "Email address is required").email("Enter a valid email address"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
  passwordConfirm: z.string().min(1, "Please repeat the password"),
}).refine((values) => values.password === values.passwordConfirm, {
  message: "Passwords must match",
  path: ["passwordConfirm"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

/** Create a staff account. Used inside the Add staff modal. */
function SignupForm({ onDone }: { onDone?: () => void }) {
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
      { onSuccess: () => { reset(); onDone?.(); } },
    );
  }

  const describedBy = (name: keyof SignupFormValues) => (errors[name] ? `${name}-error` : undefined);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} aria-busy={isPending} className="flex flex-col gap-6">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full name</Label>
        <Input {...register("fullName")} id="fullName" autoComplete="name" placeholder="e.g. Alex Morgan" required disabled={isPending}
          aria-invalid={Boolean(errors.fullName)} aria-describedby={describedBy("fullName")} className="h-11" />
        {errors.fullName && <FieldError id="fullName-error" errors={[errors.fullName]} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input {...register("email")} id="email" type="email" autoComplete="email" placeholder="name@example.com" required disabled={isPending}
          aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} className="h-11" />
        {errors.email && <FieldError id="email-error" errors={[errors.email]} />}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput {...register("password")} id="password" autoComplete="new-password" required disabled={isPending}
            aria-invalid={Boolean(errors.password)} aria-describedby={describedBy("password") ?? "password-hint"} className="h-11" />
          {errors.password
            ? <FieldError id="password-error" errors={[errors.password]} />
            : <p id="password-hint" className="text-xs text-muted-foreground">At least 8 characters.</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="passwordConfirm">Repeat password</Label>
          <PasswordInput {...register("passwordConfirm")} id="passwordConfirm" autoComplete="new-password" required disabled={isPending}
            aria-invalid={Boolean(errors.passwordConfirm)} aria-describedby={describedBy("passwordConfirm")} className="h-11" />
          {errors.passwordConfirm && <FieldError id="passwordConfirm-error" errors={[errors.passwordConfirm]} />}
        </div>
      </div>

      <div className="-mx-8 -mb-8 flex flex-wrap justify-end gap-3 border-t border-border px-8 py-6">
        <Button variant="outline" type="button" disabled={isPending} onClick={() => { reset(); onDone?.(); }}>
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
