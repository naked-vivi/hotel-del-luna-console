import GuestStayRow from "@/components/guests/guest-stay-row";

function GuestHistory({ guest }: GuestHistoryProps) {
  return (
    <div className="border-t border-border bg-muted/25 px-6 py-5">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">Booking history</p>
        <p className="text-xs text-muted-foreground">
          {guest.nationalID ? `National ID ${guest.nationalID}` : "No national ID on file"}
          {guest.userId ? " · Website account" : ""}
        </p>
      </div>
      {guest.bookings.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">No stays yet.</p>
      ) : (
        <ul className="divide-y divide-border border border-border bg-card">
          {guest.bookings.map((stay) => <GuestStayRow key={stay.id} stay={stay} />)}
        </ul>
      )}
    </div>
  );
}

export default GuestHistory;
