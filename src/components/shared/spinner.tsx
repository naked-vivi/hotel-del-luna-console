import LunarCycle from "@/components/shared/lunar-cycle";

function Spinner() {
    return (
        <div className="flex items-center justify-center py-16" role="status">
            <span className="sr-only">Loading...</span>
            <LunarCycle className="size-10" />
        </div>
    );
}

export default Spinner;
