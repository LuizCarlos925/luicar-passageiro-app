import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';

import { colors } from '@/global/theme';
import { width } from '@/global/constants';

import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { router } from 'expo-router';
import { IconComponent } from '@/components/Icon/Icon';
import Text from '@/components/Text/Text';
import { Button } from '@/components/Button/Button';

const { height: deviceHeight } = Dimensions.get('screen');

export interface Props {
  isVisible: boolean;
  onBackPress: () => void;
}

const ModalTerms = ({ isVisible, onBackPress }: Props) => {
  const [checked, setChecked] = useState(false);

  if (!isVisible) {
    return null;
  }

  return (
    <ReactNativeModal
      isVisible
      deviceHeight={deviceHeight}
      statusBarTranslucent
    >
      <Animated.View
        entering={ZoomIn}
        exiting={ZoomOut}
        style={styles.container}
      >
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: `${colors.primary_100}20` },
          ]}
        >
          <IconComponent name="ModalAlert" size={24} />
        </View>

        <Text
          size={20}
          fontWeight={600}
          color="secondary_100"
          style={styles.text}
        >
          Atualização!
        </Text>

        <Text size={16} color="secondary_60" style={styles.text}>
          Atualizamos nossos Termos de Serviço e Política de Privacidade. Para
          continuar utilizando a nossa plataforma leia e aceite os novos termos.
        </Text>

        <View style={styles.row}>
          <Pressable
            style={[
              styles.check,
              checked && { backgroundColor: colors.primary_100 },
            ]}
            onPress={() => setChecked(!checked)}
          >
            {checked && <AntDesign name="check" size={14} color="white" />}
          </Pressable>

          <Text style={{ flexShrink: 1 }}>
            Li e concordo com os{' '}
            <Text
              fontWeight={500}
              color="primary_100"
              onPress={() => router.push('/(main)/Settings/Terms')}
            >
              Termos de uso e Política de Privacidade
            </Text>{' '}
          </Text>
        </View>

        <Button onPress={onBackPress} disabled={!checked}>
          Continuar
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
    gap: 12,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  check: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary_100,
  },
});

export default ModalTerms;
