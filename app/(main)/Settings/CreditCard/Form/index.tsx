import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import Input from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';
import { CreditCard } from '@/components/CreditCard/CreditCard';

import { useModal } from '@/hooks/useModal';

import { handleError } from '@/utils/handleError';

import {
  CreditCardSchema,
  CreditCardForm,
} from '@/validation/CreditCard.validation';
import { api } from '@/services/api';
import { normalize } from '@/utils/format';
import { useAuth } from '@/hooks/useAuth';

const Form = () => {
  const { setModal } = useModal();
  const { refetchUser } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, watch } = useForm<CreditCardForm>({
    resolver: yupResolver(CreditCardSchema as any),
  });

  const onSubmit = async (form: CreditCardForm) => {
    setIsLoading(true);
    try {
      await api.post('/createCards', {
        holderName: form.holder_name,
        cardNumber: normalize(form.card_number),
        expirationMouth: form.validate.split('/')[0],
        expirationYear: `20${form.validate.split('/')[1]}`,
        cvv: form.cvv,
      });

      refetchUser();

      setModal({
        name: 'creditCardSuccess',
        onPress: router.back,
        onPressBack: router.back,
      });
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };

  return (
    <GlobalContainer
      scrollContainerStyle={{ alignItems: 'flex-start' }}
      paddingHorizontal={20}
      gap={24}
    >
      <BackButton title="Adicionar cartão" />

      <CreditCard
        number={watch('card_number')}
        holderName={watch('holder_name')}
      />

      <View style={styles.inputWrapper}>
        <Input
          name="holder_name"
          control={control}
          label="Nome do titular"
          placeholder="Digite o nome do titular"
          autoCapitalize="words"
        />
        <Input
          name="card_number"
          control={control}
          label="Número do cartão"
          placeholder="0000 0000 0000 0000"
          type="credit-card"
        />

        <View style={styles.row}>
          <Input
            name="cvv"
            control={control}
            label="CVV"
            placeholder="0000"
            type="only-numbers"
            maxLength={4}
            width="48%"
          />
          <Input
            name="validate"
            control={control}
            label="Data de validade"
            placeholder="mm/aa"
            type="datetime"
            options={{ format: 'MM/yy' }}
            width="48%"
          />
        </View>
      </View>

      <Button
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        isLoading={isLoading}
      >
        Adicionar cartão
      </Button>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    width: '100%',
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 'auto',
    marginBottom: 20,
  },
});

export default Form;
