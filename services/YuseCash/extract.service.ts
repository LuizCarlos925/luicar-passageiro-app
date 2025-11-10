import { useQuery } from '@tanstack/react-query';

import { IExtract } from '@/interfaces/extract';

import { useAuth } from '@/hooks/useAuth';

import { api } from '@/services/api';

export const useExtract = () => {
  const { user } = useAuth();

  const getExtract = async () => {
    const { data } = await api.get<Paginated<IExtract>>('/invoices', {
      params: {
        'filters[users_permissions_user]': user.id,
        'filters[yuseCash][$notnull]': true,
        // 'filters[status][$ne]': 'Pendente',
        'fields[0]': 'id',
        'fields[1]': 'type',
        'fields[2]': 'createdAt',
        'fields[3]': 'yuseCash',
        'fields[4]': 'action',
        'fields[5]': 'status',
        'fields[6]': 'typeKey',
        populate: ['sentBy', 'sentBy.driver', 'sentBy.passenger'],
        'sort[id]': 'desc',
        normalizeStrapi: true,
      },
    });

    if (data) {
      return data?.data?.filter(item => item?.status !== 'Pendente');
    }
  };

  return useQuery({
    queryKey: ['extract', user.id],
    queryFn: getExtract,
    enabled: !!user?.id,
  });
};
