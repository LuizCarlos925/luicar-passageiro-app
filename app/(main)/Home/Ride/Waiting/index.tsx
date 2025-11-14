import React, { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { format } from 'date-fns';

import Text from '@/components/Text/Text';
import { CancelRideBS, Counter, ModalWaitingCancel } from '@/components/screen';
import { Button } from '@/components/Button/Button';
import { Divider } from '@/components/Divider/Divider';
import { GroupText } from '@/components/GroupText/GroupText';
import { DriverCard } from '@/components/DriverCard/DriverCard';
import { GlobalContainer } from '@/components/Container/Container';

import { useRide } from '@/context/useRide';

import { colors } from '@/global/theme';

import { api } from '@/services/api';

import { handleError } from '@/utils/handleError';
import { formatCurrency, formatPaymentMethod } from '@/utils/format';

const Status = {
  motoristaDeslocandoInicio: {
    title: 'A caminho do embarque',
    subtitle: 'Seu motorista está a caminho do embarque',
  },
  indoAoPontoDeEncontro: {
    title: 'Seu motorista chegou',
    subtitle: 'Encontre seu motorista no ponto de encontro',
  },
};

const Waiting = () => {
  const { top } = useSafeAreaInsets();

  const { ride, handleFindRide } = useRide();

  const bsCancelRef = useRef<BottomSheet>(null);

  const [isVisible, setIsVisible] = useState(false);

  const status = ride?.status;

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        handleFindRide(false);
      }, 15000);

      return () => clearInterval(interval);
    }, []),
  );

  const handleCancelRide = async (reason: string) => {
    try {
      await api.put('/cancelTrip', {
        id: ride?.id,
        reason,
      });

      bsCancelRef.current?.close();

      handleFindRide();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <GlobalContainer
      alignItems="flex-start"
      gap={15}
      containerStyle={{ backgroundColor: colors.secondary_100 }}
      withoutPaddingTop
      component={
        <>
          <ModalWaitingCancel
            isVisible={isVisible}
            onPress={() => {
              setIsVisible(false);
              bsCancelRef.current?.expand();
            }}
            onBackPress={() => setIsVisible(false)}
          />
          <BottomSheet
            ref={bsCancelRef}
            index={-1}
            snapPoints={[250, 350]}
            handleComponent={() => <View style={styles.lineHandler} />}
            backgroundStyle={{ backgroundColor: colors.neutro_00 }}
            enablePanDownToClose
          >
            <CancelRideBS
              onPress={handleCancelRide}
              onClose={() => bsCancelRef.current?.close()}
            />
          </BottomSheet>
        </>
      }
    >
      <View style={[styles.header, { paddingTop: top + 20 }]}>
        <View style={styles.infoWrapper}>
          <View style={styles.row}>
            <ActivityIndicator size={22} color={colors.neutro_00} />

            <Text size={16} color={colors.neutro_00}>
              {Status?.[status as keyof typeof Status]?.title}
            </Text>
          </View>

          <Text
            size={16}
            fontWeight={600}
            color={colors.neutro_00}
            style={{ textAlign: 'center' }}
          >
            {Status?.[status as keyof typeof Status]?.subtitle}
          </Text>

          <Counter date={ride?.arrivalOriginAt} type="regressivo" />
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

        <Button onPress={() => setIsVisible(true)}>Cancelar corrida</Button>
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
});

export default Waiting;
