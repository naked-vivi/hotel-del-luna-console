import { useState } from "react";
import { CalendarCardIcon, LedgerStackIcon } from "@/components/icons/drawn-icons";
import SampleDataButton from "@/components/shared/sample-data-button";
import { uploadAllSampleData, uploadSampleBookings } from "@/services/api-sample-data";

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function run(upload: () => Promise<void>) {
    setIsLoading(true);
    await upload();
    setIsLoading(false);
  }

  return (
    <section aria-label="Sample data" aria-busy={isLoading} className="border border-sidebar-border">
      <div className="space-y-2 px-4 pt-4 pb-3.5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="pt-0.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-300">Sample data</h3>
          <span className="border border-sage-300/40 bg-sage-300/10 px-1.5 pt-0.5 text-[8.5px] font-semibold uppercase tracking-[0.2em] text-sage-300">
            Dev
          </span>
        </div>
        <p className="truncate text-[11px] leading-snug text-primary-300">
          {isLoading ? "Replacing data, one moment…" : "Replaces what is in the database."}
        </p>
      </div>

      <div className="divide-y divide-sidebar-border border-t border-sidebar-border">
        <SampleDataButton icon={LedgerStackIcon} label="Everything" disabled={isLoading} onClick={() => run(uploadAllSampleData)} />
        <SampleDataButton icon={CalendarCardIcon} label="Bookings only" disabled={isLoading} onClick={() => run(uploadSampleBookings)} />
      </div>
    </section>
  );
}

export default Uploader;
