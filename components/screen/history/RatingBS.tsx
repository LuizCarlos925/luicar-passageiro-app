import { useForm } from 'react-hook-form';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetView } from '@gorhom/bottom-sheet';

import Text from '@/components/Text/Text';
import Input from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { IconComponent } from '@/components/Icon/Icon';
import { SelectRating } from '@/components/SelectRating/SelectRating';

import { shadow } from '@/global/shadow';
import { colors } from '@/global/theme';
import { useModal } from '@/hooks/useModal';

type Props = {
  onPressClose: () => void;
  onPressReport: () => void;
};

const RatingBS = ({ onPressClose, onPressReport }: Props) => {
  const { bottom } = useSafeAreaInsets();

  const { setModal } = useModal();

  const { control, handleSubmit } = useForm();

  const onSubmit = async (form: any) => {
    onPressClose();
    setModal({ name: 'ratingSuccess' });
  };

  return (
    <BottomSheetView style={[styles.container, { paddingBottom: bottom + 20 }]}>
      <View style={styles.row}>
        <Text size={20} fontWeight={700}>
          Avaliar motorista
        </Text>

        <IconComponent
          name="CloseIcon"
          onPress={onPressClose}
          size={16}
          style={{ padding: 8 }}
        />
      </View>

      <SelectRating
        name="rating"
        control={control}
        size={24}
        containerStyles={{ alignSelf: 'center' }}
      />

      <View style={styles.wrapper}>
        <Input
          name="comment"
          control={control}
          label="Deixe um comentário"
          placeholder="Comentário sobre o motorista"
          containerStyle={{ height: 100 }}
          style={{
            height: '100%',
            paddingVertical: 10,
            textAlignVertical: 'top',
          }}
          multiline
        />

        <Pressable onPress={onPressReport} style={styles.buttonReport}>
          <Text size={14} color={colors.error_60}>
            Denunciar motorista
          </Text>
          <IconComponent name="InfoAlertIcon" />
        </Pressable>
      </View>

      <Button onPress={handleSubmit(onSubmit)}>Finalizar avaliação</Button>
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
  buttonReport: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: colors.error_60,
    borderRadius: 8,
    backgroundColor: '#fffbf8',
  },
  wrapper: {
    flex: 1,
    gap: 4,
  },
});

export default RatingBS;
