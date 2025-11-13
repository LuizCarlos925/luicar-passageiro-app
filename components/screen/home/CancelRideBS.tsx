import { useForm } from 'react-hook-form';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetView } from '@gorhom/bottom-sheet';

import { CANCEL_REASONS } from '@/assets/json/cancelReasons';

import Text from '@/components/Text/Text';
import Input from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { IconComponent } from '@/components/Icon/Icon';

import { colors } from '@/global/theme';
import { shadow } from '@/global/shadow';
import { useModal } from '@/hooks/useModal';

type Props = {
  onPress: (reason: string) => void;
  onClose?: () => void;
};

const CancelRideBS = ({ onPress, onClose }: Props) => {
  const { bottom } = useSafeAreaInsets();

  const { setModal } = useModal();

  const { control, handleSubmit, setValue, watch } = useForm();

  const { selectedReason } = watch();

  const onSubmit = async (form: any) => {
    onPress(form.selectedReason);

    setTimeout(() => {
      setModal({ name: 'cancelRideWithTax' });
    }, 500);
  };

  return (
    <BottomSheetView style={[styles.container, { paddingBottom: bottom + 20 }]}>
      <View style={styles.row}>
        <View>
          <Text size={20} fontWeight={700}>
            Motivo do cancelamento
          </Text>

          <Text size={16} color={colors.secondary_100}>
            Selecione uma opção abaixo
          </Text>
        </View>

        <IconComponent
          name="CloseIcon"
          onPress={onClose}
          size={16}
          style={{ padding: 8 }}
        />
      </View>

      {selectedReason === '7' ? (
        <>
          <Pressable
            onPress={() => setValue('selectedReason', '')}
            style={styles.buttonOther}
          >
            <IconComponent name="ReasonEllipsis" size={20} />

            <Text
              fontWeight={500}
              color={colors.primary_100}
              style={{ flex: 1 }}
            >
              Outro
            </Text>

            <IconComponent
              name="ChevronIcon"
              size={16}
              color={colors.primary_100}
              style={{ transform: [{ rotateZ: '90deg' }] }}
            />
          </Pressable>

          <Text size={16} color={colors.secondary_100}>
            Queremos entender o motivo do cancelamento
          </Text>
          <Input
            name="description"
            control={control}
            placeholder="Informe o motivo do cancelamento"
            containerStyle={{ height: 170 }}
            style={{
              height: '100%',
              paddingVertical: 10,
              textAlignVertical: 'top',
            }}
            multiline
          />
        </>
      ) : (
        <View>
          {CANCEL_REASONS.map(reason => (
            <Pressable
              key={reason.id}
              onPress={() => setValue('selectedReason', reason.id)}
              style={[
                styles.button,
                {
                  backgroundColor:
                    selectedReason === reason.id
                      ? colors.primary_20
                      : colors.neutro_00,
                },
              ]}
            >
              <IconComponent name={reason.icon} size={18} />
              <Text size={14} fontWeight={500} style={{ flex: 1 }}>
                {reason.reason}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      <Button
        onPress={handleSubmit(onSubmit)}
        style={{ opacity: selectedReason ? 1 : 0.7 }}
        disabled={!selectedReason}
      >
        Cancelar corrida
      </Button>
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
    gap: 8,
  },
  button: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary_20,
    gap: 20,
  },
  buttonOther: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 20,
    borderRadius: 8,
    backgroundColor: colors.primary_20,
  },
});

export default CancelRideBS;
