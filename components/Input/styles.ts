import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';

export const InputContainer = styled.View`
  flex-direction: row;
  width: 100%;
  height: 45px;

  align-items: center;

  padding: 0 12px;
  gap: 6px;

  border-width: 1px;
  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.neutro_00};
`;

export const ErrorMessage = styled.Text`
  font-size: 9px;

  color: ${({ theme }) => theme.colors.red_d1};

  padding-top: 0.5%;
  padding-left: 3%;
`;

export const TextInput = styled.TextInput`
  flex: 1;

  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.neutro_100};
`;

export const TextInputMasked = styled(TextInputMask)`
  flex: 1;

  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.neutro_100};
`;

export const ButtonEye = styled.Pressable`
  width: 30px;
  height: 100%;

  align-items: flex-end;
  justify-content: center;
`;

export const IconWrapper = styled.Pressable``;
