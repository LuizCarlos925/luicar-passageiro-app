import React, { PropsWithChildren } from 'react';
import { border, shadow } from '@/global/shadow';
import { ViewStyle } from 'react-native';
import { Container } from './styles';

interface Props {
  direction?: 'row' | 'column';
  marginTop?: number | 'auto';
  marginBottom?: number;
  padding?: number;
  gap?: number;
  borderRadius?: number;
  hasBorder?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Card = ({
  children,
  direction = 'column',
  marginTop = 15,
  marginBottom = 15,
  padding = 8,
  gap = 10,
  borderRadius = 15,
  hasBorder = false,
  disabled = false,
  onPress,
  style,
}: PropsWithChildren<Props>) => {
  return (
    <Container
      onPress={onPress}
      style={[
        hasBorder && border.default,
        {
          flexDirection: direction,
          marginTop,
          marginBottom,
          padding,
          gap,
          borderRadius,
        },
        style,
      ]}
      disabled={disabled}
    >
      {children}
    </Container>
  );
};
