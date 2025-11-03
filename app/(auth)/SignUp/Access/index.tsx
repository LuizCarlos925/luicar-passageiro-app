import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { router, useFocusEffect } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';

import Text from '@/components/Text/Text';
import Input from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { GlobalContainer } from '@/components/Container/Container';

import { colors } from '@/global/theme';

import { useAuth } from '@/hooks/useAuth';

import {
  SignUpAccessForm,
  SignUpAccessSchema,
} from '@/validation/Login.validation';
import BackButton from '@/components/BackButton/BackButton';
import { StyleSheet, View } from 'react-native';
import { Step } from '@/components/Step';

const Access = () => {
  const { signUpData, setSignUpData } = useAuth();

  const { control, handleSubmit, reset } = useForm<SignUpAccessForm>({
    resolver: yupResolver(SignUpAccessSchema),
  });

  useFocusEffect(
    useCallback(() => {
      reset(signUpData);
    }, []),
  );

  const onSubmit = async (form: SignUpAccessForm) => {
    setSignUpData(prev => ({
      ...prev,
      ...form,
    }));
    router.push('/(auth)/SignUp/Terms');
  };

  return (
    <GlobalContainer
      containerStyle={{ backgroundColor: colors.primary_10 }}
      paddingHorizontal={20}
      gap={16}
    >
      <BackButton style={{ marginTop: 16 }} />

      <Step currentStep={2} />

      <Text size={32} fontWeight={700} style={styles.text}>
        Agora, informe os dados de acesso
      </Text>

      <View style={styles.wrapper}>
        <Input
          name="email"
          control={control}
          label="E-mail"
          placeholder="Digite seu e-mail..."
          keyboardType="email-address"
          autoCapitalize="none"
          marginTop={40}
        />
        <Input
          name="password"
          control={control}
          label="Senha"
          placeholder="Digite sua senha..."
          password
        />

        <Input
          name="passwordConfirm"
          control={control}
          label="Confirmar senha"
          placeholder="Digite sua senha..."
          password
        />
      </View>

      <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 'auto' }}>
        Continuar
      </Button>
      <Button onPress={router.back} style={{ marginBottom: 40 }} outline>
        Retornar
      </Button>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 8,
  },
  text: {
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    marginTop: -4,
    marginBottom: 40,
    textAlign: 'center',
  },
});

export default Access;
