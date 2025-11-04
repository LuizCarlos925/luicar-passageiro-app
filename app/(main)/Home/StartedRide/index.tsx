import React, { useCallback, useEffect, useState } from 'react';

import Text from '@/components/Text/Text';
import { Button } from '@/components/Button/Button';
import { Divider } from '@/components/Divider/Divider';
import { GroupText } from '@/components/GroupText/GroupText';
import { GlobalContainer } from '@/components/Container/Container';

import { colors } from '@/global/theme';

import { formatCurrency } from '@/utils/format';

import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DriverCard } from '@/components/DriverCard/DriverCard';
import { differenceInSeconds, intervalToDuration } from 'date-fns';
import { router, useFocusEffect } from 'expo-router';
import { ContentWrapper, InfoWrapper } from './styles';

const StartedRide = () => {
  const { top } = useSafeAreaInsets();

  const targetDate = new Date();
  const difference = differenceInSeconds(new Date(), targetDate);

  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(difference * 1000);
  const [isVisibleCancel, setIsVisibleCancel] = useState(false);

  useEffect(() => {
    if (started) {
      const timer = setInterval(() => {
        setCount(prevTime => prevTime + 1000);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [count, started]);

  const timer = intervalToDuration({ start: 0, end: count });

  useEffect(() => {
    if (started) {
      const timeout = setTimeout(() => {
        setStarted(false);
        router.replace('/(main)/Home/RideFinished');
      }, 15000);

      return () => clearTimeout(timeout);
    }
  }, [started]);

  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        setStarted(true);
      }, 15000);

      return () => clearTimeout(timeout);
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
        <InfoWrapper style={{ alignItems: 'center' }}>
          <View style={styles.row}>
            <ActivityIndicator size={22} color={colors.neutro_00} />

            <Text size={16} color={colors.neutro_00}>
              A caminho do embarque
            </Text>
          </View>

          <Text
            size={16}
            fontWeight={600}
            color={colors.neutro_00}
            style={{ textAlign: 'center' }}
          >
            Seu motorista está a caminho do embarque
          </Text>

          {started ? (
            <Text size={24} fontWeight={700} color={colors.neutro_00}>
              {timer.minutes?.toString().padStart(2, '0')}:
              {timer.seconds?.toString().padStart(2, '0')}
            </Text>
          ) : (
            <Text color={colors.neutro_00}>
              Partida em:{' '}
              <Text fontWeight={700} color={colors.neutro_00}>
                4 minutos
              </Text>
            </Text>
          )}
        </InfoWrapper>
      </View>

      <ContentWrapper>
        <Text size={16} color={colors.neutro_00}>
          Informações da viagem
        </Text>

        <DriverCard />

        <GroupText
          title1="Saída"
          title2="Embarque"
          text1="Av. Paulista, 1000 - Bela Vista, São Paulo - SP"
          text2="10:30"
          iconLeft="PinIcon"
        />

        <GroupText
          title1="Destino"
          title2="Desembarque"
          text1="Av. Brasil, 2000 - Centro, São Paulo - SP"
          text2="11:30"
          iconLeft="FlagIcon"
        />

        <GroupText
          title1="Tempo de percurso"
          title2="Km"
          text1="10 min"
          text2="5 km"
        />

        <Divider />

        <GroupText
          title1="Valor da corrida"
          title2="Forma de pagamento"
          text1={formatCurrency(16.94)}
          text2="Cartão de crédito"
          color={colors.neutro_00}
        />

        <Divider />

        <Button onPress={() => setIsVisibleCancel(true)}>
          Cancelar corrida
        </Button>
      </ContentWrapper>
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
});

export default StartedRide;
