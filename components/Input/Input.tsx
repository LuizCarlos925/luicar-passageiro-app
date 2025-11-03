import React, { useState } from 'react';
import { TextInputProps, TextStyle, View, ViewStyle } from 'react-native';
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

import { theme } from '@/global/theme';

import { shadow } from '@/global/shadow';
import { EyeClosedIcon, EyeOpenIcon } from '@/assets/icons';
import {
  InputContainer,
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
  labelWeight?: 400 | 500 | 600 | 700;
  labelColor?: string;
  width?: number | `${number}%`;
  iconLeft?: IconT;
  iconColor?: string;
  onPressIcon?: () => void;
  onPressIconRight?: () => void;
  hasShadow?: boolean;
  googleMaps?: boolean;
  disableErrorMessage?: boolean;
  iconRight?: IconT;
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
  labelWeight = 400,
  labelColor = theme.colors.gray_1e,
  iconColor = theme.colors.neutro_100,
  onPressIcon,
  hasShadow,
  disableErrorMessage,
  iconRight,
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
      return theme.colors.primary_100;
    }

    if (error?.message) {
      return theme.colors.red_d1;
    }

    return theme.colors.neutro_20;
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
        <IconWrapper onPress={onPressIcon}>
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
        <Text
          size={16}
          fontWeight={labelWeight}
          color={labelColor}
          style={{ marginBottom: 8, ...labelStyle }}
        >
          {label}
        </Text>
      )}
      <InputContainer
        style={[
          containerStyle,
          hasShadow && shadow.default,
          { borderColor: handleBorderColor() },
        ]}
      >
        {renderIcon()}
        {type ? (
          <TextInputMasked
            onChangeText={text => {
              if (props.onChangeText) {
                props.onChangeText(text);
              }
              field.onChange(text);
            }}
            value={field.value}
            refInput={field.ref}
            type={type}
            secureTextEntry={passwordHidden}
            placeholderTextColor={theme.colors.neutro_40}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />
        ) : (
          <TextInput
            onChangeText={text => {
              if (props.onChangeText) {
                props.onChangeText(text);
              }
              field.onChange(text);
            }}
            ref={field.ref}
            secureTextEntry={passwordHidden}
            placeholderTextColor={theme.colors.neutro_40}
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
              <EyeClosedIcon color={theme.colors.secondary_60} />
            ) : (
              <EyeOpenIcon color={theme.colors.secondary_60} />
            )}
          </ButtonEye>
        )}
      </InputContainer>
      {!disableErrorMessage && <ErrorMessage>{error?.message}</ErrorMessage>}
    </View>
  );
};

export default Input;
