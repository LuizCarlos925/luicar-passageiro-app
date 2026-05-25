import React from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';

import { Car1 } from '@/assets/images';

import Text from '@/components/Text/Text';
import { Trail } from '@/components/screen';
import { IconComponent } from '@/components/Icon/Icon';
import BackButton from '@/components/BackButton/BackButton';
import { CardDriver } from '@/components/CardDriver/CardDriver';
import { GlobalContainer } from '@/components/Container/Container';

import { colors } from '@/global/theme';

import { useHistoryDetails } from '@/services/History/history.service';
import { baseURL } from '@/services/api';

import { formatCurrency, formatPaymentMethod } from '@/utils/format';
import { format, parseISO } from 'date-fns';
import { formatTripAddress } from '@/utils/formatAddress';
import { Ranking } from '@/components/ui';

const TripDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const router = useRouter();

  const { data: trip } = useHistoryDetails(id);

  const receiptUrl = trip?.id ? `${baseURL}trips/${trip.id}/receipt` : '';

  const openReceipt = () => {
    if (!receiptUrl) {
      return;
    }

    Linking.openURL(receiptUrl);
  };

  const renderDate = () => {
    if (trip?.tripStartedAt) {
      return format(parseISO(trip.tripStartedAt), 'dd/MM/yyyy');
    }
    if (trip?.acceptedAt) {
      return format(parseISO(trip.acceptedAt), 'dd/MM/yyyy');
    }
    if (trip?.createdAt) {
      return format(parseISO(trip.createdAt), 'dd/MM/yyyy');
    }
    return '';
  };

  return (
    <GlobalContainer alignItems="flex-start" paddingHorizontal={20} gap={16}>
      <BackButton style={styles.backButton} />

      <Text size={24} fontWeight={700}>
        Detalhes da corrida
      </Text>

      {trip?.driver && (
        <>
          <CardDriver
            driver={trip?.driver}
            tripsQuantity={Number(trip?.driverTripCount || 0)}
          />
          <Ranking ranking={trip?.driver?.gamification} />
        </>
      )}

      <View style={styles.line} />

      <View style={styles.wrapper}>
        <Text size={12} fontWeight={500} color={colors.secondary_100}>
          Valor
        </Text>

        <Text size={20} fontWeight={600} color={colors.secondary_100}>
          {formatCurrency(trip?.totalValue || 0)}
        </Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.wrapper, { minWidth: '60%' }]}>
          <Text fontWeight={500} color={colors.secondary_60}>
            Forma de pagamento
          </Text>
          <Text size={12} color={colors.secondary_60}>
            {formatPaymentMethod(trip?.paymentMethod)}
          </Text>
        </View>

        <View style={styles.wrapper}>
          <Text fontWeight={500} color={colors.secondary_60}>
            Data
          </Text>
          <Text size={12} color={colors.secondary_60}>
            {renderDate()}
          </Text>
        </View>
      </View>

      <Pressable onPress={openReceipt} style={styles.buttonReceipt}>
        <Text size={14} fontWeight={600} color={colors.primary_100}>
          Ver Recibo
        </Text>
      </Pressable>

      <View style={styles.line} />

      <View style={styles.wrapper}>
        <Text size={16} fontWeight={600} color={colors.secondary_100}>
          Viagem
        </Text>
        <Text>Detalhes da viagem</Text>
      </View>

      <Trail
        origin={{
          address: formatTripAddress(trip?.locals?.[0]),
          time: trip?.arrivalOriginAt
            ? format(parseISO(trip?.arrivalOriginAt), 'HH:mm')
            : '',
        }}
        destination={{
          address: formatTripAddress(trip?.locals?.[1]),
          time: trip?.destinationArrivalAt
            ? format(parseISO(trip?.destinationArrivalAt), 'HH:mm')
            : '',
        }}
        duration={trip?.routeTime?.replace('mins', 'min') || ''}
      />

      {trip?.vehicle?.id && (
        <>
          <Text size={16} fontWeight={600} color={colors.secondary_100}>
            Informações do veículo
          </Text>

          <Image source={Car1} style={styles.image} />

          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <View style={styles.wrapper}>
              <Text fontWeight={500} color={colors.secondary_60}>
                Placa
              </Text>

              <Text size={16} fontWeight={600} color={colors.primary_100}>
                {trip?.vehicle?.plateNumber}
              </Text>
            </View>

            <View style={styles.wrapper}>
              <Text fontWeight={500} color={colors.secondary_60}>
                Marca/Modelo
              </Text>

              <Text fontWeight={600}>{trip?.vehicle?.model}</Text>
            </View>

            <View style={styles.wrapper}>
              <Text fontWeight={500} color={colors.secondary_60}>
                Cor
              </Text>

              <Text fontWeight={600}>{trip?.vehicle?.color?.name}</Text>
            </View>
          </View>

          <Pressable
            onPress={() =>
              router.push({
                pathname: '/(main)/Home/Report',
                params: { id: trip?.id },
              })
            }
            style={styles.buttonReport}
          >
            <Text size={14} color={colors.error_60}>
              Denunciar motorista
            </Text>
            <IconComponent name="InfoAlertIcon" />
          </Pressable>
        </>
      )}
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginTop: 16,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: colors.secondary_20,
  },
  wrapper: {
    flexShrink: 1,
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  image: {
    width: 60,
    height: 40,
  },
  buttonReceipt: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: colors.primary_100,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  buttonReport: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: colors.error_60,
    borderRadius: 8,
    backgroundColor: '#fffbf8',
  },
});

export default TripDetails;
