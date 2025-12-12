import axios, { AxiosError } from 'axios';

let showGlobalError: ((title: string, description: string) => void) | null =
  null;

let showGlobalSuccess: ((title: string, description: string) => void) | null =
  null;

export const setGlobalErrorHandler = (
  handler: (title: string, description: string) => void,
) => {
  showGlobalError = handler;
};

export const setGlobalSuccessHandler = (
  handler: (title: string, description: string) => void,
) => {
  showGlobalSuccess = handler;
};

export const handleError = (
  err: AxiosError | string | Error | unknown,
  customTitle?: string,
): void => {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(err, null, 2));
  let message = 'Houve um imprevisto, tente novamente mais tarde';
  const title = customTitle || 'Erro';

  if (axios.isAxiosError(err)) {
    message = handleCustomErrors(err);
  } else if (err instanceof Error) {
    message = err.message;
  } else if (typeof err === 'string') {
    message = err;
  }

  if (showGlobalError) {
    showGlobalError(title, message);
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

export const handleSuccess = (message: string, customTitle?: string): void => {
  const title = customTitle || 'Sucesso';

  if (showGlobalSuccess) {
    showGlobalSuccess(title, message);
  }
};
