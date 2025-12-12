import { Modal } from '@/components/ui';

import { useModalStore } from '@/stores/modalStore';

export const ModalProvider = () => {
  const { isVisible, config, confirmModal, cancelModal } = useModalStore();

  if (!config) {
    return null;
  }

  const handleConfirm = () => {
    confirmModal();
  };

  const handleCancel = () => {
    cancelModal();
  };

  return (
    <Modal
      isVisible={isVisible}
      onPress={handleConfirm}
      onBackPress={handleCancel}
      title={config.title}
      description={config.description}
      type={config.type}
      textButton1={config.textButton1}
      textButton2={config.textButton2}
    >
      {config.children}
    </Modal>
  );
};
