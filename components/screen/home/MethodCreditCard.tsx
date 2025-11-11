import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import Text from '@/components/Text/Text';
import { IconComponent } from '@/components/Icon/Icon';

import { colors } from '@/global/theme';

import { useAuth } from '@/hooks/useAuth';

import { getCardFlagList } from '@/utils/creditCardFlag';

const MethodCreditCard = () => {
  const { user } = useAuth();

  const card = user?.passenger?.cards?.find(item => item?.isMain);

  if (!card) {
    return null;
  }

  return (
    <View style={styles.creditCard}>
      {getCardFlagList(card.brand)}
      <Text color={colors.secondary_100} style={styles.text}>
        {card.name}{' '}
        <Text fontWeight={700} color={colors.secondary_100}>
          **** {card.lastDigits}
        </Text>
      </Text>

      <IconComponent
        name="SwitchIcon"
        onPress={() => router.push('/(main)/Settings/CreditCard')}
      />
    </View>
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
});

export default MethodCreditCard;
