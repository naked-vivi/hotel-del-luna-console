import { ArrowRightIcon } from "@/components/icons/icons";

function SampleDataButton({ icon: Icon, label, disabled, onClick }: SampleDataButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group flex w-full items-center justify-between gap-3 px-4 pt-3.5 pb-3 text-left text-[10.5px] font-semibold uppercase tracking-[0.2em] text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-accent-50 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-sidebar-ring disabled:pointer-events-none disabled:opacity-40"
    >
      <span className="flex items-center gap-3">
        <Icon aria-hidden="true" className="-my-1 size-5.5" />
        {label}
      </span>
      <ArrowRightIcon aria-hidden="true" className="-mt-0.5 size-3.5 stroke-[1.5] text-primary-400 transition-colors group-hover:text-sidebar-primary" />
    </button>
  );
}

export default SampleDataButton;
