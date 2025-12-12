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
  MethodCreditCard,
  MethodPix,
} from '@/components/screen';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';
import GoogleMapsInput from '@/components/GoogleMapsInput/GoogleMapsInput';

import { useRide } from '@/context/useRide';

import { colors } from '@/global/theme';
import { width } from '@/global/constants';

import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModal';
import { useLocationForm } from '@/hooks/useLocationForm';

import { IPayment } from '@/interfaces/payment';
import { ITripSelect } from '@/interfaces/tripSelect';
import { IGeolocation } from '@/interfaces/geolocation';

import { api } from '@/services/api';
import { useCategoriesPrices } from '@/services/Home/vehicles.service';

import { handleError } from '@/utils/handleError';

import { RideForm, RideSchema } from '@/validation/Ride.validation';

const SearchPlaces = () => {
  const params = useLocalSearchParams<{
    origin: string;
    destination: string;
    isWoman: string;
  }>();

  const { user } = useAuth();

  const { setModal } = useModal();

  const { handleFindRide } = useRide();

  const { control, handleSubmit, setValue } = useForm<RideForm>({
    resolver: yupResolver(RideSchema as any),
    defaultValues: {
      vehicleId: '1',
      isWoman: false,
    },
  });

  const { origin, destination, isWoman } = useWatch({
    control,
  });

  const { currentLocation } = useLocationForm({
    setValue,
    fieldName: 'origin',
    shouldDirty: false,
  });

  const [pixCode, setPixCode] = useState('');
  const [method, setMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [originAddress, setOriginAddress] = useState<string>('');
  const [destinationAddress, setDestinationAddress] = useState<string>('');

  const { data: categories } = useCategoriesPrices(
    originAddress,
    destinationAddress,
  );

  const card =
    user?.passenger?.cards?.find(item => item?.isMain) ||
    user?.passenger?.cards?.[0];

  useEffect(() => {
    if (params.destination) {
      setDestinationAddress(params.destination);
      setValue('destination', params.destination);
    }
    if (params.origin) {
      setOriginAddress(params.origin);
      setValue('origin', params.origin);
      setMethod('creditCard');
    }
    if (params.isWoman) {
      const isWomanParam = params.isWoman === 'true';
      setValue('isWoman', isWomanParam);
    }
  }, [params.destination, params.origin, params.isWoman]);

  useEffect(() => {
    if (currentLocation) {
      setOriginAddress(currentLocation);
    }
  }, [currentLocation]);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      if (method === 'pix') {
        const { data: trip } = await api.get('/trips', {
          params: {
            'filters[status][$in][0]': 'procurandoMotorista',
            'filters[status][$in][1]': 'motoristaDeslocandoInicio',
            'filters[status][$in][2]': 'indoAoPontoDeEncontro',
            'sort[createdAt]': 'desc',
          },
        });

        if (!trip?.data?.[0]?.id) {
          return;
        }
      } else {
        const { data } = await api.get<IGeolocation>('/getGeocodeAddress', {
          params: {
            addressOrigin: origin,
            addressDestination: destination,
          },
        });

        await api.post<ITripSelect>('/selectTrip', {
          origin: data?.origin,
          destination: data?.destination,
          subcategoryId: 1,
          categoryId: 1,
          onlyWoman: isWoman,
        });

        await api.post<IPayment>('/confirmTrip', {
          paymentMethod: 1,
          portion: '1',
          card: { id: card?.id },
        });
      }

      setModal({
        name: 'paymentSuccess',
        onPress: handleFindRide,
      });
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };

  const generatePix = async () => {
    try {
      if (!origin || !destination) {
        throw new Error('Endereço de origem e destino são obrigatórios.');
      }
      const { data } = await api.get<IGeolocation>('/getGeocodeAddress', {
        params: {
          addressOrigin: origin,
          addressDestination: destination,
        },
      });

      await api.post<ITripSelect>('/selectTrip', {
        origin: data?.origin,
        destination: data?.destination,
        subcategoryId: 1,
        categoryId: 1,
        onlyWoman: isWoman,
      });

      const { data: paymentResponse } = await api.post<IPayment>(
        '/confirmTrip',
        {
          paymentMethod: 2,
          portion: '1',
        },
      );

      setPixCode(paymentResponse?.paymentCode);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <GlobalContainer alignItems="flex-start" gap={15} withoutPaddingTop>
      <View style={styles.header}>
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
          defaultValue={params.origin || currentLocation}
          containerStyle={styles.input}
          style={{ color: colors.secondary_10 }}
          onPlaceSelect={address =>
            setOriginAddress(address?.description || '')
          }
        />

        <GoogleMapsInput
          name="destination"
          control={control}
          iconLeft="FlagIcon"
          placeholder="Insira o destino/CEP"
          defaultValue={params.destination || ''}
          iconColor={colors.primary_100}
          containerStyle={styles.input}
          style={{ color: colors.secondary_10 }}
          marginTop={-12}
          onPlaceSelect={address =>
            setDestinationAddress(address?.description || '')
          }
        />
      </View>

      <View style={styles.content}>
        <Text size={20} fontWeight={600} color={colors.secondary_80}>
          Escolha como prosseguir
        </Text>

        {user?.passenger?.gender === 'feminino' && (
          <ButtonWoman name="isWoman" control={control} />
        )}

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
            onPress={() => {
              generatePix();
              setMethod('pix');
            }}
          />
        </View>

        <View style={styles.paymentWrapper}>
          {method === 'creditCard' && (
            <MethodCreditCard
              card={card}
              onPress={() => {
                router.push({
                  pathname: '/(main)/Settings/CreditCard',
                  params: {
                    select: 'true',
                    origin: originAddress,
                    destination: destinationAddress,
                    isWoman: String(isWoman),
                  },
                });
              }}
            />
          )}
          {method === 'pix' && pixCode && <MethodPix pixCode={pixCode} />}
        </View>

        <Button
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
          style={{ ...styles.button, opacity: method ? 1 : 0.7 }}
          disabled={!method}
        >
          Solicitar motorista
        </Button>
      </View>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    minHeight: 225,
    alignItems: 'flex-start',
    padding: 20,
    paddingBottom: 16,
    gap: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: colors.secondary_100,
  },
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
  paymentWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    marginTop: 'auto',
    marginBottom: 60,
  },
  divider: {
    width,
    height: 8,
    alignSelf: 'center',
    backgroundColor: colors.secondary_20,
  },
});

export default SearchPlaces;
