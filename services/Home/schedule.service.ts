import { useQuery } from '@tanstack/react-query';

import { api } from '@/services/api';

import { IHistory } from '@/interfaces/history';

export const useScheduled = () => {
  const getScheduled = async () => {
    const { data } = await api.get<IHistory>('/trips/history', {
      params: {
        'filters[tripType]': 'agendada',
        'filters[status][$in][0]': 'agendada',
        'filters[status][$in][1]': 'procurandoMotorista',
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
      return data;
    }
  };

  return useQuery({
    queryKey: ['scheduled-trips'],
    queryFn: getScheduled,
  });
};
