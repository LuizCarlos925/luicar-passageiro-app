import { PropsWithChildren } from 'react';
import { Dimensions, StyleSheet, TextStyle, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';

import Text from '@/components/Text/Text';
import { Button } from '@/components/Button/Button';
import { IconComponent } from '@/components/Icon/Icon';

import { colors } from '@/global/theme';
import { width } from '@/global/constants';

const { height: deviceHeight } = Dimensions.get('screen');

export type ModalType = 'Success' | 'Error';

export interface Props {
  isVisible: boolean;
  onPress: () => void;
  onBackPress: () => void;
  title: string;
  description?: string;
  type: ModalType;
  titleStyles?: TextStyle;
  textButton1?: string;
  textButton2?: string;
}

const modalTypes = {
  Error: {
    icon: 'ModalError',
    primary_color: colors.error_60,
    secondary_color: colors.error_40,
  },
  Success: {
    icon: 'ModalSuccess',
    primary_color: colors.success_60,
    secondary_color: colors.success_40,
  },
} as const;

export const Modal = ({
  children,
  isVisible,
  onPress,
  onBackPress,
  title,
  description,
  type,
  titleStyles,
  textButton1,
  textButton2,
}: PropsWithChildren<Props>) => {
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
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: modalTypes[type].secondary_color },
          ]}
        >
          <IconComponent name={modalTypes[type].icon} size={24} />
        </View>

        <Text
          size={20}
          fontWeight={600}
          style={{ ...styles.text, ...titleStyles }}
        >
          {title}
        </Text>

        {description && (
          <Text size={16} color="neutral_60" style={styles.text}>
            {description}
          </Text>
        )}

        {children}

        <Buttons
          type={type}
          textButton1={textButton1}
          textButton2={textButton2}
          onPress={onPress}
          onBackPress={onBackPress}
        />
      </Animated.View>
    </ReactNativeModal>
  );
};

type ButtonsProps = {
  type: ModalType;
  textButton1?: string;
  textButton2?: string;
  onPress: () => void;
  onBackPress: () => void;
};

const Buttons = ({
  type,
  textButton1,
  textButton2,
  onPress,
  onBackPress,
}: ButtonsProps) => {
  if (textButton2) {
    return (
      <View style={styles.row}>
        <Button
          onPress={onBackPress}
          style={{ width: '48%' }}
          backgroundColor={modalTypes[type].secondary_color}
          textStyle={{ color: modalTypes[type].primary_color }}
        >
          {textButton1}
        </Button>
        <Button
          onPress={onPress}
          style={{ width: '48%' }}
          backgroundColor={modalTypes[type].primary_color}
          textStyle={{ color: colors.neutro_00 }}
        >
          {textButton2}
        </Button>
      </View>
    );
  }

  return (
    <Button
      onPress={onPress}
      backgroundColor={modalTypes?.[type]?.primary_color}
    >
      {textButton1}
    </Button>
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
  },
  text: {
    textAlign: 'center',
  },
});
