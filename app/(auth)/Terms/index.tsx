import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';

import Text from '@/components/Text/Text';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';
import ScrollContainer from '@/components/ScrollContainer/ScrollContainer';

import { theme } from '@/global/theme';

import {
  Container,
  Description,
  Header,
  HeaderTitle,
  TextWrapper,
  TitleWrapper,
} from './styles';

const Terms = () => {
  const [selectedHeader, setSelectedHeader] = useState<'terms' | 'policy'>(
    'terms',
  );

  const { data: terms, isFetching } = useTerms(selectedHeader === 'terms');

  return (
    <GlobalContainer
      alignItems="flex-start"
      paddingHorizontal={16}
      gap={30}
      scrollable={false}
    >
      <BackButton />

      <TextWrapper>
        <Text size={22} fontWeight={600} color={theme.colors.primary_100}>
          Diretrizes
        </Text>
        <Text size={15} color={theme.colors.primary_100}>
          Entenda as regras e como protegemos seus dados
        </Text>
      </TextWrapper>

      <Container>
        <Header>
          <TitleWrapper
            isSelected={selectedHeader === 'terms'}
            onPress={() => setSelectedHeader('terms')}
          >
            <HeaderTitle isSelected={selectedHeader === 'terms'}>
              Termos de uso
            </HeaderTitle>
          </TitleWrapper>
          <TitleWrapper
            isSelected={selectedHeader === 'policy'}
            onPress={() => setSelectedHeader('policy')}
          >
            <HeaderTitle isSelected={selectedHeader === 'policy'}>
              Política e privacidade
            </HeaderTitle>
          </TitleWrapper>
        </Header>
        <ScrollContainer>
          {isFetching && (
            <ActivityIndicator size={40} color={theme.colors.primary_60} />
          )}
          <Description>{terms?.description}</Description>
        </ScrollContainer>
      </Container>
    </GlobalContainer>
  );
};

export default Terms;
