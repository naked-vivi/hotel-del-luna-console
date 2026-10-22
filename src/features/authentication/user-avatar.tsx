import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import useUser from "./use-user";

function UserAvatar() {
  const { user, isPending } = useUser();

  if (isPending) {
    return (
      <div className="flex items-center gap-3" role="status" aria-label="Loading user">
        <Skeleton className="size-11 rounded-full" />
        <div className="hidden space-y-1.5 xl:block">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-2.5 w-16" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  const metadataName = user.user_metadata?.fullName;
  const fullName = typeof metadataName === "string" ? metadataName.trim() : "";
  const displayName = fullName || user.email || "User";
  const avatar = user.user_metadata?.avatar;
  const initials = fullName
    ? fullName.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase()
    : displayName[0].toUpperCase();

  return (
    <div className="flex min-w-0 items-center gap-3 text-foreground">
      <Avatar className="size-11 rounded-full ring-1 ring-border">
        <AvatarImage src={typeof avatar === "string" ? avatar : "default-user.jpg"} alt={displayName} />
        <AvatarFallback className="rounded-full">{initials}</AvatarFallback>
      </Avatar>
      <div className="hidden min-w-0 flex-col gap-1.5 xl:flex">
        <span className="max-w-48 truncate text-[15px] leading-none" title={displayName}>
          {displayName}
        </span>
        <span className="text-[9.5px] leading-none font-semibold uppercase tracking-[0.3em] text-gold">On duty</span>
      </div>
    </div>
  );
}

export default UserAvatar;
