import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SEARCH_DEBOUNCE_MS } from "@/lib/constants";

export function useDebouncedSearchParam(key: string) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(() => searchParams.get(key) ?? "");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function commit(next: string) {
    setSearchParams((current) => {
      const params = new URLSearchParams(current);
      if (next.trim()) params.set(key, next.trim());
      else params.delete(key);
      params.delete("page");
      return params;
    }, { replace: true });
  }

  function change(next: string) {
    setValue(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => commit(next), SEARCH_DEBOUNCE_MS);
  }

  function clear() {
    window.clearTimeout(timer.current);
    setValue("");
    commit("");
  }

  return { value, change, clear };
}
