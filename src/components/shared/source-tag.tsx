import { cn } from "@/lib/utils";
import { TAG_CLASS } from "@/lib/constants";

function SourceTag({ source }: SourceTagProps) {
  if (source !== "website") return null;
  return <span className={cn(TAG_CLASS, "bg-gold/10 text-gold")}>Website</span>;
}

export default SourceTag;
