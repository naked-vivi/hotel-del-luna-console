import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getInitials } from "@/lib/helpers";

function StaffAvatar({ account, isSelf = false, className }: StaffAvatarProps) {
  return (
    <Avatar className={cn("size-10 rounded-full ring-1", isSelf ? "ring-gold ring-offset-2 ring-offset-card" : "ring-border", className)}>
      {account.avatar ? <AvatarImage src={account.avatar} alt="" /> : null}
      <AvatarFallback className="rounded-full bg-muted text-xs font-semibold tracking-[0.08em] text-foreground">
        {getInitials(account.fullName, account.email)}
      </AvatarFallback>
    </Avatar>
  );
}

export default StaffAvatar;
