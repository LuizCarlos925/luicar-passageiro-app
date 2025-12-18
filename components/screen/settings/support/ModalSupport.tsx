import { Dimensions, Linking, StyleSheet, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import { Image } from 'expo-image';

import Text from '@/components/Text/Text';
import { Button } from '@/components/Button/Button';

import { colors } from '@/global/theme';
import { width } from '@/global/constants';
import { Support } from '@/assets/images';
import { handleError } from '@/utils/handleError';

const { height: deviceHeight } = Dimensions.get('screen');

export interface Props {
  isVisible: boolean;
  onBackPress: () => void;
}

const ModalSupport = ({ isVisible, onBackPress }: Props) => {
  const handleOpenEmail = () => {
    try {
      Linking.openURL('mailto:suporte@luicar.com.br');
      onBackPress();
    } catch (error) {
      handleError('Não foi possível abrir o e-mail.');
    }
  };

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
        <Image source={Support} style={styles.image} />

        <Text
          size={20}
          fontWeight={600}
          color={colors.secondary_100}
          style={styles.text}
        >
          Entrar em contato com o suporte
        </Text>

        <Text size={16} color="neutral_60" style={styles.text}>
          Clique em continuar e seja redirecionado para a conversa com a nossa
          equipe através do e-mail.
        </Text>

        <View style={styles.row}>
          <Button onPress={onBackPress} style={{ width: '48%' }} outline>
            Cancelar
          </Button>
          <Button onPress={handleOpenEmail} style={{ width: '48%' }}>
            Continuar
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

export default ModalSupport;
