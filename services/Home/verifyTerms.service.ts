import { api } from '@/services/api';

export const handleVerifyTerms = async () => {
  const { data } = await api.get<boolean>('/verifyTerm');

  if (data) {
    return data;
  }
  return false;
};
