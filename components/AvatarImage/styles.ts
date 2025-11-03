import { Image } from 'expo-image';
import styled from 'styled-components/native';

export const Container = styled.Pressable`
  overflow: hidden;
`;

export const Avatar = styled(Image)`
  width: 100%;
  height: 100%;
`;
