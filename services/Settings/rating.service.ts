import { useQuery } from '@tanstack/react-query';

import { api } from '@/services/api';

import { IRating } from '@/interfaces/rating';

export const useRatingPassenger = (passengerId: number) => {
  const getRatingPassenger = async () => {
    const { data } = await api.get<IRating>('/calculateAverageRating', {
      params: {
        id: passengerId,
        type: 'passenger',
      },
    });

    if (data) {
      return data;
    }
  };

  return useQuery({
    queryKey: ['rating-passenger', passengerId],
    queryFn: getRatingPassenger,
  });
};
