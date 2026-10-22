import { useForm } from "react-hook-form";
import PasswordInput from "@/components/shared/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RequiredMark from "@/components/shared/required-mark";
import { FieldError } from "@/components/ui/field";
import useLogin from "@/hooks/authentication/use-login";
import { EMAIL_PATTERN } from "@/lib/constants";
import { errorId } from "@/lib/helpers";

function LoginForm() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginValues>({
    defaultValues: { email: "", password: "" },
  });
  const { login, isPending } = useLogin();

  function onSubmit(values: LoginValues) {
    if (isPending) return;
    login({ ...values, email: values.email.trim() }, {
      onError: (error: Error) => setError("root", { message: error.message }),
    });
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} aria-busy={isPending} className="flex flex-col gap-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email address<RequiredMark /></Label>
        <Input {...register("email", { required: "Enter your email address", pattern: { value: EMAIL_PATTERN, message: "Enter a valid email, such as name@example.com" } })}
          type="email" id="email" required className="h-12" autoComplete="username" placeholder="name@example.com" disabled={isPending}
          aria-invalid={Boolean(errors.email)} aria-describedby={errorId("email", Boolean(errors.email))} />
        {errors.email && <FieldError id="email-error" errors={[errors.email]} />}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password<RequiredMark /></Label>
        <PasswordInput {...register("password", { required: "Enter your password" })} id="password" required className="h-12" autoComplete="current-password" disabled={isPending}
          aria-invalid={Boolean(errors.password)} aria-describedby={errorId("password", Boolean(errors.password))} />
        {errors.password && <FieldError id="password-error" errors={[errors.password]} />}
      </div>
      {errors.root && <p role="alert" className="text-sm text-destructive">{errors.root.message}</p>}
      <Button type="submit" size="lg" className="mt-2 h-12 w-full" disabled={isPending}>{isPending ? "Logging in..." : "Log in"}</Button>
    </form>
  );
}

export default LoginForm;
