function AccountPanel({ eyebrow, title, description, children }: AccountPanelProps) {
  return (
    <section className="flex min-w-0 flex-col border border-border bg-card">
      <header className="space-y-2 border-b border-border p-6 sm:px-8">
        <p className="text-[10px] font-semibold tracking-[0.28em] text-gold uppercase">{eyebrow}</p>
        <h2 className="text-2xl font-extralight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </header>
      <div className="flex flex-1 flex-col p-6 sm:px-8">{children}</div>
    </section>
  );
}

export default AccountPanel;
