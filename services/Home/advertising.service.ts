import { useQuery } from '@tanstack/react-query';

import { IAdvertising } from '@/interfaces/advertising';

import { api } from '@/services/api';

export const useAdvertising = () => {
  const getAdvertising = async () => {
    const { data } = await api.get<IAdvertising>('/v1/company/banners');

    if (data) {
      return data?.announcements;
    }
    return [];
  };

  return useQuery({
    queryKey: ['advertising'],
    queryFn: getAdvertising,
  });
};
