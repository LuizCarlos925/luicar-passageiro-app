import { useQuery } from '@tanstack/react-query';

import { api } from '@/services/api';
import { ICategory } from '@/interfaces/vehicleCategory';
import { handleError } from '@/utils/handleError';
import { IGeolocation } from '@/interfaces/geolocation';

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
  addresses: IGeolocation | null,
) => {
  const getCategoriesPrices = async () => {
    if (!addresses) {
      handleError('Endereços de origem e destino não fornecidos');
      return;
    }

    const { origin, destination } = addresses;

    if (!origin?.latitude) {
      handleError('Origem da viagem não encontrada');
    }
    if (!destination?.latitude) {
      handleError('Destino da viagem não encontrado');
    }

    const { data } = await api.get<ICategory[]>('/listCategoriesPriceV2', {
      params: {
        'coordinatesDestination[latitude]': destination.latitude,
        'coordinatesDestination[longitude]': destination.longitude,
        'coordinatesOrigin[latitude]': origin.latitude,
        'coordinatesOrigin[longitude]': origin.longitude,
        deliveryType: 'passenger',
      },
    });

    if (data) {
      return data;
    }
  };

  return useQuery({
    queryKey: ['categories-prices-coordinate', addresses],
    queryFn: getCategoriesPrices,
    enabled: !!addresses,
  });
};
