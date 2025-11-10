import React from 'react';

import { ClockOutlineIcon } from '@/assets/icons';

import Text from '@/components/Text/Text';
import { Divider } from '@/components/Divider/Divider';

import { colors, theme } from '@/global/theme';

import { formatCurrency } from '@/utils/format';
import { ITrip } from '@/interfaces/history';
import { CardDriver } from '@/components/CardDriver/CardDriver';

import { Image } from 'expo-image';
import { Car1 } from '@/assets/images';
import { StyleSheet, View } from 'react-native';
import { IconComponent } from '@/components/Icon/Icon';
import {
  Container,
  Row,
  TextWrapper,
  TrailWrapper,
  VehicleWrapper,
  VerticalLine,
} from './styles';

interface Props {
  trip: ITrip;
  onPress: () => void;
  onPressRate: () => void;
}

export const CardHistoryRating = ({ trip, onPress, onPressRate }: Props) => {
  return (
    <Container onPress={onPress}>
      <View style={styles.dateWrapper}>
        <Text size={12} color={colors.secondary_60}>
          Corrida realizada em
        </Text>
        <Text size={12} fontWeight={500} color={colors.secondary_80}>
          15/09/2025
        </Text>
      </View>

      <Divider />

      <CardDriver
        driver={trip?.driver}
        tripsQuantity={Number(trip?.driverTripCount || 0)}
        onPress={onPressRate}
      />

      <Divider />

      <Row>
        <TrailWrapper>
          <IconComponent name="PinIcon" size={12} color={colors.primary_60} />
          <VerticalLine />
          <IconComponent name="FlagIcon" size={12} />
        </TrailWrapper>

        <TextWrapper style={{ width: '100%', gap: 10, paddingRight: 10 }}>
          <Text size={12} style={{ width: '90%' }}>
            {trip?.locals?.[0]?.addressString}
          </Text>
          <Row style={{ width: undefined, gap: 5 }}>
            <ClockOutlineIcon
              width={14}
              height={14}
              color={theme.colors.primary_100}
            />
            <Text size={12} color={colors.primary_100}>
              {trip?.routeTime?.replace('mins', 'min')}
            </Text>
          </Row>
          <Text size={12} style={{ width: '90%' }}>
            {trip?.locals?.[1]?.addressString}
          </Text>
        </TextWrapper>
      </Row>

      <VehicleWrapper>
        <Image source={Car1} style={styles.image} />

        <TextWrapper style={{ flex: 1 }}>
          <Text fontWeight={600}>QII3W20</Text>
          <Text size={12}>Cor: vermelho</Text>
        </TextWrapper>

        <Text size={16} fontWeight={600} color={theme.colors.secondary_100}>
          {formatCurrency(trip?.totalValue)}
        </Text>
      </VehicleWrapper>
    </Container>
  );
};

const styles = StyleSheet.create({
  dateWrapper: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 60,
    height: 40,
  },
});
