import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import Text from '@/components/Text/Text';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';

import { colors } from '@/global/theme';
import { router } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { CardMyCreditCard } from '@/components/screen';
import { useModal } from '@/hooks/useModal';

const CreditCard = () => {
  const { setModal } = useModal();

  const [cards, setCards] = React.useState([
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ]);

  const handleDelete = (id: string) => {
    setCards(prevCards => prevCards.filter(card => card.id !== id));

    setTimeout(() => {
      setModal({ name: 'deleteCreditCardSuccess' });
    }, 500);
  };

  return (
    <GlobalContainer alignItems="flex-start" paddingHorizontal={20} gap={16}>
      <BackButton style={styles.backBtn} />
      <Text size={24} fontWeight={700} color={colors.secondary_100}>
        Meus cartões
      </Text>
      {cards.map(item => (
        <CardMyCreditCard
          key={item.id}
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
