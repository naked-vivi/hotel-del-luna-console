import type { MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { pageNumbers, withParam } from "@/lib/helpers";

export function usePagination({ count, page, pageSize }: PaginationPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageCount = Math.ceil(count / pageSize);

  function linkProps(nextPage: number, disabled = false): PaginationLinkOptions {
    const params = withParam(searchParams, "page", String(nextPage));

    return {
      href: disabled ? undefined : `?${params}`,
      "aria-disabled": disabled || undefined,
      tabIndex: disabled ? -1 : undefined,
      className: disabled ? "pointer-events-none opacity-50" : undefined,
      onClick(event: MouseEvent<HTMLAnchorElement>) {
        if (disabled) {
          event.preventDefault();
          return;
        }
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        setSearchParams(params);
      },
    };
  }

  return { pageCount, pages: pageNumbers(page, pageCount), linkProps };
}
