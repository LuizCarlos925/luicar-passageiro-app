import { useEffect } from 'react';
import { setGlobalErrorHandler, setGlobalSuccessHandler } from '@/utils/handleError';
import { useGlobalModal } from '@/hooks/useGlobalModal';

export const ErrorHandlerProvider = () => {
  const { showError, showSuccess } = useGlobalModal();

  useEffect(() => {
    setGlobalErrorHandler((title: string, description: string) => {
      showError({ title, description, textButton1: 'Fechar' });
    });

    setGlobalSuccessHandler((title: string, description: string) => {
      showSuccess({ title, description, textButton1: 'Fechar' });
    });
  }, [showError, showSuccess]);

  return null;
};
