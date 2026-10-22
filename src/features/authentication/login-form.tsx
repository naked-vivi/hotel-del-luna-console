import { useForm } from "react-hook-form";
import PasswordInput from "@/shared/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field";
import useLogin from "./use-login";

type LoginValues = { email: string; password: string };

function LoginForm() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginValues>({
    // Demo account, filled in so the console can be opened straight away.
    defaultValues: { email: "admin@gmail.com", password: "Admin1234$" },
  });
  const { login, isPending } = useLogin();

  function onSubmit(values: LoginValues) {
    if (isPending) return;
    login({ ...values, email: values.email.trim() }, {
      onError: () => setError("root", { message: "We couldn't sign you in. Check your email and password, then try again." }),
    });
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} aria-busy={isPending} className="flex flex-col gap-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input {...register("email", { required: "Enter your email address", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email, such as name@example.com" } })}
          type="email" id="email" required className="h-12" autoComplete="username" placeholder="name@example.com" disabled={isPending}
          aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
        {errors.email && <FieldError id="email-error" errors={[errors.email]} />}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <PasswordInput {...register("password", { required: "Enter your password" })} id="password" required className="h-12" autoComplete="current-password" disabled={isPending}
          aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? "password-error" : undefined} />
        {errors.password && <FieldError id="password-error" errors={[errors.password]} />}
      </div>
      {errors.root && <p role="alert" className="text-sm text-destructive">{errors.root.message}</p>}
      <Button type="submit" size="lg" className="mt-2 h-12 w-full" disabled={isPending}>{isPending ? "Logging in..." : "Log in"}</Button>
    </form>
  );
}

export default LoginForm;
