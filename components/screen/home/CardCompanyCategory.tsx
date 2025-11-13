import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import { IAnnouncement } from '@/interfaces/companyById';
import { getImageUrl } from '@/services/api';
import Text from '@/components/Text/Text';

import { colors } from '@/global/theme';

type Props = {
  category: IAnnouncement;
  onPress: () => void;
};

const CardCompanyCategory = ({ category, onPress }: Props) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={{
          uri: getImageUrl(
            category?.portfolio_product?.photos?.[0]?.url ||
              category?.banner?.url,
          ),
        }}
        style={styles.image}
      />

      <View style={styles.textWrapper}>
        <Text fontWeight={600}>
          {category?.portfolio_product?.name || category?.name}
        </Text>
        <Text size={12} color={colors.secondary_60}>
          {category?.portfolio_product?.description || category?.description}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 8,
    gap: 8,
  },
  textWrapper: {
    flex: 1,
    gap: 4,
  },
  image: {
    width: 77,
    height: 77,
    borderRadius: 12,
  },
});

export default CardCompanyCategory;
