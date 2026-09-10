import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import * as Location from 'expo-location';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

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
import { useNearbyDrivers } from '@/services/Home/nearbyDrivers.service';

import { formatCurrency } from '@/utils/format';
import { useAuth } from '@/hooks/useAuth';
import { handleError } from '@/utils/handleError';
import ModalTerms from '@/components/screen/home/ModalTerms';

const Home = () => {
  const [status, requestPermission] = Location.useForegroundPermissions();

  const { user, refetchUser } = useAuth();

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleTerms, setIsVisibleTerms] = useState(false);
  const [region, setRegion] = useState({
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  const { data: locations } = useLocations('destino');
  const { data: balance } = useBalance();
  const { data: nearbyDrivers } = useNearbyDrivers(region);

  useEffect(() => {
    if (status && !status?.granted) {
      setIsVisible(true);
    }
  }, [status]);

  useEffect(() => {
    if (!status?.granted) {
      return;
    }

    let subscription: Location.LocationSubscription | null = null;

    const startWatching = async () => {
      try {
        const current = await Location.getCurrentPositionAsync({});
        setRegion(prev => ({
          ...prev,
          latitude: current.coords.latitude,
          longitude: current.coords.longitude,
        }));
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 4000,
            distanceInterval: 10,
          },
          location => {
            setRegion(prev => ({
              ...prev,
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }));
          },
        );
      } catch (err: any) {
        handleError(err);
      }
    };

    startWatching();

    return () => {
      subscription?.remove();
    };
  }, [status?.granted]);

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
        <View style={styles.mapWrapper}>
          <MapView
            style={StyleSheet.absoluteFill}
            provider={
              Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
            }
            region={region}
            showsUserLocation
            showsMyLocationButton={false}
            rotateEnabled={false}
            toolbarEnabled={false}
          >
            {nearbyDrivers?.drivers?.map(driver => (
              <Marker
                key={driver.id}
                coordinate={{
                  latitude: driver.lat,
                  longitude: driver.lng,
                }}
              >
                <IconComponent name="CarIcon" size={28} />
              </Marker>
            ))}
          </MapView>

          {!!nearbyDrivers?.count && (
            <View style={styles.driversCountBadge}>
              <Text size={14} fontWeight={600} color={colors.neutro_00}>
                {nearbyDrivers.count === 1
                  ? '1 motorista por perto'
                  : `${nearbyDrivers.count} motoristas por perto`}
              </Text>
            </View>
          )}
        </View>

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
  mapWrapper: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
  },
  driversCountBadge: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    backgroundColor: colors.secondary_100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
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
