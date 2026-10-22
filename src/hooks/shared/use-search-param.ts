import { useSearchParams } from "react-router-dom";

export function useSearchParam(key: string, fallback = "") {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(key) || fallback;

  function setValue(next: string) {
    searchParams.set(key, next);
    if (searchParams.has("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  return [value, setValue] as const;
}
