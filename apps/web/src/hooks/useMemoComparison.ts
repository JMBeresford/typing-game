import { useMemo, useRef } from "react";

export function useMemoComparison<T extends unknown>(
  cb: () => T,
  deps: unknown[],
  comparison: (a: T, b: T) => boolean,
) {
  const previous = useRef<T>();
  const value = useMemo<T>(() => {
    const next = cb();
    if (previous.current == undefined || comparison(previous.current, next)) {
      previous.current = next;
    }
    return previous.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cb, ...deps, comparison]);

  return value;
}
