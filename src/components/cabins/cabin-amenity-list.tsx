import { amenitiesFor } from "@/lib/helpers";

function CabinAmenityList({ amenities }: CabinAmenityListProps) {
  const options = amenitiesFor(amenities);

  if (options.length === 0) {
    return <p className="text-sm text-muted-foreground">No amenities listed yet.</p>;
  }

  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
      {options.map(({ value, label, icon: Icon }) => (
        <li key={value} className="flex items-center gap-3 text-[14px]">
          <Icon aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
          <span className="pt-0.5">{label}</span>
        </li>
      ))}
    </ul>
  );
}

export default CabinAmenityList;
