import { useQuery } from '@tanstack/react-query';

import { IFaq } from '@/interfaces/faq';

import { api } from '@/services/api';

export const useFAQs = () => {
  const getFAQs = async () => {
    const { data } = await api.get<Paginated<IFaq>>('/faqs', {
      params: {
        'filters[active]': true,
        normalizeStrapi: true,
      },
    });

    if (data) {
      return data?.data;
    }
  };

  return useQuery({
    queryKey: ['faqs'],
    queryFn: getFAQs,
  });
};
