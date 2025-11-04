import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { router, useLocalSearchParams } from 'expo-router';

import Text from '@/components/Text/Text';
import Input from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';

import { theme } from '@/global/theme';

import { yupResolver } from '@hookform/resolvers/yup';

import { handleError } from '@/utils/handleError';

import { ReportForm, ReportSchema } from '@/validation/Report.validation';

import { TextWrapper } from './styles';

const Report = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [isVisible, setIsVisible] = useState(false);

  const { control, handleSubmit } = useForm<ReportForm>({
    resolver: yupResolver(ReportSchema as any),
  });

  const onSubmit = async (form: ReportForm) => {
    try {
      // await api.post('/createDriverDenunciation', {
      //   tripId: id,
      //   description: form?.report,
      // });

      setIsVisible(true);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <GlobalContainer alignItems="flex-start" paddingHorizontal={23} gap={30}>
      <BackButton />

      <TextWrapper>
        <Text size={22} fontWeight={700} color={theme.colors.primary_100}>
          Faça sua denúncia
        </Text>
        <Text size={16} fontWeight={500} color={theme.colors.primary_100}>
          Relate uma ocorrência indesejada
        </Text>
      </TextWrapper>

      <Input
        name="report"
        control={control}
        label="Descreva o ocorrido"
        placeholder="Escreva aqui..."
        containerStyle={{ height: 216 }}
        style={{
          height: '100%',
          paddingVertical: 10,
          textAlignVertical: 'top',
        }}
        multiline
      />

      <Text
        fontWeight={500}
        color={theme.colors.gray_90}
        style={{ width: '100%', marginBottom: 20, textAlign: 'justify' }}
      >
        Ajude a manter nossa comunidade segura. Se você passou por uma situação
        indesejada ou que não condiz com as diretrizes da plataforma, não hesite
        em relatar. Sua denúncia é essencial para garantir uma experiência
        melhor para todos.
      </Text>

      <Button
        onPress={handleSubmit(onSubmit)}
        style={{ marginTop: 'auto', marginBottom: 50 }}
      >
        Enviar denúncia
      </Button>

      {/* <ModalReport
        isVisible={isVisible}
        onPress={() => {
          setIsVisible(false);
          router.push({ pathname: '/(main)/Profile', params: { id } });
        }}
        onBackPress={() => {
          setIsVisible(false);
          router.push({ pathname: '/(main)/Profile', params: { id } });
        }}
      /> */}
    </GlobalContainer>
  );
};

export default Report;
