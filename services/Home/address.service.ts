import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/hooks/useAuth';

import { ILocation, ISavedLocation } from '@/interfaces/location';

import { api } from '@/services/api';

import { normalizeStrapi } from '@/utils/normalizeStrapi';

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

export const useSavedLocations = () => {
  const { user } = useAuth();

  const getSavedLocations = async () => {
    const { data } = await api.get<Paginated<ISavedLocation>>(
      '/saved-locations',
      {
        params: {
          'filters[passenger]': user?.passenger?.id,
        },
      },
    );

    if (data) {
      return normalizeStrapi(data);
    }
  };

  return useQuery({
    queryKey: ['saved-locations'],
    queryFn: getSavedLocations,
  });
};
