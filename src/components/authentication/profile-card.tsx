import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileFact from "@/components/authentication/profile-fact";
import ProfileCardSkeleton from "@/components/authentication/profile-card-skeleton";
import { cn } from "@/lib/utils";
import { formatTimestamp, getUserProfile } from "@/lib/helpers";
import { TAG_CLASS } from "@/lib/constants";
import useUser from "@/hooks/authentication/use-user";

function ProfileCard() {
  const { user, isPending } = useUser();

  if (isPending || !user) return <ProfileCardSkeleton />;

  const { fullName, avatar, initials, isAdmin, isConfirmed } = getUserProfile(user);

  return (
    <section aria-label="Your profile" className="border border-border bg-card">
      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
        <Avatar className="size-24 shrink-0 rounded-full ring-1 ring-gold ring-offset-4 ring-offset-card">
          {avatar ? <AvatarImage src={avatar} alt="" /> : null}
          <AvatarFallback className="rounded-full bg-muted text-2xl font-extralight text-foreground">{initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 space-y-3">
          <p className="text-[10.5px] font-semibold tracking-[0.3em] text-gold uppercase">On duty</p>
          <h2 className="truncate text-4xl leading-tight font-extralight">{fullName || "Name not set"}</h2>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <span className={cn(TAG_CLASS, isAdmin ? "bg-gold/10 text-gold" : "bg-muted text-muted-foreground")}>{isAdmin ? "Admin" : "Staff"}</span>
            <span className={cn(TAG_CLASS, isConfirmed ? "bg-status-success-bg text-status-success" : "bg-status-warning-bg text-status-warning")}>
              {isConfirmed ? "Email confirmed" : "Email pending"}
            </span>
          </div>
        </div>
      </div>

      <dl className="grid grid-cols-1 gap-px border-t border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
        <ProfileFact label="Member since">{formatTimestamp(user.created_at, "d MMMM yyyy")}</ProfileFact>
        <ProfileFact label="Last signed in">{formatTimestamp(user.last_sign_in_at, "d MMMM yyyy")}</ProfileFact>
        <ProfileFact label="Access">{isAdmin ? "Everything, plus staff" : "Bookings, cabins and check-ins"}</ProfileFact>
        <ProfileFact label="Account ID"><span className="text-sm text-muted-foreground">{user.id}</span></ProfileFact>
      </dl>
    </section>
  );
}

export default ProfileCard;
