import { Pressable, StyleSheet } from 'react-native';
import Text from '@/components/Text/Text';
import { IconComponent } from '@/components/Icon/Icon';

import { colors } from '@/global/theme';

import { getCardFlagList } from '@/utils/creditCardFlag';
import { ICard } from '@/interfaces/user';

type Props = {
  card: ICard;
  onPress: () => void;
};

const MethodCreditCard = ({ card, onPress }: Props) => {
  if (!card) {
    return (
      <Pressable onPress={onPress} style={styles.addCreditCard}>
        <Text color={colors.primary_100}>Adicionar cartão de crédito</Text>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={styles.creditCard}>
      {getCardFlagList(card.brand)}
      <Text color={colors.secondary_100} style={styles.text}>
        {card.name}{' '}
        <Text fontWeight={700} color={colors.secondary_100}>
          **** {card.lastDigits}
        </Text>
      </Text>

      <IconComponent name="SwitchIcon" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  creditCard: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.secondary_20,
  },
  text: {
    flex: 1,
  },
  addCreditCard: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary_100,
  },
});

export default MethodCreditCard;
