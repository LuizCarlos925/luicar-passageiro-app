import React from 'react';
import { router } from 'expo-router';
import { ActivityIndicator, StyleSheet, TextInput, View } from 'react-native';

import { Step } from '@/components/Step';
import Text from '@/components/Text/Text';
import { Button } from '@/components/Button/Button';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';
import ScrollContainer from '@/components/ScrollContainer/ScrollContainer';

import { colors } from '@/global/theme';

import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModal';

import { api } from '@/services/api';
import { useTerms } from '@/services/Settings/terms.service';

import { handleError } from '@/utils/handleError';

const Terms = () => {
  const { signUpData, setSignUpData } = useAuth();

  const { setModal } = useModal();

  const [condominiumCode, setCondominiumCode] = React.useState('');

  const { data: termsData, isFetching } = useTerms();

  const terms = termsData?.find(term => term.name === 'Termos de Uso');
  const politics = termsData?.find(term => term.name !== 'Termos de Uso');

  const onSubmit = async () => {
    try {
      const { data } = await api.post<{ id: string }>('/createPassenger', {
        name: signUpData.name,
        socialName: signUpData?.social_name,
        cpf: signUpData.cpf,
        phone: signUpData.phone,
        zipCode: signUpData.zipCode,
        address: signUpData.street,
        number: signUpData.number,
        neighborhood: signUpData.district,
        complement: signUpData?.complement,
        city: signUpData.city,
        state: signUpData.state,
        email: signUpData.email,
        password: signUpData.password,
        condominiumCode: condominiumCode.trim() || undefined,
      });

      await api.put('/acceptTerm?type=passageiro', {
        userId: data?.id,
      });

      setModal({
        name: 'signUp',
        onPress: () => router.dismissTo('/(auth)/Login'),
        onPressBack: () => router.dismissTo('/(auth)/Login'),
      });

      setSignUpData({} as any);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <GlobalContainer
      paddingHorizontal={20}
      gap={16}
      containerStyle={{ backgroundColor: colors.primary_10 }}
      contentWrapperStyle={{ flex: 1 }}
      scrollable
    >
      <BackButton />

      <Step currentStep={3} />

      <Text size={32} fontWeight={700} style={styles.text}>
        Termos de Uso
      </Text>

      <ScrollContainer>
        {isFetching ? (
          <ActivityIndicator size={40} color={colors.primary_100} />
        ) : (
          <Text size={16} color={colors.secondary_60}>
            {terms?.description}
          </Text>
        )}
      </ScrollContainer>

      <Text size={32} fontWeight={700} style={styles.text}>
        Política de Privacidade
      </Text>

      <ScrollContainer>
        {isFetching ? (
          <ActivityIndicator size={40} color={colors.primary_100} />
        ) : (
          <Text size={16} color={colors.secondary_60}>
            {politics?.description}
          </Text>
        )}
      </ScrollContainer>

      <View style={styles.condoWrapper}>
        <Text size={14} fontWeight={700} color={colors.secondary_60}>
          Código do condomínio (opcional)
        </Text>
        <TextInput
          value={condominiumCode}
          onChangeText={t => setCondominiumCode(t.toUpperCase())}
          placeholder="Ex: VILLAVERDE"
          placeholderTextColor="#9AA0A6"
          autoCapitalize="characters"
          autoCorrect={false}
          maxLength={30}
          style={styles.condoInput}
        />
      </View>

      <Button onPress={onSubmit} style={{ marginTop: 12 }}>
        Aceitar e concluir cadastro
      </Button>
      <Button onPress={router.back} style={{ marginBottom: 20 }} outline>
        Retornar
      </Button>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    width: '100%',
    textAlign: 'center',
  },
  condoWrapper: {
    width: '100%',
    marginTop: 'auto',
    gap: 6,
  },
  condoInput: {
    borderWidth: 1,
    borderColor: colors.secondary_60,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
});

export default Terms;
