import React from 'react';

import { PinIcon } from '@/assets/icons';

import Text from '@/components/Text/Text';

import { colors } from '@/global/theme';

import { Container, TextWrapper } from './styles';

interface Props {
  title: string;
  description: string;
  onPress?: () => void;
  isSelected?: boolean;
  hasBorder?: boolean;
}

export const Place = ({
  title,
  description,
  onPress,
  isSelected,
  hasBorder = true,
}: Props) => {
  return (
    <Container onPress={onPress} isSelected={isSelected} hasBorder={hasBorder}>
      <PinIcon color={colors.primary_60} />
      <TextWrapper>
        <Text size={16} color={colors.secondary_100}>
          {title}
        </Text>
        <Text color={colors.secondary_60} numberOfLines={1}>
          {description}
        </Text>
      </TextWrapper>
    </Container>
  );
};
