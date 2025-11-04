import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

export const HeaderContainer = styled.View`
  flex-direction: row;
  width: 100%;

  justify-content: space-between;

  padding: 30px 16px;
  gap: 5px;
`;

export const MenuButton = styled.Pressable`
  padding: 4px 6px 0;
`;

export const ContentWrapper = styled.View`
  width: 100%;

  margin-bottom: 90px;
  padding: 0 16px;
  gap: 15px;
`;

export const Row = styled.View`
  flex-direction: row;
  width: 100%;

  align-items: center;
  justify-content: space-between;
`;

export const InfoWrapper = styled.View`
  flex: 1;

  gap: 5px;
`;

export const TextWrapper = styled.View`
  gap: 5px;
`;

export const ShareButton = styled.Pressable`
  width: 37px;
  height: 37px;

  justify-content: center;

  padding-left: 11px;

  border-radius: 20px;

  background-color: ${({ theme }) => theme.colors.secondary_60};
`;

export const Gradient = styled(LinearGradient)`
  width: 85%;
  height: 40px;

  align-self: center;

  margin-top: -15px;

  border-radius: 8px;
`;
