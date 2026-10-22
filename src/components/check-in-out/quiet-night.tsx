import KeyRack from "@/components/check-in-out/key-rack";
import CardEmptyState from "@/components/shared/card-empty-state";

function QuietNight() {
  return (
    <CardEmptyState
      drawing={<KeyRack className="w-full max-w-72" />}
      title="All keys are on their hooks"
      message="No arrivals or departures today."
    />
  );
}

export default QuietNight;
