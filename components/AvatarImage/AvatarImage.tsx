import React from 'react';

import { ViewStyle } from 'react-native';
import { getImageUrl } from '@/services/api';
import { DefaultAvatarImg } from '@/assets/images';
import { Avatar, Container } from './styles';

type Props = {
  uri: string | undefined;
  size?: number;
  borderRadius?: number;
  onPress?: () => void;
  isNotApi?: boolean;
  style?: ViewStyle;
};

export const AvatarImage = ({
  uri,
  size = 32,
  borderRadius = 300,
  onPress,
  isNotApi,
  style,
}: Props) => {
  return (
    <Container
      onPress={onPress}
      style={[{ width: size, height: size, borderRadius }, style]}
      disabled={!onPress}
    >
      <Avatar
        source={
          uri ? { uri: isNotApi ? uri : getImageUrl(uri) } : DefaultAvatarImg
        }
      />
    </Container>
  );
};
