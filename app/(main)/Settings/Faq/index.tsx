import React, { useState } from 'react';
import { View } from 'react-native';

import { ChevronLeftIcon } from '@/assets/icons';

import Text from '@/components/Text/Text';
import { Divider } from '@/components/Divider/Divider';
import BackButton from '@/components/BackButton/BackButton';
import { GlobalContainer } from '@/components/Container/Container';

import { theme } from '@/global/theme';
import { shadow } from '@/global/shadow';

import { FAQ } from '@/mock/faq';
import {
  AnswerText,
  Container,
  QuestionText,
  Row,
  TextWrapper,
} from './styles';

const Faq = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number | null>(null);

  const handleSelectQuestion = (id: number) => {
    if (currentQuestion === id) {
      setCurrentQuestion(null);
    } else {
      setCurrentQuestion(id);
    }
  };

  return (
    <GlobalContainer alignItems="flex-start" paddingHorizontal={16} gap={30}>
      <BackButton />
      <TextWrapper>
        <Text size={22} fontWeight={600} color={theme.colors.primary_100}>
          FAQ
        </Text>
        <Text size={15} color={theme.colors.primary_100}>
          Encontre soluções rápidas
        </Text>
      </TextWrapper>

      <Container style={shadow.light}>
        {FAQ?.map((item, index) => (
          <View key={item.id}>
            <Row onPress={() => handleSelectQuestion(item.id)}>
              <QuestionText>
                <QuestionText isNumber>{item.id} - </QuestionText>
                {item.question}
              </QuestionText>

              <ChevronLeftIcon
                height={16}
                color={theme.colors.primary_60}
                style={{
                  transform: [
                    {
                      rotateZ: currentQuestion === item.id ? '90deg' : '270deg',
                    },
                  ],
                }}
              />
            </Row>
            {currentQuestion === item.id && (
              <AnswerText>{item?.response}</AnswerText>
            )}
            {FAQ && FAQ?.length > index + 1 && <Divider />}
          </View>
        ))}
      </Container>
    </GlobalContainer>
  );
};

export default Faq;
