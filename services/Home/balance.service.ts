import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/hooks/useAuth';

import { api } from '@/services/api';

export const useBalance = () => {
  const { user } = useAuth();

  const getBalance = async () => {
    const { data } = await api.get<{ id: number; balance: number }>(
      `/users/${user.id}`,
      {
        params: {
          'fields[0]': 'balance',
          normalizeStrapi: true,
        },
      },
    );

    if (data) {
      return data;
    }
  };

  return useQuery({
    queryKey: ['balance', user.id],
    queryFn: getBalance,
    enabled: !!user?.id,
  });
};
