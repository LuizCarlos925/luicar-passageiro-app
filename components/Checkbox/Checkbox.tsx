import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { Feather } from '@expo/vector-icons';

import Text from '@/components/Text/Text';

import { theme } from '@/global/theme';

import { CheckWrapper, Container } from './styles';

type Props<TFieldValues extends FieldValues> = {
  label?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  size?: number;
  onPress?: () => void;
} & UseControllerProps<TFieldValues>;

export const Checkbox = <TFieldValues extends FieldValues>({
  label,
  control,
  name,
  style,
  labelStyle,
  size = 20,
  onPress,
}: Props<TFieldValues>) => {
  const { field } = useController({
    control,
    name,
  });

  return (
    <Container
      onPress={() => {
        if (onPress) {
          onPress();
        }
        field?.onChange(!field?.value);
      }}
      style={style}
    >
      <CheckWrapper
        style={{ width: size, height: size }}
        isChecked={field?.value}
      >
        {field?.value && (
          <Feather
            name="check"
            size={size - 4}
            color={theme.colors.neutro_00}
          />
        )}
      </CheckWrapper>
      {label && (
        <Text
          fontWeight={500}
          color={theme.colors.gray_1e}
          style={{ ...labelStyle }}
        >
          {label}
        </Text>
      )}
    </Container>
  );
};
