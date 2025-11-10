import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { router } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { channel, updateId } from 'expo-updates';

import { LogoIcon } from '@/assets/icons';

import Text from '@/components/Text/Text';
import Input from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { Checkbox } from '@/components/Checkbox/Checkbox';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';

import { theme } from '@/global/theme';

import { useAuth } from '@/hooks/useAuth';

import { LoginForm, LoginSchema } from '@/validation/Login.validation';

const Login = () => {
  const { login, isLoading } = useAuth();

  const [showUpdateId, setShowUpdateId] = useState(false);

  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: yupResolver(LoginSchema as any),
    defaultValues: __DEV__
      ? {
          identifier: 'thaliacsoares2002@gmail.com',
          password: 'Teste12@',
          rememberMe: true,
        }
      : {
          rememberMe: true,
        },
  });

  return (
    <GlobalContainer
      paddingHorizontal={20}
      gap={15}
      containerStyle={{ backgroundColor: theme.colors.primary_10 }}
    >
      <BackButton style={styles.backBtn} />

      <LogoIcon />

      <View style={styles.wrapper}>
        <Text size={32} fontWeight={700}>
          Acesse sua conta
        </Text>
        <Text size={16} textAlign="center">
          Estamos felizes em ter{'\n'}você de volta!
        </Text>
      </View>

      <View
        style={[styles.wrapper, { marginTop: 'auto', marginBottom: 'auto' }]}
      >
        <Input
          name="identifier"
          control={control}
          label="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Digite seu e-mail"
          textContentType="oneTimeCode"
        />
        <Input
          name="password"
          control={control}
          label="Senha"
          placeholder="Digite sua senha..."
          textContentType="oneTimeCode"
          password
        />
        <View style={styles.row}>
          <Checkbox
            name="rememberMe"
            control={control}
            label="Manter conectado"
          />
          <Text
            onPress={() => router.push('/(auth)/ForgotPassword')}
            color={theme.colors.secondary_80}
          >
            Esqueceu sua senha?
          </Text>
        </View>
      </View>

      <Button
        onPress={handleSubmit(login)}
        style={{ marginTop: 10, marginBottom: 10 }}
        isLoading={isLoading}
      >
        Acessar conta
      </Button>
      <Text
        onPress={() => router.push('/(auth)/SignUp/Profile')}
        marginTop={-10}
      >
        Não possui conta? Cadastre-se
      </Text>
      <Button
        onPress={() => setShowUpdateId(prev => !prev)}
        fontSize={10}
        fontColor={theme.colors.neutro_100}
        backgroundColor="transparent"
      >
        {showUpdateId && `${channel}: ${updateId}`}
      </Button>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    alignSelf: 'flex-start',
  },
  wrapper: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Login;
