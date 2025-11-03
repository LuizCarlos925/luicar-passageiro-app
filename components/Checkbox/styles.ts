import styled from 'styled-components/native';

export const Container = styled.Pressable`
  flex-direction: row;

  align-items: center;

  gap: 8px;
`;

export const CheckWrapper = styled.View<{ isChecked?: boolean }>`
  overflow: visible;

  width: 20px;
  height: 20px;

  align-items: center;
  justify-content: center;

  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.primary_100};

  background-color: ${({ theme, isChecked }) =>
    isChecked ? theme.colors.primary_100 : theme.colors.neutro_00};
`;
