import Text from '@/components/Text/Text';
import { AvatarImage } from '@/components/AvatarImage/AvatarImage';

import { IconComponent } from '@/components/Icon/Icon';
import { StyleSheet, View } from 'react-native';
import { colors } from '@/global/theme';
import { Car1 } from '@/assets/images';
import { Image } from 'expo-image';
import { Driver, Vehicle } from '@/interfaces/ride';
import { Ranking } from '../ui';

type Props = {
  vehicle?: Vehicle;
  driver?: Driver;
};

export const DriverCard = ({ vehicle, driver }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text
          size={20}
          fontWeight={700}
          color={colors.neutro_00}
          style={{ flex: 1 }}
        >
          {driver?.socialName || `${driver?.firstName} ${driver?.lastName}`}
        </Text>

        <IconComponent name="CarIcon" size={16} color={colors.neutro_00} />
        <Text size={12} color={colors.neutro_00}>
          {driver?.tripCount} viagens
        </Text>
      </View>

      <Ranking ranking={driver?.gamification || 'prata'} isDarkMode />

      <View style={styles.row}>
        <View style={styles.imageWrapper}>
          <Image source={Car1} style={styles.image} />
          <AvatarImage uri={driver?.image?.url} size={64} />

          <View style={styles.ratingWrapper}>
            <IconComponent name="StarIcon" size={12} color={colors.neutro_00} />

            <Text size={12} fontWeight={600} color={colors.neutro_00}>
              {driver?.reviews?.average_reviews.toFixed(1)}
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text size={16} fontWeight={600} color={colors.primary_100}>
            {vehicle?.plateNumber}
          </Text>
          <Text fontWeight={600} color={colors.neutro_00}>
            {vehicle?.brand} {vehicle?.model}
          </Text>
          <Text size={12} color={colors.neutro_00}>
            Cor: {vehicle?.color?.name}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.secondary_20,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  imageWrapper: {
    width: 140,
    marginBottom: 8,
  },
  image: {
    position: 'absolute',
    right: 12,
    width: 104,
    height: 72,
  },
  ratingWrapper: {
    position: 'absolute',
    left: 8,
    bottom: -8,
    flexDirection: 'row',
    width: 46,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    gap: 4,
    borderRadius: 4,
    backgroundColor: colors.primary_80,
  },
});
