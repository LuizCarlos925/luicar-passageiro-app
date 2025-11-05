import { StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';

import Text from '@/components/Text/Text';
import Input from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';

import { colors } from '@/global/theme';

import { useModal } from '@/hooks/useModal';

import { handleError } from '@/utils/handleError';

import { ReportForm, ReportSchema } from '@/validation/Report.validation';

const Report = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const router = useRouter();

  const { setModal } = useModal();

  const { control, handleSubmit } = useForm<ReportForm>({
    resolver: yupResolver(ReportSchema as any),
  });

  const onSubmit = async (form: ReportForm) => {
    try {
      setModal({ name: 'reportSubmitted', onPress: router.back });
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <GlobalContainer alignItems="flex-start" paddingHorizontal={20} gap={24}>
      <BackButton title="Denunciar corrida" />

      <View style={styles.textWrapper}>
        <Text size={24} fontWeight={700} color={colors.secondary_100}>
          Faça sua denúncia
        </Text>
        <Text size={16}>Relate uma ocorrência indesejada</Text>
      </View>

      <Input
        name="report"
        control={control}
        placeholder="Descreva o ocorrido"
        containerStyle={{ height: 216 }}
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

      <Button onPress={handleSubmit(onSubmit)} style={styles.button}>
        Fazer denúncia
      </Button>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    gap: 4,
  },
  button: {
    marginTop: 'auto',
    marginBottom: 30,
  },
});

export default Report;
