import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useForm, useWatch } from 'react-hook-form';
import { router, useLocalSearchParams } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';

import Text from '@/components/Text/Text';
import { Button } from '@/components/Button/Button';
import {
  ButtonPaymentMethod,
  ButtonWoman,
  CardVehicle,
  MethodCash,
  MethodCreditCard,
  MethodPix,
} from '@/components/screen';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';

import { colors } from '@/global/theme';
import { width } from '@/global/constants';

import { useModal } from '@/hooks/useModal';
import { useLocationForm } from '@/hooks/useLocationForm';

import { IGeolocation } from '@/interfaces/geolocation';

import { api } from '@/services/api';
import { useCategoriesPricesCoordinate } from '@/services/Home/vehicles.service';

import { handleError } from '@/utils/handleError';

import { RideForm, RideSchema } from '@/validation/Ride.validation';

import { IPayment } from '@/interfaces/payment';
import { ISelectTrip } from '@/interfaces/selectTrip';
import GoogleMapsInput from '@/components/GoogleMapsInput/GoogleMapsInput';
import { Header } from './styles';

const SearchPlaces = () => {
  const { destination: finalLocation } = useLocalSearchParams<{
    destination: string;
  }>();

  const { setModal } = useModal();

  const [addresses, setAddresses] = useState<IGeolocation | null>(null);

  const { control, handleSubmit, setValue } = useForm<RideForm>({
    resolver: yupResolver(RideSchema),
  });

  const { origin, destination } = useWatch({
    control,
  });

  const { currentLocation } = useLocationForm({
    setValue,
    fieldName: 'origin',
    shouldDirty: false,
  });

  const [method, setMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { data: categories } = useCategoriesPricesCoordinate(addresses);

  useEffect(() => {
    if (finalLocation) {
      setValue('destination', finalLocation);
    }
  }, [finalLocation]);

  const getGeolocation = async () => {
    try {
      const { data } = await api.get<IGeolocation>('/getGeocodeAddress', {
        params: {
          addressOrigin: origin,
          addressDestination: destination,
        },
      });
      setValue('origin', data.origin.address);
      setValue('destination', data.destination.address);

      setAddresses(data);
    } catch (err) {
      handleError(err);
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.post<ISelectTrip>('/selectTrip', {
        origin: addresses?.origin,
        destination: addresses?.destination,
        subcategoryId: 1,
        categoryId: 1,
      });

      console.log(JSON.stringify(data, null, 2));

      const { data: paymentResponse } = await api.post<IPayment>(
        '/confirmTrip',
        {
          paymentMethod: 'pix',
          portion: '1',
        },
      );

      console.log(JSON.stringify(paymentResponse, null, 2));

      setModal({
        name: 'paymentSuccess',
        onPress: () => router.push('/(main)/Home/LookingForDriver'),
      });
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };

  return (
    <GlobalContainer alignItems="flex-start" gap={15} withoutPaddingTop>
      <Header>
        <BackButton
          title="Para onde vamos hoje?"
          size={20}
          color={colors.secondary_20}
        />

        <GoogleMapsInput
          key={currentLocation}
          name="origin"
          control={control}
          iconLeft="PinIcon"
          placeholder="Insira o local de partida"
          iconColor={colors.primary_100}
          defaultValue={currentLocation}
          containerStyle={styles.input}
          style={{ color: colors.secondary_10 }}
        />

        <GoogleMapsInput
          name="destination"
          control={control}
          iconLeft="FlagIcon"
          placeholder="Insira o destino/CEP"
          defaultValue={finalLocation}
          containerStyle={styles.input}
          style={{ color: colors.secondary_10 }}
          marginTop={-12}
        />
      </Header>

      <View style={styles.content}>
        <Text size={20} fontWeight={600} color={colors.secondary_80}>
          Escolha como prosseguir
        </Text>

        <ButtonWoman name="isWoman" control={control} />

        {categories?.map(cat => (
          <View key={cat.id}>
            {cat.subcategories?.map(item => (
              <CardVehicle
                key={item.id}
                vehicle={item}
                onPress={() => setValue('vehicleId', String(item.id))}
              />
            ))}
          </View>
        ))}

        <View style={styles.divider} />

        <View style={styles.textWrapper}>
          <Text size={16} fontWeight={600} color={colors.secondary_80}>
            Formas de pagamento
          </Text>
          <Text size={12} color={colors.secondary_60}>
            Selecione a melhor forma de pagamento para você
          </Text>
        </View>

        <View style={styles.row}>
          <ButtonPaymentMethod
            type="creditCard"
            isSelected={method === 'creditCard'}
            onPress={() => setMethod('creditCard')}
          />
          <ButtonPaymentMethod
            type="pix"
            isSelected={method === 'pix'}
            onPress={() => setMethod('pix')}
          />
          <ButtonPaymentMethod
            type="cash"
            isSelected={method === 'cash'}
            onPress={() => setMethod('cash')}
          />
        </View>

        {method === 'creditCard' && <MethodCreditCard />}
        {method === 'pix' && <MethodPix pixCode="asda" />}
        {method === 'cash' && <MethodCash />}

        <Button
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
          style={styles.button}
          disabled={!method}
        >
          Solicitar motorista
        </Button>
      </View>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 50,
    backgroundColor: colors.secondary_80,
    borderWidth: 0,
  },
  content: {
    flexGrow: 1,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  textWrapper: {
    width: '100%',
  },
  button: {
    marginTop: 'auto',
  },
  divider: {
    width,
    height: 8,
    alignSelf: 'center',
    backgroundColor: colors.secondary_20,
  },
});

export default SearchPlaces;
