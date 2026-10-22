import { LockIcon } from "@/components/icons/icons";

function LockedNavItem({ label, icon: Icon }: LockedNavItemProps) {
  return (
    <span
      aria-disabled="true"
      title="Admins only"
      className="flex items-center gap-4 px-4 pt-3.5 pb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary-500 [&>svg]:-my-1 [&>svg]:size-5.5 [&>svg]:shrink-0 [&>svg]:opacity-60"
    >
      <Icon aria-hidden="true" />
      <span className="flex-1">{label}</span>
      <LockIcon aria-label="Admins only" className="size-3.5! opacity-80" />
    </span>
  );
}

export default LockedNavItem;
