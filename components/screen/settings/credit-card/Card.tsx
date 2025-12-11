import { Pressable, StyleSheet } from 'react-native';

import Text from '@/components/Text/Text';
import { IconComponent } from '@/components/Icon/Icon';

import { colors } from '@/global/theme';

import { ICard } from '@/interfaces/user';

import { getCardFlagList } from '@/utils/creditCardFlag';
import { AntDesign } from '@expo/vector-icons';

type Props = {
  card: ICard;
  isSelect?: boolean;
  onPress: () => void;
  onPressDelete: () => void;
};

const Card = ({ card, isSelect, onPress, onPressDelete }: Props) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {getCardFlagList(card?.brand)}

      <Text color={colors.secondary_100} style={styles.text}>
        {card?.name}{' '}
        <Text fontWeight={700} color={colors.secondary_100}>
          **** {card?.lastDigits}
        </Text>
      </Text>

      {isSelect && (
        <AntDesign name="check-circle" size={24} color={colors.primary_100} />
      )}

      <IconComponent
        name="Trash2Icon"
        onPress={onPressDelete}
        color={colors.error_60}
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
