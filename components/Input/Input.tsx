import React, { useState } from 'react';
import {
  StyleSheet,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import {
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';

import Text from '@/components/Text/Text';
import { IconComponent, IconT } from '@/components/Icon/Icon';

import { colors } from '@/global/theme';

import { EyeClosedIcon, EyeOpenIcon } from '@/assets/icons';
import {
  ErrorMessage,
  TextInput,
  TextInputMasked,
  ButtonEye,
  IconWrapper,
} from './styles';

export type InputProps<TFieldValues extends FieldValues> = {
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  marginTop?: number | `${number}%` | 'auto';
  type?: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp;
  password?: boolean;
  label?: string;
  width?: number | `${number}%`;
  iconLeft?: IconT;
  iconRight?: IconT;
  iconColor?: string;
  onPressIconRight?: () => void;
} & TextInputProps &
  UseControllerProps<TFieldValues>;

const Input = <TFieldValues extends FieldValues>({
  control,
  name,
  containerStyle,
  labelStyle,
  marginTop,
  type,
  password,
  label,
  width = '100%',
  iconLeft,
  iconRight,
  iconColor = colors.neutro_100,
  onPressIconRight,
  ...props
}: InputProps<TFieldValues>) => {
  const [focused, setFocused] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(password);

  if (!control) {
    throw new Error('Control não foi passado como prop');
  }

  if (!name) {
    throw new Error('Name não foi passado como prop');
  }

  const handleBorderColor = () => {
    if (focused) {
      return colors.primary_100;
    }

    if (error?.message) {
      return colors.red_d1;
    }

    return colors.neutro_20;
  };

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const renderIcon = () => {
    if (iconLeft) {
      return (
        <IconWrapper>
          <IconComponent name={iconLeft} size={16} color={iconColor} />
        </IconWrapper>
      );
    }
  };

  const renderIconRight = () => {
    if (iconRight) {
      return (
        <IconWrapper onPress={onPressIconRight} hitSlop={10}>
          <IconComponent name={iconRight} size={16} color={iconColor} />
        </IconWrapper>
      );
    }
  };

  return (
    <View style={{ width, marginTop }}>
      {label && (
        <Text size={16} style={{ marginBottom: 8, ...labelStyle }}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputWrapper,
          { borderColor: handleBorderColor() },
          containerStyle,
        ]}
      >
        {renderIcon()}
        {type ? (
          <TextInputMasked
            onChangeText={(text: string) => {
              if (props.onChangeText) {
                props.onChangeText(text);
              }
              field.onChange(text);
            }}
            value={field.value}
            refInput={field.ref}
            type={type}
            secureTextEntry={passwordHidden}
            placeholderTextColor={colors.neutro_40}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />
        ) : (
          <TextInput
            onChangeText={(text: string) => {
              if (props.onChangeText) {
                props.onChangeText(text);
              }
              field.onChange(text);
            }}
            ref={field.ref}
            secureTextEntry={passwordHidden}
            placeholderTextColor={colors.neutro_40}
            value={field.value}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              field.onBlur();
            }}
            {...props}
          />
        )}

        {renderIconRight()}

        {password && (
          <ButtonEye onPress={() => setPasswordHidden(!passwordHidden)}>
            {passwordHidden ? (
              <EyeClosedIcon color={colors.primary_100} />
            ) : (
              <EyeOpenIcon color={colors.secondary_60} />
            )}
          </ButtonEye>
        )}
      </View>
      {error?.message && <ErrorMessage>{error?.message}</ErrorMessage>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 45,
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 6,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: colors.neutro_00,
  },
});

export default Input;
