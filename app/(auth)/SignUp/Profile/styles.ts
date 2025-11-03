import styled from 'styled-components/native';

export const InputWrapper = styled.View`
  z-index: 902;

  width: 100%;

  margin-top: 10px;
  padding: 10px 10px 5px;
  gap: 5px;

  border-radius: 12px;

  background-color: ${({ theme }) => theme.colors.neutro_00};
`;
