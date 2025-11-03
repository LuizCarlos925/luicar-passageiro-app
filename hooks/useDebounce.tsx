import { useCallback, useEffect, useState } from 'react';

export const useDebounce = <T,>(value: T, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

export const useDisableDelay = (delay = 1000) => {
  const [isLoading, setIsLoading] = useState(false);

  const executeWithDelay = useCallback(
    async (func: () => void | Promise<void>) => {
      if (isLoading) {
        return;
      }

      setIsLoading(true);
      await func();

      setTimeout(() => {
        setIsLoading(false);
      }, delay);
    },
    [isLoading, delay],
  );

  return { executeWithDelay, isLoading };
};
