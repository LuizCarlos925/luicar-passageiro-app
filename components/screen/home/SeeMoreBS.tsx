import { IconComponent } from '@/components/Icon/Icon';
import Text from '@/components/Text/Text';
import { shadow } from '@/global/shadow';
import { colors } from '@/global/theme';
import { ICompanyByID } from '@/interfaces/companyById';
import { formatAddress } from '@/utils/formatAddress';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { StyleSheet, View } from 'react-native';

type Props = {
  company?: ICompanyByID;
  onPress: () => void;
};

const SeeMoreBS = ({ company, onPress }: Props) => {
  return (
    <BottomSheetView style={styles.container}>
      <View style={styles.row}>
        <Text size={20} fontWeight={700}>
          Ver mais
        </Text>

        <IconComponent
          name="CloseIcon"
          onPress={onPress}
          size={16}
          style={{ padding: 8 }}
        />
      </View>

      <Text color={colors.secondary_60}>
        {company?.company?.description || 'Descrição não disponível.'}
      </Text>

      <View style={styles.locationWrapper}>
        <IconComponent
          name="PinFilledIcon"
          onPress={() => null}
          style={styles.icon}
        />

        <View style={styles.textWrapper}>
          <Text color={colors.secondary_60}>{company?.company?.zipCode}</Text>

          <Text size={16} color={colors.secondary_100}>
            {company?.company?.neighborhood}
          </Text>
          <Text color={colors.secondary_60}>
            {formatAddress(company?.company)}
          </Text>
        </View>
      </View>
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 16,
    backgroundColor: colors.neutro_00,
    ...shadow.default,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutro_20,
  },
  locationWrapper: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 8,
    gap: 16,
  },
  textWrapper: {
    flex: 1,
    gap: 4,
  },
  icon: {
    padding: 8,
  },
});

export default SeeMoreBS;
