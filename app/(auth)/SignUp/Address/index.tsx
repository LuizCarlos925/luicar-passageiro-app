import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { router, useFocusEffect } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';

import Text from '@/components/Text/Text';
import Input from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { GlobalContainer } from '@/components/Container/Container';

import { theme } from '@/global/theme';
import { shadow } from '@/global/shadow';

import { useAuth } from '@/hooks/useAuth';

import {
  SignUpAddressForm,
  SignUpAddressSchema,
} from '@/validation/Login.validation';

import { getAdressByZipCode } from '@/services/cep';
import { InputWrapper } from './styles';

const Address = () => {
  const { signUpData, setSignUpData } = useAuth();

  const { control, handleSubmit, reset, setValue, clearErrors, watch } =
    useForm<SignUpAddressForm>({
      resolver: yupResolver(SignUpAddressSchema),
    });

  const zipCode = watch('zipCode');

  useFocusEffect(
    useCallback(() => {
      reset({ ...signUpData });
    }, []),
  );

  const onSubmit = async (form: SignUpAddressForm) => {
    setSignUpData(prev => ({
      ...prev,
      ...form,
    }));
    router.push('/(auth)/SignUp/BankAccount');
  };

  const handleZipBlurDevolution = async () => {
    if (zipCode && zipCode.length === 9) {
      try {
        const res = await getAdressByZipCode(zipCode);

        clearErrors('zipCode');

        setValue('street', res.logradouro?.toLocaleUpperCase(), {
          shouldValidate: true,
        });
        setValue('city', res.localidade?.toLocaleUpperCase(), {
          shouldValidate: true,
        });
        setValue('district', res.bairro?.toLocaleUpperCase(), {
          shouldValidate: true,
        });
        setValue('state', res.uf?.toLocaleUpperCase(), {
          shouldValidate: true,
        });
      } catch (error) {
        return null;
      }
    }
  };

  useEffect(() => {
    handleZipBlurDevolution();
  }, [zipCode]);

  return (
    <GlobalContainer
      containerStyle={{
        backgroundColor: theme.colors.neutro_10,
      }}
      scrollContainerStyle={{ alignItems: 'flex-start' }}
      paddingHorizontal={20}
      gap={10}
    >
      <Text
        size={38}
        fontWeight={700}
        color={theme.colors.primary_100}
        marginTop={30}
      >
        Cadastre-se
      </Text>
      <Text size={16} color={theme.colors.gray_1e}>
        Já possui uma conta?{' '}
        <Text
          size={16}
          fontWeight={700}
          color={theme.colors.primary_60}
          onPress={() => router.push('/(auth)/Login')}
        >
          Faça login
        </Text>
      </Text>

      <Text
        size={22}
        fontWeight={600}
        color={theme.colors.gray_1e}
        marginTop={20}
      >
        Endereço
      </Text>

      <InputWrapper style={shadow.default}>
        <Input
          name="zipCode"
          control={control}
          label="CEP"
          placeholder="Digite seu CEP"
          type="zip-code"
        />
        <Input
          name="state"
          control={control}
          label="Estado"
          placeholder="Digite seu estado"
          autoCapitalize="characters"
        />
        <Input
          name="district"
          control={control}
          label="Bairro"
          placeholder="Digite seu bairro"
          autoCapitalize="characters"
        />
        <Input
          name="street"
          control={control}
          label="Logradouro"
          placeholder="Digite seu logradouro"
          autoCapitalize="characters"
        />
        <Input
          name="number"
          control={control}
          label="Número"
          placeholder="Digite o número"
          type="only-numbers"
        />

        <Input
          name="complement"
          control={control}
          label="Digite o complemento"
          placeholder="Complemento (opcional)"
          autoCapitalize="characters"
        />
      </InputWrapper>

      <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 20 }}>
        Continuar
      </Button>
      <Button
        onPress={() => router.push('/(auth)/SignUp/Profile')}
        style={{ marginBottom: 40 }}
        outline
      >
        Voltar
      </Button>
    </GlobalContainer>
  );
};

export default Address;
