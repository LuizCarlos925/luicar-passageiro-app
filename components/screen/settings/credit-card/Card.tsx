import { Pressable, StyleSheet } from 'react-native';

import Text from '@/components/Text/Text';
import { IconComponent } from '@/components/Icon/Icon';

import { colors } from '@/global/theme';

import { getCardFlag } from '@/utils/creditCardFlag';

type Props = {
  onPressDelete: () => void;
};

const Card = ({ onPressDelete }: Props) => {
  return (
    <Pressable style={styles.container}>
      {getCardFlag('5437 7388 1413 5551', colors.neutro_00)}

      <Text color={colors.secondary_100} style={styles.text}>
        Nome do cartão{' '}
        <Text fontWeight={700} color={colors.secondary_100}>
          **** 1962
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
