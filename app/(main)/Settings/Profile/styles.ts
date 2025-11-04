import { Image } from 'expo-image';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const HeaderWrapper = styled.View`
  margin-bottom: 60px;
`;

export const ProfileButton = styled.Pressable``;

export const ProfileImage = styled(Image)`
  width: 116px;
  height: 116px;

  border-radius: 58px;
  border: 2px solid ${({ theme }) => theme.colors.neutro_00};

  background-color: ${({ theme }) => theme.colors.neutro_00};
`;

export const Row = styled.View`
  flex-direction: row;

  align-items: center;

  gap: 8px;
`;

export const Column = styled.View`
  flex: 1;

  justify-content: space-between;

  gap: 12px;

  margin-top: ${Platform.OS === 'ios' ? 0 : 52}px;
`;

export const ContentWrapper = styled.View`
  width: 100%;

  padding: 0 16px;
`;

export const FlagWrapper = styled.View`
  width: 45px;
  height: 30px;

  padding: 4px;

  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.neutro_10};
`;

export const DeleteButton = styled.Pressable`
  padding: 6px;
`;
