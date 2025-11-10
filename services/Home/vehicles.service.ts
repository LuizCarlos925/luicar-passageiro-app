import { useQuery } from '@tanstack/react-query';

import { api } from '@/services/api';
import { ICategory } from '@/interfaces/vehicleCategory';
import { handleError } from '@/utils/handleError';

export const useCategoriesPrices = (origin: string, destination: string) => {
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
  });
};

export const useCategoriesPricesCoordinate = (
  origin: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number },
  departTime?: string,
) => {
  if (!origin?.latitude) {
    handleError('Origem da viagem não encontrada');
  }
  if (!destination?.latitude) {
    handleError('Destino da viagem não encontrado');
  }

  const getCategoriesPrices = async () => {
    const { data } = await api.get<ICategory[]>('/listCategoriesPriceV2', {
      params: {
        'coordinatesDestination[latitude]': destination.latitude,
        'coordinatesDestination[longitude]': destination.longitude,
        'coordinatesOrigin[latitude]': origin.latitude,
        'coordinatesOrigin[longitude]': origin.longitude,
        deliveryType: 'passenger',
        departTime: departTime || undefined,
      },
    });

    if (data) {
      return data;
    }
  };

  return useQuery({
    queryKey: ['categories-prices-coordinate', origin, destination],
    queryFn: getCategoriesPrices,
  });
};
