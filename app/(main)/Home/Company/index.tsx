import { useRef } from 'react';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

import Text from '@/components/Text/Text';
import { IconComponent } from '@/components/Icon/Icon';
import { CardCompanyCategory, SeeMoreBS } from '@/components/screen';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';

import { colors } from '@/global/theme';
import { width } from '@/global/constants';

import { useCompanyById } from '@/services/Home/companies.service';

import { formatAddress } from '@/utils/formatAddress';
import { getImageUrl } from '@/services/api';

const Company = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const router = useRouter();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const { data: company } = useCompanyById(id);

  return (
    <GlobalContainer paddingHorizontal={20} gap={16}>
      <BackButton title="Ver empresa" />

      <View style={styles.row}>
        <Image
          source={{ uri: getImageUrl(company?.company?.photo?.url) }}
          style={styles.image}
        />
        <Text size={24} fontWeight={700} style={{ flexShrink: 1 }}>
          {company?.company?.tradeName}
        </Text>
      </View>

      <Text color={colors.secondary_60}>{company?.company?.description}</Text>

      <View style={styles.row}>
        <IconComponent name="PinFilledIcon" style={styles.icon} />

        <View style={styles.textWrapper}>
          <Text size={16} color={colors.secondary_100}>
            {company?.company?.neighborhood}
          </Text>
          <Text color={colors.secondary_60} numberOfLines={1}>
            {formatAddress(company?.company as any)}
          </Text>
        </View>
      </View>

      <Text
        fontWeight={700}
        color={colors.primary_100}
        onPress={() => bottomSheetRef.current?.expand()}
        style={styles.seeMore}
      >
        Ver mais
      </Text>

      <View style={styles.line} />

      <Text size={20} fontWeight={600} style={{ width: '100%' }}>
        Nome da categoria
      </Text>

      <View style={styles.categoryWrapper}>
        {company?.announcements?.map(item => (
          <CardCompanyCategory
            key={item.id}
            category={item}
            onPress={() =>
              router.push({
                pathname: '/(main)/Home/Company/Product',
                params: { id: item.id },
              })
            }
          />
        ))}
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[250, 350]}
        index={-1}
        handleComponent={() => <View style={styles.lineHandler} />}
        backgroundStyle={{ backgroundColor: colors.neutro_00 }}
        enablePanDownToClose
      >
        <SeeMoreBS onPress={() => bottomSheetRef.current?.close()} />
      </BottomSheet>
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
  seeMore: {
    width: '100%',
    alignItems: 'center',
    padding: 4,
    textAlign: 'center',
  },
  lineHandler: {
    width: 85,
    height: 6,
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 20,
    backgroundColor: '#d2d6db',
  },
});

export default Company;
