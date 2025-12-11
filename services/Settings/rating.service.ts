import { useQuery } from '@tanstack/react-query';

import { api } from '@/services/api';

import { IRating } from '@/interfaces/rating';

export const useRating = (
  passengerId?: number,
  type?: 'passenger' | 'driver',
) => {
  const getRating = async () => {
    const { data } = await api.get<IRating>('/calculateAverageRating', {
      params: {
        id: passengerId,
        type,
      },
    });

    if (data) {
      return data;
    }
  };

  return useQuery({
    queryKey: ['rating-passenger', passengerId, type],
    queryFn: getRating,
    enabled: !!passengerId,
  });
};
