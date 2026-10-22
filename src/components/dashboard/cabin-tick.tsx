import { cn } from "@/lib/utils";

function CabinTick({ x, y, payload, activeName }: CabinTickProps) {
  const name = String(payload?.value ?? "");

  return (
    <text x={x} y={y} dy={14} textAnchor="middle" className={cn("transition-[fill] duration-200", name === activeName ? "fill-gold" : "fill-foreground")}>
      <tspan className="fill-muted-foreground text-[9px] font-semibold tracking-[0.14em] @max-[40rem]:hidden">N° </tspan>
      <tspan className="text-[13px] font-light">{name}</tspan>
    </text>
  );
}

export default CabinTick;
