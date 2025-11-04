import Text from '@/components/Text/Text';
import { AvatarImage } from '@/components/AvatarImage/AvatarImage';

import { IconComponent } from '@/components/Icon/Icon';
import { StyleSheet, View } from 'react-native';
import { colors } from '@/global/theme';
import { Car1 } from '@/assets/images';
import { Image } from 'expo-image';

export const DriverCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text
          size={20}
          fontWeight={700}
          color={colors.neutro_00}
          style={{ flex: 1 }}
        >
          Flávio
        </Text>

        <IconComponent name="CarIcon" size={16} color={colors.neutro_00} />
        <Text size={12} color={colors.neutro_00}>
          2.490 viagens
        </Text>
      </View>

      <View style={styles.tag}>
        <IconComponent name="DiamondIcon" size={12} color={colors.neutro_00} />
        <Text size={12} fontWeight={600} color={colors.neutro_00}>
          DIAMANTE
        </Text>
      </View>

      <View style={styles.row}>
        <View style={styles.imageWrapper}>
          <Image source={Car1} style={styles.image} />
          <AvatarImage
            uri="https://randomuser.me/api/portraits/men/65.jpg"
            size={64}
          />

          <View style={styles.ratingWrapper}>
            <IconComponent name="StarIcon" size={12} color={colors.neutro_00} />

            <Text size={12} fontWeight={600} color={colors.neutro_00}>
              4.9
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text size={16} fontWeight={600} color={colors.primary_100}>
            QII3W20
          </Text>
          <Text fontWeight={600} color={colors.neutro_00}>
            Volkswagen Gol
          </Text>
          <Text size={12} color={colors.neutro_00}>
            Cor: Vermelho
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
  tag: {
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
