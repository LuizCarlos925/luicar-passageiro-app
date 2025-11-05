import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import Text from '@/components/Text/Text';
import { IconComponent } from '@/components/Icon/Icon';
import { CardCompanyCategory } from '@/components/screen';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';

import { colors } from '@/global/theme';
import { width } from '@/global/constants';

import { PRODUCTS } from '@/mock/products';
import { useRouter } from 'expo-router';

const Company = () => {
  const router = useRouter();

  return (
    <GlobalContainer paddingHorizontal={20} gap={16}>
      <BackButton title="Ver empresa" />

      <View style={styles.row}>
        <Image
          source={{
            uri: 'https://opopularpr.com.br/wp-content/uploads/2025/05/mc-donalds-deve-comecar-a-ser-construido-em-araucaria-ainda-neste-ano-009e.webp',
          }}
          style={styles.image}
        />
        <Text size={24} fontWeight={700} style={{ flexShrink: 1 }}>
          Mcdonald’s - Dol - Drive Brasília
        </Text>
      </View>

      <Text color={colors.secondary_60}>
        Descrição lorem ipsum dolor sit amet consectetur. Lacus tellus nibh
        velit in neque. Augue blandit accumsan...
      </Text>

      <View style={styles.row}>
        <IconComponent name="PinFilledIcon" style={styles.icon} />

        <View style={styles.textWrapper}>
          <Text size={16} color={colors.secondary_100}>
            Parque Centenário
          </Text>
          <Text color={colors.secondary_60} numberOfLines={1}>
            Av. Ver. Narciso Yague Guimarães, Mogi...
          </Text>
        </View>
      </View>

      <Text fontWeight={700} color={colors.primary_100}>
        Ver mais
      </Text>

      <View style={styles.line} />

      <Text size={20} fontWeight={600} style={{ width: '100%' }}>
        Nome da categoria
      </Text>

      <View style={styles.categoryWrapper}>
        {PRODUCTS.map(item => (
          <CardCompanyCategory
            key={item.id}
            category={item}
            onPress={() => router.push('/(main)/Home/Company/Product')}
          />
        ))}
      </View>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  textWrapper: {
    flex: 1,
    gap: 4,
  },
  icon: {
    padding: 8,
  },
  line: {
    width,
    height: 8,
    alignSelf: 'center',
    backgroundColor: colors.secondary_20,
  },
  categoryWrapper: {
    width: '100%',
    gap: 12,
  },
});

export default Company;
