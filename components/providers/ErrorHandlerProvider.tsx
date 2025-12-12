import { useEffect } from 'react';
import { setGlobalErrorHandler } from '@/utils/handleError';
import { useGlobalModal } from '@/hooks/useGlobalModal';

export const ErrorHandlerProvider = () => {
  const { showError } = useGlobalModal();

  useEffect(() => {
    setGlobalErrorHandler((title: string, description: string) => {
      showError({ title, description, textButton1: 'Fechar' });
    });
  }, [showError]);

  return null;
};
