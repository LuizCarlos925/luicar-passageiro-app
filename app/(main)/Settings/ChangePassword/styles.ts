import styled from 'styled-components/native';

export const InputWrapper = styled.View`
  width: 100%;

  margin-top: 10px;
  padding: 10px 0 5px;
  gap: 5px;

  border-radius: 12px;

  background-color: ${({ theme }) => theme.colors.neutro_00};
`;

export const PasswordRulesWrapper = styled.View`
  width: 100%;

  padding: 12px;
  gap: 5px;

  border-radius: 15px;

  background-color: ${({ theme }) => theme.colors.primary_20};
`;

export const PasswordRulesRow = styled.View`
  flex-direction: row;
  width: 100%;

  gap: 5px;
`;

export const TextMarker = styled.View`
  width: 5px;
  height: 5px;

  margin-top: 8px;

  border-radius: 3px;

  background-color: ${({ theme }) => theme.colors.gray_1e};
`;
