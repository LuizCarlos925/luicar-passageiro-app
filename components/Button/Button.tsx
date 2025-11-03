import React, { PropsWithChildren } from 'react';

import {
  ActivityIndicator,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

import { IconComponent, IconT } from '@/components/Icon/Icon';

import Text from '@/components/Text/Text';
import { theme } from '@/global/theme';
import { useDisableDelay } from '@/hooks/useDebounce';

import { Container } from './styles';

interface Props extends TouchableOpacityProps {
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  outline?: boolean;
  isLoading?: boolean;
  iconLeft?: IconT;
  iconRight?: IconT;
  fontSize?: number;
  fontColor?: string;
  height?: number;
  backgroundColor?: string;
  withoutDelay?: boolean;
}

export const Button = ({
  children,
  onPress,
  style,
  textStyle,
  outline,
  isLoading,
  iconLeft,
  iconRight,
  fontSize = 18,
  fontColor = theme.colors.neutro_00,
  height = 45,
  backgroundColor = theme.colors.primary_100,
  withoutDelay,
  ...props
}: PropsWithChildren<Props>) => {
  const { executeWithDelay, isLoading: loading } = useDisableDelay();

  const handlePress = async () => {
    if (onPress && withoutDelay) {
      return onPress();
    }
    if (onPress) {
      return executeWithDelay(onPress);
    }
  };

  const renderIcon = () => {
    if (iconLeft) {
      return (
        <IconComponent name={iconLeft} size={fontSize + 4} color={fontColor} />
      );
    }
  };

  const renderIconRight = () => {
    if (iconRight) {
      return (
        <IconComponent name={iconRight} size={fontSize + 4} color={fontColor} />
      );
    }
  };

  return (
    <Container
      onPress={handlePress}
      style={[
        {
          height,
          borderWidth: outline ? 1.5 : 0,
          borderColor: outline ? theme.colors.primary_100 : undefined,
          backgroundColor:
            outline && backgroundColor === theme.colors.primary_100
              ? 'transparent'
              : backgroundColor,
        },
        style,
      ]}
      disabled={props?.disabled || isLoading}
      {...props}
    >
      {isLoading || loading ? (
        <ActivityIndicator
          size={fontSize}
          color={outline ? theme.colors.primary_100 : fontColor}
        />
      ) : (
        <>
          {renderIcon()}
          <Text
            size={fontSize}
            fontWeight={600}
            color={outline ? theme.colors.primary_100 : fontColor}
            style={textStyle}
          >
            {children}
          </Text>
          {renderIconRight()}
        </>
      )}
    </Container>
  );
};
