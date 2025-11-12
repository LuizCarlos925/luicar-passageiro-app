import React, { useCallback, useEffect, useRef } from 'react';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useFocusEffect } from 'expo-router';
import LottieView from 'lottie-react-native';
import { ActivityIndicator, BackHandler, StyleSheet, View } from 'react-native';

import { WaitingLottie } from '@/assets/animations';

import Text from '@/components/Text/Text';
import { CancelRideBS } from '@/components/screen';
import { Button } from '@/components/Button/Button';
import { Divider } from '@/components/Divider/Divider';
import { IconComponent } from '@/components/Icon/Icon';
import { GlobalContainer } from '@/components/Container/Container';
import ModalWaitingCancel from '@/components/screen/home/ModalWaitingCancel';

import { colors } from '@/global/theme';
import { height, width } from '@/global/constants';

import { useModal } from '@/hooks/useModal';

import { api } from '@/services/api';

import { formatCurrency } from '@/utils/format';
import { handleError } from '@/utils/handleError';

import { useRide } from '@/context/useRide';
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

  const { ride, handleFindRide } = useRide();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const bsCancelRef = useRef<BottomSheet>(null);
  const animation = useRef<LottieView>(null);

  const [isVisible, setIsVisible] = React.useState(false);

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        handleFindRide(true);
      }, 15000);

      return () => clearInterval(interval);
    }, []),
  );

  const handleCancelRide = async (reason: string) => {
    try {
      await api.put('/cancelTrip', {
        id: ride?.paymentResponse?.id,
        reason,
      });

      bsCancelRef.current?.close();
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setIsVisible(true);
        return true;
      },
    );

    return () => backHandler.remove();
  }, [setModal]);

  return (
    <GlobalContainer
      paddingHorizontal={20}
      gap={30}
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
        index={0}
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
                  {formatCurrency(ride?.paymentResponse?.valuePayment || 0)}
                </Text>
              </Column>
              <Column style={{ alignItems: 'flex-end' }}>
                <Text size={16} color={colors.neutro_00}>
                  Forma de pagamento
                </Text>
                <Text size={16} color={colors.neutro_00}>
                  {ride?.paymentMethod} **** 1234
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
            onPress={() => {
              bottomSheetRef.current?.collapse();
              setIsVisible(true);
            }}
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
  lineHandler: {
    width: 85,
    height: 6,
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 20,
    backgroundColor: '#d2d6db',
  },
});

export default LookingForDriver;
