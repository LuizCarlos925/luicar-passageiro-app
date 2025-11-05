import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetView } from '@gorhom/bottom-sheet';

import Text from '@/components/Text/Text';
import Input from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { IconComponent } from '@/components/Icon/Icon';

import { shadow } from '@/global/shadow';
import { colors } from '@/global/theme';
import { useModal } from '@/hooks/useModal';

type Props = {
  onPressClose: () => void;
};

const ReportBS = ({ onPressClose }: Props) => {
  const { bottom } = useSafeAreaInsets();

  const { setModal } = useModal();

  const { control, handleSubmit } = useForm();

  const onSubmit = async (form: any) => {
    setModal({ name: 'reportSubmitted' });
    onPressClose();
  };

  return (
    <BottomSheetView style={[styles.container, { paddingBottom: bottom + 20 }]}>
      <View style={styles.row}>
        <IconComponent
          name="ChevronLeftIcon"
          onPress={onPressClose}
          size={16}
          color={colors.secondary_80}
        />

        <Text
          size={20}
          fontWeight={700}
          style={{ flex: 1, textAlign: 'center' }}
        >
          Denunciar motorista
        </Text>
      </View>

      <Input
        name="comment"
        control={control}
        label="Deixe um comentário"
        placeholder="Descreva o ocorrido"
        containerStyle={{ height: 100 }}
        style={{
          height: '100%',
          paddingVertical: 10,
          textAlignVertical: 'top',
        }}
        multiline
      />

      <Text>
        Ajude a manter nossa comunidade segura. Se você passou por uma situação
        indesejada ou que não condiz com as diretrizes da plataforma, não hesite
        em relatar. Sua denúncia é essencial para garantir uma experiência
        melhor para todos.
      </Text>

      <Button onPress={handleSubmit(onSubmit)}>Denunciar motorista</Button>
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
    paddingVertical: 4,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutro_20,
  },
});

export default ReportBS;
