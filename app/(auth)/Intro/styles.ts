import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';

export const GradientContainer = styled(LinearGradient).attrs({
  colors: ['#5F259F', '#220D39'],
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const LogoWrapper = styled(Animated.View)`
  flex-direction: row;
  align-self: center;
  align-items: flex-end;
  gap: 8px;

  position: absolute;
`;
