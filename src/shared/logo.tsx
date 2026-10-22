import { cn } from "@/lib/utils";

type LogoProps = {
  /** "night" is for dark navy surfaces like the sidebar; "auto" follows the current theme. */
  tone?: "auto" | "night";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "text-[12px]",
  md: "text-[15px]",
  lg: "text-[24px]",
};

const tones = {
  auto: { word: "text-foreground", sub: "text-muted-foreground", moon: "text-gold" },
  night: { word: "text-accent-50", sub: "text-accent-300", moon: "text-accent-400" },
};

/** The half moon that stands in for the O. Also used on its own as the app icon. */
export function HalfMoon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <circle cx="24" cy="24" r="21.6" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <path d="M24 2.4A21.6 21.6 0 0 1 24 45.6Z" fill="currentColor" />
    </svg>
  );
}

/** Hotel del Luna wordmark: H◐TEL above DEL LUNA. Everything scales from the font size. */
function Logo({ tone = "auto", size = "md", className }: LogoProps) {
  const t = tones[tone];

  return (
    <div
      role="img"
      aria-label="Hotel del Luna"
      className={cn("inline-flex select-none flex-col items-center gap-[0.6em] leading-none", sizes[size], className)}
    >
      <span className={cn("whitespace-nowrap pl-[0.3em] text-[1.6em] font-extralight tracking-[0.3em]", t.word)}>
        H
        <HalfMoon className={cn("mr-[0.3em] mb-[-0.01em] inline-block size-[0.74em] align-baseline", t.moon)} />
        TEL
      </span>
      <span className={cn("whitespace-nowrap pl-[0.92em] text-[0.5em] font-normal tracking-[0.92em]", t.sub)}>
        DEL LUNA
      </span>
    </div>
  );
}

export default Logo;
