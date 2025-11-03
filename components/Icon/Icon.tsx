import { Pressable, ViewStyle } from 'react-native';

import * as Icon from '@/assets/icons/index';
import { colors } from '@/global/theme';

export type IconT = keyof typeof Icon;

export type TIconProps = {
  name: IconT;
  color?: string;
  size?: number;
  onPress?: () => void;
  style?: ViewStyle;
  hitSlop?: number;
};

export const IconComponent = ({
  name,
  color = colors.primary_100,
  size = 20,
  onPress,
  style,
  hitSlop = 4,
}: TIconProps) => {
  const IconEl = Icon[name];

  if (!IconEl) {
    return null;
  }

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={style} hitSlop={hitSlop}>
        <IconEl width={size} height={size} color={color} />
      </Pressable>
    );
  }

  return <IconEl width={size} height={size} color={color} style={style} />;
};
