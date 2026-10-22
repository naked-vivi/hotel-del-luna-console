import { Checkbox } from "@/components/ui/checkbox";

function CheckinCheckbox({ id, checked, disabled, onCheckedChange, children }: CheckinCheckboxProps) {
  return (
    <div className="flex items-center gap-4 px-6 py-5">
      <Checkbox id={id} checked={checked} disabled={disabled} onCheckedChange={onCheckedChange} />
      <label htmlFor={id} className="pt-0.5 text-[15px] leading-snug peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {children}
      </label>
    </div>
  );
}

export default CheckinCheckbox;
