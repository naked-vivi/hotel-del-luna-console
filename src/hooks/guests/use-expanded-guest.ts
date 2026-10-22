import { useSearchParams } from "react-router-dom";

export function useExpandedGuest() {
  const [searchParams, setSearchParams] = useSearchParams();
  const expandedId = Number(searchParams.get("guest")) || null;

  function toggle(id: number) {
    setSearchParams((current) => {
      const params = new URLSearchParams(current);
      if (expandedId === id) params.delete("guest");
      else params.set("guest", String(id));
      return params;
    }, { replace: true });
  }

  return { expandedId, toggle };
}
