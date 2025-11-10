import { useQuery } from '@tanstack/react-query';

import { api } from '@/services/api';

export const useDriverRating = (driverId?: number) => {
  const getDriverRating = async () => {
    const response = await api.get<number>(
      `/viewDriverRating?driverId=${driverId}`,
    );

    if (response?.data) {
      return response.data;
    }
    return 0;
  };

  return useQuery({
    queryKey: ['driver-rating', driverId],
    queryFn: getDriverRating,
    enabled: !!driverId,
  });
};
