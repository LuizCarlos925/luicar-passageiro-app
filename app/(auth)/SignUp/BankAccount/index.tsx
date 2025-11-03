import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { router, useFocusEffect } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';
import EfiPay from 'payment-token-efi';

// import { PadlockIcon } from '@/assets';

import Text from '@/components/Text/Text';
import Input from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import BackButton from '@/components/BackButton/BackButton';
// import { CreditCard } from '@/components/CreditCard/CreditCard';
import { GlobalContainer } from '@/components/Container/Container';

import { theme } from '@/global/theme';
import { shadow } from '@/global/shadow';

import { useAuth } from '@/hooks/useAuth';

import { normalize } from '@/utils/format';
import { handleError } from '@/utils/handleError';

import {
  SignUpBankAccountSchema,
  SignUpBankAccountForm,
} from '@/validation/Login.validation';

import { InputWrapper, TextWrapper } from './styles';

const BankAccount = () => {
  const { signUpData, setSignUpData } = useAuth();

  const { control, handleSubmit, reset, watch } =
    useForm<SignUpBankAccountForm>({
      resolver: yupResolver(SignUpBankAccountSchema),
    });

  useFocusEffect(
    useCallback(() => {
      reset({ ...signUpData });
    }, []),
  );

  const onSubmit = async (form: SignUpBankAccountForm) => {
    try {
      const brand = await EfiPay.CreditCard.setCardNumber(
        normalize(form?.card_number),
      ).verifyCardBrand();
      if (brand === 'undefined') {
        throw new Error('Cartão inválido.');
      }
      setSignUpData(prev => ({
        ...prev,
        ...form,
        brand,
      }));

      router.push('/(auth)/SignUp/Password');
    } catch (err) {
      handleError(err);
    }
  };

  const handleSkip = () => {
    setSignUpData(prev => ({
      ...prev,
      card_number: '',
      holder_name: '',
      cvv: '',
      validate: '',
      brand: '',
    }));
    router.push('/(auth)/SignUp/Password');
  };

  return (
    <GlobalContainer
      containerStyle={{
        backgroundColor: theme.colors.neutro_10,
      }}
      scrollContainerStyle={{ alignItems: 'flex-start' }}
      paddingHorizontal={20}
      gap={10}
    >
      <BackButton
        color={theme.colors.primary_100}
        onPress={() => router.push('/(auth)/SignUp/Address')}
      />
      <Text
        size={22}
        fontWeight={600}
        color={theme.colors.primary_100}
        marginTop={30}
      >
        Dados bancários
      </Text>
      <TextWrapper>
        <Text color={theme.colors.gray_1e}>
          Proteção avançada para suas informações
        </Text>
        {/* <PadlockIcon /> */}
      </TextWrapper>

      <Text
        size={22}
        fontWeight={600}
        color={theme.colors.gray_1e}
        marginTop={20}
      >
        Cartão de crédito
      </Text>

      {/* <CreditCard
        number={watch('card_number')}
        holderName={watch('holder_name')}
      /> */}

      <InputWrapper style={shadow.default}>
        <Input
          name="holder_name"
          control={control}
          label="Nome do titular"
          placeholder="Digite o nome do titular"
          autoCapitalize="characters"
        />
        <Input
          name="card_number"
          control={control}
          label="Número do cartão"
          placeholder="0000 0000 0000 0000"
          type="credit-card"
        />
        <Input
          name="cvv"
          control={control}
          label="CVV"
          placeholder="0000"
          type="only-numbers"
          maxLength={4}
        />
        <Input
          name="validate"
          control={control}
          label="Data de validade"
          placeholder="mm/aa"
          type="datetime"
          options={{ format: 'MM/yy' }}
        />
        <Text marginTop={-5}>
          Inserir apenas os dois últimos dígitos do ano impresso no cartão
        </Text>
      </InputWrapper>

      <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 20 }}>
        Continuar
      </Button>
      <Button onPress={handleSkip} style={{ marginBottom: 40 }} outline>
        Pular
      </Button>
    </GlobalContainer>
  );
};

export default BankAccount;
