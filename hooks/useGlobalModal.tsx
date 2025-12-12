import { useModalStore, ModalConfig } from '@/stores/modalStore';

export const useGlobalModal = () => {
  const { showModal, hideModal } = useModalStore();

  const showSuccess = ({
    title,
    description,
    textButton1,
    textButton2,
    onConfirm,
    onCancel,
  }: {
    title: string;
    description?: string;
    textButton1?: string;
    textButton2?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }) => {
    showModal({
      type: 'Success',
      title,
      description,
      textButton1,
      textButton2,
      onConfirm,
      onCancel,
    });
  };

  const showError = ({
    title,
    description,
    textButton1,
    textButton2,
    onConfirm,
    onCancel,
  }: {
    title: string;
    description?: string;
    textButton1?: string;
    textButton2?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }) => {
    showModal({
      type: 'Error',
      title,
      description,
      textButton1,
      textButton2,
      onConfirm,
      onCancel,
    });
  };

  const showAlert = ({
    title,
    description,
    textButton1,
    textButton2,
    onConfirm,
    onCancel,
  }: {
    title: string;
    description?: string;
    textButton1?: string;
    textButton2?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }) => {
    showModal({
      type: 'Alert',
      title,
      description,
      textButton1,
      textButton2,
      onConfirm,
      onCancel,
    });
  };

  const showCustom = (config: ModalConfig) => {
    showModal(config);
  };

  return {
    showSuccess,
    showError,
    showAlert,
    showCustom,
    hideModal,
  };
};
