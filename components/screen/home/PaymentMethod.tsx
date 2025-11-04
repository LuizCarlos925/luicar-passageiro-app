import { Pressable, StyleSheet } from 'react-native';

import Text from '@/components/Text/Text';
import { IconComponent } from '@/components/Icon/Icon';

import { colors } from '@/global/theme';

const METHODS = {
  pix: {
    name: 'PIX',
    icon: 'PixIcon',
  },
  creditCard: {
    name: 'Cartão de crédito',
    icon: 'CreditCardIcon',
  },
  cash: {
    name: 'Dinheiro',
    icon: 'MoneyIcon',
  },
} as const;

type Props = {
  type: 'pix' | 'creditCard' | 'cash';
  isSelected: boolean;
  onPress: () => void;
};

const PaymentMethod = ({ type, isSelected, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        { borderColor: isSelected ? colors.primary_100 : colors.secondary_20 },
      ]}
    >
      <IconComponent name={METHODS[type].icon} color={colors.primary_100} />

      <Text
        fontWeight={600}
        color={colors.secondary_80}
        style={{ textAlign: 'center' }}
      >
        {METHODS[type].name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 83,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.secondary_20,
    borderRadius: 8,
  },
});

export default PaymentMethod;
