import { cn } from "@/lib/utils";
import { APP_NAME, LOGO_SIZES, LOGO_TONES } from "@/lib/constants";
import HalfMoon from "@/components/shared/half-moon";

function Logo({ tone = "auto", size = "md", className }: LogoProps) {
  const t = LOGO_TONES[tone];

  return (
    <div
      role="img"
      aria-label={APP_NAME}
      className={cn("inline-flex select-none flex-col items-center gap-[0.6em] leading-none", LOGO_SIZES[size], className)}
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
