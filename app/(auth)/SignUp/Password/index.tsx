/* eslint-disable no-useless-escape */
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { router, useFocusEffect } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';

import Text from '@/components/Text/Text';
import Input from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { Checkbox } from '@/components/Checkbox/Checkbox';
import { GlobalContainer } from '@/components/Container/Container';

import { theme } from '@/global/theme';
import { shadow } from '@/global/shadow';

import { useModal } from '@/hooks/useModal';
import { ISignUpData, useAuth } from '@/hooks/useAuth';

import { IUser } from '@/interfaces/user';

import { api } from '@/services/api';

import { handleError } from '@/utils/handleError';

import {
  SignUpPasswordForm,
  SignUpPasswordSchema,
} from '@/validation/Login.validation';

import { InputWrapper, PasswordRulesWrapper, TextMarker } from './styles';

const Password = () => {
  const { signUpData, setSignUpData } = useAuth();
  const { setModal } = useModal();

  const [jwt, setJwt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignUpPasswordForm>({
    resolver: yupResolver(SignUpPasswordSchema),
  });

  const terms = watch('acceptTerms');

  const passwordHasSpecialChars = watch('password')?.match(
    /^(?=.*[!@#\$%\^&\*\.\;\_\=\+\-\:\,\<\>\?\|\/])/,
  );
  const passwordHasUppercase = watch('password')?.match(/^(?=.*[a-z])/);
  const passwordHasLowercase = watch('password')?.match(/^(?=.*[A-Z])/);
  const passwordHasMinimum = watch('password')?.length >= 8;
  const strongPassword =
    passwordHasSpecialChars &&
    passwordHasUppercase &&
    passwordHasLowercase &&
    passwordHasMinimum;

  useFocusEffect(
    useCallback(() => {
      reset({ ...signUpData });
    }, []),
  );

  const requirementColors = (isAttending: boolean | null) => {
    if (!watch('password')) {
      return theme.colors.neutro_100;
    }
    if (isAttending) {
      return theme.colors.green_2d;
    }
    return theme.colors.red_d1;
  };

  const onSubmit = async (form: SignUpPasswordForm) => {
    try {
      setIsLoading(true);
      if (!form?.acceptTerms) {
        throw new Error('Aceito os termos para continuar');
      }
      const { data } = await api.post<IUser & { jwt: string }>(
        '/createPassenger',
        {
          name: signUpData.name,
          socialName: signUpData?.social_name,
          cpf: signUpData.cpf,
          rg: signUpData.rg,
          phone: signUpData.phone?.phoneNumber,
          zipCode: signUpData.zipCode,
          address: signUpData.street,
          number: signUpData.number,
          neighborhood: signUpData.district,
          complement: signUpData?.complement,
          city: signUpData.city,
          state: signUpData.state,
          email: signUpData.email,
          password: form.password,
        },
      );
      setJwt(data?.jwt);

      await api.put('/acceptTerm?type=passageiro', {
        userId: data?.id,
      });

      const formData = new FormData();

      formData.append('ref', 'api::passenger.passenger');
      formData.append('refId', data?.passenger?.id?.toString());
      formData.append('field', 'image');
      formData.append('files', {
        uri: signUpData?.avatar,
        name: signUpData?.avatar?.split('/')?.pop() as string,
        type: 'image/jpg',
      });

      await api.post('/upload', formData, {
        headers: {
          Authorization: `Bearer ${data?.jwt}`,
        },
      });

      setSignUpData({} as ISignUpData);

      setModal({
        name: 'signUp',
        onPress: () => {
          router.dismissAll();
          router.push('/(auth)/Login');
        },
        onPressBack: () => {
          router.dismissAll();
          router.push('/(auth)/Login');
        },
      });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      handleError(err);
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
      <Text color={theme.colors.primary_60}>Defina sua senha</Text>

      <Text
        size={22}
        fontWeight={600}
        color={theme.colors.gray_1e}
        marginTop={20}
      >
        Dados de acesso
      </Text>

      <InputWrapper style={shadow.default}>
        <Input
          name="password"
          control={control}
          label="Senha"
          placeholder="Digite sua senha..."
          password
        />

        <View style={{ width: '100%', marginTop: -6, gap: 10 }}>
          <PasswordRulesWrapper>
            <TextMarker />
            <Text color={requirementColors(passwordHasMinimum)}>
              Use pelo menos 8 caracteres
            </Text>
          </PasswordRulesWrapper>
          <PasswordRulesWrapper>
            <TextMarker />
            <Text
              color={requirementColors(
                !!passwordHasUppercase &&
                  !!passwordHasLowercase &&
                  !!passwordHasSpecialChars,
              )}
            >
              Inclua pelo menos 1 número, 1 letra minúscula, 1 letra maiúscula e
              1 caractere especial (como !#*){' '}
            </Text>
          </PasswordRulesWrapper>
          <PasswordRulesWrapper>
            <TextMarker />
            <Text color={requirementColors(strongPassword)}>
              Certifique-se de usar uma senha forte
            </Text>
          </PasswordRulesWrapper>
        </View>

        <Input
          name="passwordConfirm"
          control={control}
          label="Confirmar senha"
          placeholder="Digite sua senha..."
          marginTop={25}
          password
        />
      </InputWrapper>

      <Checkbox
        name="acceptTerms"
        control={control}
        onPress={() => {
          setSignUpData(prev => ({
            ...prev,

            password: watch('password'),

            passwordConfirm: watch('passwordConfirm'),
            acceptTerms: true,
          }));
          router.push('/(auth)/Terms');
        }}
        label={
          <Text fontWeight={500} color={theme.colors.gray_1e}>
            Eu li e concordo com os{' '}
            <Text
              fontWeight={600}
              color={theme.colors.gray_1e}
              onPress={() => {
                setSignUpData(prev => ({
                  ...prev,
                  password: watch('password'),
                  passwordConfirm: watch('passwordConfirm'),
                  acceptTerms: true,
                }));
                router.push('/(auth)/Terms');
              }}
            >
              Termos de Uso
            </Text>
          </Text>
        }
        style={{ marginTop: 10 }}
      />

      {(errors?.acceptTerms || terms === false) && (
        <Text color={theme.colors.red_d1} style={{ marginBottom: 10 }}>
          Você precisa concordar com os Termos de Uso para continuar.{' '}
          <Text color={theme.colors.gray_1e}>
            Por favor, leia e aceite os Termos de Uso para prosseguir com o
            cadastro.
          </Text>
        </Text>
      )}

      <Button
        onPress={handleSubmit(onSubmit)}
        style={{ marginTop: 'auto' }}
        isLoading={isLoading}
      >
        Continuar
      </Button>
      <Button
        onPress={() => router.push('/(auth)/SignUp/BankAccount')}
        style={{ marginBottom: 40 }}
        outline
        isLoading={isLoading}
      >
        Voltar
      </Button>
    </GlobalContainer>
  );
};

export default Password;
