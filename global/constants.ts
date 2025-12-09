import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export { width, height };

export type ModalType = 'Success' | 'Error' | 'Alert' | 'Image';
