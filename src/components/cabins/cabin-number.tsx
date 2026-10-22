import { cn } from "@/lib/utils";

function CabinNumber({ name, className }: CabinNumberProps) {
  return (
    <span className={cn("font-extralight", className)}>
      <span className="mr-1.5 align-middle text-[10px] font-semibold tracking-[0.14em] text-muted-foreground">N°</span>
      {name}
    </span>
  );
}

export default CabinNumber;
