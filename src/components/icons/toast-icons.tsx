function ToastGlyph({ children, ...props }: IconShellProps) {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} fill="none" aria-hidden="true" focusable="false" {...props}>
      {children}
    </svg>
  );
}

export function HalfMoonGlyph(props: IconProps) {
  return (
    <ToastGlyph {...props}>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" />
      <path d="M8 1.5A6.5 6.5 0 0 1 8 14.5Z" fill="currentColor" />
    </ToastGlyph>
  );
}

export function NewMoonGlyph(props: IconProps) {
  return (
    <ToastGlyph {...props}>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeDasharray="2 2" />
    </ToastGlyph>
  );
}

export function CrescentGlyph(props: IconProps) {
  return (
    <ToastGlyph {...props}>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" />
      <path d="M8 1.5A6.5 6.5 0 0 1 8 14.5A3.5 6.5 0 0 0 8 1.5Z" fill="currentColor" />
    </ToastGlyph>
  );
}

export function QuarterMoonGlyph(props: IconProps) {
  return (
    <ToastGlyph {...props}>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" />
      <path d="M8 1.5A6.5 6.5 0 0 0 8 14.5Z" fill="currentColor" fillOpacity="0.45" />
    </ToastGlyph>
  );
}

export function WaxingGlyph(props: IconProps) {
  return (
    <ToastGlyph {...props} className={`animate-spin ${props.className ?? ""}`}>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity="0.3" />
      <path d="M8 1.5A6.5 6.5 0 0 1 14.5 8" stroke="currentColor" />
    </ToastGlyph>
  );
}
