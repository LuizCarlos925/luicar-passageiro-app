import styled from 'styled-components/native';

export const TextWrapper = styled.View`
  gap: 5px;
`;

export const Header = styled.View`
  flex-direction: row;
  width: 100%;

  align-self: center;
`;

export const TitleWrapper = styled.Pressable<{ isSelected?: boolean }>`
  padding: 10px 20px 10px 0;

  border-bottom-width: 3px;
  border-bottom-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.secondary_60 : theme.colors.gray_d9};
`;

export const HeaderTitle = styled.Text<{ isSelected?: boolean }>`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.semibold};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.secondary_60 : theme.colors.gray_90};
`;

export const Container = styled.View`
  flex-grow: 1;
  width: 100%;

  padding: 16px 10px;
  margin-bottom: 24px;

  border-radius: 16px;

  background-color: ${({ theme }) => theme.colors.neutro_00};
`;

export const Description = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.neutro_40};
`;
