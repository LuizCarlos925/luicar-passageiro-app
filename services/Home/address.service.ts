import { useQuery } from '@tanstack/react-query';

import { ILocation } from '@/interfaces/location';

import { api } from '@/services/api';

export const useLocations = (type?: 'saida' | 'destino') => {
  const getLocations = async () => {
    const { data } = await api.get<ILocation[]>('/listLocationsV2', {
      params: {
        type,
      },
    });

    if (data) {
      return data;
    }
  };

  return useQuery({
    queryKey: ['locations', type],
    queryFn: getLocations,
  });
};
