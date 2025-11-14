import { useQuery } from '@tanstack/react-query';

import { ICategory } from '@/interfaces/vehicleCategory';

import { api } from '@/services/api';

export const useCategoriesPrices = (origin?: string, destination?: string) => {
  const getCategoriesPrices = async () => {
    const { data } = await api.get<ICategory[]>('/listCategoriesPriceV2', {
      params: {
        originAddress: origin,
        destinyAddress: destination,
        deliveryType: 'passenger',
      },
    });

    if (data) {
      return data;
    }
  };

  return useQuery({
    queryKey: ['categories-prices', origin, destination],
    queryFn: getCategoriesPrices,
    enabled: !!origin && !!destination,
  });
};
