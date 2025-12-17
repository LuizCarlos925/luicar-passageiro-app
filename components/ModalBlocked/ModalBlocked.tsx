import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';

import Text from '@/components/Text/Text';
import { Button } from '@/components/Button/Button';

import { colors } from '@/global/theme';

import { width } from '@/global/constants';
import { IconComponent } from '@/components/Icon/Icon';

export interface Props {
  isVisible: boolean;
  onPress: () => void;
  reason: string;
}

const { height: deviceHeight } = Dimensions.get('screen');

export const ModalBlocked = ({ isVisible, onPress, reason }: Props) => {
  return isVisible ? (
    <ReactNativeModal
      isVisible
      onBackdropPress={onPress}
      deviceHeight={deviceHeight}
      statusBarTranslucent
    >
      <Animated.View
        entering={ZoomIn}
        exiting={ZoomOut}
        style={styles.container}
      >
        <View
          style={[styles.iconWrapper, { backgroundColor: colors.error_40 }]}
        >
          <IconComponent name="ModalError" size={24} />
        </View>

        <Text
          size={20}
          fontWeight={600}
          color={colors.secondary_100}
          style={styles.text}
        >
          Atenção!{'\n'}
          <Text size={18} fontWeight={600} color={colors.secondary_100}>
            Você foi banido da plataforma
          </Text>
        </Text>

        <View style={{ width: '100%', gap: 4 }}>
          <Text size={16} fontWeight={600}>
            Motivo:
          </Text>
          <Text size={16} fontWeight={500} color={colors.primary_100}>
            {reason}
          </Text>
        </View>

        <Text size={14} fontWeight={600} style={styles.text}>
          Entre em contato com o suporte para resolver a situação.
        </Text>
        <Button onPress={onPress}>OK</Button>
      </Animated.View>
    </ReactNativeModal>
  ) : null;
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
  },
  text: {
    textAlign: 'center',
  },
});
