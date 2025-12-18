import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useForm, useWatch } from 'react-hook-form';
import { router, useFocusEffect } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';

import { Step } from '@/components/Step';
import Text from '@/components/Text/Text';
import Input from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';

import { colors } from '@/global/theme';

import { useAuth } from '@/hooks/useAuth';

import { verifyData } from '@/services/SignUp/verifyData.service';

import {
  SignUpAccessForm,
  SignUpAccessSchema,
} from '@/validation/Login.validation';
import { PasswordValidation } from '@/components/ui';

const Access = () => {
  const { signUpData, setSignUpData } = useAuth();

  const { control, handleSubmit, reset } = useForm<SignUpAccessForm>({
    resolver: yupResolver(SignUpAccessSchema),
  });

  const { password } = useWatch({ control });

  useFocusEffect(
    useCallback(() => {
      reset(signUpData);
    }, []),
  );

  const onSubmit = async (form: SignUpAccessForm) => {
    const isValid = await verifyData({ email: form.email });

    if (!isValid) {
      return;
    }

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

        <PasswordValidation password={password} />

        <Input
          name="passwordConfirm"
          control={control}
          label="Confirmar senha"
          placeholder="Digite sua senha..."
          password
        />
      </View>

      <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 'auto' }}>
        Próximo
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
