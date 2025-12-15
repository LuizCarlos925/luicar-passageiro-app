import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import BottomSheet from '@gorhom/bottom-sheet';

import Text from '@/components/Text/Text';
import { TipBS } from '@/components/screen';
import Input from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { IconComponent } from '@/components/Icon/Icon';
import { TipOptions } from '@/components/TipOptions/TipOptions';
import ModalPayment from '@/components/screen/home/ModalPayment';
import { AvatarImage } from '@/components/AvatarImage/AvatarImage';
import { GlobalContainer } from '@/components/Container/Container';
import { SelectRating } from '@/components/SelectRating/SelectRating';

import { useRide } from '@/context/useRide';

import { colors } from '@/global/theme';

import { api } from '@/services/api';

import { handleError } from '@/utils/handleError';

import { EvaluateForm, EvaluateSchema } from '@/validation/Evaluate.validation';
import { useRating } from '@/services/Settings/rating.service';

const Finished = () => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const { ride } = useRide();
  const { data: rating } = useRating(ride?.driver?.id, 'driver');

  const [isVisible, setIsVisible] = useState(false);
  const [valueSelected, setValueSelected] = useState<number | undefined>();

  const { control, handleSubmit } = useForm<EvaluateForm>({
    resolver: yupResolver(EvaluateSchema as any),
  });

  const onSubmit = async (form: EvaluateForm) => {
    try {
      await api.post('/createDriverReview', {
        rating: form?.rating,
        title: form?.title,
        description: form?.comment,
        tripId: ride?.id,
      });

      router.dismissTo('/(main)/Home');
    } catch (err) {
      handleError(err);
    }
  };

  const handleSkip = async () => {
    try {
      await api.put(`/trips/${ride?.id}`, {
        hasReviewed: true,
      });

      router.dismissTo('/(main)/Home');
    } catch (err: any) {
      handleError(err);
    }
  };

  return (
    <GlobalContainer
      gap={16}
      paddingHorizontal={20}
      component={
        <>
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={[250, 350]}
            index={-1}
            handleComponent={() => <View style={styles.lineHandler} />}
            backgroundStyle={{ backgroundColor: colors.neutro_00 }}
            enablePanDownToClose
          >
            <TipBS
              rideId={ride?.id}
              value={valueSelected}
              onClose={() => bottomSheetRef.current?.close()}
              onSubmit={() => setIsVisible(true)}
            />
          </BottomSheet>
          <ModalPayment
            isVisible={isVisible}
            onPress={() => setIsVisible(false)}
            onBackPress={() => setIsVisible(false)}
          />
        </>
      }
    >
      <Text size={20} fontWeight={600} marginTop={24}>
        Corrida finalizada
      </Text>

      <AvatarImage uri={ride?.driver?.image?.url} size={80} />
      <View style={styles.ratingWrapper}>
        <IconComponent name="StarIcon" size={12} color={colors.neutro_00} />

        <Text size={12} fontWeight={600} color={colors.neutro_00}>
          {rating?.averageRating || 0}
        </Text>
      </View>

      <View style={styles.textWrapper}>
        <Text size={24} fontWeight={700} color={colors.secondary_100}>
          Avalie {ride?.driver?.socialName || ride?.driver?.name}
        </Text>
        <Text size={16}>Sua opinião é importante para nós</Text>
      </View>

      <SelectRating name="rating" control={control} size={24} />

      <View style={styles.wrapper}>
        <Input
          name="comment"
          control={control}
          label="Comentário sobre um motorista"
          placeholder="Escreva aqui..."
          containerStyle={{ height: 100 }}
          style={{
            height: '100%',
            paddingVertical: 10,
            textAlignVertical: 'top',
          }}
          multiline
        />

        <Pressable
          onPress={() =>
            router.push({
              pathname: '/(main)/Home/Report',
              params: { id: ride?.id },
            })
          }
          style={styles.buttonReport}
        >
          <Text size={14} color={colors.error_60}>
            Denunciar motorista
          </Text>

          <IconComponent name="InfoAlertIcon" />
        </Pressable>
      </View>

      <View style={styles.divider} />

      <TipOptions
        onPress={value => {
          setValueSelected(value);
          bottomSheetRef.current?.expand();
        }}
      />

      <View style={styles.wrapper}>
        <Button onPress={handleSubmit(onSubmit)}>Finalizar avaliação</Button>
        <Button onPress={handleSkip} outline>
          Pular Avaliação
        </Button>
      </View>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 8,
  },
  textWrapper: {
    alignItems: 'center',
  },
  divider: {
    width: '100%',
    height: 8,
    backgroundColor: colors.secondary_20,
  },
  buttonReport: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: colors.error_60,
    borderRadius: 8,
    backgroundColor: '#fffbf8',
  },
  lineHandler: {
    width: 85,
    height: 6,
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 20,
    backgroundColor: '#d2d6db',
  },
  ratingWrapper: {
    flexDirection: 'row',
    width: 46,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -28,
    padding: 2,
    gap: 4,
    borderRadius: 4,
    backgroundColor: colors.primary_80,
  },
});

export default Finished;
