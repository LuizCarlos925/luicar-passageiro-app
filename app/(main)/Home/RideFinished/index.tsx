import React from 'react';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Text from '@/components/Text/Text';
import Input from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { TipOptions } from '@/components/TipOptions/TipOptions';
import { AvatarImage } from '@/components/AvatarImage/AvatarImage';
import { GlobalContainer } from '@/components/Container/Container';
import { SelectRating } from '@/components/SelectRating/SelectRating';

import { colors } from '@/global/theme';

import { handleError } from '@/utils/handleError';

import { EvaluateForm, EvaluateSchema } from '@/validation/Evaluate.validation';

import { Pressable, StyleSheet, View } from 'react-native';
import { IconComponent } from '@/components/Icon/Icon';

const RideFinished = () => {
  const { control, handleSubmit } = useForm<EvaluateForm>({
    resolver: yupResolver(EvaluateSchema),
  });

  const onSubmit = async (form: EvaluateForm) => {
    try {
      // await api.post('/createDriverReview', {
      //   rating: form?.rating,
      //   title: form?.title,
      //   description: form?.comment,
      //   tripId: ride?.paymentResponse?.id,
      // });

      router.dismissTo('/(main)/Home');
    } catch (err) {
      handleError(err);
    }
  };

  const handleSkip = async () => {
    try {
      router.dismissTo('/(main)/Home');
    } catch (err: any) {
      handleError(err);
    }
  };

  return (
    <GlobalContainer gap={16} paddingHorizontal={20}>
      <Text size={20} fontWeight={600} marginTop={24}>
        Corrida finalizada
      </Text>

      <AvatarImage
        uri="https://randomuser.me/api/portraits/men/65.jpg"
        size={80}
      />

      <View style={styles.textWrapper}>
        <Text size={24} fontWeight={700} color={colors.secondary_100}>
          Avalie Flávio
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
          onPress={() => router.dismissTo('/(main)/Home/Report')}
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
        onPress={value =>
          router.push({ pathname: '/(main)/Home/Tip', params: { value } })
        }
        isSent={false}
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
});

export default RideFinished;
