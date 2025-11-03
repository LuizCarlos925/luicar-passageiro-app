/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useEffect, useRef, useCallback } from 'react';

const useCountdown = (duration: number) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [timeLeft, setTimeLeft] = useState(duration);

  const start = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setTimeLeft(duration);
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [duration]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { timeLeft, start };
};

export default useCountdown;
