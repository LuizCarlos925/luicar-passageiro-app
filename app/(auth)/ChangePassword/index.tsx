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

import { useModal } from '@/hooks/useModal';

import { handleError } from '@/utils/handleError';

import {
  RecoverPasswordForm,
  RecoverPasswordSchema,
} from '@/validation/Login.validation';

const ChangePassword = () => {
  const { setModal } = useModal();

  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<RecoverPasswordForm>({
    resolver: yupResolver(RecoverPasswordSchema),
  });

  const onSubmit = async (form: RecoverPasswordForm) => {
    setIsLoading(true);
    try {
      setModal({
        name: 'changePassword',
        onPressBack: () => router.dismissTo('/(auth)/Login'),
        onPress: () => router.dismissTo('/(auth)/Login'),
      });
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };

  return (
    <GlobalContainer paddingHorizontal={20} gap={40}>
      <BackButton title="Recuperar senha" />

      <Text size={32} fontWeight={700} style={styles.text}>
        Cadastre sua{'\n'}
        nova senha
      </Text>

      <View style={[styles.wrapper, { marginTop: 40 }]}>
        <Input
          name="password"
          control={control}
          label="Senha"
          placeholder="Digite sua senha..."
          textContentType="oneTimeCode"
          password
        />
        <Input
          name="confirmPassword"
          control={control}
          label="Confirmar nova senha"
          placeholder="Confirme sua senha..."
          textContentType="oneTimeCode"
          password
        />
      </View>

      <Button
        onPress={handleSubmit(onSubmit)}
        style={{ marginTop: 'auto', marginBottom: 40 }}
        isLoading={isLoading}
      >
        Confirmar senha
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

export default ChangePassword;
