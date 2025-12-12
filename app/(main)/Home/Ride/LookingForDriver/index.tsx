import React, { useCallback, useEffect, useRef } from 'react';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useFocusEffect } from 'expo-router';
import LottieView from 'lottie-react-native';
import { ActivityIndicator, BackHandler, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import { format } from 'date-fns';

import { WaitingLottie } from '@/assets/animations';

import Text from '@/components/Text/Text';
import { CancelRideBS, ModalWaitingCancel } from '@/components/screen';
import { Button } from '@/components/Button/Button';
import { Divider } from '@/components/Divider/Divider';
import { IconComponent } from '@/components/Icon/Icon';
import { GlobalContainer } from '@/components/Container/Container';

import { colors } from '@/global/theme';
import { height, width } from '@/global/constants';

import { useModal } from '@/hooks/useModal';

import { api } from '@/services/api';

import { formatCurrency, formatPaymentMethod } from '@/utils/format';
import { handleError } from '@/utils/handleError';

import { useRide } from '@/context/useRide';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MESSAGES = [
  'Preparando tudo para sua viagem!',
  'Um momento',
  'Tudo pronto para começar sua corrida',
];

const LookingForDriver = () => {
  const { setModal } = useModal();

  const { ride, handleFindRide } = useRide();

  const { top, bottom, left, right } = useSafeAreaInsets();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const bsCancelRef = useRef<BottomSheet>(null);
  const animation = useRef<LottieView>(null);
  const fadeAnim = useSharedValue(1);
  const messageCounter = useSharedValue(0);

  const [isVisible, setIsVisible] = React.useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = React.useState(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
    };
  });

  useAnimatedReaction(
    () => messageCounter.value,
    (currentValue, previousValue) => {
      if (currentValue !== previousValue) {
        runOnJS(setCurrentMessageIndex)(currentValue % MESSAGES.length);
      }
    },
  );

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
        id: ride?.id,
        reason,
      });

      bsCancelRef.current?.close();
      handleFindRide();
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

  useEffect(() => {
    fadeAnim.value = withRepeat(
      withTiming(0, { duration: 1500 }, finished => {
        if (finished) {
          messageCounter.value += 1;
        }
      }),
      -1,
      true,
    );
  }, []);

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
      <View style={styles.textWrapper}>
        <Animated.View style={animatedStyle}>
          {currentMessageIndex === 1 ? (
            <>
              <Text
                size={24}
                fontWeight={700}
                color={colors.secondary_100}
                marginTop={24}
                style={{ textAlign: 'center' }}
              >
                {MESSAGES[currentMessageIndex]}
              </Text>
              <Text size={18} fontWeight={500} style={{ textAlign: 'center' }}>
                Estamos garantindo o melhor motorista para você
              </Text>
            </>
          ) : (
            <Text
              size={24}
              fontWeight={700}
              color={colors.secondary_100}
              marginTop={24}
              style={{ textAlign: 'center' }}
            >
              {MESSAGES[currentMessageIndex]}
            </Text>
          )}
        </Animated.View>
      </View>

      <View style={{ position: 'absolute', top: -top }}>
        <LottieView
          autoPlay
          ref={animation}
          source={WaitingLottie as { uri: string }}
          style={{
            width: width + left + right,
            height: height + top + bottom,
          }}
          loop
        />

        <View style={styles.hideLogo} />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        enablePanDownToClose={false}
        snapPoints={[120, 600]}
        handleComponent={() => <View style={styles.lineHandler} />}
        backgroundStyle={{ backgroundColor: colors.secondary_100 }}
      >
        <BottomSheetScrollView
          style={styles.contentWrapper}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
        >
          <Text size={20} fontWeight={700} color={colors.neutro_00}>
            Informações da corrida
          </Text>

          <View style={styles.row}>
            <ActivityIndicator size={22} color={colors.primary_100} />
            <Text color={colors.primary_60}>Aguardando um motorista</Text>
          </View>

          <View style={styles.rideInfoWrapper}>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text size={16} color={colors.neutro_00}>
                  Valor da corrida
                </Text>
                <Text size={24} fontWeight={600} color={colors.neutro_00}>
                  {formatCurrency(ride?.totalValue || 0)}
                </Text>
              </View>
              <View style={[styles.column, { alignItems: 'flex-end' }]}>
                <Text size={16} color={colors.neutro_00}>
                  Forma de pagamento
                </Text>
                <Text size={16} color={colors.neutro_00}>
                  {formatPaymentMethod(ride?.paymentMethod)}{' '}
                  {ride?.paymentMethod !== 'pix' && '**** 1234'}
                </Text>
              </View>
            </View>

            <Divider />

            <View>
              <View style={styles.row2}>
                <View style={{ width: undefined }}>
                  <IconComponent name="PinIcon" />
                  <Text size={16} fontWeight={600} color={colors.primary_20}>
                    Saída
                  </Text>
                </View>
                <Text size={16} fontWeight={600} color={colors.primary_20}>
                  Embarque
                </Text>
              </View>

              <View style={styles.row2}>
                <Text
                  size={16}
                  color={colors.neutro_00}
                  style={{ maxWidth: '70%' }}
                >
                  {ride?.locals?.[0]?.addressString}
                </Text>
                <Text size={16} color={colors.neutro_00}>
                  {ride?.arrivalOriginAt &&
                    format(ride.arrivalOriginAt, 'HH:mm')}
                </Text>
              </View>
            </View>

            <View style={styles.column} />
            <View style={styles.row2}>
              <View style={styles.row}>
                <IconComponent name="FlagIcon" />
                <Text size={16} fontWeight={600} color={colors.primary_20}>
                  Destino
                </Text>
              </View>
              <Text size={16} fontWeight={600} color={colors.primary_20}>
                Desembarque
              </Text>
            </View>

            <View style={styles.row2}>
              <Text
                size={16}
                color={colors.neutro_00}
                style={{ maxWidth: '70%' }}
              >
                {ride?.locals?.[1]?.addressString}
              </Text>
              <Text size={16} color={colors.neutro_00}>
                {ride?.destinationArrivalAt &&
                  format(ride.destinationArrivalAt, 'HH:mm')}
              </Text>
            </View>
          </View>

          <View style={styles.column}>
            <View style={styles.row2}>
              <Text size={16} fontWeight={600} color={colors.primary_20}>
                Tempo de percurso
              </Text>
              <Text size={16} fontWeight={600} color={colors.primary_20}>
                Km
              </Text>
            </View>

            <View style={styles.row2}>
              <Text
                size={16}
                color={colors.neutro_00}
                style={{ maxWidth: '70%' }}
              >
                {ride?.routeTime}
              </Text>
              <Text size={16} color={colors.neutro_00}>
                {ride?.distance}
              </Text>
            </View>
          </View>

          <Button
            onPress={() => {
              bottomSheetRef.current?.collapse();
              setIsVisible(true);
            }}
            style={{ marginTop: 'auto' }}
          >
            Cancelar corrida
          </Button>
        </BottomSheetScrollView>
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
  hideLogo: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    width: '30%',
    height: 60,
    backgroundColor: colors.neutro_10,
  },
  contentWrapper: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 15,
    paddingBottom: 25,
    gap: 8,
  },
  rideInfoWrapper: {
    width: '100%',
    padding: 10,
    gap: 20,
  },
  row2: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: 5,
  },
  column: {
    gap: 5,
  },
  textWrapper: {
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    top: 0,
    height: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
});

export default LookingForDriver;
