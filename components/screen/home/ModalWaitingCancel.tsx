import { Dimensions, StyleSheet } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import { Image } from 'expo-image';

import { CancelImg } from '@/assets/images';

import Text from '@/components/Text/Text';
import { Button } from '@/components/Button/Button';

import { colors } from '@/global/theme';
import { width } from '@/global/constants';

const { height: deviceHeight } = Dimensions.get('screen');

export interface Props {
  isVisible: boolean;
  onPress: () => void;
  onBackPress: () => void;
}

const ModalWaitingCancel = ({ isVisible, onPress, onBackPress }: Props) => {
  if (!isVisible) {
    return null;
  }

  return (
    <ReactNativeModal
      isVisible
      onBackdropPress={onBackPress}
      deviceHeight={deviceHeight}
      statusBarTranslucent
    >
      <Animated.View
        entering={ZoomIn}
        exiting={ZoomOut}
        style={styles.container}
      >
        <Image source={CancelImg} style={styles.image} />

        <Text
          size={20}
          fontWeight={600}
          color={colors.secondary_100}
          style={styles.text}
        >
          Atenção!
        </Text>

        <Text size={16} color="neutral_60" style={styles.text}>
          Tem certeza que deseja cancelar?
        </Text>

        {/* <Text size={16} color="neutral_60" style={styles.text}>
          Uma taxa de{' '}
          <Text fontWeight={700} color={colors.primary_100}>
            R$ 5,00
          </Text>{' '}
          reais será aplicada caso cancele a corrida.{'\n\n'}Tem certeza que
          deseja cancelar?
        </Text> */}

        <Button onPress={onPress}>Cancelar corrida</Button>
        <Button onPress={onBackPress} outline>
          Continuar esperando
        </Button>
      </Animated.View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 16,
    borderRadius: 20,
    backgroundColor: colors.neutro_00,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 112,
    height: 112,
  },
  text: {
    textAlign: 'center',
  },
});

export default ModalWaitingCancel;
