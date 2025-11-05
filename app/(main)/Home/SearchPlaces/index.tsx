import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { router, useLocalSearchParams } from 'expo-router';
import * as Location from 'expo-location';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';

import Text from '@/components/Text/Text';
import Input from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import {
  ButtonPaymentMethod,
  ButtonWoman,
  CardVehicle,
} from '@/components/screen';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';

import { colors } from '@/global/theme';
import { width } from '@/global/constants';

import { handleError } from '@/utils/handleError';
import { formatReverseGeocode } from '@/utils/formatAddress';

import { useModal } from '@/hooks/useModal';
import { getCardFlag } from '@/utils/creditCardFlag';
import { IconComponent } from '@/components/Icon/Icon';

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

  const { setModal } = useModal();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, requestPermission] = Location.useForegroundPermissions({
    request: true,
  });

  const { control, setValue } = useForm<IForm>();

  const [currentLocation, setCurrentLocation] = useState(origin);
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

  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync('dasda');
    } catch (err) {
      handleError('Não foi possível copiar o código');
    }
  };

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
      setModal({
        name: 'paymentSuccess',
        onPress: () => router.push('/(main)/Home/LookingForDriver'),
      });
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

        {method === 'creditCard' && (
          <View style={styles.creditCard}>
            {getCardFlag('5437 7388 1413 5551', colors.neutro_00, {
              width: 10,
              height: 10,
            })}

            <Text color={colors.secondary_100} style={styles.text}>
              Nome do cartão{' '}
              <Text fontWeight={700} color={colors.secondary_100}>
                **** 1962
              </Text>
            </Text>

            <IconComponent
              name="SwitchIcon"
              onPress={() => router.push('/(main)/Settings/CreditCard')}
            />
          </View>
        )}

        {method === 'pix' && (
          <View style={styles.pixWrapper}>
            <View style={styles.qrCodeWrapper}>
              <QRCode size={132} value="dasda" />
            </View>

            <Button onPress={handleCopy} outline style={styles.copyButton}>
              Copiar código
            </Button>
          </View>
        )}

        {method === 'cash' && (
          <View style={styles.row}>
            <IconComponent name="InfoAlertIcon" />

            <Text size={12} style={{ flex: 1 }}>
              Atenção! Esteja com o valor trocado para facilitar o pagamento.
            </Text>
          </View>
        )}

        <Button onPress={onSubmit} isLoading={isLoading} style={styles.button}>
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
  creditCard: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.secondary_20,
  },
  divider: {
    width,
    height: 8,
    alignSelf: 'center',
    backgroundColor: colors.secondary_20,
  },
  text: {
    flex: 1,
  },
  pixWrapper: {
    alignItems: 'center',
    gap: 16,
  },
  qrCodeWrapper: {
    overflow: 'hidden',
    width: 132,
    height: 132,
    borderRadius: 12,
  },
  copyButton: {
    width: 180,
  },
});

export default SearchPlaces;
