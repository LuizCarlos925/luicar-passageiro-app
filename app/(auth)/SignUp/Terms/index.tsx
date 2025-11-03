import React from 'react';
import { router } from 'expo-router';

import { Step } from '@/components/Step';
import Text from '@/components/Text/Text';
import { Button } from '@/components/Button/Button';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';
import ScrollContainer from '@/components/ScrollContainer/ScrollContainer';

import { colors } from '@/global/theme';

import { useAuth } from '@/hooks/useAuth';
import { StyleSheet } from 'react-native';
import { useModal } from '@/hooks/useModal';

const Terms = () => {
  const { signUpData, setSignUpData } = useAuth();

  const { setModal } = useModal();

  const onSubmit = async () => {
    setModal({
      name: 'signUp',
      onPress: () => router.dismissTo('/(auth)/Login'),
      onPressBack: () => router.dismissTo('/(auth)/Login'),
    });

    setSignUpData({} as any);
  };

  return (
    <GlobalContainer
      paddingHorizontal={20}
      gap={16}
      containerStyle={{ backgroundColor: colors.primary_10 }}
      scrollable={false}
    >
      <BackButton />

      <Step currentStep={3} />

      <Text size={32} fontWeight={700} style={styles.text}>
        Termos de Uso e Política de Privacidade
      </Text>

      <ScrollContainer>
        <Text size={16} color={colors.secondary_60}>
          lorem ipsum dolor sit amet consectetur. Lacus massa laoreet quam
          viverra. Orci malesuada sodales quis odio purus in venenatis. In
          turpis eu egestas posuere faucibus. Vel interdum mauris eu vel in
          vestibulum fermentum. Est ut massa mauris erat ante tristique
          tincidunt vel. Aenean vivamus vulputate nam tincidunt in. Facilisis
          eleifend dignissim ut pellentesque. Pharetra ultrices arcu magna nulla
          tellus ut tincidunt aliquet eget. At placerat volutpat tortor justo
          varius. Velit ut mattis eu tincidunt leo bibendum varius. Odio aenean
          in nibh lobortis molestie bibendum ornare. Erat massa ut egestas duis
          adipiscing egestas. Egestas platea odio at eleifend dui sollicitudin
          vulputate nibh. Praesent tempor aliquet ut non tincidunt. At morbi nec
          adipiscing eu mattis volutpat at venenatis enim. A
        </Text>
      </ScrollContainer>

      <Button onPress={onSubmit} style={{ marginTop: 'auto' }}>
        Aceitar e concluir cadastro
      </Button>
      <Button onPress={router.back} style={{ marginBottom: 20 }} outline>
        Retornar
      </Button>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    width: '100%',
    textAlign: 'center',
  },
});

export default Terms;
