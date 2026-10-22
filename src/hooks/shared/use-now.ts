import { useEffect, useState } from "react";
import { MS_PER_MINUTE } from "@/lib/constants";

export function useNow() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      setNow(new Date());
      interval = setInterval(() => setNow(new Date()), MS_PER_MINUTE);
    }, MS_PER_MINUTE - (Date.now() % MS_PER_MINUTE));
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  return now;
}
