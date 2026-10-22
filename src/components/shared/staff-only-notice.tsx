import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/logo";
import useLogout from "@/hooks/authentication/use-logout";
import useUser from "@/hooks/authentication/use-user";
import useTitle from "@/hooks/shared/use-title";

function StaffOnlyNotice() {
  const { user } = useUser();
  const { logout, isPending } = useLogout();
  useTitle("Staff entrance");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-14 bg-background px-6 py-16 text-center">
      <Logo />
      <div className="space-y-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">Staff entrance</p>
        <h1 className="text-4xl leading-tight font-extralight text-foreground sm:text-5xl">This console is for hotel staff</h1>
        <p className="max-w-[46ch] text-[15px] text-muted-foreground">
          {user?.email} is a guest account. Reservations are made on the Hotel del Luna website.
        </p>
      </div>
      <Button size="lg" onClick={() => logout()} disabled={isPending}>
        {isPending ? "Logging out..." : "Log out"}
      </Button>
    </main>
  );
}

export default StaffOnlyNotice;
