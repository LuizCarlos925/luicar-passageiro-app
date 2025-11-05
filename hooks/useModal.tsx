import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
} from 'react';

import { Modal, ModalType } from '@/components/Modal/Modal';
import { modalsOptions } from '@/assets/json/modals';

interface IModal {
  name: keyof typeof modalsOptions;
  customHeader?: string;
  customTitle?: string;
  customDescription?: string;
  onPress?: () => void;
  onPressBack?: () => void;
}

interface IModalProvider {
  setModal: React.Dispatch<React.SetStateAction<IModal>>;
}

const ModalContext = createContext({} as IModalProvider);

const ModalProvider = ({ children }: PropsWithChildren) => {
  const [isVisible, setModal] = useState<IModal>({} as IModal);

  return (
    <ModalContext.Provider value={{ setModal }}>
      {children}
      <Modal
        isVisible={!!isVisible?.name}
        type={modalsOptions?.[isVisible?.name]?.type as ModalType}
        title={
          isVisible?.customTitle || modalsOptions?.[isVisible?.name]?.title
        }
        description={
          isVisible?.customDescription ||
          modalsOptions?.[isVisible?.name]?.description
        }
        textButton1={modalsOptions?.[isVisible?.name]?.textButton1}
        textButton2={modalsOptions?.[isVisible?.name]?.textButton2}
        onBackPress={() => {
          if (isVisible?.onPressBack) {
            isVisible.onPressBack();
          }
          setModal({} as IModal);
        }}
        onPress={() => {
          if (isVisible?.onPress) {
            isVisible.onPress();
          }
          setModal({} as IModal);
        }}
      />
    </ModalContext.Provider>
  );
};

export default ModalProvider;

export const useModal = () => useContext(ModalContext);
