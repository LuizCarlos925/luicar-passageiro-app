import { IconComponent } from '@/components/Icon/Icon';
import Text from '@/components/Text/Text';
import { shadow } from '@/global/shadow';
import { colors } from '@/global/theme';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { StyleSheet, View } from 'react-native';

type Props = {
  onPress: () => void;
};

const SeeMoreBS = ({ onPress }: Props) => {
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
        Descrição lorem ipsum dolor sit amet consectetur. Sed arcu urna justo
        sit sapien. Elementum pulvinar elit scelerisque duis sed malesuada
        consequat. Aenean porta lectus consequat id. Augue vel non condimentum
        nunc tempor. Donec tortor mi mauris tincidunt enim feugiat ornare.
        Elementum feugiat sed arcu turpis lacus. Mi sem facilisis gravida.
      </Text>

      <View style={styles.locationWrapper}>
        <IconComponent
          name="PinFilledIcon"
          onPress={() => null}
          style={styles.icon}
        />

        <View style={styles.textWrapper}>
          <Text color={colors.secondary_60}>53000-000</Text>

          <Text size={16} color={colors.secondary_100}>
            Parque Centenário
          </Text>
          <Text color={colors.secondary_60}>
            Av. Ver. Narciso Yague Guimarães, Mogi das Cruzes, número 50. Centro
            Cívico - SP. Complemento lorem ipsum
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
