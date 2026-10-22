import type { ReactNode } from "react";
import { format, isValid, parseISO } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import useUser from "./use-user";

function when(value?: string | null) {
  if (!value) return "Never";
  const date = parseISO(value);
  return isValid(date) ? format(date, "d MMMM yyyy") : "Unavailable";
}

const tag = "inline-flex items-center border border-current/25 px-2.5 pt-1 pb-0.5 text-[10px] font-semibold whitespace-nowrap uppercase tracking-[0.22em]";

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0 space-y-2 bg-card px-6 py-5">
      <dt className="text-[10px] font-semibold tracking-[0.26em] text-muted-foreground uppercase">{label}</dt>
      <dd className="truncate text-[15px] text-foreground">{children}</dd>
    </div>
  );
}

/** The top of the Account page: who you are in the house, at a glance. */
function ProfileCard() {
  const { user, isPending } = useUser();

  if (isPending || !user) {
    return (
      <section aria-busy="true" aria-label="Loading your profile" className="border border-border bg-card">
        <div className="flex items-center gap-6 p-6 sm:p-8">
          <Skeleton className="size-24 shrink-0 rounded-full" />
          <div className="space-y-3"><Skeleton className="h-10 w-64" /><Skeleton className="h-4 w-48" /></div>
        </div>
        <div className="grid grid-cols-1 gap-px border-t border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((i) => <div key={i} className="bg-card px-6 py-5"><Skeleton className="h-11 w-full" /></div>)}
        </div>
      </section>
    );
  }

  const fullName = typeof user.user_metadata?.fullName === "string" ? user.user_metadata.fullName.trim() : "";
  const avatar = typeof user.user_metadata?.avatar === "string" ? user.user_metadata.avatar : "";
  const isAdmin = user.app_metadata?.role === "admin";
  const confirmed = Boolean(user.email_confirmed_at);
  const initials = (fullName || user.email || "?").split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

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
            <span className={cn(tag, isAdmin ? "bg-gold/10 text-gold" : "bg-muted text-muted-foreground")}>{isAdmin ? "Admin" : "Staff"}</span>
            <span className={cn(tag, confirmed ? "bg-status-success-bg text-status-success" : "bg-status-warning-bg text-status-warning")}>
              {confirmed ? "Email confirmed" : "Email pending"}
            </span>
          </div>
        </div>
      </div>

      <dl className="grid grid-cols-1 gap-px border-t border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
        <Fact label="Member since">{when(user.created_at)}</Fact>
        <Fact label="Last signed in">{when(user.last_sign_in_at)}</Fact>
        <Fact label="Access">{isAdmin ? "Everything, plus staff" : "Bookings, cabins and check-ins"}</Fact>
        <Fact label="Account ID"><span className="text-sm text-muted-foreground">{user.id}</span></Fact>
      </dl>
    </section>
  );
}

export default ProfileCard;
