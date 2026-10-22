import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParam } from "@/hooks/shared/use-search-param";

export default function Filter({ filterField, options }: FilterProps) {
    const [currentFilter, setFilter] = useSearchParam(filterField, options[0]?.value);

    return (
        <Tabs className="min-w-0 max-w-full" value={currentFilter} onValueChange={setFilter}>
            <TabsList aria-label={`Filter by ${filterField}`} className="no-scrollbar max-w-full flex-nowrap justify-start overflow-x-auto group-data-horizontal/tabs:h-auto">
                {options.map(({ value, label, icon: Icon }) => (
                    <TabsTrigger
                        key={value}
                        value={value}
                        className={`h-10 flex-none ${Icon ? "px-3.5 [&_svg]:size-4.5 dark:data-active:[--icon-accent:currentColor]" : ""}`}
                        aria-label={Icon ? label : undefined}
                        title={Icon ? label : undefined}
                    >
                        {Icon ? <Icon /> : label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}
