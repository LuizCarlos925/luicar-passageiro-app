import { Pressable, StyleSheet } from 'react-native';

import Text from '@/components/Text/Text';
import { IconComponent } from '@/components/Icon/Icon';

import { colors } from '@/global/theme';
import { Checkbox } from '@/components/Checkbox/Checkbox';
import { FieldValues, useController } from 'react-hook-form';

const ButtonWoman = <TFieldValues extends FieldValues>({
  control,
  name,
}: TFieldValues) => {
  const { field } = useController({
    control,
    name,
  });

  return (
    <Pressable
      onPress={() => field.onChange(!field.value)}
      style={styles.container}
    >
      <IconComponent name="WomanIcon" color={colors.primary_40} />

      <Text size={16} color={colors.secondary_80} style={styles.text}>
        Selecionar apenas{'\n'}motorista mulher
      </Text>

      <Checkbox name={name} control={control} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 20,
    borderWidth: 1,
    borderColor: colors.secondary_20,
    borderRadius: 8,
  },
  text: {
    flex: 1,
  },
});

export default ButtonWoman;
