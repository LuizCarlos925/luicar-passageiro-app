import React, { useCallback, useEffect, useRef } from 'react';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { router, useFocusEffect } from 'expo-router';
import LottieView from 'lottie-react-native';
import { ActivityIndicator, BackHandler, StyleSheet, View } from 'react-native';

import Text from '@/components/Text/Text';
import { Button } from '@/components/Button/Button';
import { Divider } from '@/components/Divider/Divider';
import { GlobalContainer } from '@/components/Container/Container';

import { colors } from '@/global/theme';
import { height, width } from '@/global/constants';

import { useModal } from '@/hooks/useModal';

import { formatCurrency } from '@/utils/format';
import { handleError } from '@/utils/handleError';
import { IconComponent } from '@/components/Icon/Icon';

import { WaitingLottie } from '@/assets/animations';
import {
  Column,
  ContentWrapper,
  HideLogo,
  LineHandler,
  RideInfoWrapper,
  Row,
} from './styles';

const LookingForDriver = () => {
  const { setModal } = useModal();

  const bottomSheetRef = useRef(null);
  const animation = useRef<LottieView>(null);

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        router.replace('/(main)/Home/StartedRide');
      }, 15000);

      return () => clearInterval(interval);
    }, []),
  );

  const handleCancelRide = async () => {
    try {
      //
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setModal({
          name: 'cancelRide',
          onPress: () => handleCancelRide(),
        });
        return true;
      },
    );

    return () => backHandler.remove();
  }, [setModal]);

  return (
    <GlobalContainer paddingHorizontal={20} gap={30}>
      <Text
        size={24}
        fontWeight={700}
        color={colors.secondary_100}
        marginTop={30}
        style={{ textAlign: 'center' }}
      >
        Preparando tudo para a sua viagem!
      </Text>
      <View>
        <LottieView
          autoPlay
          ref={animation}
          source={WaitingLottie as { uri: string }}
          style={{
            width,
            height: height * 0.5,
          }}
          loop
        />

        <HideLogo />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose={false}
        snapPoints={[120, 600]}
        handleComponent={() => <LineHandler />}
        backgroundStyle={{ backgroundColor: colors.secondary_100 }}
      >
        <ContentWrapper as={BottomSheetScrollView}>
          <Text size={20} fontWeight={700} color={colors.neutro_00}>
            Informações da corrida
          </Text>

          <View style={styles.row}>
            <ActivityIndicator size={22} color={colors.primary_100} />
            <Text color={colors.primary_60}>Aguardando um motorista</Text>
          </View>

          <RideInfoWrapper>
            <Row>
              <Column>
                <Text size={16} color={colors.neutro_00}>
                  Valor da corrida
                </Text>
                <Text size={24} fontWeight={600} color={colors.neutro_00}>
                  {formatCurrency(15.94)}
                </Text>
              </Column>
              <Column style={{ alignItems: 'flex-end' }}>
                <Text size={16} color={colors.neutro_00}>
                  Forma de pagamento
                </Text>
                <Text size={16} color={colors.neutro_00}>
                  Crédito **** 1962
                </Text>
              </Column>
            </Row>

            <Divider />

            <Column>
              <Row>
                <Row style={{ width: undefined }}>
                  <IconComponent name="PinIcon" />
                  <Text size={16} fontWeight={600} color={colors.primary_20}>
                    Saída
                  </Text>
                </Row>
                <Text size={16} fontWeight={600} color={colors.primary_20}>
                  Embarque
                </Text>
              </Row>

              <Row>
                <Text
                  size={16}
                  color={colors.neutro_00}
                  style={{ maxWidth: '70%' }}
                >
                  Av. Brasil, São Paulo
                </Text>
                <Text size={16} color={colors.neutro_00}>
                  10:30
                </Text>
              </Row>
            </Column>

            <Column>
              <Row>
                <Row style={{ width: undefined }}>
                  <IconComponent name="FlagIcon" />
                  <Text size={16} fontWeight={600} color={colors.primary_20}>
                    Destino
                  </Text>
                </Row>
                <Text size={16} fontWeight={600} color={colors.primary_20}>
                  Desembarque
                </Text>
              </Row>

              <Row>
                <Text
                  size={16}
                  color={colors.neutro_00}
                  style={{ maxWidth: '70%' }}
                >
                  Av. Brasil, São Paulo
                </Text>
                <Text size={16} color={colors.neutro_00}>
                  11:30
                </Text>
              </Row>
            </Column>

            <Column>
              <Row>
                <Text size={16} fontWeight={600} color={colors.primary_20}>
                  Tempo de percurso
                </Text>
                <Text size={16} fontWeight={600} color={colors.primary_20}>
                  Km
                </Text>
              </Row>

              <Row>
                <Text
                  size={16}
                  color={colors.neutro_00}
                  style={{ maxWidth: '70%' }}
                >
                  10 min
                </Text>
                <Text size={16} color={colors.neutro_00}>
                  5 km
                </Text>
              </Row>
            </Column>
          </RideInfoWrapper>

          <Button
            onPress={() =>
              setModal({
                name: 'cancelRide',
                onPress: () => handleCancelRide(),
              })
            }
            style={{ marginTop: 'auto' }}
          >
            Cancelar corrida
          </Button>
        </ContentWrapper>
      </BottomSheet>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
});

export default LookingForDriver;
