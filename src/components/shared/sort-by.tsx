import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useSearchParam } from "@/hooks/shared/use-search-param";

export default function SortBy({ options }: SortByProps) {
    const [currentSort, setSort] = useSearchParam("sortBy", options[0]?.value);
    const selectedOption = options.find((opt) => opt.value === currentSort);

    return (
        <Select value={currentSort} onValueChange={setSort}>
            <SelectTrigger className="w-64" aria-label="Sort results">
                <SelectValue placeholder="Sort by...">
                    {selectedOption?.label}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
