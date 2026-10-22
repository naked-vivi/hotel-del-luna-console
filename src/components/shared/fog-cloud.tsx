function FogCloud({ x, y, scale = 1 }: FogCloudProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d="M0 26H92A13 13 0 0 0 89.5 0.3A20 20 0 0 0 51.5 -6A15 15 0 0 0 26.5 5A11 11 0 0 0 0 26Z"
        className="fill-card stroke-muted-foreground/70"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path d="M-26 38H34M46 38H64M100 14H120" className="stroke-border" strokeWidth="1.1" strokeLinecap="square" />
    </g>
  );
}

export default FogCloud;
