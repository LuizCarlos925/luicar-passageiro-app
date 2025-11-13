import { useQuery } from '@tanstack/react-query';

import { IHistory, ITrip } from '@/interfaces/history';

import { api } from '@/services/api';

import { groupByDate } from '@/utils/groupTrip';

export const useHistory = () => {
  const getHistory = async () => {
    const { data } = await api.get<IHistory>('/trips/history', {
      params: {
        'filters[status][$in][0]': 'feita',
        'filters[status][$in][1]': 'cancelada',
        populate: [
          'subcategory',
          'category',
          'locals',
          'vehicle',
          'vehicle.color',
          'vehicle.vehicle_model',
          'driver',
          'driver.image',
          'driver.rating',
        ]?.join(','),
        'sort[createdAt]': 'desc',
      },
    });

    if (data) {
      return groupByDate(data?.trips);
    }
  };

  return useQuery({
    queryKey: ['history'],
    queryFn: getHistory,
  });
};

export const useHistoryDetails = (tripId: string) => {
  const getHistoryDetails = async () => {
    const { data } = await api.get<ITrip>(`/trips/history/${tripId}`, {
      params: {
        'filters[status][$in][0]': 'feita',
        'filters[status][$in][1]': 'cancelada',
        'filters[status][$in][2]': 'agendada',
        'filters[status][$in][3]': 'procurandoMotorista',
        populate: [
          'subcategory',
          'category',
          'locals',
          'vehicle',
          'vehicle.color',
          'vehicle.vehicle_model',
          'driver',
          'driver.image',
          'driver.reviews',
        ]?.join(','),
        'sort[createdAt]': 'desc',
      },
    });

    if (data) {
      return data;
    }
  };

  return useQuery({
    queryKey: ['history-details', tripId],
    queryFn: getHistoryDetails,
  });
};
