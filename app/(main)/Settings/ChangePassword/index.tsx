import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { router } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';

import Text from '@/components/Text/Text';
import Input from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';

import { colors, theme } from '@/global/theme';

import { useModal } from '@/hooks/useModal';

import { api } from '@/services/api';

import { handleError } from '@/utils/handleError';

import { PasswordForm, PasswordSchema } from '@/validation/Profile.validation';

import { InputWrapper, PasswordRulesWrapper } from './styles';

const ChangePassword = () => {
  const { setModal } = useModal();

  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<PasswordForm>({
    resolver: yupResolver(PasswordSchema),
  });

  const onSubmit = async (form: PasswordForm) => {
    setIsLoading(true);
    try {
      await api.post('/auth/change-password', {
        currentPassword: form.oldPassword,
        password: form.password,
        passwordConfirmation: form.passwordConfirm,
      });

      setTimeout(() => {
        setModal({
          name: 'updateSuccess',
          onPress: router.back,
          onPressBack: router.back,
        });
      }, 500);
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };

  return (
    <GlobalContainer alignItems="flex-start" paddingHorizontal={20} gap={16}>
      <BackButton style={styles.backBtn} />

      <Text size={24} fontWeight={700} color={colors.secondary_100}>
        Alterar senha
      </Text>

      <InputWrapper>
        <Input
          name="oldPassword"
          control={control}
          label="Senha atual"
          placeholder="Insira sua senha atual..."
          containerStyle={{ borderColor: `${theme.colors.gray_9e}80` }}
          password
        />

        <Input
          name="password"
          control={control}
          label="Nova senha"
          placeholder="Insira a nova senha..."
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
          placeholder="Confirme sua senha..."
          marginTop={16}
          containerStyle={{ borderColor: `${theme.colors.gray_9e}80` }}
          password
        />
      </InputWrapper>

      <View style={styles.buttonsWrapper}>
        <Button
          onPress={handleSubmit(() =>
            setModal({
              name: 'changePasswordAlert',
              onPress: handleSubmit(onSubmit),
            }),
          )}
          style={{ marginTop: 'auto' }}
          isLoading={isLoading}
        >
          Alterar senha
        </Button>
        <Button onPress={router.back} outline>
          Cancelar
        </Button>
      </View>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    marginTop: 16,
  },
  buttonsWrapper: {
    width: '100%',
    marginTop: 'auto',
    marginBottom: 30,
    gap: 8,
  },
});

export default ChangePassword;
