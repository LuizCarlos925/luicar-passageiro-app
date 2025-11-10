import { Pressable, StyleSheet } from 'react-native';

import Text from '@/components/Text/Text';
import { IconComponent } from '@/components/Icon/Icon';

import { colors } from '@/global/theme';

import { ICard } from '@/interfaces/user';

import { getCardFlagList } from '@/utils/creditCardFlag';

type Props = {
  card: ICard;
  onPressDelete: () => void;
};

const Card = ({ card, onPressDelete }: Props) => {
  return (
    <Pressable style={styles.container}>
      {getCardFlagList(card?.brand)}

      <Text color={colors.secondary_100} style={styles.text}>
        {card?.name}{' '}
        <Text fontWeight={700} color={colors.secondary_100}>
          **** {card?.lastDigits}
        </Text>
      </Text>

      <IconComponent
        name="Trash2Icon"
        onPress={onPressDelete}
        color={colors.secondary_60}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    padding: 14,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary_20,
  },
  text: {
    flex: 1,
  },
});

export default Card;
