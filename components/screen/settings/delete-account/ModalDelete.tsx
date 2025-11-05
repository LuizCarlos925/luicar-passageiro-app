import { Dimensions, StyleSheet, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';

import Text from '@/components/Text/Text';
import { Button } from '@/components/Button/Button';
import { IconComponent } from '@/components/Icon/Icon';

import { colors } from '@/global/theme';
import { width } from '@/global/constants';
import Input from '@/components/Input/Input';
import { useForm } from 'react-hook-form';

const { height: deviceHeight } = Dimensions.get('screen');

export interface Props {
  isVisible: boolean;
  onPress: () => void;
  onBackPress: () => void;
}

const ModalDelete = ({ isVisible, onPress, onBackPress }: Props) => {
  const { control } = useForm();

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
        <View style={styles.iconWrapper}>
          <IconComponent name="ModalAlert" size={24} />
        </View>

        <Text
          size={20}
          fontWeight={600}
          color={colors.secondary_100}
          style={styles.text}
        >
          Informar senha
        </Text>

        <Text size={16} color="neutral_60" style={styles.text}>
          Para continuar com a exclusão, é necessário informar sua senha
        </Text>

        <Input
          name="password"
          control={control}
          placeholder="Digite sua senha..."
          password
        />

        <View style={styles.row}>
          <Button
            onPress={onBackPress}
            style={styles.btnOutline}
            textStyle={{ color: colors.alert_60 }}
            outline
          >
            Cancelar
          </Button>
          <Button
            onPress={onPress}
            style={{ width: '48%' }}
            backgroundColor={colors.alert_60}
          >
            Excluir
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
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.alert_40,
  },
  image: {
    width: 112,
    height: 112,
  },
  btnOutline: {
    width: '48%',
    borderColor: colors.alert_60,
  },
  text: {
    textAlign: 'center',
  },
});

export default ModalDelete;
