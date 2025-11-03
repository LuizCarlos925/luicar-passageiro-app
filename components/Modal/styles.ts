import styled from 'styled-components/native';
import { height, width } from '@/global/constants';
import { Image } from 'expo-image';

export const ContainerWrapper = styled.View`
  width: ${width - 60}px;

  justify-content: center;
  align-self: center;

  padding: 15px;

  border-radius: 24px;

  background-color: ${({ theme }) => theme.colors.neutro_00};
`;

export const IconWrapper = styled.View`
  width: 35px;
  height: 35px;

  align-items: center;
  justify-content: center;

  border-radius: 17.5px;
`;

export const Row = styled.View`
  flex-direction: row;
  width: 100%;

  align-items: center;
  justify-content: space-between;
`;

export const ImageBlur = styled(Image)`
  position: absolute;

  width: ${width}px;
  height: ${height * 1.3}px;

  opacity: 0.9;
`;
