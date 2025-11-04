import React from 'react';

import Text from '@/components/Text/Text';

import { colors, theme } from '@/global/theme';

import { AvatarImage } from '@/components/AvatarImage/AvatarImage';

import { Pressable, StyleSheet } from 'react-native';
import { IconComponent } from '@/components/Icon/Icon';
import {
  Container,
  ProfileWrapper,
  RatingWrapper,
  Row,
  TextMarker,
} from './styles';

type Props = {
  driver?: Driver;
  onPress?: () => void;
};

export const CardDriver = ({ driver, onPress }: Props) => {
  const rating = Math.floor(Math.random() * 2) + 4;
  const hasRating = rating >= 4.5;

  return (
    <Container onPress={onPress}>
      <AvatarImage uri={driver?.image?.url || ''} size={38} />

      <ProfileWrapper>
        <Text size={16} fontWeight={600} color={theme.colors.secondary_100}>
          Flávio Oliveira
        </Text>

        <Row>
          <IconComponent name="StarIcon" size={14} />
          <Text size={12}>{rating?.toFixed(1)}</Text>

          <TextMarker />

          <IconComponent name="CarIcon" size={16} />
          <Text size={12}>2405 viagens</Text>
        </Row>
      </ProfileWrapper>

      {hasRating ? (
        <RatingWrapper>
          <IconComponent name="StarFilledIcon" size={18} />
          <Text fontWeight={600}>{rating?.toFixed(1)}</Text>
        </RatingWrapper>
      ) : (
        <Pressable onPress={() => null} style={styles.rateBtn}>
          <Text fontWeight={600} color={colors.primary_100}>
            Avaliar
          </Text>
        </Pressable>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  rateBtn: {
    width: 70,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.primary_20,
  },
});
