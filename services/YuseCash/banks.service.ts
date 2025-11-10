import { useQuery } from '@tanstack/react-query';

import { api } from '@/services/api';

type IBank = {
  id: number;
  name: string;
  code: string;
};

export const useBanks = () => {
  const getBanks = async () => {
    const { data } = await api.get<Paginated<IBank>>('/banks', {
      params: {
        'fields[0]': 'id',
        'fields[1]': 'name',
        'fields[3]': 'code',
        normalizeStrapi: true,
      },
    });

    if (data) {
      return data?.data;
    }
  };

  return useQuery({
    queryKey: ['banks'],
    queryFn: getBanks,
  });
};
