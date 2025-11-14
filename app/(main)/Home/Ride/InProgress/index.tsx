import React, { useCallback } from 'react';
import { router, useFocusEffect } from 'expo-router';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { format } from 'date-fns';

import Text from '@/components/Text/Text';
import { Counter } from '@/components/screen';
import { Divider } from '@/components/Divider/Divider';
import { GroupText } from '@/components/GroupText/GroupText';
import { DriverCard } from '@/components/DriverCard/DriverCard';
import { GlobalContainer } from '@/components/Container/Container';

import { useRide } from '@/context/useRide';

import { colors } from '@/global/theme';

import { formatCurrency, formatPaymentMethod } from '@/utils/format';
import { IconComponent } from '@/components/Icon/Icon';

const InProgress = () => {
  const { top } = useSafeAreaInsets();

  const { ride, handleFindRide } = useRide();

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        handleFindRide();
      }, 15000);

      return () => clearInterval(interval);
    }, []),
  );

  return (
    <GlobalContainer
      alignItems="flex-start"
      gap={15}
      containerStyle={{ backgroundColor: colors.secondary_100 }}
      withoutPaddingTop
    >
      <View style={[styles.header, { paddingTop: top + 20 }]}>
        <View style={styles.infoWrapper}>
          <View style={styles.row}>
            <ActivityIndicator size={22} color={colors.neutro_00} />

            <Text size={16} color={colors.neutro_00}>
              Você está a caminho do seu destino
            </Text>
          </View>

          <Text
            size={16}
            fontWeight={600}
            color={colors.neutro_00}
            style={{ textAlign: 'center' }}
          >
            Corrida iniciada
          </Text>

          <Text color={colors.neutro_00}>
            Chegada em:{' '}
            <Counter
              fontSize={14}
              date={ride?.destinationArrivalAt}
              type="regressivo"
            />
          </Text>
        </View>
      </View>

      <View style={styles.contentWrapper}>
        <Text size={16} color={colors.neutro_00}>
          Informações da viagem
        </Text>

        <DriverCard vehicle={ride?.vehicle} driver={ride?.driver} />

        <GroupText
          title1="Saída"
          title2="Embarque"
          text1={ride?.locals?.[0]?.addressString || ''}
          text2={
            ride?.arrivalOriginAt ? format(ride.arrivalOriginAt, 'HH:mm') : ''
          }
          iconLeft="PinIcon"
        />

        <GroupText
          title1="Destino"
          title2="Desembarque"
          text1={ride?.locals?.[1]?.addressString || ''}
          text2={
            ride?.destinationArrivalAt
              ? format(ride.destinationArrivalAt, 'HH:mm')
              : ''
          }
          iconLeft="FlagIcon"
        />

        <GroupText
          title1="Tempo de percurso"
          title2="Km"
          text1={ride?.routeTime || ''}
          text2={ride?.distance || ''}
        />

        <Divider />

        <GroupText
          title1="Valor da corrida"
          title2="Forma de pagamento"
          text1={formatCurrency(ride?.totalValue || 0)}
          text2={formatPaymentMethod(ride?.paymentMethod || '')}
          color={colors.neutro_00}
        />

        <Divider />

        <Pressable
          onPress={() =>
            router.push({
              pathname: '/(main)/Home/Support',
              params: { id: ride?.id },
            })
          }
          style={styles.support}
        >
          <Text size={16} fontWeight={600} color={colors.neutro_00}>
            Precisa de ajuda?
          </Text>
          <IconComponent name="ChatIcon" />
        </Pressable>
      </View>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 22,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    backgroundColor: colors.primary_100,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lineHandler: {
    width: 85,
    height: 6,
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 20,
    backgroundColor: '#d2d6db',
  },
  contentWrapper: {
    width: '100%',
    paddingHorizontal: 16,
    gap: 15,
  },
  infoWrapper: {
    alignItems: 'center',
    gap: 5,
  },
  support: {
    flexDirection: 'row',
    width: '100%',
    height: 42,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.error_40,
    backgroundColor: colors.error_60,
  },
});

export default InProgress;
