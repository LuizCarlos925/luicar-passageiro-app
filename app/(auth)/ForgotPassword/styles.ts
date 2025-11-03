import styled from 'styled-components/native';

export const InfoWrapper = styled.View`
  width: 100%;

  margin-top: 10px;
  padding: 15px 40px;

  border-radius: 12px;

  background-color: ${({ theme }) => theme.colors.primary_20};
`;

export const InputWrapper = styled.View`
  width: 100%;

  margin-top: 20px;
  padding: 10px 10px 5px;

  border-radius: 12px;

  background-color: ${({ theme }) => theme.colors.neutro_00};
`;
