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

import { useModal } from '@/hooks/useModal';

import { api } from '@/services/api';

import { handleError } from '@/utils/handleError';
import { PasswordForm, PasswordSchema } from '@/validation/Profile.validation';

import { useAuth } from '@/hooks/useAuth';
import { InputWrapper, PasswordRulesWrapper } from './styles';

const ChangePassword = () => {
  const { setModal } = useModal();

  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();

  const { control, handleSubmit, watch } = useForm<PasswordForm>({
    resolver: yupResolver(PasswordSchema),
  });

  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');

  const onSubmit = async (form: PasswordForm) => {
    try {
      setIsLoading(true);
      await api.post('/auth/change-password', {
        currentPassword: form.oldPassword,
        password: form.password,
        passwordConfirmation: form.passwordConfirm,
      });

      await logout();
      router.dismissAll();
      router.push('/Login');

      // setModal({
      //   name: 'changePasswordSuccess',
      //   onPress: () => router.back(),
      //   onPressBack: () => router.back(),
      // });
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlobalContainer
      alignItems="flex-start"
      paddingHorizontal={20}
      gap={30}
      containerStyle={{
        backgroundColor: theme.colors.neutro_00,
      }}
    >
      <BackButton />
      <Text
        size={22}
        fontWeight={600}
        color={theme.colors.primary_100}
        marginTop={30}
      >
        Alterar senha
      </Text>

      <InputWrapper>
        <Input
          name="oldPassword"
          control={control}
          label="Senha atual"
          placeholder="Insira sua senha atual"
          containerStyle={{ borderColor: `${theme.colors.gray_9e}80` }}
          password
        />

        <Input
          name="password"
          control={control}
          label="Nova senha"
          placeholder="Insira a nova senha"
          containerStyle={{ borderColor: `${theme.colors.gray_9e}80` }}
          password
        />

        <PasswordRulesWrapper>
          <Text fontWeight={500} color={theme.colors.gray_1e}>
            Requisitos para a senha:
          </Text>

          <Text color={theme.colors.gray_1e}>
            {'   '}
            {`\u2022`} Mínimo 8 caracteres;
          </Text>

          <Text color={theme.colors.gray_1e}>
            {'   '}
            {`\u2022`} Letra maiúscula;
          </Text>

          <Text color={theme.colors.gray_1e}>
            {'   '}
            {`\u2022`} Letra minúscula.
          </Text>
        </PasswordRulesWrapper>

        <Input
          name="passwordConfirm"
          control={control}
          label="Confirmar nova senha"
          placeholder="Insira a nova senha"
          marginTop={25}
          containerStyle={{ borderColor: `${theme.colors.gray_9e}80` }}
          password
        />

        {passwordConfirm && password !== passwordConfirm && (
          <Text
            size={12}
            fontWeight={500}
            color={theme.colors.red_d1}
            style={{ marginBottom: 10 }}
          >
            As senhas não coincidem, tente novamente.
          </Text>
        )}
      </InputWrapper>

      <Button
        onPress={handleSubmit(onSubmit)}
        style={{ marginTop: 'auto', marginBottom: 30 }}
        isLoading={isLoading}
      >
        Salvar
      </Button>
    </GlobalContainer>
  );
};

export default ChangePassword;
