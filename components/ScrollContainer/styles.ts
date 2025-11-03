import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const ContainerWrapper = styled.View`
  flex: 1;
  flex-direction: row;

  margin-top: 20px;
`;

export const Container = styled.ScrollView`
  gap: 20px;
`;

export const ScrollBar = styled.View`
  width: 6px;
  height: 100%;

  border-radius: 8px;
`;

export const ScrollViewIndicator = styled(Animated.View)`
  overflow: hidden;

  width: 6px;

  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.primary_60};
`;
