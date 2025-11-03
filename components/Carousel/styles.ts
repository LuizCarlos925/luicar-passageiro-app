import styled from 'styled-components/native';

import { width } from '@/global/constants';

export const ImageWrapper = styled.Pressable`
  overflow: hidden;

  width: ${width * 0.82}px;
  height: 150px;

  align-items: center;
  justify-content: center;

  border-radius: 15px;
`;
