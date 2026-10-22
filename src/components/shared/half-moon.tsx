function HalfMoon({ className }: ClassNameProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <circle cx="24" cy="24" r="21.6" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <path d="M24 2.4A21.6 21.6 0 0 1 24 45.6Z" fill="currentColor" />
    </svg>
  );
}

export default HalfMoon;
