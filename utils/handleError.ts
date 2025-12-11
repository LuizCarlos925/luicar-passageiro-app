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

const handleCustomErrors = (error: any) => {
  const err =
    error.response?.data?.error?.message || error.response?.data?.message;

  if (!err) {
    return 'Houve um imprevisto, tente novamente mais tarde';
  }

  if (err?.includes('Invalid credentials')) {
    return 'Sua sessão expirou, faça login novamente!';
  }
  if (err?.includes('Invalid format, expected a timestamp')) {
    return 'Insira uma data válida';
  }
  if (err?.includes('Invalid time format')) {
    return 'Horário inválido';
  }
  if (err?.includes('Passwords do not match')) {
    return 'Senhas não correspondem';
  }
  if (err?.includes('Your new password must be')) {
    return 'Sua nova senha deve ser diferente da atual';
  }
  if (err?.includes('The provided current password')) {
    return 'Senha atual é inválida';
  }
  if (err?.includes('The request is invalid')) {
    return 'Dados inválidos';
  }
  if (err?.includes('Invalid identifier or password')) {
    return 'E-mail e/ou senha inválidos.';
  }
  if (err?.includes('The bank account holder document must be equal')) {
    return 'O CPF do titular da conta bancária deve ser igual ao CPF do motorista';
  }

  return err;
};

export const handleSuccess = (message: string): void => {
  Toast.show({
    type: 'success',
    text1: message,
  });
};
