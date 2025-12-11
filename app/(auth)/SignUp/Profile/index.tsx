import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';
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

import {
  SignUpProfileForm,
  SignUpProfileSchema,
} from '@/validation/Login.validation';

import { handleError } from '@/utils/handleError';
import { getAdressByZipCode } from '@/services/cep';
import { verifyData } from '@/services/SignUp/verifyData.service';

const Profile = () => {
  const { signUpData, setSignUpData } = useAuth();

  const { control, handleSubmit, clearErrors, setValue, reset, watch } =
    useForm<SignUpProfileForm>({
      resolver: yupResolver(SignUpProfileSchema as any),
    });

  const zipCode = watch('zipCode');

  useFocusEffect(
    useCallback(() => {
      reset(signUpData);
    }, []),
  );

  const handleZipBlurDevolution = async () => {
    if (zipCode && zipCode.length === 9) {
      try {
        const res = await getAdressByZipCode(zipCode);

        clearErrors('zipCode');
        setValue('street', res.logradouro, { shouldValidate: true });
        setValue('city', res.localidade, { shouldValidate: true });
        setValue('district', res.bairro, { shouldValidate: true });
        setValue('state', res.uf, { shouldValidate: true });
      } catch (error) {
        return null;
      }
    }
  };

  useEffect(() => {
    handleZipBlurDevolution();
  }, [zipCode]);

  const onSubmit = async (form: SignUpProfileForm) => {
    try {
      const isValid = await verifyData({ cpf: form.cpf });

      if (!isValid) {
        return;
      }

      setSignUpData(prev => ({
        ...prev,
        ...form,
      }));
      router.push('/(auth)/SignUp/Access');
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <GlobalContainer
      containerStyle={{ backgroundColor: colors.primary_10 }}
      scrollContainerStyle={{ alignItems: 'flex-start' }}
      paddingHorizontal={20}
      gap={16}
    >
      <BackButton style={{ marginTop: 16 }} />

      <Step currentStep={1} />

      <View style={styles.wrapper}>
        <Text size={32} fontWeight={700} style={styles.text}>
          Vamos iniciar o seu cadastro
        </Text>
        <Text size={16} style={styles.text} marginTop={8}>
          Informe seus dados pessoais
        </Text>
      </View>

      <View style={styles.wrapper}>
        <Input
          name="name"
          control={control}
          label="Nome completo"
          placeholder="Digite seu nome completo"
          autoCapitalize="words"
        />
        <Input
          name="social_name"
          control={control}
          label="Nome social (opcional)"
          placeholder="Digite seu nome social"
          autoCapitalize="words"
        />
        <Input
          name="cpf"
          control={control}
          label="CPF"
          placeholder="Digite seu CPF"
          type="cpf"
        />
        <Input
          name="phone"
          control={control}
          label="Telefone"
          type="cel-phone"
          placeholder="Digite seu telefone"
        />

        <Text size={16} color={colors.primary_100} style={{ marginBottom: 8 }}>
          Dados de endereço
        </Text>

        <Input
          name="zipCode"
          control={control}
          label="CEP"
          placeholder="Digite seu CEP"
          type="zip-code"
        />
        <Input
          name="street"
          control={control}
          label="Rua"
          placeholder="Digite a rua"
          autoCapitalize="words"
        />
        <Input
          name="district"
          control={control}
          label="Bairro"
          placeholder="Digite seu bairro"
          autoCapitalize="words"
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Input
            name="number"
            control={control}
            label="Número"
            placeholder="Digite o número"
            type="only-numbers"
            width="56%"
          />
          <Input
            name="state"
            control={control}
            label="UF"
            placeholder="UF"
            autoCapitalize="characters"
            width="40%"
            maxLength={2}
          />
        </View>

        <Input
          name="complement"
          control={control}
          label="Complemento (opcional)"
          placeholder="Digite o complemento"
          autoCapitalize="words"
        />
      </View>

      <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 20 }}>
        Próximo
      </Button>
      <Text
        onPress={() => router.dismissTo('/(auth)/Login')}
        style={styles.footer}
      >
        Já possui uma conta? Acessar
      </Text>
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

export default Profile;
