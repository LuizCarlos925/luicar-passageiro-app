import { useQuery } from '@tanstack/react-query';

import { api } from '@/services/api';

import { IWarning } from '@/interfaces/warning';

export const useWarnings = () => {
  const getWarnings = async () => {
    const { data } = await api.get<IWarning[]>('/listPassengerWarnings');

    if (data) {
      return data;
    }
  };

  return useQuery({
    queryKey: ['warnings'],
    queryFn: getWarnings,
  });
};
