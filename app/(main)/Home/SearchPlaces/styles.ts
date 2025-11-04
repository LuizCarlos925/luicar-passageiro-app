import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Header = styled.View`
  width: 100%;
  min-height: 225px;

  align-items: flex-start;

  padding: 20px;
  padding-bottom: 16px;

  gap: 16px;

  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  background-color: ${({ theme }) => theme.colors.secondary_100};
`;

export const ContentWrapper = styled(ScrollView)`
  width: 100%;
`;

export const AddressWrapper = styled.View`
  width: 100%;

  padding: 20px;
`;
