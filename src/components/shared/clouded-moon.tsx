function CloudedMoon({ className }: ClassNameProps) {
  return (
    <svg viewBox="0 0 260 112" aria-hidden="true" className={className} fill="none">
      <g className="text-gold">
        <circle cx="146" cy="38" r="22" stroke="currentColor" strokeWidth="1.1" />
        <path d="M146 16A22 22 0 0 1 146 60Z" fill="currentColor" />
      </g>
      <path
        d="M84 82H176A13 13 0 0 0 173.5 56.3A20 20 0 0 0 135.5 50A15 15 0 0 0 110.5 61A11 11 0 0 0 84 82Z"
        className="fill-card stroke-muted-foreground/70"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path d="M60 94H120M132 94H150M186 72H208M70 60H90" className="stroke-border" strokeWidth="1.1" strokeLinecap="square" />
    </svg>
  );
}

export default CloudedMoon;
