import { useQuery } from '@tanstack/react-query';

import { IAdvertising } from '@/interfaces/advertising';

import { api } from '@/services/api';

export const useAdvertising = () => {
  const getAdvertising = async () => {
    const { data } = await api.get<Paginated<IAdvertising>>('/advertisements', {
      params: {
        populate: 'image',
        'filters[status]': 'aprovado',
        normalizeStrapi: true,
      },
    });

    if (data) {
      return data?.data;
    }
  };

  return useQuery({
    queryKey: ['advertising'],
    queryFn: getAdvertising,
  });
};
