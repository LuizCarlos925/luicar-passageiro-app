import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import Text from '@/components/Text/Text';
import { IconComponent } from '@/components/Icon/Icon';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';

import { colors } from '@/global/theme';

import { useFAQs } from '@/services/Settings/faq.service';

const Faq = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number | null>(null);

  const { data: faq } = useFAQs();

  const handleSelectQuestion = (id: number) => {
    if (currentQuestion === id) {
      setCurrentQuestion(null);
    } else {
      setCurrentQuestion(id);
    }
  };

  return (
    <GlobalContainer alignItems="flex-start" paddingHorizontal={20} gap={16}>
      <BackButton title="FAQ" />

      <View style={styles.wrapper}>
        <Text size={24} fontWeight={700} color={colors.secondary_100}>
          Perguntas frequentes
        </Text>
        <Text size={16}>Encontre soluções rápidas</Text>
      </View>

      <View style={styles.content}>
        {faq?.map(item => (
          <View
            key={item.id}
            style={[
              styles.faqContainer,
              currentQuestion === item.id && {
                borderColor: colors.primary_100,
              },
            ]}
          >
            <Pressable
              onPress={() => handleSelectQuestion(item.id)}
              style={styles.row}
            >
              <Text size={16} fontWeight={600} color={colors.secondary_100}>
                {item.id}.{' '}
              </Text>
              <Text
                size={16}
                fontWeight={600}
                color={colors.secondary_100}
                style={{ flex: 1 }}
              >
                {item.question}
              </Text>

              <IconComponent
                name="ChevronIcon"
                size={16}
                color={colors.secondary_80}
                style={{
                  alignSelf: 'center',
                  transform: [
                    {
                      rotateZ: currentQuestion === item.id ? '270deg' : '90deg',
                    },
                  ],
                }}
              />
            </Pressable>

            {currentQuestion === item.id && (
              <Text fontWeight={500} style={{ marginBottom: 8 }}>
                {item?.response}
              </Text>
            )}
          </View>
        ))}
      </View>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    width: '100%',
    gap: 8,
  },
  wrapper: {
    gap: 4,
  },
  faqContainer: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.secondary_20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
});

export default Faq;
