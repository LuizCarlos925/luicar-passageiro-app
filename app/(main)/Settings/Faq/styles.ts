import styled from 'styled-components/native';

export const TextWrapper = styled.View`
  gap: 5px;
`;

export const Container = styled.View`
  width: 100%;

  margin-bottom: 30px;
  padding: 12px;

  border-radius: 16px;

  background-color: ${({ theme }) => theme.colors.neutro_00};
`;

export const Row = styled.Pressable`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  padding: 24px 12px;
`;

export const QuestionText = styled.Text<{ isNumber?: boolean }>`
  flex: 1;

  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.semibold};
  color: ${({ theme, isNumber }) =>
    isNumber ? theme.colors.primary_60 : theme.colors.primary_100};
`;

export const AnswerText = styled.Text`
  padding: 0 12px 24px;

  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.primary_100};
`;
