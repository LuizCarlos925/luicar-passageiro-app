import { useQuery } from '@tanstack/react-query';

import { api } from '@/services/api';

export const useYuseCashEnable = () => {
  const getYuseCashEnable = async () => {
    const { data } = await api.get<Meta<{ active: boolean }>>(
      '/yuse-cashes/1',
      {
        params: {
          'fields[0]': 'active',
          normalizeStrapi: true,
        },
      },
    );

    if (data) {
      return data?.data?.active;
    }
  };

  return useQuery({
    queryKey: ['yuse-cash-enable'],
    queryFn: getYuseCashEnable,
  });
};
