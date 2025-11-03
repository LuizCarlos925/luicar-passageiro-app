import React from 'react';

import { StarIcon } from '@/assets/icons';

import Text from '@/components/Text/Text';

import { theme } from '@/global/theme';

import { border } from '@/global/shadow';
import { AvatarImage } from '@/components/AvatarImage/AvatarImage';

import {
  Container,
  ProfileWrapper,
  RatingWrapper,
  Row,
  TextMarker,
} from './styles';

type Props = {
  driver?: Driver;
  tripsQuantity?: number;
  hasBorder?: boolean;
  isRatingGreen?: boolean;
  onPress?: () => void;
};

export const CardDriver = ({
  driver,
  tripsQuantity,
  hasBorder,
  isRatingGreen,
  onPress,
}: Props) => {
  const rating = '0.0';

  return (
    <Container
      style={hasBorder && border.default}
      hasBorder={hasBorder}
      onPress={onPress}
    >
      <AvatarImage uri={driver?.image?.url || ''} size={35} />

      <ProfileWrapper>
        {driver?.socialName ? (
          <Text size={16} fontWeight={600} color={theme.colors.primary_100}>
            {driver?.socialName}
          </Text>
        ) : (
          <Text size={16} fontWeight={600} color={theme.colors.primary_100}>
            {driver?.firstName} {driver?.lastName}
          </Text>
        )}

        <Row>
          <StarIcon width={10} height={10} />
          <Text size={11} color={theme.colors.primary_100}>
            {rating}
          </Text>
          <TextMarker />
          <Text size={11} color={theme.colors.primary_100}>
            {tripsQuantity || 0} viagens
          </Text>
        </Row>
      </ProfileWrapper>

      {!hasBorder && driver?.review?.my_rating && (
        <RatingWrapper isActive={isRatingGreen}>
          <Text
            size={16}
            fontWeight={600}
            color={
              isRatingGreen ? theme.colors.neutro_00 : theme.colors.primary_100
            }
          >
            {driver?.review?.my_rating}
          </Text>
          <StarIcon />
        </RatingWrapper>
      )}
    </Container>
  );
};
