import LoginForm from "@/features/authentication/login-form";
import Logo from "@/shared/logo";
import { ModeToggle } from "@/shared/mode-toggle";
import { useNow } from "@/hooks/use-now";

/**
 * A quiet dial with the moon at its centre. The moon fills with the day:
 * empty at 00:00, a quarter lit at 06:00, half at noon, full by midnight.
 */
function NightDial({ now, className }: { now: Date; className?: string }) {
  const c = 200;
  const ticks = Array.from({ length: 48 }, (_, i) => {
    const a = (i / 48) * Math.PI * 2 - Math.PI / 2;
    const long = i % 2 === 0;
    const p = (r: number) => `${(c + Math.cos(a) * r).toFixed(2)} ${(c + Math.sin(a) * r).toFixed(2)}`;
    return `M${p(long ? 177 : 183)}L${p(190)}`;
  }).join("");

  // How much of today has passed, 0 to 1. That is how much of the moon is lit.
  const f = (now.getHours() * 60 + now.getMinutes()) / 1440;
  const r = 58;
  const rx = (Math.abs(1 - 2 * f) * r).toFixed(2);
  const sweep = f > 0.5 ? 1 : 0;
  const lit =
    f >= 0.99 ? <circle cx={c} cy={c} r={r} className="fill-accent-400" />
    : f > 0.01 ? <path d={`M${c} ${c - r}A${r} ${r} 0 0 1 ${c} ${c + r}A${rx} ${r} 0 0 ${sweep} ${c} ${c - r}Z`} className="fill-accent-400" />
    : null;

  return (
    <svg viewBox="0 0 400 400" role="img" aria-label={`The moon is ${Math.round(f * 100)}% lit, as ${Math.round(f * 100)}% of today has passed`} className={className} fill="none">
      <circle cx={c} cy={c} r="190" className="stroke-accent-400/20" strokeWidth="1" />
      <path d={ticks} className="stroke-accent-400/35" strokeWidth="1" />
      <circle cx={c} cy={c} r="122" className="stroke-accent-400/15" strokeWidth="1" />
      <circle cx={c} cy={c} r={r} className="stroke-accent-400/70" strokeWidth="1.25" />
      {lit}
    </svg>
  );
}

function Login() {
  // Re-read the clock every minute so the moon keeps filling while the page is open.
  const now = useNow();

  return (
    <main className="grid min-h-svh bg-background lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      {/* The night side: always navy, whatever the theme */}
      <section className="hidden flex-col gap-8 border-r border-primary-800 bg-primary-950 p-12 text-accent-50 lg:flex xl:p-16">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.36em] text-primary-400">
          <span className="text-accent-300">Hotel del Luna</span>
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

      {/* The form side */}
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

          <p className="border-t border-border pt-6 text-center text-sm whitespace-nowrap text-muted-foreground">
            Trouble logging in? Ask the duty manager.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
