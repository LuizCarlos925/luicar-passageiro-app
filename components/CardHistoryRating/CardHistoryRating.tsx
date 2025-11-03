import React from 'react';

import { ClockOutlineIcon, FlagIcon, StartingPointIcon } from '@/assets/icons';

import Text from '@/components/Text/Text';
import { Divider } from '@/components/Divider/Divider';

import { shadow } from '@/global/shadow';
import { theme } from '@/global/theme';

import { formatCurrency } from '@/utils/format';
import { IHistoryData } from '@/interfaces/history';
import { CardDriver } from '@/components/CardDriver/CardDriver';
// import { IVehicleIcons, renderVehicleIcon } from '@/utils/getIcons';

import {
  Container,
  Row,
  TextWrapper,
  TrailWrapper,
  VehicleWrapper,
  VerticalLine,
} from './styles';

interface Props {
  trip: IHistoryData[string][0];
  onPress: () => void;
}

export const CardHistoryRating = ({ trip, onPress }: Props) => {
  return (
    <Container onPress={onPress} style={shadow.default}>
      {trip?.driver?.id && (
        <CardDriver
          driver={trip?.driver}
          tripsQuantity={trip?.driverTripCount || 0}
        />
      )}
      {trip?.status === 'cancelada' && (
        <Text size={16} fontWeight={600} color={theme.colors.red_d1}>
          Cancelada
        </Text>
      )}
      {trip?.status === 'procurandoMotorista' && (
        <Text size={16} fontWeight={600} color={theme.colors.orange_ff}>
          Procurando motorista
        </Text>
      )}
      <Divider />
      <Row>
        <TrailWrapper>
          <StartingPointIcon />
          <VerticalLine />
          <FlagIcon width={12} height={12} />
        </TrailWrapper>

        <TextWrapper style={{ width: '100%', gap: 10, paddingRight: 10 }}>
          <Text
            size={11}
            fontWeight={600}
            color={theme.colors.primary_100}
            style={{ width: '90%' }}
          >
            {trip?.locals?.[0]?.addressString}
          </Text>
          <Row style={{ width: undefined, gap: 5 }}>
            <ClockOutlineIcon
              width={14}
              height={14}
              color={theme.colors.secondary_60}
            />
            <Text size={11} fontWeight={500} color={theme.colors.secondary_60}>
              {trip?.routeTime?.replace('mins', 'min')}
            </Text>
          </Row>
          <Text
            size={11}
            fontWeight={600}
            color={theme.colors.primary_100}
            style={{ width: '90%' }}
          >
            {trip?.locals?.[1]?.addressString}
          </Text>
        </TextWrapper>
      </Row>
      <VehicleWrapper>
        {/* {renderVehicleIcon(trip?.subcategory?.type as IVehicleIcons, 45)} */}

        <TextWrapper style={{ flex: 1 }}>
          <Text fontWeight={600} color={theme.colors.neutro_70}>
            {trip?.category?.name}
          </Text>
          <Text color={theme.colors.gray_64}>
            {trip?.vehicle?.vehicle_model?.model}
          </Text>
        </TextWrapper>

        <Text size={16} fontWeight={600} color={theme.colors.secondary_60}>
          {formatCurrency(trip?.totalValue)}
        </Text>
      </VehicleWrapper>
    </Container>
  );
};
