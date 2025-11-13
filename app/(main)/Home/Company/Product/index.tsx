import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import Text from '@/components/Text/Text';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';

import { colors } from '@/global/theme';
import { width } from '@/global/constants';

import { getImageUrl } from '@/services/api';
import { useCompanyProduct } from '@/services/Home/companies.service';

const Product = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: product } = useCompanyProduct(id);

  return (
    <GlobalContainer paddingHorizontal={20} gap={16} alignItems="flex-start">
      <BackButton style={styles.backButton} />

      <Image
        source={{
          uri: getImageUrl(
            product?.portfolio_product?.photos?.[0]?.url ||
              product?.banner?.url,
          ),
        }}
        style={styles.image}
      />

      <View style={styles.line} />

      <View style={styles.categoryWrapper}>
        <Text color={colors.primary_100}>Nome da categoria</Text>
      </View>

      <Text size={32} fontWeight={700}>
        {product?.portfolio_product?.name || product?.name}
      </Text>
      <Text color={colors.secondary_60}>
        {product?.portfolio_product?.description || product?.description}
      </Text>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginTop: 16,
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: 8,
  },
  categoryWrapper: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: colors.primary_100,
    borderRadius: 20,
    backgroundColor: colors.primary_20,
  },
  line: {
    width,
    height: 8,
    alignSelf: 'center',
    backgroundColor: colors.secondary_20,
  },
});

export default Product;
