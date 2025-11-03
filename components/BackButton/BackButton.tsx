import React from 'react';
import { ViewStyle } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChevronLeftIcon } from '@/assets';

import Text from '@/components/Text/Text';

import { theme } from '@/global/theme';

import { IconLeftWrapper } from './styles';

interface IBackButtonProps {
  title?: string;
  color?: string;
  size?: number;
  onPress?: () => void;
  style?: ViewStyle;
}

const BackButton = ({
  title = 'Voltar',
  size = 16,
  color = theme.colors.primary_100,
  onPress,
  style,
}: IBackButtonProps) => {
  const { top } = useSafeAreaInsets();

  return (
    <IconLeftWrapper
      onPress={() => {
        if (onPress) {
          return onPress();
        }
        router.back();
      }}
      style={[{ paddingTop: top }, style]}
    >
      <ChevronLeftIcon width={size} height={size} color={color} />
      <Text size={size} fontWeight={600} color={color}>
        {title}
      </Text>
    </IconLeftWrapper>
  );
};

export default BackButton;
