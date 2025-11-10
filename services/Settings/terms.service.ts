import { useQuery } from '@tanstack/react-query';

import { api } from '@/services/api';

import { ITerms } from '@/interfaces/terms';

export const useTerms = (isTerms: boolean) => {
  const getTerms = async () => {
    const { data } = await api.get<Meta<ITerms>>(`/terms/${isTerms ? 2 : 4}`, {
      params: {
        normalizeStrapi: true,
      },
    });

    if (data) {
      return data?.data;
    }
  };

  return useQuery({
    queryKey: ['terms', isTerms],
    queryFn: getTerms,
  });
};
