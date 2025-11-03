import { width } from '@/global/constants';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  width: ${width}px;
  height: 79px;

  align-items: center;
  justify-content: center;

  padding: 0 20px;

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  background-color: ${({ theme }) => theme.colors.primary_60};
`;

export const ContainerStep = styled.View`
  width: ${width}px;
  height: 84px;

  align-items: center;
  justify-content: center;

  padding: 0 20px;
  gap: 10px;

  background-color: ${({ theme }) => theme.colors.neutro_00};
`;

export const ButtonIcon = styled.Pressable`
  width: 35px;
  height: 40px;

  align-items: center;
  justify-content: center;
`;
