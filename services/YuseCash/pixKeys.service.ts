import { useQuery } from '@tanstack/react-query';

import { IPixKeyResponse } from '@/interfaces/pixKey';

import { useAuth } from '@/hooks/useAuth';

import { api } from '@/services/api';

export const usePixKeys = () => {
  const { user } = useAuth();

  const getPixKeys = async () => {
    const { data } = await api.get<IPixKeyResponse>('/listPaymentKeys');

    if (data) {
      return data?.data;
    }
  };

  return useQuery({
    queryKey: ['pix-keys'],
    queryFn: getPixKeys,
    enabled: !!user?.id,
  });
};
