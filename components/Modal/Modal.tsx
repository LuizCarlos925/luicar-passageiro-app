import React, { PropsWithChildren } from 'react';
import { TextStyle, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';

import { Blur } from '@/assets/images';
import { ModalAlert, ModalSuccess } from '@/assets/icons';

import Text from '@/components/Text/Text';
import { Button } from '@/components/Button/Button';

import { theme } from '@/global/theme';

import { ContainerWrapper, IconWrapper, ImageBlur, Row } from './styles';

export type ModalType = 'Success' | 'Error' | 'Info';

export interface Props {
  isVisible: boolean;
  onPress: () => void;
  onBackPress?: () => void;
  title: string;
  description?: string;
  type: ModalType;
  titleStyles?: TextStyle;
  textButton1?: string;
  textButton2?: string;
  isYesNo?: boolean;
  isVerticalButtons?: boolean;
  gap?: number;
  highlightedTextColor?: string;
  highlightedTextLineHeight?: number;
  customModalTitle?: string;
}

const ContainerAnimated = Animated.createAnimatedComponent(ContainerWrapper);

const handleTypeModal = (type: ModalType) => {
  if (type === 'Success') {
    return {
      title: 'Sucesso!',
      titleColor: theme.colors.green_2d,
      iconColor: theme.colors.green_ab,
      icon: (
        <ModalSuccess width={20} height={20} color={theme.colors.green_2d} />
      ),
      backgroundColor: theme.colors.primary_60,
    };
  }
  if (type === 'Error') {
    return {
      title: 'Atenção!',
      titleColor: theme.colors.red_d1,
      iconColor: undefined,
      icon: <ModalAlert width={35} height={35} />,
      backgroundColor: theme.colors.primary_60,
    };
  }
  if (type === 'Info') {
    return {
      title: 'Terminando uma viagem',
      titleColor: theme.colors.primary_60,
      iconColor: undefined,
      icon: undefined,
      backgroundColor: theme.colors.primary_60,
    };
  }
};

export const Modal = ({
  children,
  isVisible,
  onPress,
  onBackPress,
  title,
  description,
  type,
  titleStyles,
  textButton1 = 'Voltar',
  textButton2 = 'Cadastrar',
  isYesNo,
  isVerticalButtons,
  gap = 10,
  highlightedTextColor,
  highlightedTextLineHeight = 0,
  customModalTitle,
}: PropsWithChildren<Props>) => {
  const splitDescription = description?.split('%%');

  const renderButtons = () => {
    if (isVerticalButtons) {
      return (
        <View
          style={{
            width: '100%',
            gap: 10,
          }}
        >
          <Button onPress={type === 'Success' ? onPress : onBackPress}>
            {textButton1}
          </Button>
          <Button onPress={type === 'Success' ? onBackPress : onPress} outline>
            {textButton2}
          </Button>
        </View>
      );
    }
    if (isYesNo) {
      return (
        <Row>
          <Button onPress={onBackPress} style={{ width: '48%' }} outline>
            {textButton1}
          </Button>
          <Button onPress={onPress} style={{ width: '48%' }}>
            {textButton2}
          </Button>
        </Row>
      );
    }
    return (
      <Button
        onPress={onPress}
        height={51}
        fontSize={16}
        style={{ borderRadius: 15 }}
        backgroundColor={handleTypeModal(type)?.backgroundColor}
      >
        {textButton1}
      </Button>
    );
  };

  return isVisible ? (
    <>
      <ImageBlur source={Blur} />
      <ReactNativeModal
        onBackdropPress={onBackPress}
        isVisible={isVisible}
        backdropColor="transparent"
      >
        <ContainerAnimated entering={ZoomIn} exiting={ZoomOut} style={{ gap }}>
          <Row style={{ justifyContent: 'flex-start', gap: 10 }}>
            {handleTypeModal(type)?.icon && (
              <IconWrapper
                style={{ backgroundColor: handleTypeModal(type)?.iconColor }}
              >
                {handleTypeModal(type)?.icon}
              </IconWrapper>
            )}

            <Text
              size={type === 'Info' ? 22 : 28}
              fontWeight={700}
              color={handleTypeModal(type)?.titleColor}
              marginTop={10}
              style={titleStyles}
            >
              {customModalTitle || handleTypeModal(type)?.title}
            </Text>
          </Row>

          <View style={{ marginTop: 5, gap: 10 }}>
            <Text
              size={18}
              fontWeight={600}
              color={theme.colors.primary_100}
              style={titleStyles}
            >
              {title}
            </Text>
            {description && (
              <Text size={16} color={theme.colors.primary_100}>
                {splitDescription?.[0]}
                <Text
                  size={16}
                  fontWeight={600}
                  color={highlightedTextColor || theme.colors.primary_100}
                  style={{ lineHeight: 20 + highlightedTextLineHeight }}
                >
                  {splitDescription?.[1]}
                </Text>
                {splitDescription?.[2]}
              </Text>
            )}
            {children}
          </View>

          <View style={{ marginTop: 30 }}>{renderButtons()}</View>
        </ContainerAnimated>
      </ReactNativeModal>
    </>
  ) : null;
};
