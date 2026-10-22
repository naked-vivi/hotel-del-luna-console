function Telescope({ className }: ClassNameProps) {
  return (
    <svg viewBox="0 0 160 96" aria-hidden="true" className={className} fill="none">
      <path d="M67 58L54 86M67 58L80 86M67 58V86" className="stroke-muted-foreground/50" strokeWidth="1.1" />
      <path d="M43.6 63.6L94.7 33.8L101.3 46.2L48.4 72.4Z" className="fill-card stroke-muted-foreground/70" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M86.3 38.7L92.7 50.6" className="stroke-muted-foreground/50" strokeWidth="1.1" />
      <path d="M43.6 63.6L37.5 66.4L40.6 72.2L48.4 72.4" className="stroke-muted-foreground/70" strokeWidth="1.1" strokeLinejoin="round" />
      <circle cx="67" cy="58" r="2" className="fill-card stroke-muted-foreground/70" strokeWidth="1.1" />
      <path d="M103 37L114 30.5" className="stroke-gold/60" strokeWidth="1.1" strokeDasharray="2 3" />
      <g className="text-gold">
        <circle cx="124" cy="24" r="8" stroke="currentColor" strokeWidth="1.1" />
        <path d="M124 16A8 8 0 0 1 124 32Z" fill="currentColor" />
      </g>
      <path d="M100 12V18M97 15H103M144 38V42M142 40H146M136 10V13M134.5 11.5H137.5" className="stroke-muted-foreground/40" strokeWidth="1" />
      <path d="M30 86H130" className="stroke-border" strokeWidth="1.1" />
    </svg>
  );
}

export default Telescope;
