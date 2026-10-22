import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { StaffRole, UserAccount } from "@/services/api-users";

function initials(account: Pick<UserAccount, "fullName" | "email">) {
  const name = account.fullName.trim();
  if (name) return name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  return (account.email[0] ?? "?").toUpperCase();
}

/** Round photo, or initials when there is no photo. */
export function StaffAvatar({ account, isSelf = false, className }: { account: UserAccount; isSelf?: boolean; className?: string }) {
  return (
    <Avatar className={cn("size-10 rounded-full ring-1", isSelf ? "ring-gold ring-offset-2 ring-offset-card" : "ring-border", className)}>
      {account.avatar ? <AvatarImage src={account.avatar} alt="" /> : null}
      <AvatarFallback className="rounded-full bg-muted text-xs font-semibold tracking-[0.08em] text-foreground">
        {initials(account)}
      </AvatarFallback>
    </Avatar>
  );
}

const tag = "inline-flex items-center border border-current/25 px-2.5 pt-1 pb-0.5 text-[10px] font-semibold whitespace-nowrap uppercase tracking-[0.22em]";

/** Admin in bronze, everyone else in a quiet neutral. */
export function RoleTag({ role = "staff" }: { role?: StaffRole }) {
  return (
    <span className={cn(tag, role === "admin" ? "bg-gold/10 text-gold" : "bg-muted text-muted-foreground")}>
      {role === "admin" ? "Admin" : "Staff"}
    </span>
  );
}

export function EmailStatusTag({ confirmed }: { confirmed: boolean }) {
  return (
    <span className={cn(tag, confirmed ? "bg-status-success-bg text-status-success" : "bg-status-warning-bg text-status-warning")}>
      {confirmed ? "Confirmed" : "Pending"}
    </span>
  );
}
