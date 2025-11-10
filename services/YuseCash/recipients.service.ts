import { useQuery } from '@tanstack/react-query';

import { IFrequentRecipients, IRecipients } from '@/interfaces/recipients';

import { api } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';

export const useRecipients = (pixKey?: string) => {
  const { user } = useAuth();
  const getRecipients = async () => {
    const { data } = await api.get<IRecipients[]>(
      `/listTransferUsers?key=${pixKey}`,
    );

    if (data) {
      return data.filter(
        item => !(item?.userId === user?.id && item?.type === 'passenger'),
      );
    }
  };

  return useQuery({
    queryKey: ['recipients', pixKey],
    queryFn: getRecipients,
  });
};

export const useRecipientByUserId = (userId?: number | string) => {
  const getRecipientByUserId = async () => {
    const { data } = await api.get<IRecipients>(
      `/findTransferUserById/${userId}`,
    );

    if (data) {
      return data;
    }
  };

  return useQuery({
    queryKey: ['recipient-by-user-id', userId],
    queryFn: getRecipientByUserId,
    enabled: !!userId,
  });
};

export const useFrequentRecipients = () => {
  const getFrequentRecipients = async () => {
    const { data } = await api.get<IFrequentRecipients[]>('/frequencyKeys');

    if (data) {
      return data;
    }
  };

  return useQuery({
    queryKey: ['frequent-recipients'],
    queryFn: getFrequentRecipients,
  });
};
