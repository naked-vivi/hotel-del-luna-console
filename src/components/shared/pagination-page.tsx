import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from "@/hooks/shared/use-pagination";

export function PaginationPage({ count, page, pageSize }: PaginationPageProps) {
    const { pageCount, pages, linkProps } = usePagination({ count, page, pageSize });

    if (pageCount <= 1) return null;

    return (
        <Pagination>
            <PaginationContent className="flex-wrap justify-center">
                <PaginationItem>
                    <PaginationPrevious {...linkProps(page - 1, page <= 1)} />
                </PaginationItem>
                {pages.flatMap((value, index) => [
                    ...(index > 0 && value - pages[index - 1] > 1 ? [
                        <PaginationItem key={`ellipsis-${value}`}>
                            <PaginationEllipsis />
                        </PaginationItem>,
                    ] : []),
                    <PaginationItem key={value}>
                        <PaginationLink {...linkProps(value)} isActive={page === value} aria-label={`Go to page ${value}`}>
                            {value}
                        </PaginationLink>
                    </PaginationItem>,
                ])}
                <PaginationItem>
                    <PaginationNext {...linkProps(page + 1, page >= pageCount)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
