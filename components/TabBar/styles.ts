import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  width: 100%;

  align-items: center;
  justify-content: space-evenly;

  border-top-right-radius: 30px;
  border-top-left-radius: 30px;

  background-color: ${({ theme }) => theme.colors.neutro_00};
`;

export const IconWrapper = styled.Pressable`
  flex: 1;

  align-items: center;
  justify-content: center;
`;

export const VerticalDivider = styled.View`
  width: 1px;
  height: 60%;

  background-color: ${({ theme }) => theme.colors.gray_d9};
`;
