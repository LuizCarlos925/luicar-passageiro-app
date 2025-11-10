import { useQuery } from '@tanstack/react-query';

import { IBagTypes } from '@/interfaces/bagTypes';

import { api } from '@/services/api';

export type GroupedBagTypes = Record<string, IBagTypes[]>;

export const useBagTypes = () => {
  const getBagTypes = async () => {
    const { data } = await api.get<Paginated<IBagTypes>>('/bag-types', {
      params: {
        normalizeStrapi: true,
      },
    });

    if (data) {
      const grouped: GroupedBagTypes = data?.data?.reduce<GroupedBagTypes>(
        (acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = [];
          }
          acc[item.category].push(item);
          return acc;
        },
        {},
      );

      return grouped;
    }
  };

  return useQuery({
    queryKey: ['bag-types'],
    queryFn: getBagTypes,
  });
};
