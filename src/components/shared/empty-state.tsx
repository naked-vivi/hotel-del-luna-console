import HalfMoon from "@/components/shared/half-moon";

function EmptyState({ title, children, action, drawing }: EmptyStateProps) {
  return (
    <div role="status" className="flex flex-col items-center gap-6 border border-border bg-card px-6 py-32 text-center">
      {drawing ?? <HalfMoon className="size-8 text-gold opacity-70" />}
      <p className="text-xl font-light text-foreground">{title}</p>
      {children && <p className="max-w-[48ch] text-sm text-muted-foreground">{children}</p>}
      {action}
    </div>
  );
}

export default EmptyState;
