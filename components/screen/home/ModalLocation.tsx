import { Dimensions, StyleSheet, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import { Image } from 'expo-image';

import { LocationImg } from '@/assets/images';

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

const ModalLocation = ({ isVisible, onPress, onBackPress }: Props) => {
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
        <Image source={LocationImg} style={styles.image} />

        <Text
          size={20}
          fontWeight={600}
          color={colors.secondary_100}
          style={styles.text}
        >
          Permitir que o aplicativo acesse sua localização?
        </Text>

        <Text size={16} color="neutral_60" style={styles.text}>
          Precisamos da sua localização para encontrar motoristas próximos,
          localizar pontos de embarque e destino, estimar tempo de viagem e
          mantê-lo seguro.
        </Text>

        <View style={styles.row}>
          <Button onPress={onBackPress} style={{ width: '48%' }} outline>
            Negar
          </Button>
          <Button onPress={onPress} style={{ width: '48%' }}>
            Permitir
          </Button>
        </View>
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

export default ModalLocation;
