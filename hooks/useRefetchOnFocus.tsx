import { useFocusEffect } from 'expo-router';
import React from 'react';

// export function useRefreshOnFocus<T>(...refetch: )
export const useRefreshOnFocus = (refetch: () => Promise<unknown>) => {
  const firstTimeRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      refetch();
    }, [refetch]),
  );
};
