import { useQuery } from '@tanstack/react-query';

import { api } from '@/services/api';

import { ITerms } from '@/interfaces/terms';

export const useTerms = () => {
  const getTerms = async () => {
    const { data } = await api.get<ITerms[]>('/v1/terms?type=passageiro');

    if (data) {
      return data;
    }
  };

  return useQuery({
    queryKey: ['terms'],
    queryFn: getTerms,
  });
};
