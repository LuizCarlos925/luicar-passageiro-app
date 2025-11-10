import { api } from '@/services/api';
import { handleError } from '@/utils/handleError';

type Body = {
  cpf?: string;
  email?: string;
};

export const verifyData = async (form: Body) => {
  try {
    await api.post<string>('/validateUserPassenger', form);

    return true;
  } catch (error) {
    handleError(error);
    return false;
  }
};
