import axios, { AxiosError } from 'axios';
import Toast from 'react-native-toast-message';

export const handleError = (
  err: AxiosError | string | Error | unknown,
): void => {
  console.log(JSON.stringify(err, null, 2));
  if (axios.isAxiosError(err)) {
    const message = handleCustomErrors(err);
    return Toast.show({
      type: 'error',
      text1: message,
    });
  }
  if (err instanceof Error) {
    console.log(err.message);
    return Toast.show({
      type: 'error',
      text1: err.message,
    });
  }
  if (typeof err === 'string') {
    console.log(err);
    return Toast.show({
      type: 'error',
      text1: err,
    });
  }
};

const handleCustomErrors = (error: AxiosError) => {
  const err =
    error.response?.data?.error?.message || error.response?.data?.message;

  if (!err) {
    return 'Houve um imprevisto, tente novamente mais tarde';
  }

  if (
    err?.includes('Passwords do not match') ||
    err?.includes('The provided current password')
  ) {
    return 'Senha atual inválida';
  }

  if (err?.includes('Invalid identifier or password')) {
    return 'E-mail e/ou senha inválidos.';
  }

  return err;
};

export const handleSuccess = (message: string): void => {
  Toast.show({
    type: 'success',
    text1: message,
  });
};
