import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  width: 100%;

  align-items: center;
  justify-content: space-between;

  padding: 6px;

  border-radius: 61px;

  background-color: ${({ theme }) => theme.colors.gray_f9};
`;

export const SwitchButton = styled.Pressable<{ isSelected?: boolean }>`
  padding: 4px ${({ isSelected }) => (isSelected ? 10 : 4)}px;

  border-radius: 20px;

  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.neutro_00 : theme.colors.gray_f9};
`;
