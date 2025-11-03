import * as Icon from '@/assets/index';
import { ViewStyle } from 'react-native';

export type IconT = keyof typeof Icon;

interface Props {
  name: IconT;
  color?: string;
  size?: number;
  style?: ViewStyle;
}

export const IconComponent = ({ name, color, size, style }: Props) => {
  if (name && !!Icon?.[name]) {
    return Icon[name]({
      width: size,
      height: size,
      color,
      style,
    });
  }
};
