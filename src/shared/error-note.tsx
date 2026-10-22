/** Thin-line drawing: the bronze half moon slipping behind a cloud. */
function CloudedMoon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 112" aria-hidden="true" className={className} fill="none">
      {/* The moon, partly hidden */}
      <g className="text-gold">
        <circle cx="146" cy="38" r="22" stroke="currentColor" strokeWidth="1.1" />
        <path d="M146 16A22 22 0 0 1 146 60Z" fill="currentColor" />
      </g>
      {/* Cloud in front, filled with the card colour so it covers the moon */}
      <path
        d="M84 82H176A13 13 0 0 0 173.5 56.3A20 20 0 0 0 135.5 50A15 15 0 0 0 110.5 61A11 11 0 0 0 84 82Z"
        className="fill-card stroke-muted-foreground/70"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      {/* Drifting lines */}
      <path d="M60 94H120M132 94H150M186 72H208M70 60H90" className="stroke-border" strokeWidth="1.1" strokeLinecap="square" />
    </svg>
  );
}

/** Error state for cards, in the same style as the empty states: a drawing and two short lines. */
function ErrorNote({ title = "The sky is clouded over", message = "This could not be loaded. Try again shortly." }: { title?: string; message?: string }) {
  return (
    <div role="alert" className="my-auto flex flex-col items-center gap-7 py-6 text-center">
      <CloudedMoon className="w-full max-w-72" />
      <div className="space-y-2">
        <p className="text-xl font-extralight text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

export default ErrorNote;
