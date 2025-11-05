import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

import Text from '@/components/Text/Text';

import { colors } from '@/global/theme';

type Props = {
  category: any;
  onPress: () => void;
};

const CardCompanyCategory = ({ category, onPress }: Props) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={{ uri: category?.image }} style={styles.image} />

      <View style={styles.textWrapper}>
        <Text fontWeight={600}>{category?.name}</Text>
        <Text size={12} color={colors.secondary_60}>
          {category?.description}
          velit in neque. Augue blandit accumsan...
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
