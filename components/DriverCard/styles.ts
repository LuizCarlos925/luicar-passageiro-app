import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 215px;

  align-items: center;
`;

export const TextWrapper = styled.View`
  flex: 1;

  gap: 5px;
`;

export const Card = styled.Pressable`
  position: absolute;

  flex-direction: row;

  width: 100%;

  align-items: center;

  padding: 20px 15px;
  gap: 20px;

  border-radius: 20px;

  background-color: ${({ theme }) => theme.colors.neutro_00};
`;

export const CardButton = styled.Pressable`
  position: absolute;

  width: 100%;
`;

export const CardLinearGradient = styled(LinearGradient).attrs({
  colors: ['#220D39', '#5F259F'],
  end: [1, 0],
})`
  width: 100%;

  padding: 20px 15px;
  gap: 20px;

  border-radius: 20px;
`;

export const ProfileWrapper = styled.View`
  flex-direction: row;
  width: 100%;

  align-items: center;

  gap: 10px;
`;

export const Row = styled.View`
  flex-direction: row;

  align-items: center;

  gap: 5px;
`;

export const TextMarker = styled.View`
  width: 5px;
  height: 5px;

  border-radius: 3px;

  background-color: ${({ theme }) => theme.colors.gray_d9};
`;
