import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import * as Location from 'expo-location';

import Text from '@/components/Text/Text';
import { Header } from '@/components/screen';
import { Place } from '@/components/Place/Place';
import { ModalLocation } from '@/components/screen';
import { IconComponent } from '@/components/Icon/Icon';
import { GlobalContainer } from '@/components/Container/Container';

import { colors } from '@/global/theme';

import { api } from '@/services/api';
import { useBalance } from '@/services/Home/balance.service';
import { useLocations } from '@/services/Home/address.service';

import { formatCurrency } from '@/utils/format';
import { useAuth } from '@/hooks/useAuth';
import { handleError } from '@/utils/handleError';
import ModalTerms from '@/components/screen/home/ModalTerms';

const Home = () => {
  const [status, requestPermission] = Location.useForegroundPermissions();

  const { user, refetchUser } = useAuth();

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleTerms, setIsVisibleTerms] = useState(false);

  const { data: locations } = useLocations('destino');
  const { data: balance } = useBalance();

  useEffect(() => {
    if (status && !status?.granted) {
      setIsVisible(true);
    }
  }, [status]);

  useFocusEffect(
    useCallback(() => {
      if (user?.passenger?.acceptedTerm === false) {
        setIsVisibleTerms(true);
      }
    }, [user]),
  );

  const handleAccept = async () => {
    try {
      await api.put('/acceptTerm?type=passageiro', {
        userId: user?.id,
      });
      refetchUser();
      setIsVisibleTerms(false);
    } catch (err: any) {
      handleError(err);
    }
  };

  return (
    <GlobalContainer
      header={{ component: <Header /> }}
      paddingHorizontal={20}
      showTabBar
    >
      <View style={styles.content}>
        {!!balance?.balance && (
          <View style={styles.cashBackWrapper}>
            <IconComponent name="CashBackIcon" size={36} />

            <View>
              <Text size={16} fontWeight={600}>
                Cashback disponível
              </Text>
              <Text size={16}>{formatCurrency(balance.balance)}</Text>
            </View>
          </View>
        )}

        <View style={styles.destinationsWrapper}>
          <Text size={16} fontWeight={700} color={colors.secondary_100}>
            Principais destinos
          </Text>

          {locations?.slice(0, 2)?.map((item, index) => (
            <Place
              key={item?.id}
              title={item?.address || item?.address_string}
              description={item?.address_string}
              onPress={() =>
                router.push({
                  pathname: '/(main)/Home/SearchPlaces',
                  params: { destination: item?.address_string },
                })
              }
              hasBorder={locations.length > index + 1 && index === 0}
            />
          ))}
        </View>
      </View>

      <ModalLocation
        isVisible={isVisible}
        onPress={() => {
          requestPermission();
          setIsVisible(false);
        }}
        onBackPress={() => setIsVisible(false)}
      />
      <ModalTerms isVisible={isVisibleTerms} onBackPress={handleAccept} />
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  cashBackWrapper: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 28,
    borderWidth: 1,
    borderColor: colors.primary_100,
    backgroundColor: colors.primary_10,
  },
  content: {
    width: '100%',
    gap: 24,
    marginTop: 16,
  },
  destinationsWrapper: {
    width: '100%',
    gap: 4,
  },
});

export default Home;
