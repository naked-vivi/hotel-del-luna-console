import LunarCycle from "./lunar-cycle";

/** Inline loader for small areas: the same moon as the page loader, smaller. */
function Spinner() {
    return (
        <div className="flex items-center justify-center py-16" role="status">
            <span className="sr-only">Loading...</span>
            <LunarCycle className="size-10" />
        </div>
    );
}

export default Spinner;
