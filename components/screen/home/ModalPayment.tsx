import { Dimensions, StyleSheet } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import { Image } from 'expo-image';

import { CoinsImg } from '@/assets/images';

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

const ModalPayment = ({ isVisible, onPress, onBackPress }: Props) => {
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
        <Text size={20} fontWeight={600} style={styles.text}>
          Corrida solicitada com sucesso!
        </Text>

        <Image source={CoinsImg} style={styles.image} />

        <Text size={16} fontWeight={600} style={styles.text}>
          Obrigado por apoiar nossos motoristas!
        </Text>

        <Text size={16} color={colors.secondary_60} style={styles.text}>
          Sua gorjeta faz a diferença e ajuda a valorizar o trabalho deles.
          Sempre que precisar, conte com a Luicar para suas viagens!
        </Text>

        <Button onPress={onPress}>Continuar</Button>
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

export default ModalPayment;
