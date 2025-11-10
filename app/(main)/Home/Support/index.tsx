import React, { useState } from 'react';

import Text from '@/components/Text/Text';

import { Button } from '@/components/Button/Button';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';
// import { ModalReport } from '@/components/ModalReport/ModalReport';

import { theme } from '@/global/theme';

import { Divider } from '@/components/Divider/Divider';
import { router, useLocalSearchParams } from 'expo-router';
// import { ChatIcon } from '@/assets';
import { FAQButton, TextWrapper } from './styles';

const Support = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [isVisible, setIsVisible] = useState(false);

  return (
    <GlobalContainer alignItems="flex-start" paddingHorizontal={23} gap={30}>
      <BackButton />

      <TextWrapper>
        <Text size={22} fontWeight={600} color={theme.colors.primary_60}>
          Ajuda
        </Text>
        <Text size={16} color={theme.colors.primary_100}>
          Algum problema? Contate-nos imediatamente
        </Text>
      </TextWrapper>

      <FAQButton onPress={() => router.push('/(main)/Settings/Faq')}>
        {/* <ChatIcon /> */}
        <Text fontWeight={500} color={theme.colors.primary_100}>
          FAQ
        </Text>
      </FAQButton>

      <Divider
        style={{
          flexGrow: undefined,
          width: '100%',
          height: 1,
        }}
      />

      <Button
        onPress={() =>
          router.push({
            pathname: '/(main)/Home/Report',
            params: { id },
          })
        }
        style={{ justifyContent: 'flex-start', paddingHorizontal: 20, gap: 10 }}
        fontSize={15}
        iconLeft="InfoAlertIcon"
        backgroundColor={theme.colors.red_d1}
      >
        Denunciar motorista
      </Button>

      {/* <ModalReport
        isVisible={isVisible}
        onPress={() => setIsVisible(false)}
        onBackPress={() => setIsVisible(false)}
      /> */}
    </GlobalContainer>
  );
};

export default Support;
