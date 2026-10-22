function PageHeader({ eyebrow, title, description, actions, toolbar, meta }: PageHeaderProps) {
  return (
    <header className="mb-10 flex flex-col gap-6 border-b border-border pb-8">
      <div className="flex flex-col gap-6 2xl:flex-row 2xl:items-end 2xl:justify-between">
        <div className="min-w-0 space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">{eyebrow}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <h1 className="text-4xl leading-[1.05] font-extralight tracking-[0.01em] text-foreground sm:text-5xl">
              {title}
            </h1>
            {meta}
          </div>
          {description && <p className="text-[15px] leading-relaxed text-muted-foreground">{description}</p>}
        </div>
        {actions && <div className="flex min-w-0 max-w-full flex-wrap items-center justify-end gap-3 2xl:shrink-0">{actions}</div>}
      </div>
      {toolbar && <div className="flex min-w-0 max-w-full flex-wrap items-center justify-end gap-3">{toolbar}</div>}
    </header>
  );
}

export default PageHeader;
