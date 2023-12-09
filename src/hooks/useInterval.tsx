import { useEffect, useRef } from "react";

const useInterval = (callback: (...args: unknown[]) => unknown, interval: number, immediate = false) => {
  const ref = useRef<(...args: unknown[]) => unknown>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  useEffect(() => {
    let cancelled = false;

    const fn = () => {
      ref.current?.(() => cancelled);
    };

    const id = setInterval(fn, interval);
    if (immediate) fn();

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [interval, immediate]);
};

export default useInterval;