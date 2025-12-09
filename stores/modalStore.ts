import { ModalType } from '@/global/constants';
import { create } from 'zustand';

export interface ModalConfig {
  type: ModalType;
  title: string;
  description?: string;
  textButton1?: string;
  textButton2?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
}

interface ModalState {
  isVisible: boolean;
  config: ModalConfig | null;
  showModal: (config: ModalConfig) => void;
  hideModal: () => void;
  confirmModal: () => void;
  cancelModal: () => void;
}

export const useModalStore = create<ModalState>((set, get) => ({
  isVisible: false,
  config: null,

  showModal: (config: ModalConfig) => {
    set({
      isVisible: true,
      config: {
        textButton1: 'OK',
        ...config,
      },
    });
  },

  hideModal: () => {
    set({ isVisible: false, config: null });
  },

  confirmModal: () => {
    const { config } = get();
    config?.onConfirm?.();
    get().hideModal();
  },

  cancelModal: () => {
    const { config } = get();
    config?.onCancel?.();
    get().hideModal();
  },
}));
