import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { Car2 } from '@/assets/images';

import Text from '@/components/Text/Text';

import { colors } from '@/global/theme';

import { formatCurrency } from '@/utils/format';
import { ISubcategory } from '@/interfaces/vehicleCategory';

type Props = {
  vehicle: ISubcategory;
};

const CardVehicle = ({ vehicle }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={Car2} style={styles.image} />

      <View>
        <Text size={16} fontWeight={600} color={colors.secondary_80}>
          Valor da corrida
        </Text>

        <Text size={12} color={colors.secondary_80}>
          Acompanhe o valor
        </Text>
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <Text size={16} fontWeight={600} color={colors.primary_100}>
          {formatCurrency(vehicle.value)}
        </Text>

        <Text size={12} color={colors.secondary_80} style={styles.text}>
          {formatCurrency(vehicle.value * 1.1)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 28,
    borderWidth: 1,
    borderColor: colors.secondary_20,
    borderRadius: 8,
  },
  image: {
    width: 32,
    height: 32,
  },
  text: {
    textDecorationLine: 'line-through',
  },
});

export default CardVehicle;
