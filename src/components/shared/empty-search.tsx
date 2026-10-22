function EmptySearch({ className }: ClassNameProps) {
  return (
    <svg viewBox="0 0 160 96" aria-hidden="true" className={className} fill="none">
      <circle cx="70" cy="44" r="26" className="stroke-muted-foreground/50" strokeWidth="1.1" strokeDasharray="3 3" />
      <circle cx="70" cy="44" r="16" className="stroke-muted-foreground/70" strokeWidth="1.1" />
      <path d="M81.5 55.5L98 72" className="stroke-muted-foreground/70" strokeWidth="1.5" strokeLinecap="square" />
      <g className="text-gold">
        <circle cx="118" cy="22" r="7" stroke="currentColor" strokeWidth="1.1" />
        <path d="M118 15A7 7 0 0 1 118 29Z" fill="currentColor" />
      </g>
      <path d="M30 86H130" className="stroke-border" strokeWidth="1.1" />
    </svg>
  );
}

export default EmptySearch;
