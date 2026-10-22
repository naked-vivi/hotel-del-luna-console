import LoginForm from "@/components/authentication/login-form";
import NightDial from "@/components/authentication/night-dial";
import DemoAccess from "@/components/authentication/demo-access";
import Logo from "@/components/shared/logo";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { useNow } from "@/hooks/shared/use-now";
import useTitle from "@/hooks/shared/use-title";
import { APP_NAME } from "@/lib/constants";

function Login() {
  useTitle("Log in");
  const now = useNow();

  return (
    <main className="grid min-h-svh bg-background lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <section className="hidden flex-col gap-8 border-r border-primary-800 bg-primary-950 p-12 text-accent-50 lg:flex xl:p-16">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.36em] text-primary-400">
          <span className="text-accent-300">{APP_NAME}</span>
          <span>Est. MMXXVI</span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-14 [@media(max-height:820px)]:gap-9">
          <NightDial now={now} className="w-full max-w-104 [@media(max-height:820px)]:max-w-76" />

          <div className="max-w-md space-y-4 text-center">
            <p className="text-[1.65rem] leading-snug font-extralight text-balance text-accent-50">
              The front desk, after dark.
            </p>
            <p className="text-[15px] leading-relaxed text-balance text-primary-300">
              Bookings, rooms, guests and tonight&apos;s arrivals, kept in one quiet place for the people who run the house.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col px-6 py-8 sm:px-12 lg:px-16">
        <div className="flex items-center justify-between lg:justify-end">
          <Logo size="sm" className="lg:hidden" />
          <ModeToggle />
        </div>

        <div className="m-auto w-full max-w-sm space-y-10 py-12 [@media(max-height:780px)]:space-y-8 [@media(max-height:780px)]:py-6">
          <div className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">Staff entrance</p>
            <h1 className="text-5xl leading-[1.05] font-extralight text-foreground">Welcome back</h1>
            <p className="text-[15px] leading-relaxed text-muted-foreground">Log in with your hotel account to open the console.</p>
          </div>

          <LoginForm />

          <DemoAccess />

          <p className="border-t border-border pt-6 text-center text-sm whitespace-nowrap text-muted-foreground">
            Trouble logging in? Ask the duty manager.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
