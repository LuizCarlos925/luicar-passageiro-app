import styled from 'styled-components/native';

export const InputWrapper = styled.View`
  width: 100%;

  margin-top: 10px;
  padding: 10px 10px 5px;
  gap: 5px;

  border-radius: 12px;

  background-color: ${({ theme }) => theme.colors.neutro_00};
`;

export const PasswordRulesWrapper = styled.View`
  flex-direction: row;
  width: 100%;

  gap: 5px;
`;

export const TextMarker = styled.View`
  width: 4px;
  height: 4px;

  margin-top: 4px;

  border-radius: 3px;

  background-color: ${({ theme }) => theme.colors.primary_60};
`;
