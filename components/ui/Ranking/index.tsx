import { StyleSheet, View } from 'react-native';
import { colors } from '@/global/theme';
import { IconComponent } from '@/components/Icon/Icon';
import Text from '@/components/Text/Text';

const RAKINGS = {
  diamante: {
    label: 'DIAMANTE',
    icon: 'DiamondIcon',
  },
  ouro: {
    label: 'OURO',
    icon: 'Gold',
  },
  prata: {
    label: 'PRATA',
    icon: 'Silver',
  },
} as const;

type RankingType = keyof typeof RAKINGS;

type Props = {
  ranking: RankingType;
  isDarkMode?: boolean;
};

const Ranking = ({ ranking, isDarkMode }: Props) => {
  return (
    <View style={isDarkMode ? styles.tagDark : styles.tag}>
      {RAKINGS?.[ranking]?.icon && (
        <IconComponent name={RAKINGS?.[ranking]?.icon} size={12} />
      )}

      <Text
        size={12}
        fontWeight={600}
        color={isDarkMode ? colors.secondary_20 : colors.secondary_80}
      >
        {RAKINGS?.[ranking]?.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.secondary_20,
  },
  tagDark: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.secondary_60,
    backgroundColor: colors.secondary_80,
  },
});

export default Ranking;
