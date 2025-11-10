import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Entypo } from '@expo/vector-icons';

import Text from '@/components/Text/Text';
import { CardMyCreditCard } from '@/components/screen';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';

import { colors } from '@/global/theme';

import { useModal } from '@/hooks/useModal';
import { useAuth } from '@/hooks/useAuth';

import { api } from '@/services/api';

import { handleError } from '@/utils/handleError';

const CreditCard = () => {
  const { user, refetchUser } = useAuth();

  const { setModal } = useModal();

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/deleteCard?cardId=${id}`);
      refetchUser();

      setTimeout(() => {
        setModal({ name: 'deleteCreditCardSuccess' });
      }, 500);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <GlobalContainer alignItems="flex-start" paddingHorizontal={20} gap={16}>
      <BackButton style={styles.backBtn} />
      <Text size={24} fontWeight={700} color={colors.secondary_100}>
        Meus cartões
      </Text>
      {user?.passenger?.cards?.map(item => (
        <CardMyCreditCard
          key={item.id}
          card={item}
          onPressDelete={() =>
            setModal({
              name: 'deleteCreditCard',
              onPress: () => handleDelete(item.id),
            })
          }
        />
      ))}
      <Pressable
        onPress={() => router.push('/(main)/Settings/CreditCard/Form')}
        hitSlop={8}
        style={styles.row}
      >
        <Entypo name="plus" size={16} color={colors.primary_100} />
        <Text color={colors.primary_100}>Adicionar cartão</Text>
      </Pressable>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

export default CreditCard;
