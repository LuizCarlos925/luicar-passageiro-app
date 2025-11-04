import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useLocalSearchParams } from 'expo-router';
import * as Location from 'expo-location';

import Text from '@/components/Text/Text';
import Input from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { Divider } from '@/components/Divider/Divider';
import {
  ButtonPaymentMethod,
  ButtonWoman,
  CardVehicle,
} from '@/components/screen';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';

import { colors } from '@/global/theme';

import { handleError } from '@/utils/handleError';
import { formatReverseGeocode } from '@/utils/formatAddress';

import { Header } from './styles';

type IForm = {
  startingPoint: string;
  destination: string;
};

const SearchPlaces = () => {
  const { origin, destination } = useLocalSearchParams<{
    origin: string;
    destination: string;
  }>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, requestPermission] = Location.useForegroundPermissions({
    request: true,
  });

  const { control, setValue } = useForm<IForm>();

  const [currentLocation, setCurrentLocation] = useState<string | undefined>(
    'Rua tal tal, 123',
  );
  const [method, setMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (destination) {
      setValue('destination', destination);
    }
    if (origin) {
      setValue('startingPoint', origin);
    }
  }, [origin, destination]);

  const getLocation = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      const currentLocationNow = await Location.reverseGeocodeAsync(coords);

      if (currentLocationNow && currentLocationNow.length > 0) {
        const formattedAddress = formatReverseGeocode(currentLocationNow[0]);
        setValue('startingPoint', formattedAddress, {
          shouldDirty: false,
        });
        setCurrentLocation(formattedAddress);
      }
    } catch (err) {
      handleError('Não foi possível obter a localização');
      requestPermission().then(response => {
        if (response.granted) {
          getLocation();
        }
      });
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      //
    } catch (err) {
      requestPermission().then(response => {
        if (response.granted) {
          getLocation();
        }
      });
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
        <Input
          key={currentLocation}
          name="startingPoint"
          control={control}
          iconLeft="PinIcon"
          placeholder="Insira o local de partida"
          containerStyle={styles.input}
          iconColor={colors.primary_100}
          defaultValue={currentLocation}
          style={{ color: colors.secondary_10 }}
        />

        <Input
          name="destination"
          control={control}
          iconLeft="FlagIcon"
          placeholder="Insira o destino/CEP"
          containerStyle={styles.input}
          iconColor={colors.primary_100}
          defaultValue={destination}
          style={{ color: colors.secondary_10 }}
          marginTop={-12}
        />
      </Header>

      <View style={styles.content}>
        <Text size={20} fontWeight={600} color={colors.secondary_80}>
          Escolha como prosseguir
        </Text>

        <ButtonWoman name="isWoman" control={control} />
        <CardVehicle />

        <Divider style={{ maxHeight: 8 }} />

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

        <Button onPress={onSubmit} isLoading={isLoading} style={styles.button}>
          Continuar
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
});

export default SearchPlaces;
