import React from 'react';
import { ViewStyle } from 'react-native';

import { Line } from './styles';

interface Props {
  style?: ViewStyle;
}

export const Divider = ({ style }: Props) => {
  return <Line style={style} />;
};
