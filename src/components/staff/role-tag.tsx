import { cn } from "@/lib/utils";
import { TAG_CLASS } from "@/lib/constants";

function RoleTag({ role = "staff" }: RoleTagProps) {
  return (
    <span className={cn(TAG_CLASS, role === "admin" ? "bg-gold/10 text-gold" : "bg-muted text-muted-foreground")}>
      {role === "admin" ? "Admin" : "Staff"}
    </span>
  );
}

export default RoleTag;
