import { theme } from '@/global/theme';
import React, { PropsWithChildren } from 'react';
import { Text as RNText, TextStyle } from 'react-native';

const fontWeights = {
  300: theme.fonts.light,
  400: theme.fonts.regular,
  500: theme.fonts.medium,
  600: theme.fonts.semibold,
  700: theme.fonts.bold,
};

interface Props {
  color?: string;
  size?: number;
  fontWeight?: keyof typeof fontWeights;
  style?: TextStyle;
  onPress?: () => void;
  numberOfLines?: number;
  marginTop?: number;
  textAlign?: 'left' | 'center' | 'right';
}

const Text = ({
  children,
  color = theme.colors.secondary_80,
  fontWeight = 400,
  size = 14,
  style,
  onPress,
  numberOfLines,
  marginTop,
  textAlign = 'left',
}: PropsWithChildren<Props>) => {
  return (
    <RNText
      style={{
        color,
        fontFamily: fontWeights[fontWeight],
        fontSize: size,
        lineHeight: size * 1.3,
        marginTop,
        textAlign,
        ...style,
      }}
      onPress={onPress}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
};

export default Text;
