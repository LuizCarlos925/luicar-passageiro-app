import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import Text from '@/components/Text/Text';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';
import ScrollContainer from '@/components/ScrollContainer/ScrollContainer';

import { colors } from '@/global/theme';
import { useTerms } from '@/services/Settings/terms.service';

const Terms = () => {
  const { data: termsData, isFetching } = useTerms();

  const terms = termsData?.find(term => term.name === 'Termos de Uso');
  const politics = termsData?.find(term => term.name !== 'Termos de Uso');

  return (
    <GlobalContainer
      alignItems="flex-start"
      paddingHorizontal={16}
      paddingBottom={20}
      gap={16}
      contentWrapperStyle={{ flex: 1 }}
      scrollable={false}
    >
      <BackButton style={styles.backBtn} />

      <Text size={24} fontWeight={700} color={colors.secondary_100}>
        Termos de uso
      </Text>

      <ScrollContainer>
        {isFetching ? (
          <ActivityIndicator size={40} color={colors.primary_100} />
        ) : (
          <Text size={16} color={colors.secondary_60}>
            {terms?.description}
            {'\n\n'}
            {politics?.description}
          </Text>
        )}
      </ScrollContainer>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    marginTop: 16,
  },
});

export default Terms;
