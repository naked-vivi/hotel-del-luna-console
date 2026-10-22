function RoomChartNavButton({ isActive, onClick, label, children }: RoomChartNavButtonProps) {
  return (
    <button
      type="button"
      className="inline-flex h-full items-center justify-center gap-1.5 border-l border-input px-4 pt-0.5 text-[10.5px] font-semibold whitespace-nowrap uppercase tracking-[0.2em] text-foreground/60 transition-all first:border-l-0 not-data-active:hover:text-foreground focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring dark:text-muted-foreground dark:not-data-active:hover:text-foreground data-active:bg-primary data-active:text-primary-foreground dark:data-active:text-primary-foreground [&_svg]:-mt-0.5 [&_svg]:size-3.5"
      data-active={isActive ? "" : undefined}
      aria-pressed={isActive}
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default RoomChartNavButton;
