import { cn } from "@/lib/utils";
import { TAG_CLASS } from "@/lib/constants";

function ReturningTag() {
  return <span className={cn(TAG_CLASS, "bg-gold/10 text-gold")}>Returning</span>;
}

export default ReturningTag;
