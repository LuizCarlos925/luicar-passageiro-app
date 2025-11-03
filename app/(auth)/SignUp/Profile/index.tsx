import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { router, useFocusEffect } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';

import Text from '@/components/Text/Text';
import Input from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';

import { GlobalContainer } from '@/components/Container/Container';
// import { AvatarPicker } from '@/components/AvatarPicker/AvatarPicker';

import { theme } from '@/global/theme';
import { shadow } from '@/global/shadow';

import { useAuth } from '@/hooks/useAuth';

import {
  SignUpProfileForm,
  SignUpProfileSchema,
} from '@/validation/Login.validation';

import { api } from '@/services/api';
import { handleError } from '@/utils/handleError';
import { InputWrapper } from './styles';

const Profile = () => {
  const { signUpData, setSignUpData } = useAuth();

  const { control, handleSubmit, reset } = useForm<SignUpProfileForm>({
    resolver: yupResolver(SignUpProfileSchema),
    defaultValues: {
      phone: {
        ddi: '55',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/36px-Flag_of_Brazil.svg.png',
        country: 'Brasil',
      },
      rg: '',
      cpf: '',
    },
  });

  useFocusEffect(
    useCallback(() => {
      reset({ ...signUpData });
    }, []),
  );

  // 35489183870

  const onSubmit = async (form: SignUpProfileForm) => {
    try {
      const { data } = await api.post('validateUserPassenger', {
        cpf: form.cpf,
        rg: form.rg,
        email: form.email,
      });

      setSignUpData(prev => ({
        ...prev,
        ...form,
      }));
      router.push('/(auth)/SignUp/Address');
    } catch (error) {
      handleError(error);
    }
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
        Dados pessoais
      </Text>

      <InputWrapper style={shadow.default}>
        {/* <AvatarPicker name="avatar" control={control} /> */}

        <Input
          name="name"
          control={control}
          label="Nome completo"
          placeholder="Digite seu nome completo"
          autoCapitalize="characters"
        />
        <Input
          name="social_name"
          control={control}
          label="Nome social (opcional)"
          placeholder="Digite seu nome social"
          autoCapitalize="characters"
        />
        <Input
          name="cpf"
          control={control}
          label="CPF"
          placeholder="Digite seu CPF"
          type="cpf"
        />
        <Input
          name="rg"
          control={control}
          label="RG"
          placeholder="Digite seu RG"
        />
        <Input
          name="email"
          control={control}
          label="E-mail"
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </InputWrapper>

      <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 20 }}>
        Continuar
      </Button>
      <Button
        onPress={() => router.push('/(auth)/Welcome')}
        style={{ marginBottom: 40 }}
        outline
      >
        Voltar
      </Button>
    </GlobalContainer>
  );
};

export default Profile;
