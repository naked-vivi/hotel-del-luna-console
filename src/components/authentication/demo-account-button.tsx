function DemoAccountButton({ account, isLoading, disabled, onSelect }: DemoAccountButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(account)}
      disabled={disabled}
      aria-label={`Enter the demo as ${account.role}, ${account.name}`}
      className="flex min-w-0 flex-col items-start gap-2 border border-border bg-transparent px-4 pt-3.5 pb-3 text-left transition-colors hover:border-foreground/40 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:opacity-50"
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
        {isLoading ? "Entering…" : `Enter as ${account.role}`}
      </span>
      <span className="truncate text-[15px] text-foreground">{account.name}</span>
      <span className="text-xs text-muted-foreground">{account.title}</span>
    </button>
  );
}

export default DemoAccountButton;
