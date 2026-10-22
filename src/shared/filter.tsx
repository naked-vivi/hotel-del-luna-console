import type { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";

export interface FilterOption {
    value: string;
    /** Text, or one of our SVG icons. */
    label: ReactNode;
    /** Spoken and hover name. Required when the label is an icon. */
    title?: string;
}

interface FilterProps {
    filterField: string;
    options: FilterOption[];
}

export default function Filter({ filterField, options }: FilterProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    // Active filter or default to first option
    const currentFilter = searchParams.get(filterField) || options[0]?.value || "";

    function handleFilterChange(value: string) {
        searchParams.set(filterField, value);
        // Reset page number to 1 when changing filters if using pagination
        if (searchParams.get("page")) searchParams.set("page", "1");
        setSearchParams(searchParams);
    }

    return (
        <Tabs className="min-w-0 max-w-full" value={currentFilter} onValueChange={handleFilterChange}>
            <TabsList aria-label={`Filter by ${filterField}`} className="no-scrollbar max-w-full flex-nowrap justify-start overflow-x-auto group-data-horizontal/tabs:h-auto">
                {options.map((option) => (
                    <TabsTrigger key={option.value} value={option.value} className={`h-10 flex-none ${option.title ? "px-3.5 [&_svg]:size-4.5 dark:data-active:[--icon-accent:currentColor]" : ""}`} aria-label={option.title} title={option.title}>
                        {option.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}
