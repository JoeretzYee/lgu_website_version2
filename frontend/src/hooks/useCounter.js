import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Custom hook for animated number counters.
 * Counts from 0 to target value when triggered.
 */
export function useCounter(end, options = {}) {
  const {
    duration = 2000,
    start = 0,
    delay = 0,
    prefix = "",
    suffix = "",
    decimals = 0,
    isActive = true,
  } = options;

  const [count, setCount] = useState(start);
  const countRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const timer = setTimeout(() => {
      startTimeRef.current = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * eased;

        setCount(Number(current.toFixed(decimals)));

        if (progress < 1) {
          countRef.current = requestAnimationFrame(animate);
        }
      };

      countRef.current = requestAnimationFrame(animate);

      return () => {
        if (countRef.current) {
          cancelAnimationFrame(countRef.current);
        }
      };
    }, delay);

    return () => clearTimeout(timer);
  }, [end, duration, start, delay, decimals, isActive]);

  const formatted = `${prefix}${count.toLocaleString()}${suffix}`;

  return { count, formatted };
}

export default useCounter;
