import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { router } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';

import Text from '@/components/Text/Text';
import Input from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';

import { theme } from '@/global/theme';
import { shadow } from '@/global/shadow';

import { useModal } from '@/hooks/useModal';

import { api } from '@/services/api';

import { handleError } from '@/utils/handleError';

import {
  ForgotPasswordForm,
  ForgotPasswordSchema,
} from '@/validation/Login.validation';

import { InfoWrapper, InputWrapper } from './styles';

const ForgotPassword = () => {
  const { setModal } = useModal();

  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (form: ForgotPasswordForm) => {
    try {
      setIsLoading(true);
      await api.post('/forgotPassword', {
        email: form.email?.toLocaleLowerCase(),
        role: 'authenticated',
      });

      setModal({
        name: 'forgotPassword',
        onPressBack: () => router.back(),
        onPress: () => router.back(),
      });
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlobalContainer
      containerStyle={{ paddingTop: 0 }}
      scrollContainerStyle={{ alignItems: 'flex-start' }}
      paddingHorizontal={20}
      gap={10}
    >
      <BackButton style={{ marginTop: 15 }} />

      <Text
        size={38}
        fontWeight={700}
        color={theme.colors.primary_100}
        marginTop={20}
      >
        Esqueci a senha
      </Text>
      <Text
        size={16}
        fontWeight={600}
        color={theme.colors.primary_100}
        marginTop={20}
      >
        Insira um e-mail cadastrado na plataforma
      </Text>

      <InfoWrapper>
        <Text color={theme.colors.primary_60}>
          Um link será enviado no seu e-mail para a alteração da senha!
        </Text>
      </InfoWrapper>

      <InputWrapper style={shadow.default}>
        <Input
          name="email"
          control={control}
          label="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Digite seu e-mail"
        />
      </InputWrapper>

      <Button
        onPress={handleSubmit(onSubmit)}
        style={{ marginTop: 'auto', marginBottom: 40 }}
        isLoading={isLoading}
      >
        Continuar
      </Button>
    </GlobalContainer>
  );
};

export default ForgotPassword;
