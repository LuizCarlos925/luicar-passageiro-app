import React from 'react';
import { format } from 'date-fns';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { Car1 } from '@/assets/images';
import { ClockOutlineIcon } from '@/assets/icons';

import Text from '@/components/Text/Text';
import { IconComponent } from '@/components/Icon/Icon';
import { Divider } from '@/components/Divider/Divider';
import { CardDriver } from '@/components/CardDriver/CardDriver';

import { colors, theme } from '@/global/theme';

import { ITrip } from '@/interfaces/history';

import { formatCurrency } from '@/utils/format';
import { formatTripAddress } from '@/utils/formatAddress';

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
          {trip?.createdAt && format(trip.createdAt, 'dd/MM/yyyy')}
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
            {formatTripAddress(trip?.locals?.[0])}
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
            {formatTripAddress(trip?.locals?.[1])}
          </Text>
        </TextWrapper>
      </Row>

      <VehicleWrapper>
        <Image source={Car1} style={styles.image} />

        <TextWrapper style={{ flex: 1 }}>
          <Text fontWeight={600}>{trip?.vehicle?.plateNumber}</Text>
          <Text size={12}>Cor: {trip?.vehicle?.color?.name}</Text>
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
