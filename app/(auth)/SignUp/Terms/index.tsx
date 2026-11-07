import React from 'react';
import { router } from 'expo-router';
import { ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

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

  type Condo = { id: number; name: string; code: string };
  const [condoList, setCondoList] = React.useState<Condo[]>([]);
  const [condoQuery, setCondoQuery] = React.useState('');
  const [selectedCondo, setSelectedCondo] = React.useState<Condo | null>(null);

  React.useEffect(() => {
    api
      .get<{ data: Condo[] }>('/condominiums/active')
      .then(res => setCondoList(res.data?.data ?? []))
      .catch(() => setCondoList([]));
  }, []);

  const STOP_WORDS = ['condominio', 'residencial', 'edificio', 'conjunto', 'cond', 'res', 'ed', 'do', 'da', 'de', 'dos', 'das'];
  const normalizeName = (t: string) =>
    t
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, ' ')
      .split(' ')
      .filter(w => w && !STOP_WORDS.includes(w))
      .join('')
      .replace(/(.)\1+/g, '$1');
  const condoMatches =
    !selectedCondo && normalizeName(condoQuery).length >= 2
      ? condoList.filter(c => normalizeName(c.name).includes(normalizeName(condoQuery))).slice(0, 5)
      : [];

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
        condominiumCode: selectedCondo?.code || undefined,
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

      {condoList.length > 0 && (
        <View style={styles.condoWrapper}>
          <Text size={14} fontWeight={700} color={colors.secondary_60}>
            Mora em condomínio parceiro? (opcional)
          </Text>
          {selectedCondo ? (
            <View style={styles.condoSelected}>
              <Text size={16} fontWeight={700} color="#1A1A1A">
                {selectedCondo.name}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectedCondo(null);
                  setCondoQuery('');
                }}
              >
                <Text size={14} fontWeight={700} color={colors.primary_100}>
                  Trocar
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <TextInput
                value={condoQuery}
                onChangeText={setCondoQuery}
                placeholder="Digite o nome do seu condomínio"
                placeholderTextColor="#9AA0A6"
                autoCorrect={false}
                maxLength={60}
                style={styles.condoInput}
              />
              {condoMatches.map(c => (
                <TouchableOpacity
                  key={c.id}
                  style={styles.condoOption}
                  onPress={() => {
                    setSelectedCondo(c);
                    setCondoQuery(c.name);
                  }}
                >
                  <Text size={16} color="#1A1A1A">
                    {c.name}
                  </Text>
                </TouchableOpacity>
              ))}
              {condoQuery.trim().length >= 2 && condoMatches.length === 0 && (
                <Text size={13} color={colors.secondary_60}>
                  Nenhum condomínio parceiro encontrado com esse nome.
                </Text>
              )}
            </>
          )}
        </View>
      )}

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
  condoOption: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  condoSelected: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.primary_100,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
});

export default Terms;
