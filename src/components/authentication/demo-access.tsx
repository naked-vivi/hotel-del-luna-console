import { useState } from "react";
import DemoAccountButton from "@/components/authentication/demo-account-button";
import useLogin from "@/hooks/authentication/use-login";
import { DEMO_ACCOUNTS } from "@/lib/constants";

function DemoAccess() {
  const { login, isPending } = useLogin();
  const [selected, setSelected] = useState<StaffRole | null>(null);

  function handleSelect(account: DemoAccount) {
    setSelected(account.role);
    login({ email: account.email, password: account.password }, { onSettled: () => setSelected(null) });
  }

  return (
    <section aria-labelledby="demo-access-title" className="space-y-4">
      <div className="flex items-center gap-4">
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
        <h2 id="demo-access-title" className="pt-0.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
          Or explore the demo
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {DEMO_ACCOUNTS.map((account) => (
          <DemoAccountButton
            key={account.role}
            account={account}
            isLoading={selected === account.role}
            disabled={isPending}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </section>
  );
}

export default DemoAccess;
