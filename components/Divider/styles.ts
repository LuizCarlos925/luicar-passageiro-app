import styled from 'styled-components/native';

export const Line = styled.View`
  flex-direction: row;
  flex-grow: 1;

  height: 1px;

  opacity: 0.3;

  background-color: ${({ theme }) => theme.colors.gray_9e};
`;
