import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import * as Location from 'expo-location';

import Text from '@/components/Text/Text';
import { Header } from '@/components/screen';
import { Place } from '@/components/Place/Place';
import { ModalLocation } from '@/components/screen';
import Carousel from '@/components/Carousel/Carousel';
import { IconComponent } from '@/components/Icon/Icon';
import { GlobalContainer } from '@/components/Container/Container';

import { colors } from '@/global/theme';

import { useLocations } from '@/services/Home/address.service';
import { useBalance } from '@/services/YuseCash/balance.service';
import { useAdvertising } from '@/services/Home/advertising.service';

import { formatCurrency } from '@/utils/format';

import { COMPANIES } from '@/mock/companies';

const Home = () => {
  const [status, requestPermission] = Location.useForegroundPermissions();

  const { data: locations } = useLocations('destino');
  const { data: ads } = useAdvertising();
  const { data: balance } = useBalance();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (status && !status?.granted) {
      setIsVisible(true);
    }
  }, [status]);

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

        {ads && (
          <Carousel
            images={
              ads?.map(item => ({
                id: item?.id,
                image: item?.image?.url,
                link: item?.link,
              })) || []
            }
          />
        )}

        <Text size={16} fontWeight={700} color={colors.secondary_100}>
          Empresas parceiras
        </Text>

        <View style={styles.companiesWrapper}>
          {COMPANIES?.map(company => (
            <Company
              key={company?.id}
              logo={company?.logoUrl}
              name={company?.name}
              onPress={() => router.push('/(main)/Home/Company')}
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
    </GlobalContainer>
  );
};

type CompanyProps = {
  name: string;
  logo: string;
  onPress: () => void;
};

const Company = ({ logo, name, onPress }: CompanyProps) => {
  return (
    <Pressable onPress={onPress} style={styles.companyBtn}>
      <Image style={styles.image} source={{ uri: logo }} />
      <Text size={12} fontWeight={600}>
        {name}
      </Text>
    </Pressable>
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
  companiesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    gap: '2%',
  },
  companyBtn: {
    width: '32%',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray_e2,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
});

export default Home;
