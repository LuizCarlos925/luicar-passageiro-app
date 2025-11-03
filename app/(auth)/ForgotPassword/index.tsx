import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { router } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';

import Text from '@/components/Text/Text';
import Input from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';

import { useModal } from '@/hooks/useModal';

import { handleError } from '@/utils/handleError';

import {
  ForgotPasswordForm,
  ForgotPasswordSchema,
} from '@/validation/Login.validation';
import { StyleSheet, View } from 'react-native';
import { colors } from '@/global/theme';

const ForgotPassword = () => {
  const { setModal } = useModal();

  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (form: ForgotPasswordForm) => {
    setIsLoading(true);
    try {
      // await api.post('/forgotPassword', {
      //   email: form.email?.toLocaleLowerCase(),
      //   role: 'authenticated',
      // });

      setModal({
        name: 'forgotPassword',
        onPressBack: () => router.push('/(auth)/ChangePassword'),
        onPress: () => router.push('/(auth)/ChangePassword'),
      });
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };

  return (
    <GlobalContainer
      paddingHorizontal={20}
      gap={40}
      containerStyle={{ backgroundColor: colors.primary_10 }}
    >
      <BackButton title="Recuperar senha" />

      <View style={styles.wrapper}>
        <Text size={32} fontWeight={700} style={styles.text}>
          Redefinir senha
        </Text>
        <Text size={16} style={styles.text}>
          Informe o seu e-mail cadastrado para recuperar a sua senha
        </Text>
      </View>

      <Input
        name="email"
        control={control}
        label="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Digite seu e-mail"
        marginTop={40}
      />

      <Button
        onPress={handleSubmit(onSubmit)}
        style={{ marginTop: 'auto', marginBottom: 40 }}
        isLoading={isLoading}
      >
        Enviar link de redefinição
      </Button>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 8,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default ForgotPassword;
